const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Mock Chats Route
router.get('/', authMiddleware, (req, res) => {
    res.json([
        {
            id: 101,
            partnerName: "Jane Smith",
            lastMessage: "Sure, here is the link...",
            lastMessageTime: "10:06 AM",
            unreadCount: 0
        }
    ]);
});

module.exports = router;
