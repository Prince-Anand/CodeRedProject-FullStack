const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String, // Can be inherited from User, but keeping for profile display flexibility
    title: String, // e.g. "Senior React Developer"
    skills: [String],
    hourlyRate: Number,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    location: String,
    image: String, // URL to profile image
    cv: String, // URL to CV PDF
    bio: String,
    experience: [{
        title: String,
        company: String,
        period: String,
        description: String
    }]
});

module.exports = mongoose.model('Agent', AgentSchema);
