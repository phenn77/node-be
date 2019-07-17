const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/product'); // Imports routes for the products
const company = require('./routes/company');
const invoice = require('./routes/invoice');
const participant = require('./routes/participant');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res, next) {
    // Handle the get for this route
});

app.post('/', function(req, res, next) {
    // Handle the post for this route
});

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/test';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('connected', () => {
    console.log("mongoose connection is ok")
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);
app.use('/companies', company);
app.use('/invoices', invoice);
app.use('/participants', participant);

let port = 7777;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});