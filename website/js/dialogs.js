
// ============================== Dialog animations of cat Philippe ===================================

const button_l1_s1 = document.getElementById('speech-button-l1-s1');
const dialog_l1_s1 = document.getElementById('dialog_l1_s1');
const texts_l1_s1 = [`I will help you find <br> your next read &nbsp; &nbsp; =3`, `First, tell me which <br> books you would read!`, `Swipe right to start! <br> <i class="fa-solid fa-arrow-right-long" onclick="myFullpage.moveSlideRight();"></i>`];
var current_txt_l1_s1=0;
button_l1_s1.addEventListener('click', function() {dialog_l1_s1.innerHTML=texts_l1_s1[current_txt_l1_s1%3]; current_txt_l1_s1+=1;});

const button_l2_s1 = document.getElementById('speech-button-l1-s1');
const dialog_l2_s1 = document.getElementById('dialog_l1_s1');
const texts_l2_s1 = [];
var current_txt_l2_s1=0;
button_l1_s1.addEventListener('click', function() {dialog_l1_s1.innerHTML=texts_l1_s1[current_txt_l1_s1%3]; current_txt_l1_s1+=1;});
