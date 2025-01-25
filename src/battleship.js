// import './style.css';
import './dom.js';
import Gameboard from './gameboard.js';
import Ship from './ship.js';
import Player from './player.js';
import Computer from './computer.js';
import * as DOM from './dom.js';

const compUIBoard = document.querySelector('.board-2 .board');

const player1 = new Player('Player 1', new Gameboard());
const computer = new Computer(new Gameboard());
const shipsLengths = [2, 3, 3, 4, 5];

let playerShips = createShips(shipsLengths);
let computerShips = createShips(shipsLengths);

// Create ship objects
function createShips(shipsLengths, ships = []) {
  shipsLengths.forEach((length) => {
    ships.push(new Ship(length));
  });
  return ships;
}

// Ship deployment phase
function preparationPhase() {
  const finishBtn = document.querySelector('.finishBtn');
  const UIships = document.querySelectorAll('.ship');

  DOM.renderBoardCells(player1.gameboard.board, 'board-1');
  DOM.addDragEvents('board-1');

  finishBtn.addEventListener('click', () => {
    if (DOM.allShipsPlaced(UIships)) return alert('Must place all ships');
    battlePhase();
  });
}

// Get ship coordinates from the UI board and update gameboard data
function placePlayerShips(playerShips) {
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
  computerShips.forEach((ship) => {
    computer.placeShipRandomly(ship);
  });
}

// Event handler for when hovering cells
function hoverCell(e) {
  const cell = e.target;
  if (
    cell.classList.contains('cell') &&
    !cell.classList.contains('hit') &&
    !cell.classList.contains('miss')
  ) {
    cell.classList.add('on-select');
  }
}

// Event handler for when clicking cells
function clickCell(entity, e) {
  const cell = e.target;
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);
  if (
    cell.classList.contains('cell') &&
    !cell.classList.contains('hit') &&
    !cell.classList.contains('miss')
  ) {
    cell.classList.remove('on-select');
    cell.classList.add(entity.gameboard.receiveAttack(x, y));
    play();
  }
}

// Helper Function: add cell events for user interaction
function addCellEvents(UIBoard, entity) {
  UIBoard.addEventListener('mouseover', hoverCell);
  UIBoard.addEventListener('click', (e) => clickCell(entity, e));
}

// Render player board and deploy ships
function preparePlayerBoard() {
  placePlayerShips(playerShips);
}

// Render computer board and deploy ships
function prepareComputerBoard() {
  placeComputerShips();
  DOM.renderBoardCells(computer.gameboard.board, 'board-2');
  addCellEvents(compUIBoard, computer);
}

function battlePhase() {
  DOM.toggleLoader();
  preparePlayerBoard();
  prepareComputerBoard();
  DOM.battlePhase();
  player1.turn = true;
  setTimeout(() => DOM.toggleLoader(), 3000);
}

function checkWinner() {
  console.log(displayCurrentTurn());
  if (player1.gameboard.allShipsSunk()) {
    return console.log('Computer Wins');
  } else if (computer.gameboard.allShipsSunk()) {
    return console.log('Player 1 Wins');
  }
  return false;
}

function switchTurn(entity1, entity2) {
  entity1.turn = !entity1.turn;
  entity2.turn = !entity2.turn;
  return entity1.turn ? entity1 : entity2;
}

function displayCurrentTurn() {
  return switchTurn(player1, computer);
}

// Play also determines if the game should stop or not by checking if there
// is a winner after each turn. If there is no winner the game continues by
// switching each others turn until a winner is decided. If the winner is decided
// proceed to announcement phase
function play() {
  if (checkWinner()) return;
  console.log(computer.gameboard.board);
}

preparationPhase();

// function startGame() {

// }

// startGame();

// First User Interaction
// window.onload = () => {
//   DOM.showGameModes();
// };

// Export for testing
// export {computer, playerShips, computerShips, createShips};
