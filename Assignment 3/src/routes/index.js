const express = require('express');
const router = express.Router();

// Require models
const User = require('../models/User');
const Destination = require('../models/Destination');
const Service = require('../models/Service');
const Review = require('../models/Review');
const Contact = require('../models/Contact');

const ITEMS_PER_PAGE = 6;

// Routes
router.get('/', (req, res) => {
    res.render('landingpage', { title: 'Home' });
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
            totalPages 
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
            totalPages 
        });
    } catch (error) {
        res.status(500).send('Error fetching services');
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user');
        res.render('reviews', { title: 'Customer Reviews', reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Error fetching reviews');
    }
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

router.get('/login', (req, res) => {
    res.render('sign-in', { title: 'Login' });
});

router.get('/ajax', (req, res) => {
    res.render('ajax', { title: 'LabTask 2' });
});

router.post('/submit-form', async (req, res) => {
    try {
        // Extract form data
        const { firstName, lastName, email, subject, message } = req.body;
        // Create a new Contact instance
        const newContact = new Contact({ firstName, lastName, email, subject, message });
        // Save the new contact to the database
        await newContact.save();

        // Respond with a success message
        res.render('contact', { title: 'Contact', message: 'Your message has been sent successfully!' });
    } catch (error) {
        // If an error occurs, render the contact page with an error message
        console.error('Error submitting contact form:', error);
        res.render('contact', { title: 'Contact', message: 'There was an error submitting your message. Please try again.' });
    }
});

module.exports = router;
