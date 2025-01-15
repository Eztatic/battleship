export default class Player {
  constructor(name, board) {
    this.name = name;
    this.score = 0;
    this.turn = false;
    this.gameboard = board;
  }

  incrementScore() {
    this.score++;
  }

  switchTurn() {
    this.turn = this.turn ? false : true;
  }
}

