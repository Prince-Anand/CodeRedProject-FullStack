const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const User = require('../models/User');

// Get all agents
// Get all agents (including new users without incomplete profiles)
router.get('/', async (req, res) => {
    try {
        // 1. Get all fully registered agents
        const agents = await Agent.find().populate('user', 'name email');

        // 2. Get all users with role 'agent'
        const users = await User.find({ role: 'agent' }).select('-password');

        // 3. Create a set of User IDs that already have a profile
        const agentUserIds = new Set(
            agents
                .filter(a => a.user)
                .map(a => a.user._id.toString())
        );

        // 4. Identify users who don't have a profile yet and create placeholders
        const newAgents = users
            .filter(u => !agentUserIds.has(u._id.toString()))
            .map(u => ({
                _id: u._id, // Use User ID as the unique ID for the list
                id: u._id,  // For frontend compatibility if it uses .id
                user: u,
                name: u.name,
                role: 'New Agent',
                bio: 'This agent has not updated their profile yet.',
                skills: [],
                hourlyRate: 0,
                location: 'Remote',
                image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                rating: 0,
                reviews: 0,
                isPlaceholder: true
            }));

        // 5. Combine and return
        res.json([...agents, ...newAgents]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get agent by ID
router.get('/:id', async (req, res) => {
    try {
        // Try finding by MongoDB _id first, if fails try numeric id
        let agent;
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            agent = await Agent.findById(req.params.id);
        }

        if (!agent && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            // Try finding by User ID
            agent = await Agent.findOne({ user: req.params.id }).populate('user', '-password');
        }

        // If still no agent profile, check if it's a valid User ID to return a placeholder
        if (!agent && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const user = await User.findById(req.params.id).select('-password');
            if (user && user.role === 'agent') {
                // Return a dummy placeholder profile
                agent = {
                    _id: 'placeholder', // specialized id
                    user: user,
                    name: user.name,
                    role: 'Agent (New)',
                    bio: 'This agent has not updated their profile yet.',
                    skills: [],
                    hourlyRate: 0,
                    location: 'Remote',
                    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    rating: 0,
                    reviews: 0,
                    isPlaceholder: true
                };
            }
        }

        if (!agent) return res.status(404).json({ msg: 'Agent not found' });
        res.json(agent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
