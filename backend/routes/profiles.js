const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const Agent = require('../models/Agent');
const Employer = require('../models/Employer');
const User = require('../models/User');

// Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

// Get My Profile
router.get('/me', auth, async (req, res) => {
    try {
        const { role } = req.user;
        let profile;
        if (role === 'agent') {
            profile = await Agent.findOne({ user: req.user.id }).populate('user', '-password');
        } else if (role === 'employer') {
            profile = await Employer.findOne({ user: req.user.id }).populate('user', '-password');
        }

        if (!profile) {
            // Return basic user info if profile doesn't exist yet
            const user = await User.findById(req.user.id).select('-password');
            return res.json({ user, profile: null });
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Profile
router.post('/update', auth, async (req, res) => {
    try {
        const { role } = req.user;
        const profileData = req.body;

        // Prevent updating user field
        delete profileData.user;

        // Sync name change to User model if provided
        if (profileData.name) {
            await User.findByIdAndUpdate(req.user.id, { name: profileData.name });
        }

        let profile;
        if (role === 'agent') {
            profile = await Agent.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileData },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
        } else if (role === 'employer') {
            profile = await Employer.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileData },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
        }
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Upload File (Image or CV)
router.post('/upload', auth, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Return the URL to valid file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

module.exports = router;
