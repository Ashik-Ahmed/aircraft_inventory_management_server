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
const stockRoute = require('./routes/Stock.route');
const stockHistory = require('./routes/StockHistory.route');
const userRoute = require('./routes/User.route');


app.use('/api/v1/aircraft', aircraftRoute);
app.use('/api/v1/stock', stockRoute);
app.use('/api/v1/stockHistory', stockHistory);
app.use('/api/v1/user', userRoute);


module.exports = app;