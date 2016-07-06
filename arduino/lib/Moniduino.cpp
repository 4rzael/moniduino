#include "Moniduino.h"

Moniduino::Moniduino(byte digitals, byte analogs)
: _digitals(digitals), _analogs(analogs)
{
}

Moniduino::~Moniduino() {
}

void Moniduino::start(int baudrate) {
	Serial.begin(baudrate);
	Serial.println(F("MONIDUINO START"));
}

void Moniduino::stop() {
	Serial.print(F("MONIDUINO STOP"));
	Serial.end();
}

void Moniduino::sendData() {
	for (byte digital = 0; digital < _digitals; ++digital) {
		Serial.print(F("MONIDUINO DIGITAL "));
		Serial.print(digital, DEC);
		Serial.print(F(" "));
		Serial.println(digitalRead(digital), DEC);
	}

	for (byte analog = 0; analog < _analogs; ++analog) {
		Serial.print(F("MONIDUINO ANALOG "));
		Serial.print(analog, DEC);
		Serial.print(F(" "));
		Serial.println(analogRead(analog), DEC);		
	}
}
