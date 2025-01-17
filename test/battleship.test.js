import {computer, ships, createShips} from '../src/battleship.js';

describe('Test Gameplay', () => {
  test('Create Ships', () => {
    createShips([2, 3, 3, 4, 5], ships);
    expect(ships).toEqual([
      {length: 2, hitCount: 0, sunk: false, coordinates: []},
      {length: 3, hitCount: 0, sunk: false, coordinates: []},
      {length: 3, hitCount: 0, sunk: false, coordinates: []},
      {length: 4, hitCount: 0, sunk: false, coordinates: []},
      {length: 5, hitCount: 0, sunk: false, coordinates: []},
    ]);
  });

  test.only('Computer place ships randomly', () => {
    const shipContainer = [];
    createShips([2, 3, 3, 4, 5], shipContainer);
    shipContainer.forEach((ship) => {
      computer.placeShipRandomly(ship);
    });

    expect(computer.gameboard.ships.length).toEqual(5);
  });
});
