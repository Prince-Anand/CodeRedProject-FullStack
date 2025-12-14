const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow all CORS for simplicity as requested
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/', require('./routes/auth'));
app.use('/agents', require('./routes/agents'));
app.use('/jobs', require('./routes/jobs'));
app.use('/chats', require('./routes/chats')); // Placeholder if needed

app.get('/', (req, res) => {
    res.send('CodeRed Backend API is Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
