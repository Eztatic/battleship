// import './style.css';
import './dom.js';
import Gameboard from './gameboard.js';
import Ship from './ship.js';
import Player from './player.js';
import Computer from './computer.js';
import * as DOM from './dom.js';

const finishBtn = document.querySelector('.finishBtn');
const UIships = document.querySelectorAll('.ship');

const player1 = new Player('Player 1', new Gameboard());
const computer = new Computer(new Gameboard());

const ships = [];
const shipsLengths = [2, 3, 3, 4, 5];

function createShips(shipsLengths, ships) {
  shipsLengths.forEach((length) => {
    ships.push(new Ship(length));
  });
}

function startGame() {
  createShips(shipsLengths, ships);

  // Computer adds ships to board randomly
  ships.forEach((ship) => {
    computer.placeShipRandomly(ship);
  });

  // Render player board for ship placement
  DOM.renderBoardCells(player1.gameboard.board);
  finishBtn.addEventListener('click', () => {
    if (DOM.allShipsPlaced(UIships)) return alert('Must place all ships');
    
  });
}

startGame();

// First User Interaction
// window.onload = () => {
//   DOM.showGameModes();
// };

// Export for testing
// export {computer, ships, createShips};
