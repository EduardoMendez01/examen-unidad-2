const totalcards = 30;
let cards = [];
let selectedCards = [];
let valueUsed = [];
let currentMove = 0;

let cardTemplate = '<div class="card"><div class="back"><div class="face"></div></div>';


for(let i=0; i < totalcards; i++){
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
}
                
            