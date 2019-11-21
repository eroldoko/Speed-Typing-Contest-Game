let userArea = document.querySelector('#userArea');
let comp1Area = document.querySelector('#comp1');
let comp2Area = document.querySelector('#comp2');
let comp3Area = document.querySelector('#comp3');
let userBtn = document.querySelector('#userButton');
let comp1Btn = document.querySelector('#comp1Button');
let comp2Btn = document.querySelector('#comp2Button');
let comp3Btn = document.querySelector('#comp3Button');
let startButton = document.querySelector('#startButton');
let infoDiv = document.querySelector('#info');

let text1 = ["It is a beautiful day today", "Yesterday was a bit cloudy", "Tomorow will be just fine", "How are you feeling today?", "This summer is going to be realy hot!"];
let text2 = ["Too many people spend money they haven’t earned, to buy things they don’t want, to impress people they don’t like.", "Sarcasm helps keep you from telling people what you really think of them.", "When someone says, “You’ve Changed”, it simply means you’ve stopped living your life their way.", "I haven’t failed at anything, I’ve just found all the wrong ways of doing it."];
let text3 = ["Maybe it’s true, maybe we don’t know what we have until we’ve lost it. But maybe it’s also true that we don’t know what we’re missing until we find it.", "I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", "Once you learn how to be happy, you won’t tolerate being around people who make you feel anything less.", "People are made to be loved and things are made to be used. There is much chaos in this world because things are being loved and people are being used."];

let info = document.querySelector('h1');
let name = document.getElementById('name')
let nameOk = document.getElementsByClassName('okName')[0]
let modal = document.getElementsByClassName('modal')[0]

modal.style.display = "block"
name.value = ""

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    userBtn.innerHTML = name.value + " - Position :"
    modal.style.display = "none"
  }
})

nameOk.addEventListener('click', function(e) {
  userBtn.innerHTML = name.value + " - Position :"
  modal.style.display = "none"
})

level = 1;
position = 0;
posArray = []
rand = 0;

startButton.addEventListener('click', start);
userArea.addEventListener('keyup', userFinished);

//Game start and game logic
function start() {
  startButton.removeEventListener('click', start);
  userArea.value = ""
  comp1Area.value = ""
  comp2Area.value = ""
  comp3Area.value = ""

  userBtn.innerHTML = name.value + " - Position :"
  comp1Btn.innerHTML = "Player 2 - Position : "
  comp2Btn.innerHTML = "Player 3 - Position : "
  comp3Btn.innerHTML = "Player 4 - Position : "

  userBtn.className = "btn btn-warning form-control";
  comp1Btn.className = "btn btn-warning form-control";
  comp2Btn.className = "btn btn-warning form-control";
  comp3Btn.className = "btn btn-warning form-control";
  position = 0;
  posArray.length = 0;
  let counter = 4;

//Starting a level based on progress
  let loop = setInterval(() => {
    counter--;
    startButton.style.color = "white"
    startButton.innerHTML = counter;
    if (counter == 0 && level == 1) {
      clearInterval(loop);
      startButton.style.display = "none";
      game(text1, 250, 250);

    } else if (counter == 0 && level == 2) {
      clearInterval(loop);
      startButton.style.display = "none";
      game(text2, 150, 200);
    } else if (counter == 0 && level == 3) {
      clearInterval(loop);
      startButton.style.display = "none";
      game(text3, 100, 100);
    }
  }, 1000)
}

