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

  enhancedAttackMode(opponentBoard, lastShipHit) {
    const [x, y] = lastShipHit;
    const directions = [
      {xOffset: -1, yOffset: 0}, // top
      {xOffset: 1, yOffset: 0}, // bottom
      {xOffset: 0, yOffset: -1}, // left
      {xOffset: 0, yOffset: 1}, // right
    ];

    for (const {xOffset, yOffset} of directions) {
      const target = opponentBoard.board[x + xOffset]?.[y + yOffset];

      if (target !== undefined && target >= 0) {
        return [x + xOffset, y + yOffset];
      }
    }

    return undefined;
  }

  incrementScore() {
    this.score++;
  }

  switchTurn() {
    this.turn = this.turn ? false : true;
  }
}
