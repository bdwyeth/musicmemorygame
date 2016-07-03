//global object for colors and audio and gameState
var maxLevel = 5,
audio = {
  trumpet   : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/trumpet.wav"),
                onColor: '#00FF00'},
  xylophone : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/xylophone.wav"),
                onColor: '#66B2FF'},
  guitar    : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/guitar.wav"),
                onColor: '#FF0000'},
  bongo     : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/bongo.wav"),
                onColor: '#FFFF00'}
},

gameState = {
  pattern : instrumentList(maxLevel),
  playerInputArray : [],
  playerInputLevel : 1 //initial level = 1
};

$(document).ready(function(){

  $("#trumpet").click(function() {
    clickedInstruments(this.id);
  });

  $("#xylophone").click(function() {
    clickedInstruments(this.id);
  });

  $("#guitar").click(function() {
    clickedInstruments(this.id);
  });

  $("#bongo").click(function() {
    clickedInstruments(this.id);
  });

  $("#button-startGame").click(function() {
    startPlayback(gameState.playerInputLevel);
    document.getElementById("levelCount").value = gameState.playerInputLevel;
    document.getElementById("bongo").disabled = false;
    document.getElementById("guitar").disabled = false;
    document.getElementById("xylophone").disabled = false;
    document.getElementById("trumpet").disabled = false;
  });

  $("#button-strict").click(function() {
    alert('strict');
  });

});

//main function

function generalFunction(){
  console.log(gameState.playerInputArray, gameState.pattern);
  if(checkPattern()){console.log('true');}
}


function gameAdvancer(){


}




function checkPattern(){
  function checkArrayEqual(element,index){
    return element === gameState.pattern[index];
  }
  return gameState.playerInputArray.every(checkArrayEqual);
}



function clickedInstruments(inputInstrument){
  playInstrument(audio[inputInstrument].sound);
  $('#'+inputInstrument).effect("highlight", {color:audio[inputInstrument].onColor}, 1000);
  gameState.playerInputArray.push(inputInstrument);
  generalFunction();
}

function instrumentList(instrumentLength){
  var x =[];
  for(var i = 0; i < instrumentLength; i++){
      var randomInt = getRandomInt(0,3)
      x.push(Object.keys(audio)[randomInt]);
  };
  return x;
};


function startPlayback(level){
  console.log(gameState.pattern);
  for (i = 0; i < level; ++i) {
    setDelay(i);
  }
  function setDelay(i) {
    setTimeout(function(){
      $('#'+gameState.pattern[i]).effect("highlight", {color:audio[gameState.pattern[i]].onColor}, 1000);
      playInstrument(audio[gameState.pattern[i]].sound);
    }, 1110*i);
    }
};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function playInstrument(inst){
  inst.play();
}
