const totalcards = 30;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valueUsed = [];
let currentMove = 0;
let currentAttemps = 0;
let isMusicPlaying = false;
let gameActive = true;

let cardTemplate = '<div class="back"></div><div class="face"></div>';

const clickSound = new Audio('sounds/sonidoCarta.mp3');
const backgroundMusic = new Audio('sounds/musicaFondo.mp3');
const successSound = new Audio('sounds/sonidoPar.mp3');
const shuffleSound = new Audio('sounds/barajeo.mp3'); 

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

let timeLeft = 150;

const timerDisplay = document.querySelector('#timer');
timerDisplay.innerHTML = `Tiempo restante: ${timeLeft}s`;

const timer = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.innerHTML = `Tiempo restante: ${timeLeft}s`;
    } else {
        gameActive = false;
        clearInterval(timer);
        alert('¡Se acabó el tiempo!');
    }
}, 1000);

function activate(e) {
    if (!gameActive) return;

    const card = e.currentTarget;

    if (!isMusicPlaying) {
        backgroundMusic.play();
        isMusicPlaying = true;
    }

    clickSound.currentTime = 0;
    clickSound.play();

    if (currentMove < 2 && !card.classList.contains('active')) {
        card.classList.add('active');
        selectedCards.push(card);

        if (++currentMove === 2) {
            currentAttemps++;
            document.querySelector('#stats').innerHTML = currentAttemps + ' intentos';

            const firstCardValue = selectedCards[0].querySelector('.face').innerHTML;
            const secondCardValue = selectedCards[1].querySelector('.face').innerHTML;

            if (firstCardValue === secondCardValue) {
                successSound.currentTime = 0;
                successSound.play();
                selectedCards = [];
                currentMove = 0;
            } else {
                setTimeout(() => {
                    selectedCards[0].classList.remove('active');
                    selectedCards[1].classList.remove('active');
                    selectedCards = [];
                    currentMove = 0;
                }, 600);
            }

            if (currentAttemps % 5 === 0) {
                shuffleCards();
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * totalcards * 0.5);
    let values = valueUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valueUsed.push(rnd);
    } else {
        randomValue();
    }
}

function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

function shuffleCards() {
    shuffleSound.currentTime = 0; 
    shuffleSound.play(); 

    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('shuffling');
    });

    setTimeout(() => {
        valueUsed = [];
        cards.forEach((card, i) => {
            randomValue();
            card.querySelector('.face').innerHTML = getFaceValue(valueUsed[i]);
            card.classList.remove('active');
        });

        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('shuffling');
            });
        }, 1000);
    }, 500);
}

for (let i = 0; i < totalcards; i++) {
    let div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = cardTemplate;
    cards.push(div);

    randomValue();
    div.querySelector('.face').innerHTML = getFaceValue(valueUsed[i]);

    div.addEventListener('click', activate);

    document.querySelector('#game').append(div);
}










                
            