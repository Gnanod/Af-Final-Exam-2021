const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tourBook = new Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true
    }],
    tour: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tour",
        required: true
    }],
    personCount: {
        type: String,
        required: true
    },
    fullCost:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model('tourBook', tourBook);