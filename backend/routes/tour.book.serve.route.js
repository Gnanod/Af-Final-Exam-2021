const express = require('express');
const router = express.Router();
const TourBook = require('../models/tourBook.model')

router.route('/add').post(function (req, res) {

    let tourBook = new TourBook(req.body);
    console.log(tourBook)
    tourBook.save()
        .then(tour => {
            res.status(200).json({'success': 'successful'});
        }).catch(err => {
        res.status(400).send('fail');
    });
});

router.route('/getAll/:userId').get(function (req, res) {

    const userId = req.params.userId;
    TourBook.find({user: userId}).populate("tour").exec().then(event => {
        console.log(event)
        res.status(200).json(event)
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.route('/getAll').get(function (req, res) {
    TourBook.find(function (err, event) {
        if (!err) {
            res.json(event);
        } else {
            res.status(400).send('faild');
        }
    });
});

module.exports = router;