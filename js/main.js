var pattern = [],
maxCycle = 20,
audio = {
  trumpet   : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/trumpet.wav"),
                onColor: '#00FF00'},
  xylophone : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/xylophone.wav"),
                onColor: '#66B2FF'},
  guitar    : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/guitar.wav"),
                onColor: '#FF0000'},
  bongo     : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/bongo.wav"),
                onColor: '#FFFF00'}
};

console.log(audio);

for(var i = 0; i < maxCycle; i++){
    var randomInt = getRandomInt(0,3)
    pattern.push(Object.keys(audio)[randomInt]);
};

$(document).ready(function() {


  $("#trumpet").click(function() {
    audio.trumpet.sound.play();
  });

  $("#xylophone").click(function() {
    audio.xylophone.sound.play();
  });

  $("#guitar").click(function() {
    audio.guitar.sound.play();
  });

  $("#bongo").click(function() {
    audio.bongo.sound.play();
  });

  $("#button-start").click(function() {
    this.style.backgroundColor = this.style.backgroundColor == 'blue' ? 'red' : 'blue';
  });

  $("#button-random").click(function() {


    for (i = 0; i < pattern.length; ++i) {
      setDelay(i);
    }

    function setDelay(i) {
      setTimeout(function(){
        $('#'+pattern[i]).effect("highlight", {color:audio[pattern[i]].onColor}, 1000);
        playInstrument(audio[pattern[i]].sound);
      }, 1110*i);
    }

  });

});



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function playInstrument(inst){
  inst.play();
}
