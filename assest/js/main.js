// For Jokes Area

const newJokeBtn = document.querySelector('.get-another')
const jokeElm = document.querySelector('.get-joke')

document.addEventListener('DOMContentLoaded', getJoke)

newJokeBtn.addEventListener('click', getJoke)

async function getJoke() {
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });

    const jokeObj = await jokeData.json()

    jokeElm.textContent = jokeObj.joke
}

// For Floting Ballons

const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 4;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}



window.addEventListener("load", () => {
  createBalloons(10)
});

// For Quiz Section

const questionElm = document.querySelector('#question')
const options = document.querySelector('options')

async function loadQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple'
    const result = await fetch(`${apiUrl}`)
    const data = await result.json()
    showQuestion(data.results[0])
}


function showQuestion(data) {
    let correctAns = data.correct_answer;
    console.log(correctAns)
}

loadQuestion()