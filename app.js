"use strict";

/**
 * classList:
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 *
 * dataset:
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 */

const MatchingGameApp = (function() {

  let app = {};

  let picks = [];

  let timer;

  let students = [
    'Shannon',
    'Judy',
    'Jordan (The developer)',
    'Yara',
    'Amanda',
    'Barbara',
    'Kyle',
    'Alicia',
    'Steve'
  ];

  app.init = function () {
    console.log("MatchingGameApp Loaded");
    startGame();
    selectCard();
  }

  function startGame() {
    // add event listener to button
    document.getElementById('gamecontrol').addEventListener('click', function() {
      //remove the hidden class from all of our cards
      document.querySelectorAll('.card').forEach(function(card) {
        card.classList.remove('hidden', 'selected', 'match');
      });
      assignCards();
      startTime();
    });
  }

  function startTime(){
    clearInterval(timer);
    document.getElementById('timer').innerHTML = '0:00';
    timer = setInterval(function(){
      let currTime = document.getElementById('timer').innerHTML,
        min = new Number(currTime.split(':')[0]),
        sec = new Number(currTime.split(':')[1]);
      sec += 1;
      if (sec == 60) {
        min += 1;
        sec = 0;
      }
      document.getElementById('timer').innerHTML = min.toString() + ":" + (sec < 10 ? '0' + sec.toString() : sec.toString());
    }, 1000);
  }

  function assignCards(){
    let studentsDoubled = students.concat(students).sort(function () {
      return 0.5 - Math.random();
    });
    document.querySelectorAll('.card').forEach(function(card){
      let name = studentsDoubled.shift();
      card.dataset.name = name;
      card.querySelector('.student-name').innerHTML = name;
    });
  }

  function selectCard(){
  //select al cards
    document.querySelectorAll('.card').forEach(function (card) {
      //add an event listener to each card
      card.addEventListener('click', function() {
        //EARLY OUT: prevent users from clicking selected card twice
        if (card.classList.contains('selected')){
          return;
        }
        //when card is clicked add the 'selected' class
        card.classList.add('selected');
        picks.push(card);
        if(picks.length === 2) {
          setTimeout(function(){
            compareCards();
            picks = [];
          }, 1000)
        }
      });
    });
  }

  function compareCards () {
    if (picks[0].dataset.name !== picks[1].dataset.name) {
      picks.forEach(function(card){
        card.classList.remove('selected');
      });
    } else {
      picks.forEach(function (card){
        card.classList.add('match');
      });
      if(document.querySelectorAll('.card.match').length === 18) {
        clearInterval(timer);
      }
    }
  }

  return app;

}());

document.addEventListener("DOMContentLoaded", function(){
  MatchingGameApp.init();
})
