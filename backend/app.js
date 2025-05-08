const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


const router = require('./routes/index.js');

app.use('/', router);

app.listen(PORT, () => {
    console.log('Server is running on port',+ PORT);
})