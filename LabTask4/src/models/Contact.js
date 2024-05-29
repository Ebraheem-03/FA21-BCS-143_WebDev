const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    subject: { type: String},
    message: { type: String},
    createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
