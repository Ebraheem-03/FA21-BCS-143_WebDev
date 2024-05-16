// routes/index.js
const express = require('express');
const router = express.Router();
const path = require('path');

// Serve static files (CSS, JavaScript)
router.use('/static', express.static(path.join(__dirname, '..', '..', 'LabTask1')));

// Serve images
router.use('/images/customers', express.static(path.join(__dirname, '..', '..', 'LabTask1', 'images', 'customers')));
router.use('/images/destinations', express.static(path.join(__dirname, '..', '..', 'LabTask1', 'images', 'destinations')));
router.use('/images/service', express.static(path.join(__dirname, '..', '..', 'LabTask1', 'images', 'service images')));

// Landing page route
router.get('/', (req, res) => {
    res.render('landing_page', {
        layout: 'layout', // Use layout.ejs for rendering
        header: '/partials/header', // Include header.ejs as partial
        footer: '/partials/footer'  // Include footer.ejs as partial
    });
});

module.exports = router;
