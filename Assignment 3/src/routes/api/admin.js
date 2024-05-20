const express = require('express');
const router = express.Router();

// Require models
const Destination = require('../../models/Destination');
const Service = require('../../models/Service');

// CRUD operations for Services

// List all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.render('admin/services', { title: 'Manage Services', services });
    } catch (error) {
        res.status(500).send('Error fetching services');
    }
});

// Render form to create a new service
router.get('/services/new', (req, res) => {
    res.render('admin/newService', { title: 'Add New Service' });
});

// Create a new service
router.post('/services', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newService = new Service({ name, description, price });
        await newService.save();
        res.redirect('/api/admin/services');
    } catch (error) {
        res.status(500).send('Error creating service');
    }
});

// Render form to edit a service
router.get('/services/edit/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.render('admin/editService', { title: 'Edit Service', service });
    } catch (error) {
        res.status(500).send('Error fetching service');
    }
});

// Update a service
router.post('/services/edit/:id', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        await Service.findByIdAndUpdate(req.params.id, { name, description, price });
        res.redirect('/api/admin/services');
    } catch (error) {
        res.status(500).send('Error updating service');
    }
});

// Delete a service
router.post('/services/delete/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.redirect('/api/admin/services');
    } catch (error) {
        res.status(500).send('Error deleting service');
    }
});

// CRUD operations for Destinations

// List all destinations
router.get('/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.render('admin/destinations', { title: 'Manage Destinations', destinations });
    } catch (error) {
        res.status(500).send('Error fetching destinations');
    }
});

// Render form to create a new destination
router.get('/destinations/new', (req, res) => {
    res.render('admin/newDestination', { title: 'Add New Destination' });
});

// Create a new destination
router.post('/destinations', async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const newDestination = new Destination({ name, description, location });
        await newDestination.save();
        res.redirect('/api/admin/destinations');
    } catch (error) {
        res.status(500).send('Error creating destination');
    }
});

// Render form to edit a destination
router.get('/destinations/edit/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        res.render('admin/editDestination', { title: 'Edit Destination', destination });
    } catch (error) {
        res.status(500).send('Error fetching destination');
    }
});

// Update a destination
router.post('/destinations/edit/:id', async (req, res) => {
    try {
        const { name, description, location } = req.body;
        await Destination.findByIdAndUpdate(req.params.id, { name, description, location });
        res.redirect('/api/admin/destinations');
    } catch (error) {
        res.status(500).send('Error updating destination');
    }
});

// Delete a destination
router.post('/destinations/delete/:id', async (req, res) => {
    try {
        await Destination.findByIdAndDelete(req.params.id);
        res.redirect('/api/admin/destinations');
    } catch (error) {
        res.status(500).send('Error deleting destination');
    }
});

module.exports = router;
