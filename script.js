const totalcards = 30;
const availableCards = [
    'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', 
    '♠', '♥', '♦', '♣', '☀', '✈', '⚽', '♫', '★', '✔', '☺'
];
let cards = [];
let selectedCards = [];
let valueUsed = [];
let matchedCards = [];
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

let timeLeft = 100;

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

    if (currentMove < 2 && !card.classList.contains('active') && !matchedCards.includes(card)) {
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

              
                matchedCards.push(selectedCards[0], selectedCards[1]);

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

function randomizeCards() {
    valueUsed = [];
    const cardPairs = totalcards / 2;
    let values = [];

    for (let i = 0; i < cardPairs; i++) {
        let value = availableCards[i % availableCards.length];
        values.push(value, value); 
    }

    values = values.sort(() => Math.random() - 0.5);
    return values;
}

function shuffleCards() {
    shuffleSound.currentTime = 0;
    shuffleSound.play();

    document.querySelectorAll('.card').forEach(card => {
        
        if (!matchedCards.includes(card)) {
            card.classList.add('shuffling');
            card.classList.remove('active');
        }
    });

    setTimeout(() => {
        const newValues = randomizeCards();

        cards.forEach((card, i) => {
            if (!matchedCards.includes(card)) {
                card.querySelector('.face').innerHTML = newValues[i];
            }
        });

        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('shuffling');
            });
        }, 1000);
    }, 500);
}


function initializeGame() {
    const cardValues = randomizeCards();

    for (let i = 0; i < totalcards; i++) {
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = cardTemplate;
        cards.push(div);

        div.querySelector('.face').innerHTML = cardValues[i]; 

        div.addEventListener('click', activate);

        document.querySelector('#game').append(div);
    }
}


initializeGame();
















                
            