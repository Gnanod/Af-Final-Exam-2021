const formidable = require("formidable");
const fs = require('fs');
const express = require('express');
const router = express.Router();
const Tour = require('../models/tour.model')


router.route('/add').post(function (req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: "Image cant uploaded"
            });
        }
        let tour = new Tour(fields);
        if (files.image) {
            if (files.image.size > 6000000) {
                return res.status(400).json({
                    error: true,
                    message: "Upload an image <6MB"
                });
            }
            tour.image.data = fs.readFileSync(files.image.path);
            tour.image.contentType = files.image.type;
        }
        tour.save()
            .then(tour => {
                res.status(200).json({'success': 'successful'});
            }).catch(err => {
            res.status(400).send('fail');
        });
    });
});

router.route('/getall').get(function (req, res) {
    Tour.find(function (err, event) {
        if (!err) {
            res.json(event);
        } else {
            res.status(400).send('faild');
        }
    });
});

module.exports = router;