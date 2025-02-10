import Gameboard from './gameboard.js';
import Ship from './ship.js';
import Player from './player.js';
import Computer from './computer.js';
import * as DOM from './dom.js';

const player1UIBoard = document.querySelector('.board-1');
const player2UIBoard = document.querySelector('.board-2');
const compUIBoard = document.querySelector('.board-3');

const player1 = new Player('Player 1', new Gameboard());
const player2 = new Player('Player 2', new Gameboard());
const computer = new Computer(new Gameboard());
const shipsLengths = [2, 3, 3, 4, 5];

function createShips(shipsLengths, ships = []) {
  shipsLengths.forEach((length) => {
    ships.push(new Ship(length));
  });
  return ships;
}

function randomPlacement(player) {
  const playerShips = createShips(shipsLengths);
  resetBoardData(player);
  playerShips.forEach((ship) => {
    player.placeShipRandomly(ship);
  });
  return player.gameboard.board;
}

function placePlayerShips(player) {
  const playerShips = createShips(shipsLengths);
  const shipDetails = DOM.getShipDetails();
  if (shipDetails.length < 5) return;
  for (let i = 0; i < shipsLengths.length; i++) {
    player.gameboard.placeShip(
      shipDetails[i].x,
      shipDetails[i].y,
      playerShips[i],
      shipDetails[i].position,
    );
  }
}

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

function startRound(mode) {
  if (mode === 'vsAI') {
    placePlayerShips(player1);
    placeComputerShips();
    resetTurns(player1, computer);
  } else if (mode === 'P2P') {
    placePlayerShips(player2);
    resetTurns(player1, player2);
  }

  player1.switchTurn();
}

function switchTurn(mode) {
  let entity2 = computer;
  if (mode === 'P2P') entity2 = player2;
  player1.switchTurn();
  entity2.switchTurn();
  return player1.turn ? player1 : entity2;
}

function getCurrentTurn(mode) {
  let entity2 = computer;
  if (mode === 'P2P') entity2 = player2;
  return player1.turn === true ? player1 : entity2;
}

function checkWinner(mode) {
  let entity2 = computer;
  if (mode === 'P2P') entity2 = player2;
  if (player1.gameboard.allShipsSunk()) {
    return `${entity2.name} Wins`;
  } else if (entity2.gameboard.allShipsSunk()) {
    return `${player1.name} Wins`;
  }
}

function attackBoard(opponent, x, y, mode) {
  const impact = opponent.gameboard.receiveAttack(x, y);

  if (checkWinner(mode)) {
    endGame();
    return 'game over';
  }

  if (impact === 'hit') return 'hit';

  switchTurn(mode);

  return 'miss';
}

function play() {
  const mode = DOM.getMode();
  const currentTurn = getCurrentTurn(mode);

  if (currentTurn === computer) {
    const computerTurn = () => {
      const [x, y] = computer.attackBoardRandomly(player1.gameboard);
      const result = attackBoard(player1, x, y, mode);
      DOM.updateUIBoard(mode, player1, x, y, result);

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
  const mode = DOM.getMode();
  const nextAttack = computer.enhancedAttackMode(opponent.gameboard, lastHit);

  if (nextAttack) {
    const [newX, newY] = nextAttack;
    const newResult = attackBoard(opponent, newX, newY, mode);
    DOM.updateUIBoard(mode, opponent, newX, newY, newResult);

    if (newResult === 'game-over') {
      return;
    }

    if (newResult === 'hit') {
      setTimeout(() => attackAdjacent(opponent, nextAttack), 1000);
    }
  }
}

function endGame() {
  const mode = DOM.getMode();
  let entity2 = computer;
  let entity2Board = compUIBoard;
  if (mode === 'P2P') {
    entity2 = player2;
    entity2Board = player2UIBoard;
  }
  const winner = checkWinner(mode);
  const winnerBoard =
    winner === 'Player 1 Wins' ? player1UIBoard : entity2Board;
  const coverBoard = winnerBoard.querySelector('.board-cover');
  const hiddenBoard = document.querySelector(
    '.active:has(.board-cover.hidden)',
  );
  if (winner) {
    coverBoard.innerText = winner;
    hiddenBoard.querySelector('.board').classList.add('not-selectable');
    getCurrentTurn(mode).incrementScore();
    DOM.showScoreboard(player1.score, entity2.score);
    DOM.showPlayAgainBtn();
    resetBoardData(player1, entity2);
  }
}

export {
  player1,
  player2,
  computer,
  randomPlacement,
  placePlayerShips,
  startRound,
  play,
  attackBoard,
  resetBoardData,
  endGame,
};
