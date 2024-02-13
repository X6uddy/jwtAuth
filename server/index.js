require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');

const PORT = process.env.PORT || 5000;
const URL = process.env.DB_URL;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(URL)
        .then(() => console.log('Connected to DB'))

        app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
    } catch (e) {
        console.log(e);
    }
};
start();

