var socket = io.connect();

var el = document.getElementById('element');
var body = document.getElementsByTagName('body');

// Draw a dygraph from data received
function plotter()
{
    var data = [];
    var t = new Date();
    
    for (var i = 10; i >= 0; i--)
    {
        var x = new Date(t.getTime() - i * 1000);
        data.push([x, 0.0]);
    }
    

    var g = new Dygraph(document.getElementById("graphdiv4"), data,
	{
		animatedZooms: true,
		drawPoints: true,
                showRoller: true,
                drawYGrid: true,
                axisTickSize: 40,
                valueRange: [-100, 100],
                labels: ['Time', 'EField'],
	});

    window.intervalId = setInterval(function()
    {
	socket.emit("give");

	socket.on("data", function(d)
	{
		var x = new Date();  // current time
	        var y = d;

	        data.push([x, y]);
	        g.updateOptions( { 'file': data } );
	});

    }, 1000);
}

/*
// Draw a dygraph from csv file
function EMFieldGraph()
{
    g5 = new Dygraph(
    document.getElementById("graphdiv4"), "EField.csv",
        {
            rollPeriod: 7,
            showRoller: true,
            errorBars: true,
        });
}
*/
