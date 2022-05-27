var next = document.getElementById('next');
var text = document.getElementById('bulle-text');

var i=0;

function callback_next(event){
  i+=1;
  //console.log(i)
  switch (i) {
    case 1:
      text.innerHTML  = `I will help you find <br> your next read &nbsp; &nbsp; =3`;
      break;
    case 2:
      text.innerHTML  = `First, tell me about <br> what books you like!`;
  }
  //event.preventDefault();
}

next.addEventListener('click', callback_next);
