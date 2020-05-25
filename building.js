function convertValue(oldValue, oldMin, oldMax, newMin, newMax){
    oldRange = (oldMax - oldMin);
    newRange = (newMax - newMin);
    newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin;

    return newValue;
}

class Building {
    constructor(number, averageAmp, averageFreq,secondsTalked, averageMovement) {
        this.number = number;
        this.averageAmp = averageAmp;
        this.averageFreq = averageFreq;
        this.secondsTalked = secondsTalked;
        this.averageMovement = averageMovement;
        this.heightValue = 11 - (Math.round(convertValue(this.averageAmp, 60, 130, 1, 10)));
        this.widthValue=function(){
            return 4 - (Math.round(convertValue(this.secondsTalked, 1, 4, 1, 3)));
        }
        this.top=Math.round(convertValue(this.averageFreq, 0, 2000, 1, 5));
        this.windows=Math.round(convertValue(this.averageMovement, 7, 25, 5, 20));
        this.building=`images/buildings/${this.heightValue}/${this.widthValue()}.png`;
        this.topImage=`images/tops/${this.top}/${this.widthValue()}.png`;
        this.width=function(){
            var w;
            if(this.widthValue()==1) {w = 210}
            else if (this.widthValue()==2) {w = 140}
            else if (this.widthValue()==3) {w =  72};
            return w;
        }
        this.height=function(){
            return this.heightValue*100;
        }
        this.topWidth=function(){
            var w;
            if (this.widthValue()==1) {w = 153}
            else if (this.widthValue()==2) {w = 108}
            else if (this.widthValue()==3) {w = 43};
            return w;
        }

        this.topHeight=function(){
            var w;
            if (this.widthValue()==1) {w = 141}
            else if (this.widthValue()==2) {w = 100}
            else if (this.widthValue()==3) {w = 42};
            return w;
        }
        this.posX=function(){
            if (this.number==0) {
                return 0;
            }else{
                var xCounter=0;
                for (var i=0;i<this.number;i++){
                    xCounter+=buildings[i].width();
                }
                return xCounter;
            }
        }
        this.posY = function(){
            return 1000 - this.height();
        }
        this.topPosY = function(){
            return 1000 - this.height() - this.topHeight();;
        }

    }

}


function createBuildingsSilhouette(){
    var canvasWidth = function(){
        var maxWidth=0;
        for (var i=0;i<buildings.length;i++){
            maxWidth+=buildings[i].width();
        }
        return maxWidth;
    }

    var canvasHeight = 1000;
    var canvas = document.getElementById("canvasSilhouette");
    canvas.setAttribute("width", canvasWidth());
    canvas.setAttribute("height", canvasHeight);

    const getContext = () => canvas.getContext("2d");

    const loadImage = url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`load ${url} fail`));
        img.src = url;
      });
    };

    const depict = options => {
      const ctx = getContext();
      const myOptions = Object.assign({}, options);
      return loadImage(myOptions.building).then(img => {
        ctx.drawImage(img, myOptions.posX(), myOptions.posY(), myOptions.width(), myOptions.height());
      });
    };

    buildings.forEach(depict);

}

function createTopsSilhouette(){

    var canvasWidth = function(){
        var maxWidth=0;
        for (var i=0;i<buildings.length;i++){
            maxWidth+=buildings[i].width();
        }
        return maxWidth;
    }

    var canvas = document.getElementById("canvasSilhouette");

    const getContext = () => canvas.getContext("2d");

    const loadImage = url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`load ${url} fail`));
        img.src = url;
      });
    };

    const top = options => {
      const ctx = getContext();
      const myOptions = Object.assign({}, options);
      return loadImage(myOptions.topImage).then(img => {
        ctx.drawImage(img, myOptions.posX() + (myOptions.width() - myOptions.topWidth())/2, myOptions.topPosY() + 3,myOptions.topWidth(),myOptions.topHeight());
      });
    };

    buildings.forEach(top);
}

