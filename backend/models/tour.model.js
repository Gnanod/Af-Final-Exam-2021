const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tour = new Schema({
    place: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    transport: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('tour', tour);