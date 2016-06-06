var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var video = document.getElementById("myVideo");
var currentPosition;
var vx;

var buttonObject = 
{
	width: 20, 
	height: 20, 
	x: 0, 
	y: 0,

	centerX: function()
	{
		return this.x + (this.width / 2);
	},
	centerY: function()
	{
		return this.y + (this.height / 2);
	},
	halfWidth: function()
	{
		return this.width / 2;
	},
	halfHeight: function()
	{
		return this.height / 2;
	}
};

var button = Object.create(buttonObject);
button.x = 20;
button.y = 20;
context.fillStyle = "#FF0000";
context.fillRect(button.x, button.y, button.width, button.height);

var clicked = false;

// Events
canvas.addEventListener('mousedown', this.onMouseDown, false);
canvas.addEventListener('mousemove', this.onMouseMove, false);
canvas.addEventListener('mouseup', this.onMouseUp, false);

function onMouseDown(event)
{
	console.log("clicked");
	video.play();
	clicked = true;
	currentPosition = event.clientX
	console.log("clientX: " + event.clientX);
	console.log(window.innerWidth);
	console.log("DownPosition: " + currentPosition);
	console.log("DOWN" + clicked);
}
function onMouseUp(event)
{
	currentPosition = null;
	clicked = false;
	console.log("UP" + clicked);
}
function onMouseMove(event)
{
	console.log("MOVE" + clicked);
	if(clicked)
	{
		
		vx = event.clientX - currentPosition;

		if(video.currentTime <= 0)
		{
			// video.currentTime = 132;
		}
		if(video.currentTime > 139)
		{
			video.currentTime = 0;
		}
		video.currentTime = video.currentTime + (6*(vx/Math.abs(vx))) + 0.041667;
		video.play();
		console.log("currentPosition: " + currentPosition);
		console.log("VX: " + vx);
		currentPosition = event.clientX;
	}
}


video.play();
video.ontimeupdate = function() {myFunction()};
function myFunction() 
{
	console.log("TIME: " + video.currentTime);
	if(video.currentTime > 6 && video.currentTime < 7 )
	{
		video.pause();
	}
}