const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const config = require('../models/database');


//User Schema

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function(id, callBack) {
    User.findById(Id, callback);
};

module.exports.getUserByUserName = function(username, callBack){
    const query = { username: username};
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}