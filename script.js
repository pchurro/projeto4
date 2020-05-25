let faces;
let video = document.getElementById("cam_input"); // video is the id of video tag
let src;
let dst;
let cap;

function openCvReady() {
  cv['onRuntimeInitialized']=()=>{

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    });
    src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let gray = new cv.Mat();
    cap = new cv.VideoCapture(cam_input);
    faces = new cv.RectVector();
    let classifier = new cv.CascadeClassifier();
    let utils = new Utils('errorMessage');
    let faceCascadeFile = 'haarcascade_frontalface_default.xml'; // path to xml
    utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
    classifier.load(faceCascadeFile); // in the callback, load the cascade from file
});
    const FPS = 24;
    function processVideo() {
        let begin = Date.now();
        cap.read(src);
        src.copyTo(dst);
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
        try{
            classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
        }catch(err){
        }
        for (let i = 0; i < faces.size(); ++i) {
            let face = faces.get(i);
            let point1 = new cv.Point(face.x, face.y);
            let point2 = new cv.Point(face.x + face.width, face.y + face.height);
            cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
        }
        cv.imshow("canvas_output", dst);
        // schedule next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
}
// schedule first one.
setTimeout(processVideo, 0);

  };
}


var mic=new Microphone();
mic.initialize();
console.log(mic.isInitialized());

annyang.setLanguage("en-EN");
annyang.start({continuous:false});

var buildingsNumber=9;
var sec=3000;
var micBuffer=500;
var camBuffer=200;
var getMicData;
var getCamData;

var freqs = [];
var amps = [];
var movements = [];
var lastX;
var lastY;
var newX;
var newY;
var secondsTalked;
var counter=0;

var buildings = [];

var listening=false;
var vidEnded=false;

annyang.addCallback('soundstart', function() {
  console.log('sound detected');
  if (listening==true) listen();
});

annyang.addCallback('result', function() {
  console.log('sound stopped');
  if (listening==true) stop();
});

function testListening(){
    console.log("now testing");
    mic.startListening();
    setInterval(function(){
          console.log(mic.getMaxInputAmplitude());
      },100);
}

function checkVolume(){
    var isOk;
    var treshold=-30;
    mic.startListening();
    if (mic.getMaxInputAmplitude()>treshold) isOk=true;
    else isOk=false;
    mic.stopListening();
    return isOk;
}

function start(){
    listening=true;
}

function listen(){
    mic.startListening();
   let face = faces.get(0);
   oldX=(video.width)/2;
   oldY=(video.height)/2;

    getMicData = setInterval(function(){
           freqs.push(mic.getFreq(1));
           amps.push(mic.getMaxInputAmplitude());
       },micBuffer);

   getCamData = setInterval(function(){
       newX = face.x;
       newY = face.y;
       var distance = math.distance([newX,newY], [oldX,oldY]);
       movements.push(distance);
       oldX=newX;
       oldY=newY;
   },camBuffer);
}

function stop(){
    mic.stopListening();
    clearInterval(getMicData);
    clearInterval(getCamData);

    var totalAmp = 0;
    var totalFreq = 0;
    var totalMovements = 0;

    for (var i=0;i<amps.length;i++){
        totalAmp-=amps[i];
        totalFreq+=freqs[i];
    }
    for (var i=0;i<movements.length;i++){
        totalMovements+=movements[i];
    }
    var averageAmp = (totalAmp)/(amps.length);
    var averageMovement = totalMovements/movements.length;
    var averageFreq = totalFreq/(amps.length);
    var secondsTalked = amps.length/2;

    console.log(counter);
    console.log(averageAmp);
    console.log(averageFreq);
    console.log(secondsTalked);
    console.log(averageMovement);

    if (secondsTalked>=1){
        var building= new Building(counter,averageAmp,averageFreq,secondsTalked,averageMovement);
        buildings.push(building);
        counter++;
    }

    freqs= [];
    amps= [];
    movements= [];


    // if video acabou e counter != buildingsNumber = try again

}

function checkVidEnd(){
    if (counter>=buildingsNumber){ // and video acabou
        stopAndLoad(true);
    }else if(counter<buildingsNumber){
        stopAndLoad(false);
    }
}

function stopAndLoad(success){
    listening=false;
    src.delete();
    dst.delete();

    document.getElementById("cam_input").remove();
    document.getElementById("canvas_output").remove();
    document.getElementById("show_video").remove();

    if (success){
    document.getElementById("result").style.display="block";

    createBuildingsSilhouette();
    createTopsSilhouette();
    createWindows();
    resizeCanvas();
    }else{
    document.getElementById("unsucessful").style.visibility="visible";
    }
}

jQuery(document).ready(function() {

    var mouseX = 0, mouseY = 0;
    var xp = 0, yp = 0;

    $(document).mousemove(function(e){
        mouseX = e.pageX - 10;
        mouseY = e.pageY - 10;
    });

    setInterval(function(){
        xp += ((mouseX - xp)/6);
        yp += ((mouseY - yp)/6);
        $("#circle").css({left: xp +'px', top: yp +'px'});
    }, 10);

});


function tryAgain(){
    window.location.href = 'index.html';
}
