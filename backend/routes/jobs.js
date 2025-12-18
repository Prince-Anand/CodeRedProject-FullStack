const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');

// Create a job
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, type, budget, description, skills, location } = req.body;

        // Fetch employer profile for company name? Or just use User name? 
        // Or expect company name in body?
        // Let's assume company name comes from body or defaults to "Unknown"
        const company = req.body.company || 'Tech Company'; // Placeholder

        const newJob = new Job({
            employer: req.user.id,
            title,
            company,
            type,
            budget,
            description,
            skills,
            location
        });

        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ posted: -1 });
        // Transform date to relative time if needed, or handle in frontend
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get my posted jobs
router.get('/my', authMiddleware, async (req, res) => {
    try {
        const jobs = await Job.find({ employer: req.user.id }).sort({ posted: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// Get job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ msg: 'Job not found' });
        res.json(job);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Job not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
