const express = require('express');
const mongoose = require("mongoose");
const app = express();
let ejsLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("landingpage", { title: 'Home' });
});

app.get("/destinations", (req, res) => {
    res.render("destinations", { title: 'Destinations' });
});

app.get("/services", (req, res) => {
    res.render("services", { title: 'Services' });
});

app.get("/reviews", (req, res) => {
    res.render("reviews", { title: 'Customer Reviews'});
});

app.get("/contact", (req, res) => {
    res.render("contact", { title: 'Contact'});
});

app.post('/submit-form', (req, res) => {

    res.sendStatus(200);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

mongoose.connect("mongodb://localhost:27017/EG_Travels").then((data) => {
  console.log("DB Connected");
});