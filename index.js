console.log("hello");
document.addEventListener("DOMContentLoaded", function() {
    var pointer = document.getElementById("circulo1"),
        pointerBox = pointer.getBoundingClientRect(),
        centerPoint = window.getComputedStyle(pointer).transformOrigin,
        centers = centerPoint.split(" ");
    console.log("ola");

    function rotatePointer(e) {
        var pointerEvent = e;
        if (e.targetTouches && e.targetTouches[0]) {
            e.preventDefault();
            pointerEvent = e.targetTouches[0];
            mouseX = pointerEvent.pageX;
            mouseY = pointerEvent.pageY;
        } else {
            mouseX = e.clientX,
                mouseY = e.clientY;
        }

        var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
            centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
            radians = Math.atan2(mouseX - centerX, mouseY - centerY),
            degrees = (radians * (180 / Math.PI) * -1) + 180;
        pointer.style.transform = 'rotate('+degrees+'deg)';
    }

    window.addEventListener('mousemove', rotatePointer);
    window.addEventListener('touchmove', rotatePointer);
    window.addEventListener('touchstart', rotatePointer);
});

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
