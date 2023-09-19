import { Ship, Gameboard, Player } from './game-logic.js';

test('Ship properties', () => {
  const testShip = Ship(2);
  expect(testShip.length).toBe(2);
  expect(testShip.hits).toBe(0);
  expect(testShip.isSunk()).toBe(false);
});

test('Hit ship', () => {
  const testShip = Ship(2);
  testShip.hit();
  expect(testShip.hits).toBe(1);
});

test('Hit ship multiple', () => {
  const testShip = Ship(2);
  testShip.hit();
  testShip.hit();
  expect(testShip.hits).toBe(2);
});

test('Ship sinks', () => {
  const testShip = Ship(2);
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});

test('Gameboard creates 1 ship of length 1', () => {
  const testGameboard = Gameboard([[0, 0]]);
  const testShip = Ship(1);
  expect(JSON.stringify(testGameboard.ships)).toBe(
    JSON.stringify({
      '0,0': testShip,
    })
  );
});

test('Gameboard creates 2 ships of length 1', () => {
  const testGameboard = Gameboard([
    [0, 0],
    [0, 1],
  ]);
  const testShip1 = Ship(1);
  const testShip2 = Ship(1);
  expect(JSON.stringify(testGameboard.ships)).toBe(
    JSON.stringify({
      '0,0': testShip1,
      '0,1': testShip2,
    })
  );
});

test('Gameboard creates 2 ships of length 1 and length 2', () => {
  const testGameboard = Gameboard([
    [0, 0],
    [
      [0, 1],
      [0, 2],
    ],
  ]);
  const testShip1 = Ship(1);
  const testShip2 = Ship(2);
  expect(JSON.stringify(testGameboard.ships)).toBe(
    JSON.stringify({
      '0,0': testShip1,
      '0,1': testShip2,
      '0,2': testShip2,
    })
  );
});

test('Gameboard.receiveAttack registers hit', () => {
  const testGameboard = Gameboard([[0, 0]]);
  expect(testGameboard.receiveAttack([0, 0])).toBe('Hit');
});

test('Gameboard.receiveAttack registers miss', () => {
  const testGameboard = Gameboard([[0, 0]]);
  expect(testGameboard.receiveAttack([0, 1])).toBe('Miss');
});

test('Gameboard remembers prev attacks', () => {
  const testGameboard = Gameboard([[0, 0]]);
  testGameboard.receiveAttack([0, 0]);
  testGameboard.receiveAttack([0, 1]);
  expect(testGameboard.prevAttacks).toEqual(['0,0', '0,1']);
});

test('Gameboard.receiveAttack calls hit function on ship', () => {
  const testGameboard = Gameboard([[0, 0]]);
  const testShip = Ship(1);
  testShip.hit();
  testGameboard.receiveAttack([0, 0]);
  expect(JSON.stringify(testGameboard.ships)).toBe(
    JSON.stringify({
      '0,0': testShip,
    })
  );
});

test("Gameboard.receiveAttack can't be called twice on the same coordinate", () => {
  const testGameboard = Gameboard([[0, 0]]);
  testGameboard.receiveAttack([0, 0]);
  expect(() =>
    testGameboard.receiveAttack([0, 0]).toThrow('Already hit this coordinate')
  );
});

test('Gameboard.allShipsSunk works when true', () => {
  const testGameboard = Gameboard([[0, 0]]);
  testGameboard.receiveAttack([0, 0]);
  expect(testGameboard.allShipsSunk()).toBe(true);
});

test('Gameboard.allShipsSunk works when false', () => {
  const testGameboard = Gameboard([[0, 0]]);
  expect(testGameboard.allShipsSunk()).toBe(false);
});

test('Gameboard.allShipsSunk works when true, multiple ships', () => {
  const testGameboard = Gameboard([[0, 0], [0,1]]);
  testGameboard.receiveAttack([0, 0]);
  testGameboard.receiveAttack([0, 1]);
  expect(testGameboard.allShipsSunk()).toBe(true);
});

test('Gameboard.allShipsSunk works when false, multiple ships', () => {
  const testGameboard = Gameboard([[0, 0], [0,1]]);
  testGameboard.receiveAttack([0, 0]);
  expect(testGameboard.allShipsSunk()).toBe(false);
});

test('Can create new Player', () => {
  const testPlayer = Player([[0,0]]);
  const testGameboard = Gameboard([[0,0]])
  expect(testPlayer.isTurn).toBe(false);
  expect(testPlayer.isComputer).toBe(false);
  expect(JSON.stringify(testPlayer.gameboard)).toBe(JSON.stringify(testGameboard));
})

test('Can create new Computer', () => {
  const testComputer = Player([[0,0]]);
  testComputer.isComputer = true;
  const testGameboard = Gameboard([[0,0]])
  expect(testComputer.isTurn).toBe(false);
  expect(testComputer.isComputer).toBe(true);
  expect(JSON.stringify(testComputer.gameboard)).toBe(JSON.stringify(testGameboard));
})

test('Computer can attack Player once', () => {
  const testPlayer = Player([[0,0]]);
  const testComputer = Player([[0,0]]);
  testComputer.computerTurn(testPlayer);
  expect(testPlayer.gameboard.prevAttacks.length).toBe(1);
});

test('Computer can attack Player multiple times', () => {
  const testPlayer = Player([[0,0]]);
  const testComputer = Player([[0,0]]);
  testComputer.computerTurn(testPlayer);
  testComputer.computerTurn(testPlayer);
  expect(testPlayer.gameboard.prevAttacks.length).toBe(2);
});

test('Computer won\'t attack same coordinate', () => {
  const testPlayer = Player([[0,0]]);
  const testComputer = Player([[0,0]]);
  for (let i = 0; i < 100; i++) {
    testComputer.computerTurn(testPlayer);
  }
  expect(testPlayer.gameboard.prevAttacks.length).toBe(100);
});

