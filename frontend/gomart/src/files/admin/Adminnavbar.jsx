import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AdminLogout from './Adminlogout'
import logoutimg from '../../images/icon/logout-01-stroke-rounded.svg';
import dashimg from '../../images/icon/dashboard-circle-stroke-rounded.svg';

function Adminnavbar() {
  const location = useLocation();
  const isDashboard = location.pathname === '/admindashboard';

  return (
    <nav className="fixed left-0 top-0 h-[calc(100vh-2rem)] fixed w-64 bg-white/20 rounded-3xl m-4 backdrop-blur-md border-r border-gray-200/40 shadow-lg font-outfit">
      <div className="flex flex-col h-full p-4">
        <div className="flex flex-col space-y-2">
          <Link 
            to="/admindashboard" 
            className={`text-gray-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200 hover:no-underline ${
              isDashboard ? 'bg-gray-100/50 text-gray-900' : 'hover:text-gray-900 hover:bg-gray-100/50'
            }`}
          >
            <img src={dashimg} alt="Dashboard" className="w-5 h-5 mr-3" />
            <span className="font-bold">Dashboard</span>
          </Link>
        </div>
        <div className="mt-auto flex items-center justify-center">
            <span className="font-bold"><AdminLogout /></span>
        </div>
      </div>
    </nav>
  )
}

export default Adminnavbar
