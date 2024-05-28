require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Require models
const User = require('../models/User');
const Destination = require('../models/Destination');
const Service = require('../models/Service');
const Review = require('../models/Review');
const Contact = require('../models/Contact');

// Middleware to authenticate JWT
const authenticateToken = require('../middleware/authenticateToken');
const adminCheck = require('../middleware/adminCheck');

// Initialize Express app
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ITEMS_PER_PAGE = 6;
const JWT_SECRET = process.env.JWT_SECRET;

// Routes
router.get('/', (req, res) => {
    res.render('landingpage', { title: 'Home', user: req.user });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/dashboard', authenticateToken, async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    const user = await User.findById(req.user.id);
    res.render('dashboard', { user });
});

router.get('/api/admin', authenticateToken, adminCheck, (req, res) => {
    res.render('admin-dashboard', { user: req.user });
});

router.get('/destinations', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const totalDestinations = await Destination.countDocuments();
        const totalPages = Math.ceil(totalDestinations / ITEMS_PER_PAGE);
        const destinations = await Destination.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.render('destinations', { 
            title: 'Destinations', 
            destinations, 
            currentPage: page, 
            totalPages,
            user: req.user
        });
    } catch (error) {
        res.status(500).send('Error fetching destinations');
    }
});

router.get('/services', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const totalServices = await Service.countDocuments();
        const totalPages = Math.ceil(totalServices / ITEMS_PER_PAGE);
        const services = await Service.find()
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.render('services', { 
            title: 'Services', 
            services, 
            currentPage: page, 
            totalPages,
            user: req.user
        });
    } catch (error) {
        res.status(500).send('Error fetching services');
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user');
        res.render('reviews', { title: 'Customer Reviews', reviews, user: req.user });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Error fetching reviews');
    }
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', user: req.user });
});

router.get('/ajax', (req, res) => {
    res.render('ajax', { title: 'LabTask 2', user: req.user });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'LabTask 2' });
});

router.get('/register', (req, res) => {
    res.render('signup', { title: 'LabTask 2' });
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.render('login', { title: 'Login' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            req.flash('error_msg', 'Invalid email or password');
            return res.redirect('/login');
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        req.flash('success_msg', 'You are now logged in');
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error logging in:', error);
        req.flash('error_msg', 'Error logging in');
        res.redirect('/login');
    }
});

router.post('/submit-form', async (req, res) => {
    try {
        const { firstName, lastName, email, subject, message } = req.body;
        const newContact = new Contact({ firstName, lastName, email, subject, message });
        await newContact.save();
        res.render('contact', { title: 'Contact', message: 'Your message has been sent successfully!', user: req.user });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.render('contact', { title: 'Contact', message: 'There was an error submitting your message. Please try again.', user: req.user });
    }
});

module.exports = router;
