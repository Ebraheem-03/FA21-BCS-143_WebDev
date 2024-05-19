// Review.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User'); // No need to specify a path, as they are in the same directory

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    role: { type: String },
    description: { type: String, required: true },
    image: { type: String },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
