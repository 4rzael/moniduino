'use strict';

// dependencies
var argv = require('minimist')(process.argv.slice(2));
var express = require('express');
var path = require('path');
var Moniduino = require(path.join(__dirname, './moniduino.js'));

// web server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var webFolder = path.join(__dirname, 'www');
app.use(express.static(webFolder));

// config
var port = process.env.PORT || 5000;
var baud = 9600;
var com = undefined;

// command line parsing
if (typeof argv.port === 'number')
	port = argv.port;
else if (typeof argv.p === 'number')
	port = argv.p;

if (typeof argv.baud === 'number')
	baud = argv.baud;
else if (typeof argv.b === 'number')
	baud = argv.b;

if (typeof argv.com === 'string')
	com = argv.com;
else if (typeof argv.c === 'string')
	com = argv.c;

server.listen(port);

// Moniduino
var arduino = new Moniduino({
	port: com,
	baud: baud
});

arduino.on('start', function () {
	console.log('arduino start');
	io.sockets.emit('start');
});

arduino.on('stop', function () {
	console.log('arduino stop');
	io.sockets.emit('stop');
});

arduino.on('data', function (type, pin, value) {
	console.log('received data :', type, pin, value);
	io.sockets.emit('data', {type: type, pin: pin, value: value});
});

arduino.on('line', function (line) {
	console.log('received line :', line);
	io.sockets.emit('line', line);
});
