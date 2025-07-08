import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { databases, storage, account, DATABASE_ID, PRODUCTS_COLLECTION_ID, ORDERS_COLLECTION_ID, COVER_IMAGES_COLLECTION_ID, BUCKET_ID } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';
import { toast } from 'sonner';
import { CoverImage } from '@/components/ecommerce/CoverImageCarousel';

export interface ProductInventory {
  [sizeOrColor: string]: number; // e.g., "S": 10, "Red": 5
}

export interface ProductVariantInventory {
  [variant: string]: number; // e.g., "S-Red": 3, "M-Blue": 7
}

export interface AdminProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: { fileId: string; url: string }[];
  sizes: string[];
  colors: string[];
  quantity: number; // Total quantity (sum of all variants)
  // New inventory management
  sizeInventory?: ProductInventory; // Inventory by size
  colorInventory?: ProductInventory; // Inventory by color  
  variantInventory?: ProductVariantInventory; // Inventory by size-color combination
  rating: number;
  reviews: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    productId: string;
    productTitle: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: Date;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password?: string, isAppwrite?: boolean) => boolean;
  logout: () => void;
  products: AdminProduct[];
  orders: AdminOrder[];
  coverImages: CoverImage[];
  addProduct: (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'> & { imageFiles?: File[] }) => Promise<void>;
  updateProduct: (id: string, updates: Partial<AdminProduct> & { imageFiles?: File[] }) => Promise<void>;
  deleteProduct: (id: string) => void;
  restockProduct: (id: string, quantity: number) => Promise<void>;
  addCoverImage: (coverImage: Omit<CoverImage, 'id' | 'createdAt'> & { imageFile: File }) => Promise<void>;
  updateCoverImage: (id: string, updates: Partial<CoverImage>) => Promise<void>;
  deleteCoverImage: (id: string) => Promise<void>;
  addOrder: (order: AdminOrder) => void;
  updateOrderStatus: (orderId: string, status: AdminOrder['status']) => void;
  getProductById: (id: string) => AdminProduct | undefined;
  getLowStockProducts: () => AdminProduct[];
  getSalesAnalytics: () => {
    totalSales: number;
    totalOrders: number;
    averageOrderValue: number;
    topSellingProducts: Array<{ product: AdminProduct; soldQuantity: number }>;
  };

  loading: boolean;
  error: string | null;
}

// Helper functions for inventory management
export const calculateTotalQuantity = (product: AdminProduct): number => {
  // If using both size and color inventory, take the maximum since they're independent
  if (product.sizeInventory && Object.keys(product.sizeInventory).length > 0 && 
      product.colorInventory && Object.keys(product.colorInventory).length > 0) {
    const sizeTotal = Object.values(product.sizeInventory).reduce((sum, qty) => sum + qty, 0);
    const colorTotal = Object.values(product.colorInventory).reduce((sum, qty) => sum + qty, 0);
    return Math.max(sizeTotal, colorTotal); // Use max since they're separate inventories
  }
  
  // If using only size inventory, sum all sizes
  if (product.sizeInventory && Object.keys(product.sizeInventory).length > 0) {
    return Object.values(product.sizeInventory).reduce((sum, qty) => sum + qty, 0);
  }
  
  // If using only color inventory, sum all colors
  if (product.colorInventory && Object.keys(product.colorInventory).length > 0) {
    return Object.values(product.colorInventory).reduce((sum, qty) => sum + qty, 0);
  }
  
  // Fall back to simple quantity
  return product.quantity;
};

export const getVariantQuantity = (product: AdminProduct, size?: string, color?: string): number => {
  // For size-only requests
  if (size && !color && product.sizeInventory) {
    return product.sizeInventory[size] || 0;
  }
  
  // For color-only requests
  if (color && !size && product.colorInventory) {
    return product.colorInventory[color] || 0;
  }
  
  // For both size and color (check both independently - both must have stock)
  if (size && color) {
    const sizeQty = product.sizeInventory?.[size] || 0;
    const colorQty = product.colorInventory?.[color] || 0;
    
    // If we have both size and color inventories, both must have stock
    if (product.sizeInventory && Object.keys(product.sizeInventory).length > 0 && 
        product.colorInventory && Object.keys(product.colorInventory).length > 0) {
      return Math.min(sizeQty, colorQty); // Both must be available
    }
    
    // If only size inventory exists, return size quantity
    if (product.sizeInventory && Object.keys(product.sizeInventory).length > 0) {
      return sizeQty;
    }
    
    // If only color inventory exists, return color quantity
    if (product.colorInventory && Object.keys(product.colorInventory).length > 0) {
      return colorQty;
    }
  }
  
  // Fallback to total quantity for simple inventory
  return product.quantity;
};

