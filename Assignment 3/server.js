const express = require('express');
const app = express();
let ejsLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static("public"));


// Start the server
app.get("/",(req,res)=>{
    res.render("landingpage");
})

app.get("/contact",(req,res)=>{
    res.render("contact",{layout:false});
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
