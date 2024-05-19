const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import your models
const User = require('./src/models/User');  // Adjust the path as necessary
const Destination = require('./src/models/Destination');
const Service = require('./src/models/Service');
const Review = require('./src/models/Review');
const Contact = require('./src/models/Contact');

mongoose.connect('mongodb://localhost:27017/EG_Travels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('DB Connected');

    // Clear existing data
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Service.deleteMany({});
    await Review.deleteMany({});
    await Contact.deleteMany({});

    // Function to read JSON file and insert data into the database
    const seedData = async (model, fileName) => {
        const filePath = path.join(__dirname, 'data', fileName);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        await model.insertMany(data);
    };

    // Seed data for each collection
    await seedData(User, 'users.json');
    await seedData(Destination, 'destinations.json');
    await seedData(Service, 'services.json');
    await seedData(Review, 'reviews.json');
    await seedData(Contact, 'contacts.json');

    console.log('Data Seeded');
    process.exit();
}).catch((err) => {
    console.error('DB Connection Error:', err);
    process.exit(1);
});
