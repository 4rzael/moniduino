'use strict';

var socket = io();

var graphs = [];
var datas = [];


function createGraphs() {
	console.log('coucou')
	var divs = document.getElementsByTagName('div')

	for (var i = 0; i < divs.length; ++i) {
		if (divs[i].id.indexOf('_graph') > -1) {
			datas[divs[i].id] = [[new Date(), 0]];
			graphs[divs[i].id] = new Dygraph(divs[i], datas[divs[i].id],
			{
				drawPoints: true,
				showRoller: true,
				labels: ['Time', 'Value']
			});
		}
	}
}

socket.on('data', function(data) {
	var htmlID = (data.type === 'DIGITAL' ? 'D' : 'A') + data.pin;
	var graphID = htmlID + '_graph';
	var elem = document.getElementById(htmlID);

	if (elem)
		elem.innerText = data.type + ' ' + data.pin + ' : ' + data.value;
	if (graphs[graphID] && datas[graphID]) {
		datas[graphID].push([new Date(), data.value]);
		graphs[graphID].updateOptions({'file': datas[graphID]});
	}
		
});