//Game function with randomly choosen Text and difficulty parameters.
function game(texts, a, b) {
  chooseText(texts);
  comp1Start(texts, a, b);
  comp2Start(texts, a, b);
  comp3Start(texts, a, b);
}
function chooseText(texts) {
  rand = Math.floor(Math.random() * texts.length);
  info.innerHTML = texts[rand];
  infoDiv.style.display = "block";
  userArea.focus();
}
//Player's 1 begining of typing, and checking progress
function comp1Start(texts, a, b) {
  let textArray = texts[rand].split(""); 
  loop1 = setInterval(() => {
    if (textArray.length > 0) {
      comp1Area.value += textArray.shift();
    } else {
      clearInterval(loop1);
      position++;
      posArray.push(position)
      checkEndGame()
      comp1Btn.className = "btn btn-success form-control";
      comp1Btn.innerHTML = "Player 2 - Position : " + position;

      if (position == 1) {
        info.innerHTML = " ";
        info.innerHTML = "Winner Player 2";
      }
    }
  }, Math.ceil(Math.random() * a + b))
}
//Player's 2 begining of typing, and checking progress
function comp2Start(texts, a, b) {

  let textArray = texts[rand].split("");
  loop2 = setInterval(() => {
    if (textArray.length > 0) {
      comp2Area.value += textArray.shift();
    } else {
      clearInterval(loop2);
      position++;
      posArray.push(position)
      checkEndGame()
      comp2Btn.className = "btn btn-success form-control";
      comp2Btn.innerHTML = "Player3 - Position : " + position;

      if (position == 1) {
        info.innerHTML = " ";
        info.innerHTML = "Winner Player 3";

      }
    }
  }, Math.ceil(Math.random() * a + b))
}
//Player's 3 begining of typing, and checking progress
function comp3Start(texts, a, b) {
  //console.log(texts[rand]);
  let textArray = texts[rand].split("");
  //console.log(textArray);
  loop3 = setInterval(() => {
    if (textArray.length > 0) {
      comp3Area.value += textArray.shift();
    } else {
      clearInterval(loop3);
      position++;
      posArray.push(position)
      checkEndGame()
      comp3Btn.className = "btn btn-success form-control";
      comp3Btn.innerHTML = "Player4 - Position : " + position;

      if (position == 1) {
        info.innerHTML = " ";
        info.innerHTML = "Winner Player 4";
      }
    }
  }, Math.ceil(Math.random() * a + b))
}

//Checking User progress upon completed sentence
function userFinished(e) {
  if (e.keyCode == 13) {
    let userText = userArea.value.trim();
    if (level == 1) {
      if (userText == text1[rand]) {
        position++;
        posArray.push(position)
        checkEndGame()
        userBtn.className = "btn btn-success form-control";
        userBtn.innerHTML = name.value + " - Position : " + position;
        if (position == 1 && level == 1) {
          clearIntervals()
          info.innerHTML = " ";
          info.innerHTML = "Winner " + name.value

          level++;
          startButton.style.display = "block";
          startButton.innerHTML = "Start Level 2"
          startButton.addEventListener('click', start)
        }
      } else {
        userBtn.className = "btn btn-danger form-control"
      }
    } else if (level == 2) {
      if (userText == text2[rand]) {
        position++;
        posArray.push(position)
        checkEndGame()
        userBtn.className = "btn btn-success form-control";
        userBtn.innerHTML = name.value + " - Position : " + position;

        if (position == 1 && level == 2) {
          clearIntervals()
          info.innerHTML = " ";
          info.innerHTML = "Winner " + name.value

          level++;
          startButton.style.display = "block";
          startButton.innerHTML = "Start Level 3"
          startButton.addEventListener('click', start)
        }
      } else {
        userBtn.className = "btn btn-danger form-control"
      }
    } else if (level == 3) {
      if (userText == text3[rand]) {
        position++;
        posArray.push(position)
        checkEndGame()
        userBtn.className = "btn btn-success form-control";
        userBtn.innerHTML = name.value + " - Position : " + position;

        if (position == 1 && level == 3) {
          clearIntervals()
          info.innerHTML = " ";
          info.innerHTML = "Winner " + name.value + "<br> Congratulations, Game Over!"
          level = 1;
          startButton.addEventListener('click', start)
          startButton.style.display = "block";
          startButton.innerHTML = "Start New Game"
        }

      } else {
        userBtn.className = "btn btn-danger form-control"
      }
    }
  }
}
function checkEndGame() {
  if (posArray.length == 3) {
    clearIntervals()
    startButton.style.display = "block";
    startButton.innerHTML = "Start Over?"
    startButton.addEventListener('click', start);
  }
}
function clearIntervals() {
  clearInterval(loop1)
  clearInterval(loop2)
  clearInterval(loop3)
}
