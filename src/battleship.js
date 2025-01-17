import Gameboard from './gameboard.js';
import Ship from './ship.js';
import Player from './player.js';
import Computer from './computer.js';

const player1 = new Player('Aaron', new Gameboard());
const computer = new Computer(new Gameboard());

const ships = [];
const shipsLengths = [2, 3, 3, 4, 5];

function createShips(shipsLengths, ships) {
  shipsLengths.forEach((length) => {
    ships.push(new Ship(length));
  });
}

function startGame(playerName) {
  // Create Ships
  createShips(shipsLengths, ships);

  // Computer adds ships to board
  ships.forEach((ship) => {
    computer.placeShipRandomly(ship);
  });

  // Get ships and present to player
}

export {computer, ships, createShips};
