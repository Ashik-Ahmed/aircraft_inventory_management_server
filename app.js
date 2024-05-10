const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Server is Running!!')
    console.log('api hit');
})

const aircraftRoute = require('./routes/Aircraft.route');


app.use('/api/v1/aircraft', aircraftRoute);


module.exports = app;