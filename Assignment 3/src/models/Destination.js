const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
