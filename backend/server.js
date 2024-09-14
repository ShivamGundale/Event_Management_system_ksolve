const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/events');
const rsvpRoutes = require('./routes/rsvps');

const app = express();
const PORT = 3000;



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/events', eventRoutes);
app.use('/api/rsvps', rsvpRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

