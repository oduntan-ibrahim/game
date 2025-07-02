document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('rock');
  }else if (event.key === 'p') {
    playGame('paper');
  }else if (event.key === 's') {
    playGame('scissors');
  }else if (event.key === 'a') {
    autoPlay()
  }
});

/*
function keyBoardMove(event) {
  if (event.key === 'r'){
    playGame('rock');
  }else if (event.key === 'p') {
    playGame('paper');
  }else if (event.key === 's') {
    playGame('scissors');
  }else if (event.key === 'a') {
    autoPlay()
  }
}
*/

let score = JSON.parse(localStorage.getItem('score')) || {
          wins: 0,
          losses: 0,
          ties: 0
        };

      updateScoreElement();
      
      /*if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        };
      }*/
      
      let isAutoPlaying = false;
      let intervalid;

      function autoPlay() {
        if (!isAutoPlaying) {
          intervalid = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1500);
        isAutoPlaying = true;
        } else{
          clearInterval(intervalid);
          isAutoPlaying = false;
        }
        const autoButton = document.querySelector('.js-autoplay');
        if (autoButton.innerText === 'Auto play'){
          autoButton.innerText = 'Stop play';
        }else if (autoButton.innerText === 'Stop play'){
          autoButton.innerText ='Auto play';
        }
      }

      document.querySelector('.js-rock-button')
        .addEventListener('click', () => { playGame('rock') });
      
      document.querySelector('.js-paper-button')
        .addEventListener('click', () => { playGame('paper') });

      document.querySelector('.js-scissors-button')
        .addEventListener('click', () => { playGame('scissors') });

      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = '';
        if  (playerMove === 'scissors') {
          if(computerMove === 'rock'){
            result = 'You lose';
          }else if (computerMove === 'paper'){
            result = 'You win';
          }else if (computerMove === 'scissors'){
            result = 'Tie'
          };
        }else if (playerMove === 'paper') {
          if(computerMove === 'rock'){
            result = 'You win';
          }else if (computerMove === 'paper'){
            result = 'Tie';
          }else if (computerMove === 'scissors'){
            result = 'You lose';
          };
        }else if (playerMove === 'rock') {
          if(computerMove === 'rock'){
            result = 'Tie';
          }else if (computerMove === 'paper'){
            result = 'You lose';
          }else if (computerMove === 'scissors'){
            result = 'You win';
          };
        };
        
        if (result === 'You win') {
          score.wins += 1;
        }else if (result === 'You lose') {
          score.losses += 1;
        }else if (result === 'Tie') {
          score.ties += 1;
        };

        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElement();

        document.querySelector('.js-result').innerHTML = result;

        document.querySelector('.js-moves').innerHTML = `You <button class="inner-move">${playerMove}</button> <button class="inner-move">${computerMove}</button>Computer`;

        /*
        alert(`you picked ${playerMove}, the computer picked ${computerMove}, ${result}.
Wins: ${score.wins},    Losses: ${score.losses},    Ties: ${score.ties}`);*/

        
      };
      
      function resultElement() {
        document.querySelector('.js-result').innerHTML = result;
      }
      function confirmReset() {
        let confirmElement = document.querySelector('.js-confirm')
        confirmElement.innerHTML = `<p>Are you sure you want to reset the score? <button class="js-yes yes-css">Yes</button> <button class="js-no no-css">No</button></p>`;

        document.querySelector('.js-yes').addEventListener('click', () => {confirmMove('yes')});

        document.querySelector('.js-no').addEventListener('click', () => { confirmMove('no')});
      }

      function confirmMove(moves) {
        confirmReset();
        if (moves === 'yes') {
          score.wins = 0;
          score.losses = 0;
          score.ties = 0;
          localStorage.removeItem('score');
          updateScoreElement();
          const confirmElement = document.querySelector('.js-confirm');
            confirmElement.innerHTML = '';
        }else if (moves === 'no'){
          const confirmElement = document.querySelector('.js-confirm');
            confirmElement.innerHTML = '';
        }
      }
      function updateScoreElement() {
        document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins},    Losses: ${score.    losses},    Ties: ${score.ties}`;
      }
      function pickComputerMove() {
        const randomNumber = Math.random()
        let computerMove = '';
        if (randomNumber <= 1 / 3 && randomNumber < 1 / 3){
          computerMove = 'rock';
        } else if(randomNumber <= 2 / 3 && randomNumber <2/3){
          computerMove = 'paper';
        } else if(randomNumber >= 2 / 3 && randomNumber < 1){
          computerMove = 'scissors';
        }

        return computerMove;
      };