import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        contact: '',
        profilePicture: '',
        isGoogleUser: false
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Please login first');
                    navigate('/');
                    return;
                }

                const response = await axios.get('/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log('Profile data:', response.data);

                if (response.data) {
                    setUserData({
                        fullName: response.data.fullName,
                        email: response.data.email,
                        contact: response.data.contact || 'N/A',
                        profilePicture: response.data.profilePicture,
                        isGoogleUser: !!response.data.googleId
                    });
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    toast.error('Session expired. Please login again');
                    navigate('/login');
                } else {
                    toast.error('Failed to load profile');
                }
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    // if (loading) {
    //     return <div className="flex items-center justify-center min-h-screen">
    //         <div className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    //     </div>;
    // }

    return (
        <div className="min-h-screen p-6">
            <div className="w-full max-w-3xl mx-auto"> {/* Adjusted max width for a smaller profile card */}
                {/* Main Profile Card */}
                <div className="bg-white/20 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                {userData.profilePicture ? (
                                    <img 
                                        src={userData.profilePicture} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-blue-600">
                                            {userData.fullName?.charAt(0).toUpperCase() || '?'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">{userData.fullName}</h1>
                                <p className="text-gray-600 flex items-center justify-center">
                                    <i className="fas fa-envelope mr-2"></i>
                                    <span className="text-sm">{userData.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 space-y-4">
                        {/* Contact Information */}
                        <div className="bg-gray-100 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                <i className="fas fa-address-card mr-2 text-blue-400"></i>
                                Contact Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-700 text-sm">Phone Number</label>
                                    <p className="text-gray-800 text-lg">{userData.contact}</p>
                                </div>
                                <div>
                                    <label className="text-gray-700 text-sm">Email Address</label>
                                    <p className="text-gray-800 text-lg">{userData.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Account Status */}
                        <div className="bg-gray-100 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                <i className="fas fa-shield-alt mr-2 text-green-400"></i>
                                Account Status
                            </h3>
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg flex items-center">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    Active Account
                                </span>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg flex items-center">
                                    <i className="fas fa-user-shield mr-1"></i>
                                    Verified User
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 justify-center pt-2">
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
                                <i className="fas fa-edit mr-1"></i>
                                Edit Profile
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
                                <i className="fas fa-key mr-1"></i>
                                Change Password
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
                                <i className="fas fa-history mr-1"></i>
                                Order History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
