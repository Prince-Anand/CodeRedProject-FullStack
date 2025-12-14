const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get job by ID
router.get('/:id', async (req, res) => {
    try {
        let job;
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            job = await Job.findById(req.params.id);
        }

        if (!job) {
            job = await Job.findOne({ id: req.params.id });
        }

        if (!job) return res.status(404).json({ msg: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Apply for job (Mock)
router.post('/:id/apply', authMiddleware, async (req, res) => {
    // Logic to save application would go here
    res.json({ message: 'Application submitted successfully' });
});

module.exports = router;
