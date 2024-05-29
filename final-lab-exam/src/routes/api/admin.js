const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const adminCheck = require('../../middleware/adminCheck');
const authenticateToken = require('../../middleware/authenticateToken');

router.use(authenticateToken);
router.use(adminCheck);


// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dwzg1fzvi',
    api_key: '536759466158152',
    api_secret: 'rLFp_Ln-rdh-DoWSUtdiw7yGQyU'
});

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'EG_Travels',
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});

const parser = multer({ storage: storage });

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
router.post('/services', parser.single('image'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const imageUrl = req.file.path; // Cloudinary URL
        const imageId = req.file.filename; // Cloudinary image ID
        const newService = new Service({ name, description, price, imageUrl, imageId });
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
router.post('/services/edit/:id', parser.single('image'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const updateData = { name, description, price };

        if (req.file) {
            const service = await Service.findById(req.params.id);
            if (service.imageId) {
                await cloudinary.uploader.destroy(service.imageId); // Delete old image from Cloudinary
            }
            updateData.imageUrl = req.file.path; // Update image URL if a new image is uploaded
            updateData.imageId = req.file.filename; // Update image ID
        }

        await Service.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/api/admin/services');
    } catch (error) {
        res.status(500).send('Error updating service');
    }
});

// Delete a service
router.post('/services/delete/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service.imageId) {
            await cloudinary.uploader.destroy(service.imageId); // Delete image from Cloudinary
        }
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
router.post('/destinations', parser.single('image'), async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const imageUrl = req.file.path; // Cloudinary URL
        const imageId = req.file.filename; // Cloudinary image ID
        const newDestination = new Destination({ name, description, location, imageUrl, imageId });
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
router.post('/destinations/edit/:id', parser.single('image'), async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const updateData = { name, description, location };

        if (req.file) {
            const destination = await Destination.findById(req.params.id);
            if (destination.imageId) {
                await cloudinary.uploader.destroy(destination.imageId); // Delete old image from Cloudinary
            }
            updateData.imageUrl = req.file.path; // Update image URL if a new image is uploaded
            updateData.imageId = req.file.filename; // Update image ID
        }

        await Destination.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/api/admin/destinations');
    } catch (error) {
        res.status(500).send('Error updating destination');
    }
});

// Delete a destination
router.post('/destinations/delete/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (destination.imageId) {
            await cloudinary.uploader.destroy(destination.imageId); // Delete image from Cloudinary
        }
        await Destination.findByIdAndDelete(req.params.id);
        res.redirect('/api/admin/destinations');
    } catch (error) {
        res.status(500).send('Error deleting destination');
    }
});

module.exports = router;
