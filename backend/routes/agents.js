const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

// Get all agents
router.get('/', async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (err) {
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

        if (!agent) {
            agent = await Agent.findOne({ id: req.params.id });
        }

        if (!agent) return res.status(404).json({ msg: 'Agent not found' });
        res.json(agent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
