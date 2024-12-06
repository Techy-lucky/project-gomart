import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ulogimg from "../../images/img/img__5_-removebg-preview.png"
import '../../css files/Ulogin.css'
import axios from '../../api/axios';

const Ulogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const { email, password } = formData;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!email || !password) {
            toast.error("All fields are mandatory");
            return false;
        }

        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!passwordPattern.test(password)) {
            toast.error("Password must be at least 6 characters long, contain at least one letter, one number, and one special character (@$!%*?&).");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                console.log('Sending login data:', formData); // Debug log

                const response = await axios.post('/login', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Login response:', response.data); // Debug log

                if (response.data.success) {
                    localStorage.setItem('token', response.data.token);
                    toast.success("Login successful!");
                    setTimeout(() => {
                        navigate('/homepage');
                    }, 1000);
                } else {
                    toast.error(response.data.message || "Login failed");
                }
            } catch (error) {
                console.error('Login error:', error.response || error);
                const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
                toast.error(errorMessage);
            }
        }
    };

    const handleReset = () => {
        setFormData({
            email: '',
            password: ''
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative login-container">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 font-outfit flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50/10 bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
                <i className="fas fa-arrow-left"></i>
                Back
            </button>
            <div className="max-w-5xl w-full mx-auto p-4 login-wrapper">
                <div className="p-6 rounded-3xl backdrop-blur-md bg-white/10 login-card">
                    <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden backdrop-blur-md login-content">
                        {/* Image Section */}
                        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-blue-600/80 to-indigo-600/80 login-image-section">
                            <div className="relative h-full flex flex-col items-center justify-center p-8 login-image-content">
                                <img 
                                    src={ulogimg} 
                                    alt="Login" 
                                    className="max-w-xs w-full h-auto transform hover:scale-105 transition-transform duration-300 login-image" 
                                />
                                <div className="mt-6 text-center">
                                    <h3 className="text-xl font-bold text-white font-outfit">Welcome to Gomart</h3>
                                    <p className="mt-2 text-blue-100 font-outfit">Your one-stop shopping destination</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="flex-1 p-6 bg-white/10">
                            <div className="max-w-md mx-auto">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-900 font-outfit">Welcome Back</h2>
                                    <p className="mt-2 text-gray-600 font-outfit">Please log in to your account</p>
                                </div>
                                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 font-outfit">
                                            <i className="fas fa-envelope mr-2"></i>Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white/50 backdrop-blur-sm"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 font-outfit">
                                            <i className="fas fa-lock mr-2"></i>Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white/50 backdrop-blur-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-outfit"
                                        >
                                            <i className="fas fa-sign-in-alt mr-2"></i>Sign in
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 font-outfit"
                                        >
                                            <i className="fas fa-redo mr-2"></i>Clear
                                        </button>
                                    </div>

                                    <div className="text-center text-sm">
                                        <p className="text-gray-600 font-outfit">
                                            Don't have an account?{' '}
                                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                                                Register here
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <link 
                rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" 
                integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" 
                crossOrigin="anonymous" 
                referrerPolicy="no-referrer" 
            />
        </div>
    );
};

export default Ulogin;
