const dotenv = require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const router = require('./routes/index.js');
const user = require("./routes/userRoute.js");
const auth = require("./routes/authRoute.js");


app.use('/', router);
app.use('/user', user);
app.use('/auth', auth);


app.listen(PORT, () => {
    console.log('Server is running on port',+ PORT);
})