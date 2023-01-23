const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truckScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true  
    },
    status: {
        type: String,
        required: true  
    }
}, { timestamps: true  });

const Truck = mongoose.model('Truck', truckScheme);
module.exports = Truck;