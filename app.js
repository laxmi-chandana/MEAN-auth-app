const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


mongoose.connect(config.database);
//mongoose.connect(config.database, {useMongoClient: true});

//sucesfully connected to database
mongoose.connection.on('connected', () => {
    console.log("Connection is established"+config.database);
})

//Error while connecting to database
mongoose.connection.on('error', (err) => {
    console.log("Database error:"+ err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//BOdy Parser MiddleWare
app.use(bodyParser.json());

app.use('/users',users);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('/', (req, res) =>{
    res.send('Invalid Endpoint');
})

app.listen(port, () =>{
    console.log('Server started on port '+port);
});    