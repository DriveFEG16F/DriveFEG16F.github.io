// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var BLOCK = document.getElementById("myBlock");
BLOCK.style.display = "none";

BLOCK.addEventListener('mousedown', this.onMouseDown, false);
BLOCK.addEventListener('mousemove', this.onMouseMove, false);
BLOCK.addEventListener('mouseup', this.onMouseUp, false);
BLOCK.addEventListener("touchstart", this.onTouchStart, false);
BLOCK.addEventListener("touchmove", this.onTouchMove, false);
BLOCK.addEventListener("touchend", this.onTouchEnd, false);

var videoDuration;
var clipDuration;
var startingPoint;
var frame;
var moveX;
var fps = 25;
var num = 23; // Numbers of Video Clips
var clicked = false;
var stopPoints = [];

function onMouseDown(event)
{   
    clicked = true;
    startingPoint = event.clientX;
    console.log("Clicked");
    console.log("Position: " + startingPoint);
    player.pauseVideo();
    // player.playVideo();
    // document.getElementById("touch").innerHTML = "TOUCH: " + startingPoint;
}

function onTouchStart(event)
{
    event.preventDefault();
    startingPoint = event.touches[0].clientX;
    player.pauseVideo();
    // player.playVideo();
    console.log("Position: " + startingPoint);
    // document.getElementById("touch").innerHTML = "TOUCH: " + startingPoint;
}

function onMouseUp(event)
{
    clicked = false;
    startingPoint = null;
    player.playVideo();
    console.log("Up");
    console.log("Position: " + startingPoint);
    console.log("Duration: " + videoDuration);
}

function onTouchEnd(event)
{
    event.preventDefault();
    startingPoint = null;
    player.playVideo();
    console.log("Up");
    console.log("Position: " + startingPoint);
    console.log("Duration: " + videoDuration);
}

function onMouseMove(event)
{
    if(clicked)
    {       
        moveX = event.clientX - startingPoint;
        // document.getElementById("move").innerHTML = "MOVE: " + moveX;

        if(moveX != 0)
        {
            moveX = moveX / Math.abs(moveX);    
        }

        console.log("moveX: " + moveX);

        frame = player.getCurrentTime() + ( clipDuration * moveX ) + ( 1 / fps );

        console.log("Time: " + player.getCurrentTime());

        if(frame <= 0)
        {
            frame = videoDuration + frame;
        }
        if(frame > videoDuration)
        {
            frame = frame - videoDuration;
        }

        // document.getElementById("frame").innerHTML = "FRAME: " + frame;
        console.log("Fram: " + frame);
       
        player.seekTo(frame, true); // player.seekTo(seconds:Number, allowSeekAhead:Boolean)
        // player.pauseVideo();

        startingPoint = event.clientX;       
    }
}

function onTouchMove(event)
{
    event.preventDefault();

    moveX = event.changedTouches[0].clientX - startingPoint;
    // document.getElementById("move").innerHTML = "MOVE: " + moveX;

    if(moveX != 0)
    {
        moveX = moveX / Math.abs(moveX);    
    }

    console.log("moveX: " + moveX);

    frame = player.getCurrentTime() + ( clipDuration * moveX ) + ( 1 / fps );

    console.log("Time: " + player.getCurrentTime());

    if(frame <= 0)
    {
        frame = videoDuration + frame;
    }
    if(frame > videoDuration)
    {
        frame = frame - videoDuration;
    }

    // document.getElementById("frame").innerHTML = "FRAME: " + frame;
    console.log("Fram: " + frame);

    player.seekTo(frame, true); // player.seekTo(seconds:Number, allowSeekAhead:Boolean)
    // player.pauseVideo();

    startingPoint = event.changedTouches[0].clientX; 
}

// Youtube
var player, time_update_interval = 0;

function onYouTubeIframeAPIReady() 
{
    player = new YT.Player
    (
        'video-placeholder', 
        {
            // width: 1280,
            // height: 720,
            videoId: '8Yl_ghvgXFI',
            playerVars: 
            {
                'playsinline': 1,
                'autoplay': 0, 
                'controls': 0,
                'rel': 0,
                'showinfo': 0,
            },
            events: 
            {
                'onReady': initialize,
                'onStateChange': onPlayerStateChange
            }
        }
    );
}

function initialize()
{

    // Update the controls on load
    // updateTimerDisplay();
    // updateProgressBar();
    player.mute();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval
    (
        function () 
        {
            // updateTimerDisplay();
            // updateProgressBar();
            // stopVideo();
            // document.getElementById("time").innerHTML = "TIME: " + player.getCurrentTime();
        }, 1/fps
    );

    // GetDuration must be called from onYouTubePlayerReady
    videoDuration = player.getDuration();
    clipDuration = videoDuration / num;

    for (var i = 0; i < num; i++) {
        stopPoints[i] = clipDuration * (i+1);
    }
    
    // document.getElementById("duration").innerHTML = "DURATION: " + videoDuration;
    // document.getElementById("clip").innerHTML = "CLIP: " + clipDuration;
    // document.getElementById("fps").innerHTML = "FPS: " + fps;
    // document.getElementById("stoppoints").innerHTML = "STOPPOINTS: " + stopPoints;
}

