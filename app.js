const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // dotenv frühzeitig laden

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
const synthDataRoutes = require('./src/routes/routesSynthData');

// Use routes
app.use('/api/synthdata', synthDataRoutes);

const databaseUri = process.env.DATABASE_URI;
console.log('DATABASE_URI:', databaseUri); // Debug-Ausgabe hinzufügen

if (!databaseUri) {
    throw new Error('DATABASE_URI is not defined');
}

mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => console.log(error));
