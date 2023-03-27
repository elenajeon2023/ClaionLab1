var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var streamhandler = require('./streamhandler/consumer')

var indexRouter = require('./routes/index');
var inventoriesRouter = require('./routes/inventories');

const { sequelize } = require('./models');
var app = express();
sequelize.sync();

(async () => {
    try {
        await streamhandler.consumer.connect();
        console.log('Kafka Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the Kafka channel:', error);
    }
})();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inventories', inventoriesRouter);
module.exports = app;
