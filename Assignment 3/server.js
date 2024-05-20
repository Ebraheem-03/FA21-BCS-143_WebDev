const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const routes = require('./src/routes');
const adminRoutes = require('./src/routes/api/admin');

// Middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
mongoose.connect('mongodb://localhost:27017/EG_Travels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.error('DB Connection Error:', err);
});

// Use Routes
app.use('/', routes);
app.use('/api/admin', adminRoutes);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
