require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});