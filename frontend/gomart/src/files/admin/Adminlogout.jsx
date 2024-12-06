import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/admin/logout');
      if (response.data.success) {
        toast.success('Logged out successfully');
        setTimeout(() => {
          navigate('/adminlogin');
        }, 1000);
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-auto text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-3 rounded-lg text-sm font-medium flex items-center transition-colors duration-200"
    >
      <i className="fas fa-sign-out-alt mr-3"></i>
      <span>Logout</span>
    </button>
  );
}

export default AdminLogout;
