import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

describe('Gameboard test', () => {
  let gameboard;
  let ship1;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship1 = new Ship(3);
  });

  test('Create gameboard', () => {
    expect(gameboard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test('Add ship to gameboard', () => {
    gameboard.placeShip(0, 7, ship1, 'horizontal');
    expect(gameboard.ships).toEqual([
      {
        length: 3,
        hitCount: 0,
        sunk: false,
        coordinates: [
          [0, 7],
          [0, 8],
          [0, 9],
        ],
      },
    ]);
  });

  test('Place ship horizontally', () => {
    gameboard.placeShip(0, 7, ship1, 'horizontal');
    expect(gameboard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test('Place ship vertically', () => {
    gameboard.placeShip(7, 0, ship1, 'vertical');
    expect(gameboard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test('Ship overlap', () => {
    gameboard.placeShip(0, 7, ship1, 'horizontal');
    expect(gameboard.placeShip(0, 9, ship1, 'vertical')).toEqual(false);
  });

  test('Place two ship', () => {
    gameboard.placeShip(0, 7, ship1, 'horizontal');
    gameboard.placeShip(7, 0, ship1, 'vertical');
    expect(gameboard.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test('Attack cell in board', () => {
    gameboard.placeShip(0, 0, ship1, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board).toEqual([
      [-1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  test('Hit a ship in board', () => {
    gameboard.placeShip(0, 0, ship1, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    expect(ship1.hitCount).toEqual(3);
  });

  test('Ship is sunk', () => {
    gameboard.placeShip(0, 0, ship1, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    expect(ship1.sunk).toBe(true);
  });

  test('If all ships sunk in gameboard', () => {
    gameboard.placeShip(0, 0, ship1, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
