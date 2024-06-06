const mongoose = require('mongoose');
const CardInfo = require('./models/CardInfo');
const Stock = require('./models/Stock');

const dropIndex = async () => {
    await mongoose.connect('mongodb+srv://bdarmy:bdarmy_121@cluster0.2aahg01.mongodb.net/aircraft_inventory?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await Stock.collection.dropIndex('nomenclature_1');  // Adjust 'cardNo_1' to your specific index name

    console.log('Index dropped');
    mongoose.connection.close();
};

dropIndex().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
