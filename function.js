var a = 0;

 var controls = {
     stop: $('#row'),
        video: $("#video"),
        playpause: $("#btn-play-stop"),
     togglePlayback: function() {
        (video.paused) ? video.play() : video.pause();
    },
     total: $("#total"),
    buffered: $("#buffered"),
    progress: $("#current"),
    duration: $("#duration"),
    currentTime: $("#currenttime"),
    hasHours: false,
    };
var valumeT = document.getElementById("valume");

function valumeF(){
    video.volume = valumeT.value / 100;
};
                
    var video = controls.video[0];
               
    controls.playpause.click(function playbtn(){
        if (video.paused) {
            video.play();  
        } else {
            video.pause();
        }
                
        $(this).toggleClass("paused"); 
    });

controls.stop.click(function() {
    controls.togglePlayback();
});

video.addEventListener("canplay", function() {
    controls.hasHours = (video.duration / 3600) >= 1.0;                    
    controls.duration.text(formatTime(video.duration, controls.hasHours));
    controls.currentTime.text(formatTime(0),controls.hasHours);
}, false);

function formatTime(time, hours) {
    if (hours) {
        var h = Math.floor(time / 3600);
        time = time - h * 3600;
                    
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
                    
        return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
    } else {
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
                    
        return m.lead0(2) + ":" + s.lead0(2);
    }
}
            
Number.prototype.lead0 = function(n) {
    var nz = "" + this;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};

video.addEventListener("timeupdate", function() {
    controls.currentTime.text(formatTime(video.currentTime, controls.hasHours));
                    
    var progress = Math.floor(video.currentTime) / Math.floor(video.duration);
    controls.progress[0].style.width = Math.floor(progress * controls.total.width()) + "px";
}, false);

controls.total.click(function(e) {
    var x = (e.pageX - this.offsetLeft)/$(this).width();
    video.currentTime = x * video.duration ;
});

video.addEventListener("progress", function() {
    var buffered = Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
    controls.buffered[0].style.width =  Math.floor(buffered * controls.total.width()) + "px";
}, false);




function fullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.webkitRequestFullScreen ) {
    element.webkitRequestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
}

function fullScreenCancel() {
if(document.exitFullscreen) 
    document.exitFullscreen();
	    else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
	    else if(document.webkitCancelFullScreen) document.webkitCancelFullScreen();
	    else if(document.msExitFullscreen) document.msExitFullscreen();
	    else {
	    }
}



var canvas = document.getElementById("body");
$('#btn-screen').click(function(){
    if (a == 0) {
    fullScreen(canvas);
        a++
    } else if (a == 1) {
    fullScreenCancel();
        a = 0;
    }
});

var time = 10;
function onstop() {
    if (video.paused) {
        clearTimeout(time)
    } else {
    $('#nes').animate({opacity: "hide"}, 300);
    $('body').css("cursor", "none");
    $('#row').css("cursor", "none");
    }
};
$('#row').mousemove(function(){
  if(time) clearTimeout(time);
  time = setTimeout(onstop, 3000);
     $('#nes').animate({opacity: "show"}, 300);
    $('body').css("cursor", "default");
    $('#row').css("cursor", "default");
});
$('#row').mouseout(function(){
    (video.paused) ? clearTimeout(time) : 1+1;
});