const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    id: Number, // Keeping original ID for compatibility, or let Mongo use _id
    name: String,
    role: String,
    skills: [String],
    hourlyRate: Number,
    rating: Number,
    reviews: Number,
    location: String,
    image: String,
    bio: String
});

module.exports = mongoose.model('Agent', AgentSchema);
