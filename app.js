const express = require('express');
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Set up routes
app.get('/', (req, res) => {
    res.render('index');
});

// Add more routes as needed

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
