//global object for colors and audio and gameState
var maxLevel = 20,
wrongSound = new Audio("http://benjaminwyeth.com/fccsimon/sounds/wrong.wav"),
audio = {
  trumpet   : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/trumpet.wav"),
                onColor: '#00FF00'},
  xylophone : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/xylophone.wav"),
                onColor: '#66B2FF'},
  guitar    : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/guitar.wav"),
                onColor: '#FF0033'},
  bongo     : { sound: new Audio("http://benjaminwyeth.com/fccsimon/sounds/bongo.wav"),
                onColor: '#FFFF00'}
},

gameState = {
  pattern : instrumentList(maxLevel),
  playerInputArray : [],
  playerInputLevel : 1,  //initial level = 1
  terminal: false,
  strictMode: false,
  on: false
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
    gameState.on = !gameState.on;
    document.getElementById("levelCount").value = 'Level '+gameState.playerInputLevel;
    document.getElementById("bongo").disabled = !gameState.on;
    document.getElementById("guitar").disabled = !gameState.on;
    document.getElementById("xylophone").disabled = !gameState.on;
    document.getElementById("trumpet").disabled = !gameState.on;

    if(gameState.on){
      startPlayback(gameState.playerInputLevel);
    }else{
      document.getElementById("levelCount").value = 'OFF';
    }
  });

  $("#button-strict").click(function() {
    gameState.strictMode = !gameState.strictMode;
    console.log(gameState.strictMode);
  });

  $(document).on('click', '.toggle-button', function() {
    $(this).toggleClass('toggle-button-selected');
  });

});

//main function

function generalFunction(){
  if(checkPattern() && gameState.playerInputArray.length < gameState.playerInputLevel && !gameState.terminal){
    console.log('interval correct')
  }else if(checkPattern() && gameState.playerInputArray.length === gameState.playerInputLevel && !gameState.terminal){
    console.log('Level Complete');
    gameState.playerInputArray = [];
    gameState.playerInputLevel++;

    function waitNext(){
      document.getElementById("levelCount").value = 'Level '+gameState.playerInputLevel;
      console.log('starting next level '+gameState.playerInputLevel)
        if(gameState.playerInputLevel === (maxLevel+1)){
          gameState.terminal = true;
          console.log('game ended, max level reached');
          document.getElementById("levelCount").value = 'Congrats';
          flashCorrect();
          resetGameVanilla();
        }
        else{startPlayback(gameState.playerInputLevel);}
    }
    setTimeout(waitNext, 2000);

  }else if(!checkPattern()){

    function waitWrong(){
      wrongSound.play();
      flashWrong();
      flashWrong();
      if(gameState.strictMode){resetGameStrict();}
      else if(!gameState.strictMode){resetGameNonStrict();}
    }
    setTimeout(waitWrong, 500);
  }

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

function flashWrong(){

    $('#trumpet').effect("highlight", {color: 'FF0000' }, 1000);
    $('#guitar').effect("highlight", {color: 'FF0000' }, 1000);
    $('#xylophone').effect("highlight", {color: 'FF0000' }, 1000);
    $('#bongo').effect("highlight", {color: 'FF0000' }, 1000);

}

function flashCorrect(){

    $('#trumpet').effect("highlight", {color: '00FF00' }, 1000);
    $('#guitar').effect("highlight", {color: '00FF00' }, 1000);
    $('#xylophone').effect("highlight", {color: '00FF00' }, 1000);
    $('#bongo').effect("highlight", {color: '00FF00' }, 1000);

}

function resetGameVanilla(){
  gameState.pattern = instrumentList(maxLevel);
  gameState.playerInputArray =[];
  gameState.playerInputLevel = 1;
  document.getElementById("levelCount").value = 'Restart!';
  function waitWrong1(){
    document.getElementById("levelCount").value = 'Level '+gameState.playerInputLevel;
    startPlayback(gameState.playerInputLevel);
  }
  setTimeout(waitWrong1, 4000);
}

function resetGameStrict(){
  gameState.pattern = instrumentList(maxLevel);
  gameState.playerInputArray =[];
  gameState.playerInputLevel = 1;
  document.getElementById("levelCount").value = 'Incorrect!';
  function waitWrong1(){
    document.getElementById("levelCount").value = 'Level '+gameState.playerInputLevel;
    startPlayback(gameState.playerInputLevel);
  }
  setTimeout(waitWrong1, 4000);
  function waitWrong2(){
    document.getElementById("levelCount").value = 'Resetting';
  }
  setTimeout(waitWrong2, 2000);
}

function resetGameNonStrict(){
  gameState.playerInputArray =[];
  document.getElementById("levelCount").value = 'Incorrect!';
  function waitWrong1(){
    document.getElementById("levelCount").value = 'Level '+gameState.playerInputLevel;
    startPlayback(gameState.playerInputLevel);
  }
  setTimeout(waitWrong1, 4000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function playInstrument(inst){
  inst.play();
}
