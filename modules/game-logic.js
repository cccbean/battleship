const Ship = (length) => {
  return {
    length,
    hits: 0,
    isSunk() {
      return this.hits === this.length;
    },
    hit() {
      this.hits += 1;
    },
  };
};

const Gameboard = (shipCoordinates) => {
  let ships = {};

  shipCoordinates.forEach((coordinates) => {
    if (typeof coordinates[0] === 'number') {
      let newShip = Ship(1);
      ships[coordinates] = newShip;
    } else {
      let newShip = Ship(coordinates.length);
      coordinates.forEach((indivCoordinate) => {
        ships[indivCoordinate] = newShip;
      });
    }
  });

  return {
    ships,
    prevAttacks: [],
    receiveAttack(attackCoordinate) {
      let attackString = attackCoordinate.toString();

      if (this.prevAttacks.includes(attackString)) {
        throw new Error('Already hit this coordinate');
      }

      this.prevAttacks.push(attackString);
      let shipKeys = Object.keys(this.ships);
      for (let i = 0; i < shipKeys.length; i++) {
        if (attackString === shipKeys[i]) {
          this.ships[shipKeys[i]].hit();
          return 'Hit';
        }
      }
      return 'Miss';
    },
    allShipsSunk() {
      let shipValues = Object.values(this.ships);
      return shipValues.every((value) => value.isSunk());
    },
  };
};

const Player = (shipCoordinates) => {
  return {
    gameboard: Gameboard(shipCoordinates),
    isTurn: false,
    isComputer: false,
    computerTurn(opponent) {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      let randomCoordinate = [randomX, randomY];

      if (!opponent.gameboard.prevAttacks.includes(randomCoordinate.toString())) {
        opponent.gameboard.receiveAttack(randomCoordinate);
        return;
      } else {
        this.computerTurn(opponent);
      }
    }
  }
}

export { Ship, Gameboard, Player };