function createWindows(){

    var canvas = document.getElementById("canvasSilhouette");
    var ctx = canvas.getContext("2d");
    var canvasHeight=1000;

    const getContext = () => canvas.getContext("2d");

    const loadImage = url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`load ${url} fail`));
        img.src = url;
      });
    };

    var windows =[];
    var x=0;


    for (var i=0;i<buildings.length; i++){
        var y=canvasHeight - buildings[i].height() - 150;
        if (buildings[i].widthValue() == 3){
            for (var j=0;j<buildings[i].windows;j++){
                var windowSrc = `images/windows/janela${getRndInteger(1, 4)}.png`
                var posX = buildings[i].posX() + buildings[i].width()/3;
                var posY = 50 + buildings[i].posY() + 75 * j;
                windows.push({src:windowSrc,x:posX,y:posY});
            }
        }else if (buildings[i].widthValue() == 2){
            var incX=1;
            var incY=0;
            for (var j=0;j<buildings[i].windows;j++){
                var windowSrc = `images/windows/janela${getRndInteger(1, 4)}.png`
                var posX = buildings[i].posX() + 50*incX - 20;
                var posY = 50 + buildings[i].posY() + 75 * incY;
                windows.push({src:windowSrc,x:posX,y:posY});
                if (incX==2){
                    incX=1;
                    incY++;
                }else incX++;
            }
        }else if (buildings[i].widthValue() == 1){
            var incX=1;
            var incY=0;
            for (var j=0;j<buildings[i].windows;j++){
                var windowSrc = `images/windows/janela${getRndInteger(1, 4)}.png`
                var posX = buildings[i].posX() + 50*incX - 10;
                var posY = 50 + buildings[i].posY() + 75 * incY;
                windows.push({src:windowSrc,x:posX,y:posY});
                if (incX==3){
                    incX=1;
                    incY++;
                }else incX++;
            }
        }
    }

    const depict = options => {
      const ctx = getContext();
      const myOptions = Object.assign({}, options);
      return loadImage(myOptions.src).then(img => {
        ctx.drawImage(img, myOptions.x, myOptions.y);
      });
    };

    windows.forEach(depict);



}

function resizeCanvas(){
    var canvas = document.getElementById("canvasSilhouette");
    var ctx = canvas.getContext("2d");
    canvas.setAttribute("height", 250);
    var canvasWidth = function(){
        var maxWidth=0;
        for (var i=0;i<buildings.length;i++){
            maxWidth+=buildings[i].width();
        }
        return maxWidth;
    }

    canvas.setAttribute("width", canvasWidth()/4);

    ctx.scale(0.25, 0.25);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


function testSilhouette(){

     for (var i=0; i<11;i++){
         var building= new Building(i,getRndInteger(60,130),getRndInteger(0,2000),getRndInteger(1.5,5),getRndInteger(10,20));
         buildings.push(building);
    }

    createBuildingsSilhouette();
    createTopsSilhouette();
    createWindows();
    resizeCanvas();

    console.log(buildings);


}


function generatePoster(){

    var cWidth = 595;
    var cHeight = 824
    var c= document.getElementById("poster");

    c.setAttribute("width",cWidth);
    c.setAttribute("height",cHeight);
    c.setAttribute("style","display:block;");

    document.getElementById("download").setAttribute("style","display:block;");

    var name=document.getElementById("poster_name").value;
    var title=document.getElementById("poster_title").value;
    var size=document.getElementById("sizes");
    var sizeValue = size.options[size.selectedIndex].value;

    if (sizeValue=="Small") var scale=2;
    if (sizeValue=="Medium") var scale=1.5;
    if (sizeValue=="Large") var scale=1;

    var sourceCanvas=document.getElementById("canvasSilhouette");
    var ctx=c.getContext('2d');

    ctx.drawImage(sourceCanvas,cWidth/2 - (sourceCanvas.width/scale)/2,cHeight/2 - (sourceCanvas.height/scale)/2,sourceCanvas.width/scale,sourceCanvas.height/scale);
    console.log(cWidth/2 - (sourceCanvas.width/scale)/2);
    ctx.textAlign = "center";
    ctx.font = "60px Blatant-Bold";
    ctx.fillText(title.toUpperCase(),cWidth/2,cHeight/6);

    ctx.font = "20px Blatant";
    ctx.fillText(name.toUpperCase(),cWidth/4, 7*cHeight/8);

    var d = new Date();
    var date = d.getDate() + "/0" + d.getMonth() + "/" + d.getFullYear();

    ctx.fillText(date.toUpperCase(),3*cWidth/4, 7*cHeight/8);

    var finalText="If everyone is so busy doing something, how can we achieve a perfect world? We start confusing work with fun and we think wealth is the best state of living. It may take time, but we can all achieve a better world. We just have to stop, and feel what’s around us.  Your city reflects you, make it a downtown! ";
    wrapText(ctx,finalText.toUpperCase(),cWidth/2,cHeight- cHeight/12,390,12,"Blatant");

    ctx.globalCompositeOperation = 'destination-over';
    // Now draw!
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, cWidth, cHeight);

}

function wrapText(context, text, x, y, maxWidth, fontSize, fontFace) {
    var words = text.split(' ');
    var line = '';
    var lineHeight = fontSize+2;

    context.font = fontSize + "px " + fontFace;
    context.textAlign="center";

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

download_img = function(el) {
    var canvas = document.getElementById("poster");
  var image = canvas.toDataURL("image/jpg");
  el.href = image;
};
