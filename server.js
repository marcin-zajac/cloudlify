const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
);
