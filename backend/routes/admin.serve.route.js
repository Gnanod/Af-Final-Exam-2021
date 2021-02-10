const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin.model')

router.route('/add').post(function (req, res) {
    let admin = new Admin(req.body);
    console.log(admin)
    admin.save()
        .then(admin => {
            res.status(200).json({'success': 'successful'});
        }).catch(err => {
        res.status(400).send('fail');
    });
});

router.get("/getUserNameStatus/:userName", function (req, res) {
    const userName = req.params.userName;

    Admin.findOne({email: userName},)
        .exec()
        .then(userName => {
            if (userName === null) {
                res.status(200).json({"message": "not found"});
            } else {
                res.status(200).json({"message": userName});
                // res.status(200).json({"message": "not found"});\
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get("/getUserType/:userName/:password", function (req, res) {
    const userName = req.params.userName;
    const password = req.params.password;

    Admin.findOne({email: userName, password: password})
        .exec()
        .then(userName => {
            if (userName === null) {
                res.status(200).json({"message": "not found"});
            } else {
                res.status(200).json({"message": userName});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;