export default class Computer {
  constructor(board) {
    this.name = 'Computer';
    this.score = 0;
    this.turn = false;
    this.gameboard = board;
  }

  placeShipRandomly(ship) {
    while (true) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      const randomDirection = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      const placedShip = this.gameboard.placeShip(
        randomX,
        randomY,
        ship,
        randomDirection,
      );
      if (placedShip) break;
    }
  }

  attackBoardRandomly(opponentBoard) {
    while (opponentBoard) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      if (
        opponentBoard.board[randomX][randomY] === 0 ||
        opponentBoard.board[randomX][randomY] === 1
      ) {
        return [randomX, randomY];
      }
    }
  }
}
