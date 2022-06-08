const express = require('express');
const { initializeConfiMiddlwares, initializeRRorMiddlwares} = require('./middlewares');
const route = require('../controllers/user');
const meeting = require('../controllers/meeting');
const clientMeeting = require('../controllers/meeting');
const {sequelize} = require('../models/db');

class //Server generated
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    return res.send('<h2>Welcome to Express App<h2>');
})

var Port = process.env.PORT || 3000;
var IP = process.env.IP || '127.0.0.1';
app.listen(Port, IP, (err) => {
    if (err) {
       console.log(err)
   } else {
       console.log('Server is listening at ' + IP + ':' + Port);
    }
});
constructor() {
    this.app = express ();
    this.db();

    initializeConfiMiddlwares(this.app);
    this._initializeRoutes();
    initializeRRorMiddlwares(this.app);
}

async db() {
    await squeelize.sync();
}
start() {
    this.server.close();
}
_initializeRoutes(){
    this.app.use('/users', route.initializationRoutes());
    this.app.use('/rencontres', meeting.initializationRoutes());
    this.app.use('/clientMeeting', clientMeeting.initializationRoutes());
}

module.exports = Server;