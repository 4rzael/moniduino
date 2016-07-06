#ifndef MONIDUINO_H_
# define MONIDUINO_H_

# include <Arduino.h>
#include <avr/pgmspace.h>

class Moniduino
{
public:
	Moniduino(byte digitals = 14, byte analogs = 6);
	~Moniduino();

	void start(int baudrate = 9600);
	void stop();

	void sendData();

private:
	byte const _digitals;
	byte const _analogs;
};

#endif /* MONIDUINO_HPP_ */
