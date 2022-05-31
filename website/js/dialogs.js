
////////////////////////////////////////////////////////////////////////////////
//
// JavaScript code for the dialog animations of Philippe the librarian
//
////////////////////////////////////////////////////////////////////////////////

const button_l1_s1 = document.getElementById('speech-button-l1-s1');
const dialog_l1_s1 = document.getElementById('dialog_l1_s1');
const texts_l1_s1 = [`I will help you find <br> your next read &nbsp; &nbsp; =3`, `First, tell me which <br> books you would read!`, `Swipe right to start! <br> <i class="fa-solid fa-arrow-right-long yellow" onclick="myFullpage.moveSlideRight();"></i>`];
var current_txt_l1_s1=0;
button_l1_s1.addEventListener('click', function() {dialog_l1_s1.innerHTML=texts_l1_s1[current_txt_l1_s1%texts_l1_s1.length]; current_txt_l1_s1+=1;});

const button_l2_s1 = document.getElementById('speech-button-l2-s1');
const dialog_l2_s1 = document.getElementById('dialog_l2_s1');
const texts_l2_s1 = [`Now let's check on<br>your preferences!`, `Go and tune the widgets<br>in the next pages &nbsp; <i class="fa-solid fa-arrow-right-long yellow" onclick="myFullpage.moveSlideRight();"></i>`];
var current_txt_l2_s1=0;
button_l2_s1.addEventListener('click', function() {current_txt_l2_s1+=1; dialog_l2_s1.innerHTML=texts_l2_s1[current_txt_l2_s1%texts_l2_s1.length];});


const button_l2_s5 = document.getElementById('speech-button-l2-s5');
const dialog_l2_s5 = document.getElementById('dialog_l2_s5');
const texts_l2_s5 = [`With this in mind...`, `Let's look at your<br>results! &nbsp; <i class="fa-solid fa-arrow-down yellow" onclick="myFullpage.moveSectionDown();"></i>`];
var current_txt_l2_s5=0;
button_l2_s5.addEventListener('click', function() {dialog_l2_s5.innerHTML=texts_l2_s5[current_txt_l2_s5%texts_l2_s5.length]; current_txt_l2_s5+=1;});
