const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const Admin = require('./models/admin');
const GoogleUser = require('./models/googleUser');

const app = express();

// Middleware
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = 'your_secret_key';

// MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/gomart', {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
// })

mongoose.connect('mongodb+srv://lakshitverma98:password_apl@cluster0.sfw9d.mongodb.net/gomart', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

.then(() => {
    console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
    console.log('MongoDB connection error:', error);
    process.exit(1);
});

// Test route to verify server is working
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Register endpoint with detailed logging
app.post('/register', async (req, res) => {
    console.log('Received registration request with body:', req.body);
    
    try {
        const { fullName, contact, email, password } = req.body;

        // Log the received data
        console.log('Processing registration for:', { fullName, email, contact });

        // Check if all required fields are present
        if (!fullName || !contact || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists with email:', email);
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Create new user
        const newUser = new User({
            fullName,
            contact,
            email,
            password: hashedPassword
        });

        // Save user to database
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser._id);

        // Generate JWT token
        const token = jwt.sign(
            { userId: savedUser._id },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Send success response
        return res.status(201).json({
            success: true,
            token,
            message: 'Registration successful'
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map(err => err.message).join(', ')
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        // Handle other errors
        return res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
});

// Middleware to verify token
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

// Profile endpoint
app.get('/profile', verifyToken, async (req, res) => {
    try {
        // Try to find user in both collections
        let user = await User.findById(req.userId).select('-password') || 
                  await GoogleUser.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile data'
        });
    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password with hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '24h' });

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({
            success: true,
            token,
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.'
        });
    }
});

// Admin Registration
app.post('/admin/register', async (req, res) => {
    try {
        const { adminId, fname, lname, email, phone, password, secretKey } = req.body;

        // Verify secret key
        if (secretKey !== "APL@admin#123") {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin secret key'
            });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [{ adminId }, { email }]
        });
        
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin ID or Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            adminId,
            fname,
            lname,
            email,
            phone,
            password: hashedPassword
        });

        await newAdmin.save();

        // Generate token
        const token = jwt.sign(
            { adminId: newAdmin._id },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Set token in HTTP-only cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(201).json({
            success: true,
            message: 'Admin registered successfully'
        });

    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
});

// Admin Login
app.post('/admin/login', async (req, res) => {
    try {
        const { adminId, password, secretKey } = req.body;

        // Verify secret key
        if (secretKey !== "APL@admin#123") {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin secret key'
            });
        }

        // Find admin
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = jwt.sign(
            { adminId: admin._id },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Set token in HTTP-only cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({
            success: true,
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});

// Admin Logout
app.post('/admin/logout', (req, res) => {
    try {
        res.cookie('adminToken', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
});

// Middleware to verify admin token
const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

// Protected admin route example
app.get('/admin/profile', verifyAdminToken, async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password');
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch admin profile'
        });
    }
});

// Add this new endpoint
app.post('/auth/google', async (req, res) => {
    try {
        const { googleId, fullName, email, profilePicture } = req.body;
        console.log('Received Google user data:', { googleId, fullName, email });

        // Check if user exists
        let user = await GoogleUser.findOne({ googleId });

        if (!user) {
            // Create new user if doesn't exist
            user = new GoogleUser({
                googleId,
                fullName,
                email,
                profilePicture
            });
            await user.save();
            console.log('New Google user created:', user._id);
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, isGoogleUser: true },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            message: 'Google authentication successful'
        });

    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
