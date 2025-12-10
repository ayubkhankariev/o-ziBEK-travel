const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/auth.routes');
const stayRoutes = require('./routes/stays.routes');
const attractionRoutes = require('./routes/attractions.routes');

app.use('/api/auth', authRoutes);
app.use('/api/stays', stayRoutes);
app.use('/api/attractions', attractionRoutes);

app.get('/', (req, res) => {
  res.send('O‘ziBEK Travel Guide API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
