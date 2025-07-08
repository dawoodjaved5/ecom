import React from 'react';
import AdminLayout from './AdminLayout';
import CoverImageManager from '@/components/admin/CoverImageManager';
import { useAdmin } from '@/contexts/AdminContext';

const CoverImagesManagement = () => {
  const { isAuthenticated } = useAdmin();

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