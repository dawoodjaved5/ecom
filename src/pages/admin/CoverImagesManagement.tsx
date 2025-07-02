import React from 'react';
import AdminLayout from './AdminLayout';
import CoverImageManager from '@/components/admin/CoverImageManager';
import { useAdmin } from '@/contexts/AdminContext';

const CoverImagesManagement = () => {
  const { isAuthenticated } = useAdmin();
  
  console.log('CoverImagesManagement Debug:', {
    isAuthenticated,
    timestamp: new Date().toISOString()
  });

  // Debug: Show if we're even reaching this component
  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Not Authenticated</h1>
        <p>You need to login to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="bg-green-100 border border-green-400 rounded p-4 mb-4">
        <h2 className="text-green-800 font-bold">✅ Component Loaded Successfully</h2>
        <p className="text-green-700">This confirms the routing and authentication are working.</p>
        <p className="text-sm text-green-600">Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cover Images Management</h1>
        <p className="text-gray-600 mt-2">
          Manage cover images that appear on the homepage carousel. These images will auto-scroll and redirect users to category pages when clicked.
        </p>
      </div>
      
      <CoverImageManager />
    </div>
  );
};

export default CoverImagesManagement; 