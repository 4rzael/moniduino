'use strict';

var SerialPort = require('serialPort');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Moniduino(config) {
	var self = this;

	EventEmitter.call(self);

	self.connect = function connect() {
		self.serial = new SerialPort(self.port, {
			parser: SerialPort.parsers.readline('\n')
		});

		self.serial.on('data', function (data) {

			data = data.trim();

			// start
			if (data === 'MONIDUINO START')
				self.emit('start');
			// stop
			else if (data === 'MONIDUINO STOP')
				self.emit('stop');
			else {
				// data
				var match = data.match(/^MONIDUINO (\S+) (\d+) (\d+)\n{0,1}$/);
				if (match) {
					var type = match[1];
					var pin = match[2];
					var value = match[3];

					self.emit('data', type, pin, value);
				}
				// other lines
				else
					self.emit('line', data);
			}
		});
	}

	self.baud = (config && typeof config.baud === 'number') ? config.baud : 9600;

	if (config && typeof config.port === 'string') {
		self.port = config.port;
		self.connect();
	} else {
		SerialPort.list(function (err, ports) {
			if (err)
				throw new Error(err);
			ports.forEach(function (port) {
				if (port.manufacturer.indexOf('uino') >= 0) {
					self.port = port.comName;
				}
			})
			if (!self.port)
				throw new Error('Cannot find an arduino device');
			console.log('found arduino on port :', self.port);
			self.connect();
		});
	}

	util.inherits(Moniduino, EventEmitter);
}

module.exports = Moniduino;