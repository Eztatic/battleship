// import './style.css';
import Gameboard from './gameboard.js';
import Ship from './ship.js';
import Player from './player.js';
import Computer from './computer.js';
import * as DOM from './dom.js';

const player1UIBoard = document.querySelector('.board-1');
const player2UIBoard = document.querySelector('.board-2');
const compUIBoard = document.querySelector('.board-3');

const player1 = new Player('Player 1', new Gameboard());
const computer = new Computer(new Gameboard());
const shipsLengths = [2, 3, 3, 4, 5];

// First User Interaction
window.onload = () => {
  DOM.showGameModes();
};

// Create ship objects
function createShips(shipsLengths, ships = []) {
  shipsLengths.forEach((length) => {
    ships.push(new Ship(length));
  });
  return ships;
}

// Player place ship randomly
function randomPlacement(player) {
  const playerShips = createShips(shipsLengths);
  resetBoardData(player1, computer);
  playerShips.forEach((ship) => {
    player.placeShipRandomly(ship);
  });
  return player.gameboard.board;
}

// Get ship details from the UI board and update gameboard data
function placePlayerShips() {
  const playerShips = createShips(shipsLengths);
  const shipDetails = DOM.getShipDetails();
  if (shipDetails.length === 0) return;
  for (let i = 0; i < shipsLengths.length; i++) {
    player1.gameboard.placeShip(
      shipDetails[i].x,
      shipDetails[i].y,
      playerShips[i],
      shipDetails[i].position,
    );
  }
}

// Place computer ships randomly
function placeComputerShips() {
  const computerShips = createShips(shipsLengths);
  computerShips.forEach((ship) => {
    computer.placeShipRandomly(ship);
  });
}

function resetBoardData(...entities) {
  entities.forEach((entity) => {
    entity.gameboard.resetBoard();
  });
}

function resetTurns(entity1, entity2) {
  entity1.turn = false;
  entity2.turn = false;
}

function startRound() {
  placePlayerShips();
  placeComputerShips();

  resetTurns(player1, computer);
  player1.switchTurn();
}

function switchTurn(entity1, entity2) {
  entity1.switchTurn();
  entity2.switchTurn();
  return entity1.turn ? entity1 : entity2;
}

function getCurrentTurn(entity1, entity2) {
  return entity1.turn === true ? entity1 : entity2;
}

function checkWinner(entity1, entity2) {
  if (entity1.gameboard.allShipsSunk()) {
    return `${entity2.name} Wins`;
  } else if (entity2.gameboard.allShipsSunk()) {
    return `${entity1.name} Wins`;
  }
}

function attackBoard(opponent, x, y) {
  const impact = opponent.gameboard.receiveAttack(x, y);

  if (checkWinner(player1, computer)) {
    endGame();
    return 'game over';
  }
  if (impact === 'hit') return 'hit';

  switchTurn(player1, computer);

  return 'miss';
}

function play() {
  const currentTurn = getCurrentTurn(player1, computer);
  if (currentTurn === computer) {
    const computerTurn = () => {
      const [x, y] = computer.attackBoardRandomly(player1.gameboard);
      const result = attackBoard(player1, x, y);
      DOM.updateUIBoard(player1, x, y, result);

      if (result === 'game-over') {
        return;
      }

      if (result === 'hit') {
        setTimeout(() => attackAdjacent(player1, [x, y]), 1000);
        // setTimeout(computerTurn, 1000);
      }
    };

    setTimeout(computerTurn, 1000);
  }
}

function attackAdjacent(opponent, lastHit) {
  const nextAttack = computer.enhancedAttackMode(opponent.gameboard, lastHit);

  if (nextAttack) {
    const [newX, newY] = nextAttack;
    const newResult = attackBoard(opponent, newX, newY);
    DOM.updateUIBoard(opponent, newX, newY, newResult);

    if (newResult === 'game-over') {
      return;
    }

    if (newResult === 'hit') {
      setTimeout(() => attackAdjacent(opponent, nextAttack), 1000);
    }
  }
}

function endGame() {
  const winner = checkWinner(player1, computer);
  const winnerBoard = winner === 'Player 1 Wins' ? player1UIBoard : compUIBoard;
  const coverBoard = winnerBoard.querySelector('.board-cover');
  const hiddenBoard = document.querySelector('.board-cover.hidden');
  if (winner) {
    coverBoard.innerText = winner;
    hiddenBoard.parentElement.classList.add('not-selectable');
    getCurrentTurn(player1, computer).incrementScore();
    DOM.showScoreboard(player1.score, computer.score);
    DOM.showPlayAgainBtn();
    resetBoardData(player1, computer);
  }
}

export {
  player1,
  computer,
  randomPlacement,
  startRound,
  play,
  attackBoard,
  resetBoardData,
};