//Playing
function onPlayerStateChange(event)
{
    if (event.data == YT.PlayerState.PLAYING)
    {
        // document.getElementById("state").innerHTML = "State: " + "Playing";
        BLOCK.style.display = "block";
    }
}

//Stop
function stopVideo()
{
    for (var i = 0; i < n; i++) 
    {
        if(player.getCurrentTime() > (stopPoints[i] - (4/fps)) && player.getCurrentTime() < (stopPoints[i] + (4/fps)))
        {
            player.pauseVideo();
            BLOCK.removeEventListener('mousedown', this.onMouseDown, false);
            BLOCK.removeEventListener('mousemove', this.onMouseMove, false);
            BLOCK.removeEventListener('mouseup', this.onMouseUp, false);
            BLOCK.removeEventListener("touchstart", this.onTouchStart, false);
            BLOCK.removeEventListener("touchmove", this.onTouchMove, false);
            BLOCK.removeEventListener("touchend", this.onTouchEnd, false);

        }
    }
}


//
var image360 = document.getElementById('img360');
var imageHolder = document.getElementById('image-placeholder');
var imageArray = [];
var indx = 1;

for (var i = 1; i <= 23; i++) 
{
    var I = i.toString();
    imageArray[i] = new Image();
    imageArray[i].src = 'img/shin (' + I +').jpg';
    console.log("IMG: " + imageArray[i].src);
};

var imageBLOCK = document.getElementById('img-Block');
imageBLOCK.addEventListener('mousedown', this.rotateMouseDown, false);
imageBLOCK.addEventListener('mousemove', this.rotateMouseMove, false);
imageBLOCK.addEventListener('mouseup', this.rotateMouseUp, false);
imageBLOCK.addEventListener("touchstart", this.rotateTouchStart, false);
imageBLOCK.addEventListener("touchmove", this.rotateTouchMove, false);
imageBLOCK.addEventListener("touchend", this.rotateTouchEnd, false);


var started = false;

function rotateMouseDown(event)
{   
    started = true;
    startingPoint = event.clientX;
    console.log("Start");
    console.log("Position: " + startingPoint);
}

function rotateTouchStart(event)
{
    event.preventDefault();
    startingPoint = event.touches[0].clientX;
}

function rotateMouseUp(event)
{
    started = false;
    startingPoint = null;
    console.log("Up");
    frame = player.getCurrentTime() + ( clipDuration * indx );
    player.seekTo(frame, false);

    imageBLOCK.removeEventListener('mousedown', this.rotateMouseDown, false);
    imageBLOCK.removeEventListener('mousemove', this.rotateMouseMove, false);
    imageBLOCK.removeEventListener('mouseup', this.rotateMouseUp, false);
    imageBLOCK.removeEventListener("touchstart", this.rotateTouchStart, false);
    imageBLOCK.removeEventListener("touchmove", this.rotateTouchMove, false);
    imageBLOCK.removeEventListener("touchend", this.rotateTouchEnd, false);
    imageBLOCK.style.display = "none";
    imageHolder.style.display = "none";
}

function rotateTouchEnd(event)
{
    event.preventDefault();
    startingPoint = null;
    frame = player.getCurrentTime() + ( clipDuration * indx );
    player.seekTo(frame, false);

    imageBLOCK.removeEventListener('mousedown', this.rotateMouseDown, false);
    imageBLOCK.removeEventListener('mousemove', this.rotateMouseMove, false);
    imageBLOCK.removeEventListener('mouseup', this.rotateMouseUp, false);
    imageBLOCK.removeEventListener("touchstart", this.rotateTouchStart, false);
    imageBLOCK.removeEventListener("touchmove", this.rotateTouchMove, false);
    imageBLOCK.removeEventListener("touchend", this.rotateTouchEnd, false);
    imageBLOCK.style.display = "none";
    imageHolder.style.display = "none";

}

function rotateMouseMove(event)
{
    if(started)
    {
        moveX = event.clientX - startingPoint;

        if(moveX != 0)
        {
            moveX = moveX / Math.abs(moveX);    
        }

        console.log("moveX: " + moveX);

        indx = indx + moveX;

        if (indx < 1)
        {
            indx = 24 + moveX;
        } 
        else if ( indx > 23 )
        {
            indx = 0 + moveX; 
        }

        image360.src = imageArray[indx].src;
        startingPoint = event.clientX;  
    }
}

function rotateTouchMove(event)
{
    event.preventDefault();

    moveX = event.changedTouches[0].clientX - startingPoint;

    if(moveX != 0)
    {
        moveX = moveX / Math.abs(moveX);    
    }

    console.log("moveX: " + moveX);

    indx = indx + moveX;
    
    if (indx < 1)
    {
        indx = 24 + moveX;
    } 
    else if ( indx > 23 )
    {
        indx = 0 + moveX; 
    }

    image360.src = imageArray[indx].src;

    startingPoint = event.changedTouches[0].clientX; 
}