
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the Tinder Pages
//
////////////////////////////////////////////////////////////////////////////////

// Copy paste of tinder_books.csv
const csv_data = `bookId,coverImg
2767052-the-hunger-games,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg
2.Harry_Potter_and_the_Order_of_the_Phoenix,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg
2657.To_Kill_a_Mockingbird,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg
1885.Pride_and_Prejudice,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg
370493.The_Giving_Tree,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1174210942l/370493._SX318_.jpg
968.The_Da_Vinci_Code,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1579621267l/968.jpg
24213.Alice_s_Adventures_in_Wonderland_Through_the_Looking_Glass,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327872220l/24213.jpg
24280.Les_Mis_rables,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1411852091l/24280.jpg
18144590-the-alchemist,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1466865542l/18144590._SY475_.jpg
7144.Crime_and_Punishment,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1382846449l/7144.jpg
22628.The_Perks_of_Being_a_Wallflower,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1520093244l/22628.jpg
375802.Ender_s_Game,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408303130l/375802.jpg
17245.Dracula,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387151694l/17245.jpg
13496.A_Game_of_Thrones,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562726234l/13496.jpg
1381.The_Odyssey,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1390173285l/1381.jpg
4214.Life_of_Pi,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320562005l/4214.jpg
44767458-dune,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg
3590.The_Adventures_of_Sherlock_Holmes,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1164045516l/3590.jpg
2429135.The_Girl_with_the_Dragon_Tattoo,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327868566l/2429135.jpg
4934.The_Brothers_Karamazov,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1427728126l/4934.jpg
99107.Winnie_the_Pooh,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1298440130l/99107.jpg
49552.The_Stranger,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1590930002l/49552._SY475_.jpg
11588.The_Shining,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1353277730l/11588.jpg
99561.Looking_for_Alaska,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394798630l/99561.jpg
1618.The_Curious_Incident_of_the_Dog_in_the_Night_Time,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1479863624l/1618._SY475_.jpg
119073.The_Name_of_the_Rose,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1415375471l/119073.jpg
22034.The_Godfather,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394988109l/22034._SY475_.jpg
830502.It,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1334416842l/830502.jpg
1845.Into_the_Wild,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1403173986l/1845.jpg
33.The_Lord_of_the_Rings,https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg`

// Transform data to object
const tinder_data = d3.csvParse(csv_data);

/* TRY TO LOAD the csv but failure...
$.ajax({
  url: "../data/tinder_books.csv",
  type: 'get',
    dataType: 'text',
    success: function(data) {
        let lines = data.split('\n');
        let fields = lines[0].split(',');

        let output = [];

        for(let i = 1; i < lines.length; i++){
           let current = lines[i].split(',');
           let doc = {};
           for(let j = 0; j < fields.length; j++){
               doc[fields[j]] = current[j];
           }
           output.push(doc);
        }

        console.log(output);
    },
    error: function(jqXHR, textStatus, errorThrow){
        console.log(textStatus);
    }
});*/

// url="https://github.com/com-480-data-visualization/datavis-project-2022-team_philippe/blob/8b84a52b56336569ba6bbdaa528d2fae74f91cbc/data/tinder_books.csv"


var tinder_response_array = new Array(tinder_data.length).fill(0);
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
   //TinderImg.style.width = "80%";
   //TinderImg.style.height = "auto";
   document.getElementById(CardId).appendChild(TinderImg);
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
        tinder_response_array[tinder_index] = 1;
        tinder_index += 1;
      }else {
        tinder_response_array[tinder_index] = -1;
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
      tinder_response_array[tinder_index] = 1;
      tinder_index += 1;
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
      tinder_response_array[tinder_index] = -1;
      tinder_index += 1;
    }

    initCards();

    event.preventDefault();
  };
}


var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);
