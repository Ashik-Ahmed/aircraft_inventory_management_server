const mongoose = require('mongoose');
const CardInfo = require('./models/CardInfo');
const Stock = require('./models/Stock');

const dropIndex = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/aircraft_inventory', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // await CardInfo.collection.dropIndex('cardNo_1');
    // await Stock.collection.dropIndex('stockNo_1');
    // await Stock.collection.dropIndex('nomenclature_1');
    await Stock.collection.dropIndex('cardNo_1');

    console.log('Index dropped');
    mongoose.connection.close();
};

dropIndex().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
