
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the BookPrice widget
//
////////////////////////////////////////////////////////////////////////////////

const reveal_button = document.getElementById("face-coin");
const hide_button = document.getElementById("stacked_coins");
const coin_unit_text = document.getElementById("coin-price");
const philippe_popup = document.getElementById("p7-popup");

const MAX_NB_COINS = 9;
const MIN_NB_COINS = 2;
const CSS_ANIM_DURATION = 800;
var nb_displayed_coins = 2;

const txt_price_cheap = "If it's not super cheap, I'm not in!";
const txt_price_fair = "Fair prices... fair readings!";
const txt_price_expensive = "Wathever the price, it will be mine!";

reveal_button.addEventListener("click", function() {
  if(nb_displayed_coins<MAX_NB_COINS) {
    const curr_coin = "coin" + (nb_displayed_coins-1).toString()
    document.getElementById(curr_coin).classList.toggle("m-fadeIn");
    nb_displayed_coins += 1;

    if(nb_displayed_coins> Math.floor(MAX_NB_COINS*(2/3))) {
      coin_unit_text.innerHTML = txt_price_expensive;
    } else if (nb_displayed_coins>Math.floor(MAX_NB_COINS*(1/3))) {
      coin_unit_text.innerHTML = txt_price_fair;
    }

    if(nb_displayed_coins==MAX_NB_COINS) {
      setTimeout(function(){
          philippe_popup.classList.toggle("m-fadeIn");
      }, CSS_ANIM_DURATION+200);

      philippe_popup.classList.toggle("m-fadeIn");
    }
  }
});

hide_button.addEventListener("click", function() {
  if(nb_displayed_coins>MIN_NB_COINS) {
    const curr_coin = "coin" + (nb_displayed_coins-2).toString()
    document.getElementById(curr_coin).classList.toggle("m-fadeIn");
    document.getElementById(curr_coin).classList.toggle("m-fadeOut");
    setTimeout(function(){
        document.getElementById(curr_coin).classList.toggle("m-fadeOut");
    }, CSS_ANIM_DURATION);
    nb_displayed_coins -= 1;

    if(nb_displayed_coins<=Math.floor(MAX_NB_COINS*(1/3))) {
      coin_unit_text.innerHTML = txt_price_cheap;
    } else if (nb_displayed_coins<=Math.floor(MAX_NB_COINS*(2/3))) {
      coin_unit_text.innerHTML = txt_price_fair;
    }
  }
});
