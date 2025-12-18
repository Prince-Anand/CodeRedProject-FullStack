const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Job = require('../models/Job');

// Apply to a job
router.post('/:jobId/apply', auth, async (req, res) => {
    try {
        if (req.user.role !== 'agent') {
            return res.status(403).json({ msg: 'Only agents can apply to jobs' });
        }

        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        // Check if already applied
        const existing = await Application.findOne({ job: req.params.jobId, agent: req.user.id });
        if (existing) return res.status(400).json({ msg: 'Already applied to this job' });

        const application = new Application({
            job: req.params.jobId,
            agent: req.user.id,
            coverLetter: req.body.coverLetter
        });

        await application.save();
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get My Applications (Agent)
router.get('/my', auth, async (req, res) => {
    try {
        const applications = await Application.find({ agent: req.user.id })
            .populate('job')
            .sort({ appliedAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Applicants for a Job (Employer)
router.get('/job/:jobId', auth, async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (job.employer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate('agent', 'name email')
            .populate({
                path: 'agent',
                select: 'name email',
                // We might want to populate profile from Agent model too, 
                // but simpler to fetch User and maybe separate Agent profile fetch in frontend
                // OR use virtual populate if setup. 
                // For now, just user details.
            });

        // To get full profile details, we might need to aggregate. 
        // But let's keep simple.

        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Status (Employer)
router.post('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body; // 'reviewing', 'selected', 'rejected'
        const application = await Application.findById(req.params.id).populate('job');

        if (!application) return res.status(404).json({ msg: 'Application not found' });

        if (application.job.employer.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        application.status = status;
        await application.save();
        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
