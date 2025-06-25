const cardsArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
let gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let matched = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(cardsArray);
  gameBoard.innerHTML = '';
  cardsArray.forEach((letter, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.letter = letter;
    card.dataset.index = index;
    card.innerHTML = '<img src="drag_drop_icon.png" />';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;
  this.classList.add('flipped');
  this.textContent = this.dataset.letter;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.letter === card2.dataset.letter && card1.dataset.index !== card2.dataset.index) {
    matched.push(card1, card2);
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.innerHTML = '<img src="drag_drop_icon.png" />';
    card2.innerHTML = '<img src="drag_drop_icon.png" />';
  }
  flippedCards = [];
  if (matched.length === cardsArray.length) {
    setTimeout(() => alert('🎉 You won!'), 300);
  }
}

createBoard();