export const isVariantAvailable = (product: AdminProduct, size?: string, color?: string): boolean => {
  return getVariantQuantity(product, size, color) > 0;
};

// Helper function to safely parse inventory JSON strings
const parseInventoryData = (data: any): ProductInventory | ProductVariantInventory => {
  if (typeof data === 'string') {
    try {
      return data ? JSON.parse(data) : {};
    } catch (error) {
      return {};
    }
  }
  return data || {};
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [coverImages, setCoverImages] = useState<CoverImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load cover images for public access (no authentication required)
  const loadPublicCoverImages = async () => {
    try {
      const coverRes = await databases.listDocuments(
        DATABASE_ID,
        COVER_IMAGES_COLLECTION_ID,
        [Query.orderDesc('createdAt')]
      );
      
      const mappedCoverImages = coverRes.documents.map((doc: any) => ({
        id: doc.$id,
        imageUrl: doc.imageUrl || '',
        category: doc.category || 'men',
        title: doc.title || '',
        description: doc.description || '',
        isActive: doc.isActive !== false,
        createdAt: new Date(doc.$createdAt || Date.now())
      }));
      
      setCoverImages(mappedCoverImages);
      setCoverImages(mappedCoverImages);
    } catch (error: any) {
      if (error.code === 404) {
        toast.error('Cover images collection not found. Please create it in Appwrite console.');
      } else if (error.code === 401) {
        toast.error('Permission denied for cover images collection.');
      }
      
      setCoverImages([]);
    }
  };

  // Load products for public access (no authentication required)
  const loadPublicProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const prodRes = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [Query.orderDesc('createdAt')]
      );
      
      const mappedProducts = prodRes.documents.map((doc: any) => {
        if (!doc.$id || !doc.title) return null;
        return {
          id: doc.$id,
          title: doc.title,
          category: doc.category || '',
          price: doc.price || 0,
          originalPrice: doc.originalPrice,
          description: doc.description || '',
          images: doc.images || [],
          sizes: doc.sizes || [],
          colors: doc.colors || [],
          quantity: doc.quantity || 0,
          sizeInventory: parseInventoryData(doc.sizeInventory),
          colorInventory: parseInventoryData(doc.colorInventory),
          variantInventory: parseInventoryData(doc.variantInventory),
          rating: doc.rating || 0,
          reviews: doc.reviews || 0,
          isActive: typeof doc.isActive === 'boolean' ? doc.isActive : true,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        };
      }).filter(Boolean) as AdminProduct[];
      
      setProducts(mappedProducts);
    } catch (err: any) {
      setError('Failed to load products: ' + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  // Load products, orders, and cover images on component mount (for public access)
  useEffect(() => {
    loadPublicProducts();
    loadPublicOrders();
    loadPublicCoverImages();
  }, []);

  // Load orders for public access (to support checkout)
  const loadPublicOrders = async () => {
    try {
      const orderRes = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [Query.orderDesc('createdAt')]
      );
      
      const mappedOrders = orderRes.documents.map((doc: any) => ({
        id: doc.$id,
        customerName: doc.customerName,
        customerEmail: doc.customerEmail,
        customerPhone: doc.customerPhone,
        customerAddress: doc.customerAddress,
        items: typeof doc.items === 'string' ? JSON.parse(doc.items) : (doc.items || []),
        total: doc.total || 0,
        status: doc.status || 'pending',
        paymentMethod: doc.paymentMethod || 'Cash on Delivery',
        createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
      }));
      
      setOrders(mappedOrders);
    } catch (err: any) {
      // Silently handle order loading errors for public access
    }
  };

  // Session monitoring
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        // Session is valid, keep authenticated if already logged in
        if (isAuthenticated) {
          return;
        }
      } catch (error) {
        // Session expired or invalid, log out
        if (isAuthenticated) {
          setIsAuthenticated(false);
          toast.error('Session expired. Please login again.');
        }
      }
    };

    // Check session every 5 minutes
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    
    // Also check on first load
    checkSession();

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Helper to reload products/orders after login
  const reloadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const prodRes = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [Query.orderDesc('createdAt')]
      );
      const mappedProducts = prodRes.documents.map((doc: any) => {
        if (!doc.$id || !doc.title) return null;
        return {
          id: doc.$id,
          title: doc.title,
          category: doc.category || '',
          price: doc.price || 0,
          originalPrice: doc.originalPrice,
          description: doc.description || '',
          images: doc.images || [],
          sizes: doc.sizes || [],
          colors: doc.colors || [],
          quantity: doc.quantity || 0,
          sizeInventory: parseInventoryData(doc.sizeInventory),
          colorInventory: parseInventoryData(doc.colorInventory),
          variantInventory: parseInventoryData(doc.variantInventory),
          rating: doc.rating || 0,
          reviews: doc.reviews || 0,
          isActive: typeof doc.isActive === 'boolean' ? doc.isActive : true,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        };
      }).filter(Boolean) as AdminProduct[];
      setProducts(mappedProducts);
      const orderRes = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [Query.orderDesc('createdAt')]
      );
      setOrders(orderRes.documents.map((doc: any) => ({
        id: doc.$id,
        customerName: doc.customerName,
        customerEmail: doc.customerEmail,
        customerPhone: doc.customerPhone,
        customerAddress: doc.customerAddress,
        items: typeof doc.items === 'string' ? JSON.parse(doc.items) : (doc.items || []),
        total: doc.total || 0,
        status: doc.status || 'pending',
        paymentMethod: doc.paymentMethod || 'Cash on Delivery',
        createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
      })));
    } catch (err: any) {
      setError('Failed to load data from backend: ' + (err.message || err.toString()));
      toast.error('Failed to load data from backend');
    } finally {
      setLoading(false);
    }
  };

  // Admin login (no auth, just set state)
  const login = (password?: string, isAppwrite?: boolean): boolean => {
    setIsAuthenticated(true);
    // Reload both admin data and public products/orders
    reloadData();
    loadPublicProducts();
    loadPublicOrders();
    return true;
  };
  
  const logout = async () => {
    try {
      // Clear Appwrite session
      await account.deleteSession('current');
    } catch (error) {
      // Session might already be deleted
    }
    setIsAuthenticated(false);
    setProducts([]);
    setOrders([]);
    toast.success('Logged out successfully');
  };

  // Upload images to Appwrite Storage
  const uploadImages = async (files: File[]): Promise<{ fileId: string; url: string }[]> => {
    const uploaded: { fileId: string; url: string }[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        // Check if file is valid
        if (!file || file.size === 0) {
          continue;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 10MB)`);
          continue;
        }
        
        const fileId = ID.unique();
        
        const res = await storage.createFile(BUCKET_ID, fileId, file);
        
        const url = storage.getFileView(BUCKET_ID, res.$id).toString();
        uploaded.push({ fileId: res.$id, url });
      } catch (err: any) {
        toast.error('Image upload failed for ' + file.name + ': ' + (err.message || err.toString()));
      }
    }
    
    return uploaded;
  };

  // Add product to Appwrite
  const addProduct = async (productData: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'> & { imageFiles?: File[] }) => {
    try {
      // Check if user is authenticated
      try {
        const session = await account.get();
      } catch (authErr) {
        toast.error('Please login to add products');
        return;
      }
      
      let images = productData.images || [];
      
      if (productData.imageFiles && productData.imageFiles.length > 0) {
        images = await uploadImages(productData.imageFiles);
      }

      // Convert images to array of URLs for Appwrite
      const imageUrls = images.map(img => typeof img === 'string' ? img : img.url);

      // Prepare the document data
      const documentData = {
        title: productData.title,
        category: productData.category,
        price: productData.price,
        originalPrice: productData.originalPrice || null,
        description: productData.description,
        images: imageUrls,
        sizes: productData.sizes,
        colors: productData.colors,
        quantity: productData.quantity,
        sizeInventory: JSON.stringify(productData.sizeInventory || {}),
        colorInventory: JSON.stringify(productData.colorInventory || {}),
        variantInventory: JSON.stringify(productData.variantInventory || {}),
        rating: productData.rating,
        reviews: productData.reviews,
        isActive: productData.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const doc = await databases.createDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        ID.unique(),
        documentData
      );

      if (doc && doc.$id) {
        const newProduct: AdminProduct = {
          id: doc.$id,
          title: doc.title,
          category: doc.category,
          price: doc.price,
          originalPrice: doc.originalPrice,
          description: doc.description,
          images: doc.images.map(img => ({ fileId: img.fileId, url: img.url })),
          sizes: doc.sizes,
          colors: doc.colors,
          quantity: doc.quantity,
          sizeInventory: parseInventoryData(doc.sizeInventory),
          colorInventory: parseInventoryData(doc.colorInventory),
          variantInventory: parseInventoryData(doc.variantInventory),
          rating: doc.rating,
          reviews: doc.reviews,
          isActive: doc.isActive,
          createdAt: new Date(doc.createdAt),
          updatedAt: new Date(doc.updatedAt)
        };
        
        setProducts(prev => [newProduct, ...prev]);
        // Refresh the products list to ensure public pages see the new product
        loadPublicProducts();
        toast.success('Product added successfully!');
      }
    } catch (err: any) {
      toast.error('Failed to add product: ' + (err.message || err.toString()));
    }
  };

  // Update product in Appwrite
  const updateProduct = async (id: string, updates: Partial<AdminProduct> & { imageFiles?: File[] }) => {
    try {
      // Find the existing product to preserve its images if no new images are provided
      const existingProduct = products.find(p => p.id === id);
      
      let images = existingProduct?.images || []; // Start with existing images
      
      // Only update images if new image files are provided
      if (updates.imageFiles && updates.imageFiles.length > 0) {
        images = await uploadImages(updates.imageFiles);
      } else if (updates.images && updates.images.length > 0) {
        // If images array is explicitly provided (e.g., from form state), use it
        images = updates.images;
      }
      
      // Remove imageFiles from the update object before sending to database
      const { imageFiles, ...updateData } = updates;
      
      // Prepare update data with proper JSON stringification for inventory fields
      const finalUpdateData: any = { ...updateData };
      if (finalUpdateData.sizeInventory) {
        finalUpdateData.sizeInventory = JSON.stringify(finalUpdateData.sizeInventory);
      }
      if (finalUpdateData.colorInventory) {
        finalUpdateData.colorInventory = JSON.stringify(finalUpdateData.colorInventory);
      }
      if (finalUpdateData.variantInventory) {
        finalUpdateData.variantInventory = JSON.stringify(finalUpdateData.variantInventory);
      }

      const doc = await databases.updateDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        id,
        {
          ...finalUpdateData,
          images,
          updatedAt: new Date().toISOString(),
        }
      );
      if (doc && doc.$id && doc.title) {
        setProducts(prev => prev.map(p => p.id === id ? {
          id: doc.$id,
          title: doc.title,
          category: doc.category,
          price: doc.price,
          originalPrice: doc.originalPrice,
          description: doc.description,
          images: doc.images.map(img => ({ fileId: img.fileId, url: img.url })),
          sizes: doc.sizes,
          colors: doc.colors,
          quantity: doc.quantity,
          sizeInventory: parseInventoryData(doc.sizeInventory),
          colorInventory: parseInventoryData(doc.colorInventory),
          variantInventory: parseInventoryData(doc.variantInventory),
          rating: doc.rating,
          reviews: doc.reviews,
          isActive: doc.isActive,
          createdAt: new Date(doc.createdAt),
          updatedAt: new Date(doc.updatedAt)
        } : p));
      }

      toast.success('Product updated!');
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  // Delete product from Appwrite
  const deleteProduct = async (id: string) => {
    try {
      const product = products.find(p => p.id === id);
      if (product && product.images) {
        for (const img of product.images) {
          if (img.fileId) {
            try {
              await storage.deleteFile(BUCKET_ID, img.fileId);
            } catch (e) {
              // Silently handle storage deletion errors
            }
          }
        }
      }
      await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted!');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  // Restock product
  const restockProduct = async (id: string, quantity: number) => {
    try {
      const product = products.find(p => p.id === id);
      if (!product) {
        toast.error('Product not found');
        return;
      }
      
      const newQuantity = product.quantity + quantity;
      
      // Update in database
      await databases.updateDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        id,
        { quantity: newQuantity }
      );
      
      // Update local state
      setProducts(prev => prev.map(p => 
        p.id === id 
          ? { ...p, quantity: newQuantity }
          : p
      ));
      
      toast.success(`Restocked ${product.title}! Added ${quantity} items. New stock: ${newQuantity}`);
    } catch (err: any) {
      toast.error('Failed to restock product');
    }
  };

  // Update product quantities when orders are placed
  const updateProductQuantities = async (orderItems: Array<{
    productId: string;
    productTitle: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }>) => {
    try {
      for (const item of orderItems) {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          
          // Create copies of current inventories
          const newSizeInventory = { ...(product.sizeInventory || {}) };
          const newColorInventory = { ...(product.colorInventory || {}) };
          
          // Update size inventory if size is specified and size inventory exists
          if (item.size && newSizeInventory && Object.keys(newSizeInventory).length > 0) {
            const currentSizeQty = newSizeInventory[item.size] || 0;
            newSizeInventory[item.size] = Math.max(0, currentSizeQty - item.quantity);
          }
          
          // Update color inventory if color is specified and color inventory exists
          if (item.color && newColorInventory && Object.keys(newColorInventory).length > 0) {
            const currentColorQty = newColorInventory[item.color] || 0;
            newColorInventory[item.color] = Math.max(0, currentColorQty - item.quantity);
          }
          
          // Calculate new total quantity based on updated inventories
          const updatedProduct = {
            ...product,
            sizeInventory: newSizeInventory,
            colorInventory: newColorInventory
          };
          const newTotalQuantity = calculateTotalQuantity(updatedProduct);
          
          // Prepare database update
          const updateData: any = {
            quantity: newTotalQuantity,
          };
          
          // Add inventory data to update if they exist
          if (Object.keys(newSizeInventory).length > 0) {
            updateData.sizeInventory = JSON.stringify(newSizeInventory);
          }
          if (Object.keys(newColorInventory).length > 0) {
            updateData.colorInventory = JSON.stringify(newColorInventory);
          }
          
          // Update in database
          await databases.updateDocument(
            DATABASE_ID,
            PRODUCTS_COLLECTION_ID,
            item.productId,
            updateData
          );
          
          // Update local state
          setProducts(prev => prev.map(p => 
            p.id === item.productId 
              ? { 
                  ...p, 
                  quantity: newTotalQuantity,
                  sizeInventory: newSizeInventory,
                  colorInventory: newColorInventory
                }
              : p
          ));
          
        } else {
          // Product not found - skip silently
        }
      }
      
      // Refresh products to ensure consistency
      loadPublicProducts();
    } catch (err: any) {
      toast.error('Failed to update product stock');
    }
  };

  // Add order to Appwrite
  const addOrder = async (order: AdminOrder) => {
    try {
      // Check authentication status
      try {
        const session = await account.get();
      } catch (authErr) {
        // Proceed without authentication for public orders
      }
      
      const documentData = {
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        items: JSON.stringify(order.items), // Ensure items are properly serialized
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: new Date().toISOString(),
      };
      
      const doc = await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        documentData
      );
      if (doc && doc.$id && doc.customerName) {
        const newOrder = {
          id: doc.$id,
          customerName: doc.customerName,
          customerEmail: doc.customerEmail,
          customerPhone: doc.customerPhone,
          customerAddress: doc.customerAddress,
          items: typeof doc.items === 'string' ? JSON.parse(doc.items) : doc.items,
          total: doc.total,
          status: doc.status,
          paymentMethod: doc.paymentMethod,
          createdAt: new Date(doc.createdAt)
        };
        
        setOrders(prev => [newOrder, ...prev]);
        
        // Update product quantities based on order items
        await updateProductQuantities(order.items);
        
        // Refresh orders list to ensure consistency
        loadPublicOrders();
      }
      toast.success('Order placed!');
    } catch (err: any) {
      toast.error('Failed to place order: ' + (err.message || err.toString()));
    }
  };

  // Update order status in Appwrite
  const updateOrderStatus = async (orderId: string, status: AdminOrder['status']) => {
    try {
      const doc = await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId,
        { status }
      );
      
      if (doc && doc.$id) {
        setOrders(prev => prev.map(o => o.id === orderId ? {
          id: doc.$id,
          customerName: doc.customerName,
          customerEmail: doc.customerEmail,
          customerPhone: doc.customerPhone,
          customerAddress: doc.customerAddress,
          items: typeof doc.items === 'string' ? JSON.parse(doc.items) : (doc.items || []),
          total: doc.total,
          status: doc.status,
          paymentMethod: doc.paymentMethod,
          createdAt: new Date(doc.createdAt)
        } : o));
        
        toast.success(`Order status updated to ${status}!`);
      }
    } catch (err: any) {
      toast.error('Failed to update order status: ' + (err.message || err.toString()));
    }
  };

  const getProductById = (id: string) => products.find(product => product.id === id);
  const getLowStockProducts = () => products.filter(product => product.quantity <= 10);
  






  // Cover Image Management Methods
  const addCoverImage = async (coverImageData: Omit<CoverImage, 'id' | 'createdAt'> & { imageFile: File }) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }

    try {
      // Upload image
      const imageObjs = await uploadImages([coverImageData.imageFile]);
      if (imageObjs.length === 0) throw new Error('Failed to upload cover image');

      // Create cover image document
      const docData = {
        imageUrl: typeof imageObjs[0] === 'string' ? imageObjs[0] : imageObjs[0].url,
        category: coverImageData.category,
        title: coverImageData.title || '',
        description: coverImageData.description || '',
        isActive: coverImageData.isActive,
        createdAt: new Date().toISOString(),
      };

      const res = await databases.createDocument(
        DATABASE_ID,
        COVER_IMAGES_COLLECTION_ID,
        ID.unique(),
        docData
      );

      const newCoverImage: CoverImage = {
        id: res.$id,
        imageUrl: typeof imageObjs[0] === 'string' ? imageObjs[0] : imageObjs[0].url,
        category: coverImageData.category,
        title: coverImageData.title || '',
        description: coverImageData.description || '',
        isActive: coverImageData.isActive,
        createdAt: new Date(res.$createdAt),
      };

      setCoverImages(prev => [newCoverImage, ...prev]);
      toast.success('Cover image added successfully!');
      
      // Reload cover images after adding
      loadPublicCoverImages();
    } catch (error: any) {
      if (error.code === 404) {
        toast.error('Cover images collection not found. Please create it in Appwrite console first.');
      } else {
        toast.error('Failed to add cover image: ' + (error.message || error.toString()));
      }
    }
  };

  const updateCoverImage = async (id: string, updates: Partial<CoverImage>) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }

    try {
      const updateData: any = {};
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.category !== undefined) updateData.category = updates.category;
      if (updates.isActive !== undefined) updateData.isActive = updates.isActive;

      await databases.updateDocument(
        DATABASE_ID,
        COVER_IMAGES_COLLECTION_ID,
        id,
        updateData
      );

      setCoverImages(prev => prev.map(img => 
        img.id === id ? { ...img, ...updates } : img
      ));
      
      toast.success('Cover image updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update cover image: ' + (error.message || error.toString()));
    }
  };

  const deleteCoverImage = async (id: string) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }

    try {
      const coverImage = coverImages.find(img => img.id === id);
      if (coverImage && coverImage.imageUrl && coverImage.imageUrl.fileId) {
        try {
          await storage.deleteFile(BUCKET_ID, coverImage.imageUrl.fileId);
        } catch (e) {
          // Silently handle storage deletion errors
        }
      }
      await databases.deleteDocument(DATABASE_ID, COVER_IMAGES_COLLECTION_ID, id);
      setCoverImages(prev => prev.filter(img => img.id !== id));
      toast.success('Cover image deleted successfully!');
    } catch (error: any) {
      toast.error('Failed to delete cover image: ' + (error.message || error.toString()));
    }
  };

  const getSalesAnalytics = () => {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    const productSales = new Map<string, number>();
    orders.forEach(order => {
      // Ensure items is an array, parse if it's a string
      const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
      if (Array.isArray(items)) {
        items.forEach(item => {
          const current = productSales.get(item.productId) || 0;
          productSales.set(item.productId, current + item.quantity);
        });
      }
    });
    const topSellingProducts = Array.from(productSales.entries())
      .map(([productId, soldQuantity]) => {
        const product = getProductById(productId);
        return product ? { product, soldQuantity } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b!.soldQuantity - a!.soldQuantity)
      .slice(0, 5) as Array<{ product: AdminProduct; soldQuantity: number }>; 
    return {
      totalSales,
      totalOrders,
      averageOrderValue,
      topSellingProducts,
    };
  };

      return (
      <AdminContext.Provider value={{
        isAuthenticated,
        login,
        logout,
        products,
        orders,
        coverImages,
        addProduct,
        updateProduct,
        deleteProduct,
        restockProduct,
        addCoverImage,
        updateCoverImage,
        deleteCoverImage,
        addOrder,
        updateOrderStatus,
        getProductById,
        getLowStockProducts,
        getSalesAnalytics,
        loading,
        error,
    }}>
      {children}
    </AdminContext.Provider>
  );
}; 