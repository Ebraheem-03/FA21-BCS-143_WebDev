const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define paths for views
const viewsPath = path.join(__dirname, 'Assignment 3', 'views');

// Set views directory
app.set('views', viewsPath);

// Define routes
const indexRouter = require('./Assignment 3/routes/index');
app.use('/', indexRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
