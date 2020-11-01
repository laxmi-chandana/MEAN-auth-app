const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { deleteOne } = require('../models/user');
const config = require('../config/database');

//Register
router.post('/register', (req, res, next)=> {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser,(err, user) =>{
        if(err){
            res.json({sucess: false, msg: 'Failed to register user'});
        }
        else{
            res.json({sucess: true, msg: 'User registeration'});
        }
    })
});

//Authentication key
router.post('/Authentication', (req, res, next)=> {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username,(err,user) =>{
        if(err) throw err;
        if (!user){
            return res.json({success: false, msg:'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 604800
                });

            res.json({
                success:true,
                token: 'JWT' +token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.username,
                }
            });
            }
            else{
                return res.json({success: false, msg:' Wrong password '});
            }
        });
    });
});

//Profile
router.get('/Profile', (req, res, next)=> {
    res.send('Profile');

});

//Validate 
router.get('/Validate', (req, res, next)=> {
    res.send('Validate');

});

module.exports = router;