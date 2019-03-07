// IIFE
// Imediately invoked function expression

const App = (function(d) {
  'use strict';

  let app = {};

  app.init = function() {
    endGame();
  };

  app.startGame = function(){
    //do something
  };

  function endGame(){
    document.getElementById('end-game').addEventListener('click', function (){
      //ends our game
    });
  }

  return app;

}(document));

App.init();
