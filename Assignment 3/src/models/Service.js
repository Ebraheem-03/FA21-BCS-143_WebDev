const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    imageId: {type: String}
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
