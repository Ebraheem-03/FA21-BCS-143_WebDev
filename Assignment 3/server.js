const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const ejsLayouts = require('express-ejs-layouts');

// Require models
const User = require('../Assignment 4/models/User');
const Destination = require('./src/models/Destination');
const Service = require('./src/models/Service');
const Review = require('./src/models/Review');
const Contact = require('./src/models/Contact');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/EG_Travels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.error('DB Connection Error:', err);
});

app.get('/', (req, res) => {
    res.render('landingpage', { title: 'Home' });
});

app.get('/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.render('destinations', { title: 'Destinations', destinations });
    } catch (error) {
        res.status(500).send('Error fetching destinations');
    }
});

app.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.render('services', { title: 'Services', services });
    } catch (error) {
        res.status(500).send('Error fetching services');
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user').populate('destination');
        res.render('reviews', { title: 'Customer Reviews', reviews });
    } catch (error) {
        res.status(500).send('Error fetching reviews');
    }
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        res.render('contact', { title: 'Contact', message: 'Your message has been sent successfully!' });
    } catch (error) {
        res.render('contact', { title: 'Contact', message: 'There was an error submitting your message. Please try again.' });
    }
});

app.get('/login', (req, res) => {
    res.render('sign-in', { title: 'Login' });
});

app.get('/ajax', (req, res) => {
    res.render('ajax', { title: 'LabTask 2' });
});

app.post('/submit-form', (req, res) => {
    // Handle form submission logic
    res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
