export default class Player {
  constructor(name, board) {
    this.name = name;
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

  incrementScore() {
    this.score++;
  }

  switchTurn() {
    this.turn = this.turn ? false : true;
  }
}
