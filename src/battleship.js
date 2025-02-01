// import './style.css';
import Gameboard from './gameboard.js';
import Ship from './ship.js';
import Player from './player.js';
import Computer from './computer.js';
import * as DOM from './dom.js';

const player1UIBoard = document.querySelector('.board-1');
const compUIBoard = document.querySelector('.board-2');

const player1 = new Player('Player 1', new Gameboard());
const computer = new Computer(new Gameboard());
const shipsLengths = [2, 3, 3, 4, 5];

// First User Interaction
window.onload = () => {
  DOM.showGameModes(battlePhase);
  DOM.preparationPhase(player1.gameboard.board, player1UIBoard, battlePhase);
  DOM.setupPlayAgain(player1.gameboard.board, player1UIBoard);
  DOM.setupRandomBtn(player1UIBoard, () => randomButtonCB(player1));
};

// Create ship objects
function createShips(shipsLengths, ships = []) {
  shipsLengths.forEach((length) => {
    ships.push(new Ship(length));
  });
  return ships;
}

// Random button callback function
function randomButtonCB(player) {
  const playerShips = createShips(shipsLengths);
  player.gameboard.resetBoard();
  playerShips.forEach((ship) => {
    player.placeShipRandomly(ship);
  });
  return player.gameboard.board;
}

// Get ship details from the UI board and update gameboard data
function placePlayerShips() {
  const alreadyPlaced = player1.gameboard.ships.length === 5;
  if (alreadyPlaced) return;
  resetBoardData(player1, computer);
  const playerShips = createShips(shipsLengths);
  const shipDetails = DOM.getShipDetails();
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

// Callback: execute attack on board
function executeAttack(entity, x, y) {
  attackBoard(entity, x, y);
  play();
}

// Attack Board
function attackBoard(opponent, x, y) {
  // Get impact(miss/hit) on the cell that was attacked
  const impact = opponent.gameboard.receiveAttack(x, y);
  const toggleCovers = () => DOM.toggleBoardCovers(player1UIBoard, compUIBoard);

  // Validate clicked cell based on impact
  DOM.validateClickedCell(x, y, impact);

  // If there is a winner, execute end game functionality
  if (checkWinner(player1, computer)) {
    endGame();
    return 'game over';
  }

  // If there is no winner and impact was hit return hit
  if (impact === 'hit') return 'hit';

  // If there is no winner and impact was not hit, switch turn
  // between two individuals
  switchTurn(player1, computer);

  // If computer attacks switching cover boards may have a short delay
  // If player attacks switch cover boards with no delay
  if (opponent !== computer) {
    setTimeout(toggleCovers, 1000);
  } else {
    toggleCovers();
  }

  // Return 'miss' as there was no winner and attack was not on hit
  return 'miss';
}

// Render player board and deploy ships
function preparePlayerBoard() {
  placePlayerShips();
}

// Render computer board and deploy ships
function prepareComputerBoard() {
  placeComputerShips();
  DOM.renderBoardCells(computer.gameboard.board, compUIBoard);
  DOM.addCellEvents(compUIBoard, computer, executeAttack);
}

function resetBoardData(entity1, entity2) {
  entity1.gameboard.resetBoard();
  entity2.gameboard.resetBoard();
}

function resetTurns(entity1, entity2) {
  entity1.turn = false;
  entity2.turn = false;
}

function battlePhase() {
  DOM.toggleLoader();
  resetTurns(player1, computer);
  preparePlayerBoard();
  prepareComputerBoard();
  player1.switchTurn();
  DOM.battlePhaseOn();
  DOM.toggleBoardCovers(player1UIBoard);
  setTimeout(() => DOM.toggleLoader(), 3000);
  console.log(player1, computer);
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

function play() {
  const currentTurn = getCurrentTurn(player1, computer);
  if (currentTurn === computer) {
    const computerTurn = () => {
      const [x, y] = computer.attackBoardRandomly(player1.gameboard);
      const result = attackBoard(player1, x, y);

      if (result === 'game-over') {
        return;
      }

      if (result === 'hit') {
        setTimeout(computerTurn, 1000);
      }
    };

    setTimeout(computerTurn, 1000);
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
  }
}
