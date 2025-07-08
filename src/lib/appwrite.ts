// IMPORTANT: All sensitive Appwrite credentials are now loaded from environment variables.
// Make sure to set these in your .env file and in your Vercel project settings.
import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client()
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
.setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const PRODUCTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;
export const ORDERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID;
export const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
export const COVER_IMAGES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COVER_IMAGES_COLLECTION_ID;
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
export const API_KEY = import.meta.env.VITE_APPWRITE_API_KEY;