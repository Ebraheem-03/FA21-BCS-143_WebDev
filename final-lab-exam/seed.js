const mongoose = require('mongoose');
const Product = require('./src/models/product'); // Ensure the path is correct

const sampleProducts = [
    { name: 'Product 1', description: 'Description 1', price: 10, category: 'Category 1', isFeatured: true },
    { name: 'Product 2', description: 'Description 2', price: 20, category: 'Category 2', isFeatured: true },
    { name: 'Product 3', description: 'Description 3', price: 30, category: 'Category 3', isFeatured: false },
    { name: 'Product 4', description: 'Description 4', price: 40, category: 'Category 4', isFeatured: true },
    { name: 'Product 5', description: 'Description 5', price: 50, category: 'Category 5', isFeatured: true },
    { name: 'Product 6', description: 'Description 6', price: 60, category: 'Category 6', isFeatured: false }
];

const insertSampleProducts = async () => {
    await mongoose.connect('mongodb://localhost:27017/EG_Travels', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(sampleProducts);

    console.log('Sample products inserted');
    mongoose.disconnect();
};

insertSampleProducts();
