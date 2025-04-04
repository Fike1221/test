'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  diceEl.classList.add('hidden');
  updateScores('score--0', scores[0]);
  updateScores('score--1', scores[1]);
  updateScores('current--0', currentScore);
  updateScores('current--1', currentScore);

  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
// Switching the Player functionality
const switchPlayer = () => {
  currentScore = 0;
  updateScores(`current--${activePlayer}`, currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const updateScores = (selector, message) => {
  document.getElementById(selector).textContent = message;
};

// initialize the whole game
init();

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;

    // check if rolled is 1: if true switch to next player
    if (randomDice !== 1) {
      // Add Dicce to current score
      currentScore += randomDice;
      updateScores(`current--${activePlayer}`, currentScore);
    } else {
      switchPlayer(); //switch here...
    }
  }
});

// holding the score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1: Add the current score to the Active player's Score;
    scores[activePlayer] += currentScore;
    updateScores(`score--${activePlayer}`, scores[activePlayer]);
    // 2: check if the current player wins;
    if (scores[activePlayer] >= 20) {
      // finish the game
      playing = false; // finish here
      diceEl.classList.add('hidden');
      updateScores(`current--${activePlayer}`, 0);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent =
        '🥇 Winner 🎉';
    } else {
      switchPlayer(); //Switch here...
    }
  }
});

// Start new game
btnNew.addEventListener('click', init);
