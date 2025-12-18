const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    id: Number, // API list uses ID, we can keep it for migration or rely on _id
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    company: String,
    type: String, // 'Contract', 'Full-time' etc
    budget: String,
    posted: {
        type: Date,
        default: Date.now
    },
    description: String,
    skills: [String],
    location: String
});

module.exports = mongoose.model('Job', JobSchema);
