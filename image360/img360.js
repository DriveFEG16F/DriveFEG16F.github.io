// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var BLOCK = document.getElementById("myBlock");

BLOCK.addEventListener('mousedown', this.onMouseDown, false);
BLOCK.addEventListener('mousemove', this.onMouseMove, false);
BLOCK.addEventListener('mouseup', this.onMouseUp, false);
BLOCK.addEventListener("touchstart", this.onTouchStart, false);
BLOCK.addEventListener("touchmove", onTouchMove, false);
BLOCK.addEventListener("touchend", onTouchEnd, false);

var clicked = false;
var startingPoint;
var image = document.getElementById('imageHolder');
var num;

var j = 1;

function onMouseDown(event)
{   
    clicked = true;
    startingPoint = event.clientX;
    console.log("SRC: " + image.src)
}

function onTouchStart(event)
{
    event.preventDefault();
    startingPoint = event.touches[0].clientX;
    console.log("Position: " + startingPoint);
}

function onMouseUp(event)
{
    clicked = false;
    startingPoint = null;
}

function onTouchEnd(event)
{
    event.preventDefault();
    startingPoint = null;
    console.log("Up");
    console.log("Position: " + startingPoint);
    console.log("Duration: " + videoDuration);
}

function onMouseMove(event)
{
    if(clicked)
    {       
        moveX = event.clientX - startingPoint;

        if(moveX != 0)
        {
            moveX = moveX / Math.abs(moveX);    
        }

        console.log("moveX: " + moveX);

        console.log("J: " + j);

        j = j + moveX;

        if (j < 1)
        {
            j = 61 + moveX;
        } else if ( j > 60 )
        {
            j = 0 + moveX; 
        }

        num = j.toString();

        image.src = 'img/shin (' + num +').jpg';

        startingPoint = event.clientX;       
    }
}

function onTouchMove(event)
{
    event.preventDefault();

    moveX = event.changedTouches[0].clientX - startingPoint;

    if(moveX != 0)
    {
        moveX = moveX / Math.abs(moveX);    
    }

    console.log("moveX: " + moveX);

    console.log("J: " + j);

    j = j + moveX;

    if (j < 1)
    {
        j = 61 + moveX;
    } else if ( j > 60 )
    {
        j = 0 + moveX; 
    }

    num = j.toString();

    image.src = 'img/shin (' + num +').jpg';

    startingPoint = event.changedTouches[0].clientX; 
}
