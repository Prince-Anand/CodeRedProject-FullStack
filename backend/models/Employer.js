const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    description: String,
    logo: String, // URL to logo
    website: String,
    location: String
});

module.exports = mongoose.model('Employer', EmployerSchema);
