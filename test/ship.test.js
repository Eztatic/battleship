import Ship from '../src/ship.js';

describe('Ship methods test', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3, 0, false);
  });

  test('Ship is hit', () => {
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  test('Ship is not sunk', () => {
    ship.isSunk();
    expect(ship.sunk).not.toBe(true);
  });

  test('Ship is sunk', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBe(true);
  });
});
