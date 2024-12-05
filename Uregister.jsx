import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../../images/img/img__17_-removebg-preview.png';
import '../../css files/Uregister.css';
import axios from '../../api/axios';

const Uregister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        contact: '',
        email: '',
        password: ''
    });

    // Memoize validation patterns
    const patterns = useMemo(() => ({
        namePattern: /^[a-zA-Z\s]+$/,
        contactPattern: /^\d{10}$/,
        emailPattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        passwordPattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    }), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { fullName, contact, email, password } = formData;

        if (!fullName || !contact || !email || !password) {
            toast.error("All fields are mandatory");
            return false;
        }

        if (!patterns.namePattern.test(fullName)) {
            toast.error("Full Name must contain only letters");
            return false;
        }

        if (!patterns.contactPattern.test(contact)) {
            toast.error("Contact Number must be a valid 10-digit number");
            return false;
        }

        if (!patterns.emailPattern.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!patterns.passwordPattern.test(password)) {
            toast.error("Password must be at least 6 characters long, contain at least one letter, one number, and one special character (@$!%*?&).");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Log the data being sent
                console.log('Sending registration data:', formData);

                const response = await axios.post('http://localhost:5000/register', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Log the response
                console.log('Server response:', response.data);

                if (response.data.success) {
                    localStorage.setItem('token', response.data.token);
                    toast.success("Registration successful!");
                    setTimeout(() => {
                        navigate('/homepage');
                    }, 2000);
                }
            } catch (error) {
                console.error('Registration error:', error.response || error);
                
                // Show more specific error message
                const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
                toast.error(errorMessage);
            }
        }
    };

    const handleReset = () => {
        setFormData({
            fullName: '',
            contact: '',
            email: '',
            password: ''
        });
    };

    // Memoize static content
    const formInputs = useMemo(() => [
        {
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            icon: 'user',
            placeholder: 'John Doe'
        },
        {
            name: 'contact',
            type: 'text',
            label: 'Contact Number',
            icon: 'phone',
            placeholder: '1234567890'
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email Address',
            icon: 'envelope',
            placeholder: 'you@example.com'
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password',
            icon: 'lock',
            placeholder: '••••••••'
        }
    ], []);

    const renderFormInputs = useMemo(() => (
        <div className="form-grid grid grid-cols-2 gap-4">
            {formInputs.map((input, index) => (
                <div key={input.name} className="form-group">
                    <label className="form-label text-sm font-medium text-gray-700 font-outfit">
                        <i className={`fas fa-${input.icon} mr-2`}></i>{input.label}
                    </label>
                    <input
                        type={input.type}
                        name={input.name}
                        value={formData[input.name]}
                        onChange={handleChange}
                        className="form-input w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white/30 transition-all duration-300"
                        placeholder={input.placeholder}
                    />
                </div>
            ))}
        </div>
    ), [formInputs, formData, handleChange]);

    return (
        <div className="register-container min-h-screen flex items-center justify-center">
            <button
                onClick={() => navigate(-1)}
                className="back-button absolute top-4 left-4 text-gray-600 hover:text-gray-900 font-outfit flex items-center px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50/10 bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
                <i className="fas fa-arrow-left mr-2"></i>
                Back
            </button>
            <div className="register-wrapper max-w-5xl w-full mx-auto p-4 backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl animate-slide-in">
                <div className="register-content flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden backdrop-blur-md bg-white/10">
                    <div className="image-section flex-1 relative overflow-hidden bg-gradient-to-br from-purple-600/80 to-pink-600/80 animate-fade-in">
                        <div className="image-content relative h-full flex flex-col items-center justify-center p-8">
                            <img 
                                src={img1} 
                                alt="Register" 
                                className="register-image max-w-[300px] w-full h-auto transform hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="image-text mt-6 text-center">
                                <h3 className="image-title text-xl font-bold text-white font-outfit">Join Gomart Today</h3>
                                <p className="image-subtitle mt-2 text-blue-100 font-outfit">Start your shopping journey with us</p>
                            </div>
                        </div>
                    </div>

                    <div className="form-section flex-1 p-6 animate-slide-in-right">
                        <div className="form-container max-w-md mx-auto">
                            <div className="form-header text-center">
                                <h2 className="form-title text-2xl font-bold text-gray-900 font-outfit">Create Account</h2>
                                <p className="form-subtitle mt-2 text-gray-600 font-outfit">Please fill in your details</p>
                            </div>
                            <form className="registration-form mt-6 space-y-4" onSubmit={handleSubmit}>
                                {renderFormInputs}

                                <div className="button-group flex gap-4">
                                    <button
                                        type="submit"
                                        className="submit-button flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-outfit transition-all duration-300"
                                    >
                                        <i className="fas fa-user-plus mr-2"></i>Register
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="reset-button flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-outfit transition-all duration-300"
                                    >
                                        <i className="fas fa-redo mr-2"></i>Clear
                                    </button>
                                </div>

                                <div className="login-link text-center text-sm">
                                    <p className="text-gray-600 font-outfit">
                                        Already have an account?{' '}
                                        <Link to="/login" className="login-redirect text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300">
                                            Login here
                                        </Link>
                                    </p>
                                </div>

                                <div className="divider relative my-4">
                                    <div className="divider-line absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300/50"></div>
                                    </div>
                                    <div className="divider-text relative flex justify-center font-outfit rounded-lg text-sm">
                                        <span className="px-2 bg-white/30 text-gray-600">Or</span>
                                    </div>
                                </div>

                                <button type="button"
                                    className="google-signup w-full flex items-center justify-center gap-2 bg-white/30 text-gray-800 py-2 rounded-lg hover:bg-white/40 border border-gray-200 transition-all duration-300">
                                    <svg className="google-icon w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Sign up with Google
                                </button>
                            </form>
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

export default Uregister;
