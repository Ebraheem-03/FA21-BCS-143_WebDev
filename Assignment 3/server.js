// Other requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const ejsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

// Initialize app
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static('public'));
app.use(expressSession({ secret: "secret" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user || null;
    next();
});

// Database connection
mongoose.connect('mongodb://localhost:27017/EG_Travels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.error('DB Connection Error:', err);
});

// Use routes
const routes = require('./src/routes');
const adminRoutes = require('./src/routes/api/admin');
app.use('/', routes);
app.use('/api/admin', adminRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
