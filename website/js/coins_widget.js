
const reveal_button = document.getElementById("thug-button");
const hide_button = document.getElementById("also-thug-button");

const MAX_NB_COINS = 6
const CSS_ANIM_DURATION = 800;
var nb_displayed_coins = 0

reveal_button.addEventListener("click", function() {
  if(nb_displayed_coins<MAX_NB_COINS) {
    const curr_coin = "coin" + (nb_displayed_coins+1).toString()
    document.getElementById(curr_coin).classList.toggle("m-fadeIn");
    nb_displayed_coins += 1;
  }
});

hide_button.addEventListener("click", function() {
  if(nb_displayed_coins>0) {
    const curr_coin = "coin" + nb_displayed_coins.toString()
    document.getElementById(curr_coin).classList.toggle("m-fadeIn");
    document.getElementById(curr_coin).classList.toggle("m-fadeOut");
    setTimeout(function(){
        document.getElementById(curr_coin).classList.toggle("m-fadeOut");
    }, CSS_ANIM_DURATION);
    nb_displayed_coins -= 1;
  }
});
