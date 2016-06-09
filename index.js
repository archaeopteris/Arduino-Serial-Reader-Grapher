var receivedData = "";

var SerialPort = require("serialport").SerialPort;
var serialport = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600,
  // defaults for Arduino serial communication
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

var portData = "0.0";

serialport.on('open', function()
{
        console.log('Serial Port Opend');
        serialport.on('data', function(data)
        {
		receivedData += data.toString();
		if(receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0)
                {
			// save the data between 'B' and 'E'
			portData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
			console.log(portData);
                	receivedData = '';
		}
        });
});

var express = require('express');
var app = express(); 
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);  

http.listen(8082);
                    
app.get('/', function (req, res)
{
    console.log(req.params.file);

    res.sendFile(__dirname + '/index.html');
//    res.send('Hello World');
});
					
app.get('/:file', function (req, res)
{
    console.log(req.params.file);

    res.sendFile(__dirname+ "/" + req.params.file);
//    res.send('Hello World');
});

io.sockets.on("connection", function(socket)            
{
    socket.on("give", function(data)
              {
                io.sockets.emit("data", portData);
              })
});
