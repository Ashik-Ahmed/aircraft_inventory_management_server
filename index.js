const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');


const app = require('./app');


// const fs = require('fs');

// fs.readFile('./fonts/DejaVuSans.ttf', (err, data) => {
//     if (err) throw err;
//     const base64 = data.toString('base64');
//     fs.writeFile('DejaVu-Sans.js', `module.exports = "${base64}";`, (err) => {
//         if (err) throw err;
//         console.log('Base64 string has been saved!');
//     });

// });

// database connection 
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database connection is Successful...`.red.bold);
})


//server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`.yellow.bold);
})