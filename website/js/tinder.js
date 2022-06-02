
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the Tinder Pages
//
////////////////////////////////////////////////////////////////////////////////

let global_get_tinder_results; // evil global state

d3.csv("./data/tinder_books.csv").then(tinder_data => {

  var tinder_response_array = [];
  var tinder_index = 0;

  for (let i=0 ; i<tinder_data.length ; i++){

      // Grenerate a card
      var CardId = "TinderCard"+i;
      var TinderCard = document.createElement('div');
      TinderCard.classList.add("tinder--card");
      TinderCard.id = CardId;
      document.getElementById("TinderCards").appendChild(TinderCard);

     //Display the image
     var TinderImageUrl = tinder_data[i].coverImg;
     var TinderImg = document.createElement('img');
     TinderImg.src = TinderImageUrl;
     document.getElementById(CardId).appendChild(TinderImg);

     //Put the BookIds i the tinder_response_array
     tinder_response_array.push([tinder_data[i].bookId, 0]);
  }

  //////////////////////////////////////////////////////////// Tinder card Code
  'use strict';

  var tinderContainer = document.querySelector('.tinder');
  var allCards = document.querySelectorAll('.tinder--card');
  var nope = document.getElementById('nope');
  var love = document.getElementById('love');

  function initCards(card, index) {
    var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

    newCards.forEach(function (card, index) {
      card.style.zIndex = allCards.length - index;
      card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      card.style.opacity = (10 - index) / 10;
    });

    tinderContainer.classList.add('loaded');
  }

  initCards();

  allCards.forEach(function (el) {
    var hammertime = new Hammer(el);

    ///////////////// CARD MOVMENT ///////////////////////
    hammertime.on('pan', function (event) {
      el.classList.add('moving');
    });

    hammertime.on('pan', function (event) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
      tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });

    ///////////////// CARD RELEASE /////////////////
    hammertime.on('panend', function (event) {
      el.classList.remove('moving');
      tinderContainer.classList.remove('tinder_love');
      tinderContainer.classList.remove('tinder_nope');


      var moveOutWidth = document.body.clientWidth;
      var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

      event.target.classList.toggle('removed', !keep);

      ////////////////// COMME BACK //////////////////
      if (keep) {
        event.target.style.transform = '';

      ///////////////// VANISH ///////////////////
      } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        if(xMulti>0){
          tinder_response_array[tinder_index][1] = 1;
          tinder_index += 1;
        }else {
          tinder_response_array[tinder_index][1] = -1;
          tinder_index += 1;
        }

        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        initCards();
      }
    });
  });

  function createButtonListener(love) {
    return function (event) {
      var cards = document.querySelectorAll('.tinder--card:not(.removed)');
      var moveOutWidth = document.body.clientWidth * 1.5;

      if (!cards.length) return false;

      var card = cards[0];

      card.classList.add('removed');

      if (love) {
        card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
        tinder_response_array[tinder_index][1] = 1;
        tinder_index += 1;
      } else {
        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
        tinder_response_array[tinder_index][1] = -1;
        tinder_index += 1;
      }

      initCards();

      event.preventDefault();
    };
  }

  nope.addEventListener('click', createButtonListener(false));
  love.addEventListener('click', createButtonListener(true));

  global_get_tinder_results = function() {
    var ret = {};
    for ([book_id, score] of tinder_response_array) {
      ret[book_id] = (score == 1);
    }
    return ret;
  };
});
