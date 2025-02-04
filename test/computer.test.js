import {experiments} from 'webpack';
import Computer from '../src/computer.js';
import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

describe('Computer test', () => {
  let computer;
  let ship;
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
    computer = new Computer(gameboard);
    ship = new Ship(3);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Place ship randomly', () => {
    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.4);

    computer.placeShipRandomly(ship);
    expect(computer.gameboard.board).toEqual([
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
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

  test('Place ship again if coords is occupied', () => {
    const spy = jest.spyOn(computer, 'placeShipRandomly');

    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.4);

    computer.placeShipRandomly(ship);
    computer.placeShipRandomly(ship);
    expect(spy).toHaveBeenCalledTimes(2);

    expect(computer.gameboard.board).toEqual([
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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

  test('Attack board randomly', () => {
    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);
    computer.placeShipRandomly(ship);
    expect(computer.attackBoardRandomly(computer.gameboard)).toEqual([0, 0]);
  });

  test('Check if coordinates can be attacked', () => {
    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.2);
    computer.placeShipRandomly(ship);
    computer.gameboard.receiveAttack(0, 0);
    expect(computer.attackBoardRandomly(computer.gameboard)).toEqual([0, 2]);
  });

  test('Computer enhanced attack', () => {
    jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1);

    computer.placeShipRandomly(ship);
    const [x, y] = computer.attackBoardRandomly(computer.gameboard);
    computer.gameboard.receiveAttack(x, y);

    for (let i = 0; i < 4; i++) {
      computer.gameboard.receiveAttack(
        ...computer.enhancedAttackMode(computer.gameboard, [x, y]),
      );
    }
    expect(computer.enhancedAttackMode(computer.gameboard, [x, y])).toEqual(
      undefined,
    );
    expect(computer.gameboard.board).toEqual([
      [0, -2, 0, 0, 0, 0, 0, 0, 0, 0],
      [-2, -1, -1, 1, 0, 0, 0, 0, 0, 0],
      [0, -2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
