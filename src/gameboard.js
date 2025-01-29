export default class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      const row = new Array(10).fill(0);
      board.push(row);
    }
    return board;
  }

  placeShip(x, y, ship, direction) {
    if (direction === 'horizontal' && y > 10 - ship.length) return false;
    if (direction === 'vertical' && x > 10 - ship.length) return false;

    // Check placement if empty
    for (let i = 0; i < ship.length; i++) {
      const row = direction === 'vertical' ? x + i : x;
      const col = direction === 'horizontal' ? y + i : y;
      if (this.board[row][col] === 1) {
        return false;
      }
    }

    // Place ship in board
    for (let i = 0; i < ship.length; i++) {
      const row = direction === 'vertical' ? x + i : x;
      const col = direction === 'horizontal' ? y + i : y;
      ship.coordinates.push([row, col]);
      this.board[row][col] = 1;
    }
    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    const empty = 0;
    const ship = 1;
    const hit = -1;
    const miss = -2;
    let status = 'miss';

    switch (this.board[x][y]) {
      case empty:
        this.board[x][y] = miss;
        break;
      case ship:
        this.board[x][y] = hit;
        break;
    }

    this.ships.forEach((ship) => {
      ship.coordinates.forEach((coord) => {
        if (coord[0] === x && coord[1] === y) {
          ship.hit();
          ship.isSunk();
          status = 'hit';
        }
      });
    });
    return status;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.sunk === true);
  }

  resetBoard() {
    this.board = this.createBoard();
    this.ships = [];
  }
}
