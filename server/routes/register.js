var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Model = require('../models/models');
var bcrypt = require('bcrypt');

//router.get('/', function (req, res, next){
//    res.sendFile(path.resolve(__dirname, '../public/views/registeradmin.html'));
//});


router.post('/', function(req,res,next) {
    var client = req.body;
    client.password = client.phone;

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(client.password, salt);

    var newUser = {
        email: client.email,
        first_name: client.firstName,
        last_name: client.lastName,
        phone: client.phone,
        default_meal: client.defaultMeal,
        category_id: client.categoryID,
        status: true,
        new_user: true,
        role: 'client',
        salt: salt,
        password: hashedPassword
    };

    Model.User.create(newUser).then(function () {
        res.redirect('/')
    }).catch(function (error) {
        res.redirect('/register')
    });

});

router.get('/admin', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/assets/views/registeradmin.html'));
});

router.post('/admin', function(req,res,next){
    var admin = req.body;
    console.log(admin);

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(admin.password, salt);

    var newUser = {
        email: admin.email,
        role: 'admin',
        salt: salt,
        password: hashedPassword
    };

    Model.User.create(newUser).then(function () {
        res.redirect('/')
    }).catch(function (error) {
        res.redirect('/register')
    });

});

module.exports = router;