var faixa1 = new Pz.Sound('./music/faixa1.wav');
var faixa2 = new Pz.Sound('./music/faixa2.wav');
var faixa3 = new Pz.Sound('./music/faixa3.wav');
var faixa4 = new Pz.Sound('./music/faixa4.wav');
var faixa5 = new Pz.Sound('./music/faixa5.wav');
var faixa6 = new Pz.Sound('./music/faixa6.wav');
var faixa7 = new Pz.Sound('./music/faixa7.wav');
var faixa8 = new Pz.Sound('./music/faixa8.wav');
var faixa9 = new Pz.Sound('./music/faixa9.wav');
var faixa10 = new Pz.Sound('./music/faixa10.wav');

faixa3.volume = 0;
faixa4.volume = 0;
faixa5.volume = 0;
faixa6.volume = 0;
faixa7.volume = 0;
faixa8.volume = 0;
faixa9.volume = 0;
faixa10.volume = 0;

var melodia = new Pizzicato.Group([faixa1, faixa2, faixa3, faixa4, faixa5, faixa6, faixa7, faixa8, faixa9, faixa10]);

var timer = 10;
//document.addEventListener("click", toca);
//document.addEventListener("click", check);

function playMusic(){
    toca();
    check();
}

function toca() {
    melodia.play();
    console.log("ISTO ESTÁ A TOCAR");
    //setInterval(check, 4800);
}

var nrfaixas = new Array(8);
var j = 0;
var vol = 0;

function check() {

    for (var i = 0; i < buildings.length; i++) {

        nrfaixas[i] =parseInt(buildings[i].height()/100);
        console.log("Nr de Faixas:"+nrfaixas[i]);


    }
    setInterval(faixas, 4800);

    function faixas() {
      console.log("A tocar:"+nrfaixas[i]);
        if (j <= 7) {
            if (nrfaixas[j] === 1) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 0;
                faixa4.volume = 0;
                faixa5.volume = 0;
                faixa6.volume = 0;
                faixa7.volume = 0;
                faixa8.volume = 0;
                faixa9.volume = 0;
                faixa10.volume = 0;
            }
            if (nrfaixas[j] === 2) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 0;
                faixa4.volume = 0;
                faixa5.volume = 0;
                faixa6.volume = 0;
                faixa7.volume = 0;
                faixa8.volume = 0;
                faixa9.volume = 0;
                faixa10.volume = 0;
            }
            if (nrfaixas[j] === 3) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 0;
                faixa5.volume = 0;
                faixa6.volume = 0;
                faixa7.volume = 0;
                faixa8.volume = 0;
                faixa9.volume = 0;
                faixa10.volume = 0;
            }
            if (nrfaixas[j] === 4) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 1;
                faixa5.volume = 0;
                faixa6.volume = 0;
                faixa7.volume = 0;
                faixa8.volume = 0;
                faixa9.volume = 0;
                faixa10.volume = 0;
            }
            if (nrfaixas[j] === 5) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 1;
                faixa5.volume = 1;
                faixa6.volume = 0;
                faixa7.volume = 0;
                faixa8.volume = 0;
                faixa9.volume = 0;
                faixa10.volume = 0;
            }
            if (nrfaixas[j] === 6) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 1;
                faixa5.volume = 1;
                faixa6.volume = 1;
                faixa7.volume = 0;
                faixa8.volume = 0;
                faixa9.volume = 0;
                faixa10.volume = 0;
            }
            if (nrfaixas[j] === 7) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 1;
                faixa5.volume = 1;
                faixa6.volume = 1;
                faixa7.volume = 1;
                faixa8.volume = 0;
                faixa9.volume = 0;
                faixa10.volume = 0;
            }
            if (nrfaixas[j] === 8) {


                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 1;
                faixa5.volume = 1;
                faixa6.volume = 1;
                faixa7.volume = 1;
                faixa8.volume = 1;
                faixa9.volume = 0;
                faixa10.volume = 0;

            }
            if (nrfaixas[j] === 9) {

                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 1;
                faixa5.volume = 1;
                faixa6.volume = 1;
                faixa7.volume = 1;
                faixa8.volume = 1;
                faixa9.volume = 1;
                faixa10.volume = 0;

            }
            if (nrfaixas[j] === 10) {
                faixa1.volume = 1;
                faixa2.volume = 1;
                faixa3.volume = 1;
                faixa4.volume = 1;
                faixa5.volume = 1;
                faixa6.volume = 1;
                faixa7.volume = 1;
                faixa8.volume = 1;
                faixa9.volume = 1;
                faixa10.volume = 1;
            }
            j++;
        }
    }


}
