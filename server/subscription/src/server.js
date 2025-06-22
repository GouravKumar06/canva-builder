
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');


const app = express();
const PORT = process.env.PORT


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Subscription service is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error while connecting to the server:', error);
    }
}

startServer();