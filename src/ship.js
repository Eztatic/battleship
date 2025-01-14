class Ship {
  constructor(length, hitCount, sunk) {
    this.length = length;
    this.hitCount = hitCount;
    this.sunk = sunk;
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    if (this.hitCount === this.length) {
      this.sunk = true;
    }
  }
}

module.exports = Ship;
