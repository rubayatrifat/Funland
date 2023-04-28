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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function showQuestion(data) {
    let correctAns = data.correct_answer;
    let incorrectAns = data.incorrect_answers;
    let optionsList = incorrectAns;
    optionsList.splice(Math.floor(Math.random() * (incorrectAns.lenght + 1)), 0, correctAns)
    
    shuffleArray(optionsList)
}

loadQuestion()

// For Math Area

const ansElm = document.getElementById('ans-input')
const subElm = document.getElementById('sub-input')
const firstValue = document.getElementById('first-value')
const lastValue = document.getElementById('last-value')
const theSumSign = document.querySelector('.sum')
const minus = document.getElementById('minus')
const multiply = document.getElementById('into')
const substract = document.getElementById('subs')
const next = document.getElementById('next')
const alertElm = document.querySelector('.alert')

let rand1
let rand2
let getRandomSign
let defaultSign
let mainAns

next.disabled = true

window.addEventListener('DOMContentLoaded', showRands)

function showRands() {
  rand1 = Math.ceil((Math.random() * 15) + 1)
  rand2 = Math.ceil((Math.random() * 9) + 1)
  
  firstValue.innerText = `${rand1}`
  lastValue.innerText = `${rand2}`
  
  getRandomSign = Math.ceil((Math.random()) * 3)
  
  if (minus.checked && getRandomSign === 1) {
    defaultSign = '-'
    mainAns = rand1 - rand2
  } else if (multiply.checked && getRandomSign === 2) {
    defaultSign = '×'
    mainAns = rand1 * rand2
  } else if (substract.checked && getRandomSign === 3) {
    defaultSign = '÷'
    mainAns = rand1 / rand2
  } else {
    defaultSign = '+'
    mainAns = rand1 + rand2
  }
  
  theSumSign.innerText = defaultSign
}

next.addEventListener('click', (evt) => {
  evt.preventDefault()
  
  showRands()
  
  next.disabled = true
})

function clearAlert() {
  alertElm.classList.remove('danger')
  alertElm.classList.remove('success')
  alertElm.innerText = ''
}

subElm.addEventListener('click', () => {
  const ansValue = ansElm.value
  
  if (ansValue === '') {
    alertElm.classList.remove('success')
    alertElm.innerText = 'Please fill out the input field.'
    alertElm.classList.add('danger')
    setTimeout(() => {
      clearAlert()
    }, 2000)
    
    return
  }
  
  if (mainAns == ansValue) {
    alertElm.classList.remove('danger')
    alertElm.innerText = 'You are correct. Press Next for another.'
    alertElm.classList.add('success')
    setTimeout(() => {
      clearAlert()
    }, 2000)
    
    ansElm.value = ''
    next.disabled = false
  } else {
    alertElm.classList.remove('success')
    alertElm.innerText = 'You are wrong!'
    alertElm.classList.add('danger')
    setTimeout(() => {
      clearAlert()
    }, 2000)
    
    ansElm.value = ''
  }
})

