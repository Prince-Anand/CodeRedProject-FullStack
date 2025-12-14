const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    id: Number, // API list uses ID, we can keep it for migration or rely on _id
    title: String,
    company: String,
    type: String, // 'Contract', 'Full-time' etc
    budget: String,
    posted: String, // '2 days ago' - ideally Date, but keeping simple for now
    description: String,
    skills: [String],
    location: String
});

module.exports = mongoose.model('Job', JobSchema);
