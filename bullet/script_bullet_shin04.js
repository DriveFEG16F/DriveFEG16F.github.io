var BLOCK = document.getElementById("myBlock");
BLOCK.style.display = "none";

var videoDuration;
var clipDuration;
var startingPoint;
var frame;
var moveX;
var fps = 25;
var n = 23;
var stopPoints = [];


var clicked = false;

function onMouseDown(event)
{   
    clicked = true;
    startingPoint = event.clientX;
    console.log("Clicked");
    console.log("Position: " + startingPoint);
    player.pauseVideo();
    // player.playVideo();
    document.getElementById("data").innerHTML = "TOUCH: " + startingPoint;
}

function onTouchStart(event)
{
    event.preventDefault();
    startingPoint = event.touches[0].clientX;
    // player.pauseVideo();
    player.playVideo();
    console.log("Position: " + startingPoint);
    document.getElementById("data").innerHTML = "TOUCH: " + startingPoint;
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
        document.getElementById("data").innerHTML = "MOVE:" + moveX;
        document.getElementById("current").innerHTML = "CURRENT:" + player.getCurrentTime();

        if(moveX != 0)
        {
            moveX = moveX / Math.abs(moveX);    
        }

        console.log("moveX: " + moveX);

        frame = player.getCurrentTime() + ( clipDuration * moveX ) + ( 1 / fps );
        document.getElementById("myframe").innerHTML = "FRAME:" + frame;

        console.log("Time: " + player.getCurrentTime());

        if(frame <= 0)
        {
            frame = videoDuration + frame;
        }
        if(frame > videoDuration)
        {
            frame = frame - videoDuration;
        }

        console.log("Fram: " + frame);
       
        player.seekTo(frame);
        // player.pauseVideo();

        startingPoint = event.clientX;       
    }
}

function onTouchMove(event)
{
    // event.preventDefault();
    player.playVideo();

    moveX = event.changedTouches[0].clientX - startingPoint;
    document.getElementById("data").innerHTML = "MOVE:" + moveX;


    if(moveX != 0)
        {
            moveX = moveX / Math.abs(moveX);    
        }

    console.log("moveX: " + moveX);

    frame = player.getCurrentTime() + ( clipDuration * moveX ) + ( 1 / fps );
    document.getElementById("myframe").innerHTML = "FRAME:" + frame;
    document.getElementById("current").innerHTML = "CURRENT:" + player.getCurrentTime();

    console.log("Time: " + player.getCurrentTime());

    if(frame <= 0)
        {
            frame = videoDuration + frame;
        }
    if(frame > videoDuration)
        {
            frame = frame - videoDuration;
        }

    console.log("Fram: " + frame);

    player.seekTo(frame);
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
                'controls': 0
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
    updateTimerDisplay();
    updateProgressBar();
    // stopVideo();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval
    (
        function () 
        {
            updateTimerDisplay();
            updateProgressBar();
            onTouchMove;
            // stopVideo();
            document.getElementById("time").innerHTML = "Time: " + player.getCurrentTime();
        }, 1/fps
    );

    // GetDuration must be called from onYouTubePlayerReady
    videoDuration = player.getDuration();
    clipDuration = videoDuration / 23;

    for (var i = 0; i < n; i++) {
        stopPoints[i] = clipDuration * (i+1);
    }

    document.getElementById("duration").innerHTML = "Duration: " + videoDuration;
    document.getElementById("clip").innerHTML = "Clip: " + clipDuration;
    document.getElementById("fps").innerHTML = "FPS: " + fps;
    document.getElementById("stop").innerHTML = "Stop Points: " + stopPoints + ", ";

    

    BLOCK.addEventListener('mousedown', this.onMouseDown, false);
    BLOCK.addEventListener('mousemove', this.onMouseMove, false);
    BLOCK.addEventListener('mouseup', this.onMouseUp, false);
    BLOCK.addEventListener("touchstart", this.onTouchStart, false);
    BLOCK.addEventListener("touchmove", onTouchMove, false);
    BLOCK.addEventListener("touchend", onTouchEnd, false);

}

//Playing
function onPlayerStateChange(event)
{
    if (event.data == YT.PlayerState.PLAYING)
    {
        document.getElementById("state").innerHTML = "State: " + "Playing";
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
            BLOCK.removeEventListener("touchmove", onTouchMove, false);
            BLOCK.removeEventListener("touchend", onTouchEnd, false);

        }
    }
}


// This function is called by initialize()
function updateTimerDisplay()
{

}


// This function is called by initialize()
function updateProgressBar()
{
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);    
}


// Progress bar
$('#progress-bar').on
(
    'mouseup touchend', function (e) 
    {
        // Calculate the new time for the video.
        // new time in seconds = total duration in seconds * ( value of range input / 100 )
        var newTime = player.getDuration() * (e.target.value / 100);

        // Skip video to new time.
        player.seekTo(newTime);
    }
);


// Playback

$('#play').on
(
    'click', function () 
    {
        player.playVideo();
    }
);


$('#pause').on
(
    'click', function () 
    {
        player.pauseVideo();
    }
);


// Other options


$('#speed').on('change', function () {
    player.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
});


// Playlist

$('#next').on('click', function () {
    player.nextVideo()
});

$('#prev').on('click', function () {
    player.previousVideo()
});


// Load video

$('.thumbnail').on('click', function () {

    var url = $(this).attr('data-video-id');

    player.cueVideoById(url);

});


// Helper Functions

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}


$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
});
