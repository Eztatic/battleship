// import './style.css';
import './dom.js';
import Gameboard from './gameboard.js';
import Ship from './ship.js';
import Player from './player.js';
import Computer from './computer.js';
import * as DOM from './dom.js';

const player1UIBoard = document.querySelector('.board-1 .board');
const compUIBoard = document.querySelector('.board-2 .board');

const player1 = new Player('Player 1', new Gameboard());
const computer = new Computer(new Gameboard());
const shipsLengths = [2, 3, 3, 4, 5];

let playerShips = createShips(shipsLengths);
let computerShips = createShips(shipsLengths);

// First User Interaction
// window.onload = () => {
//   DOM.showGameModes();
// };

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
    attackBoard(entity, x, y);
    play();
  }
}

// Attack Board
function attackBoard(opponent, x, y) {
  let impact = opponent.gameboard.receiveAttack(x, y);
  let UIboard = document.querySelector('.board-cover.hidden').parentElement;
  DOM.updateCell(UIboard, x, y, impact);
  if (checkWinner(player1, computer)) endGame();
  switchTurn(player1, computer);
  DOM.toggleBoardCovers(player1UIBoard, compUIBoard);
  return impact;
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
  player1.switchTurn();
  DOM.toggleBoardCovers(player1UIBoard);
  setTimeout(() => DOM.toggleLoader(), 3000);
}

function checkWinner(entity1, entity2) {
  if (entity1.gameboard.allShipsSunk()) {
    return `${entity2.name} Wins`;
  } else if (entity2.gameboard.allShipsSunk()) {
    return `${entity1.name} Wins`;
  }
  return `${entity1.name} Wins`;
}

function endGame() {
  const winner = checkWinner(player1, computer);
  const board = winner === 'Computer Wins' ? compUIBoard : player1UIBoard;
  const coverBoard = board.querySelector('.board-cover');
  const hiddenBoard = document.querySelector('.board-cover.hidden');
  if (winner) {
    coverBoard.innerText = winner;
    hiddenBoard.parentElement.style.pointerEvents = 'none';
  }
}

function switchTurn(entity1, entity2) {
  entity1.turn = !entity1.turn;
  entity2.turn = !entity2.turn;
  return entity1.turn ? entity1 : entity2;
}

function getCurrentTurn(entity1, entity2) {
  return entity1.turn === true ? entity1 : entity2;
}

function play() {
  const currentTurn = getCurrentTurn(player1, computer);
  if (currentTurn === computer) {
    setTimeout(() => {
      attackBoard(player1, ...computer.attackBoardRandomly(player1.gameboard));
    }, 1000);
  }
  // console.log('currentTurn', currentTurn);
  // console.table(player1.gameboard.board);
  console.table(computer.gameboard.board);
}

preparationPhase();

// Export for testing
// export {computer, playerShips, computerShips, createShips};
