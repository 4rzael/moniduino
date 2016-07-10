#include <Moniduino.h>

Moniduino m;

void setup() {
  // put your setup code here, to run once:
  m.start(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(10);
  m.sendData();

}
