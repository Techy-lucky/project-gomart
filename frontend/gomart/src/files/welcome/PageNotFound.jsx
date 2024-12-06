import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/homepage');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 backdrop-blur-md bg-white/10 p-12 rounded-xl shadow-lg">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 max-w-md">
          Oops! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <button
          onClick={handleHomeClick}
          className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  )
}

export default PageNotFound