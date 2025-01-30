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

  isOutOfBounds(x, y, ship, direction) {
    return (
      (direction === 'horizontal' && y > 10 - ship.length) ||
      (direction === 'vertical' && x > 10 - ship.length)
    );
  }

  placeShip(x, y, ship, direction) {
    if (this.isOutOfBounds(x, y, ship, direction)) return false;

    const coordinates = [];

    for (let i = 0; i < ship.length; i++) {
      const row = direction === 'vertical' ? x + i : x;
      const col = direction === 'horizontal' ? y + i : y;
      if (this.board[row][col] === 1) return false;
      coordinates.push([row, col]);
    }

    coordinates.forEach(([row, col]) => (this.board[row][col] = 1));
    ship.coordinates = coordinates;
    this.ships.push(ship);

    return true;
  }

  validateAttack(x, y) {
    const boardCell = this.board[x][y];

    if (boardCell === 0) {
      this.board[x][y] = -2;
      return 'miss';
    }

    if (boardCell === 1) {
      this.board[x][y] = -1;
      return 'hit';
    }

    return 'invalid';
  }

  receiveAttack(x, y) {
    const result = this.validateAttack(x, y);

    if (result === 'hit') {
      for (const ship of this.ships) {
        for (const [shipX, shipY] of ship.coordinates) {
          if (shipX === x && shipY === y) {
            ship.hit();
            ship.isSunk();
            return 'hit';
          }
        }
      }
    }

    return result;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.sunk === true);
  }

  resetBoard() {
    this.board = this.createBoard();
    this.ships = [];
  }
}
