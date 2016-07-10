# moniduino
Monitor your arduino pins states in realtime

## What is it ?

Ever needed to see your arduino pins state in realtime ?

Moniduino allows to do so !

## How does it work ?

Moniduino is composed of :

* An Arduino library, in order to send the pin values to the computer

* A node.js server, running on the computer. It will retreive data from the arduino and work as a web server

* A web front-end with graphs, in order to visualize the data.

## Warnings

* Only use moniduino while debugging, as it can be pretty cpu-intensive for the arduino

* Moniduino can (and will) break arduino programs that use binary usb/serial communication.

## How to use it ?

* in `arduino/lib`, there is the arduino library. Install it

* upload a sketch that uses moniduino (examples in `arduino/examples`)

* install [node.js](https://nodejs.org/en/)

* run `npm install`

* run the server `node index.js`

* open your browser and go on `localhost:5000`

* Enjoy :D

## LICENSE

MIT

## Screenshots

![screenshot1](https://cloud.githubusercontent.com/assets/9220115/16715132/0223c0ae-46d8-11e6-988e-43d7727d3050.png)
