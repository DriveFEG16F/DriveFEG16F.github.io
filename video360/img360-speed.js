var videoDuration;
var clipDuration;
var startingPoint;
var frame;
var moveX;
var fps = 25;
var num = 24; // Numbers of Video Clips

// Preload Images
// var image360 = document.getElementById('img360');
var imageHolder = document.getElementById('imagePlaceholder');
var imageArray = [];
var indx = 1;
var imgID;

for (var i = 1; i <= num; i++) 
{
    var I = i.toString();
    imageArray[i] = new Image();
    imageArray[i].src = 'image360/' + imgID + I +'.jpg';
    console.log("IMG: " + imageArray[i].src);
};

imageHolder.style.backgroundImage = "url(" + imageArray[1].src + ")";

var started = false;
var imgCONTROL = document.getElementById('imgTOUCHPAD');
imgCONTROL.addEventListener('mousedown', this.rotateMouseDown, false);
imgCONTROL.addEventListener('mousemove', this.rotateMouseMove, false);
imgCONTROL.addEventListener('mouseup', this.rotateMouseUp, false);
imgCONTROL.addEventListener("touchstart", this.rotateTouchStart, false);
imgCONTROL.addEventListener("touchmove", this.rotateTouchMove, false);
imgCONTROL.addEventListener("touchend", this.rotateTouchEnd, false);

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
}

function rotateTouchEnd(event)
{
    event.preventDefault();
    startingPoint = null;
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

        imageHolder.style.backgroundImage = "url(" + imageArray[indx].src + ")";
        // image360.src = imageArray[indx].src;
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

    imageHolder.style.backgroundImage = "url(" + imageArray[indx].src + ")";
    // image360.src = imageArray[indx].src;

    startingPoint = event.changedTouches[0].clientX; 
}