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
    isComputer: false,
    computerTurn(opponent) {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      let randomCoordinate = [randomX, randomY];

      if (!opponent.gameboard.prevAttacks.includes(randomCoordinate.toString())) {
        opponent.gameboard.receiveAttack(randomCoordinate);
        return randomCoordinate;
      } else {
        this.computerTurn(opponent);
      }
    }
  }
}

const generateRandomShipCoordinates = () => {
  let coord = [];

  while (coord.length < 4) {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    let randomCoordinate = [randomX, randomY];

    let coordStr = coord.map((array) => array.join(','));
    if (!coordStr.includes(randomCoordinate.join(','))) {
      coord.push(randomCoordinate);
    }
  };

  while (coord.length < 7) {
    let coord2 = [];
    let randomX = Math.floor(Math.random() * 9);
    let randomY = Math.floor(Math.random() * 9);
    let randomCoordinate = [randomX, randomY];
    let randomOrientation = Math.round(Math.random());
    coord2.push(randomCoordinate);

    if (randomOrientation === 0) {
      coord2.push([randomX + 1, randomY]);
    } else {
      coord2.push([randomX, randomY + 1]);
    }

    let spreadCoord = spreadCoordinateArray(coord);
    let strCoord = spreadCoord.map((array) => array.join(','));
    if (coord2.every((coord) => !strCoord.includes(coord.join(',')))) {
      coord.push(coord2);
    }
  }

  while (coord.length < 9) {
    let coord3 = [];
    let randomX = Math.floor(Math.random() * 8);
    let randomY = Math.floor(Math.random() * 8);
    let randomCoordinate = [randomX, randomY];
    let randomOrientation = Math.round(Math.random());
    coord3.push(randomCoordinate);

    if (randomOrientation === 0) {
      coord3.push([randomX + 1, randomY]);
      coord3.push([randomX + 2, randomY]);
    } else {
      coord3.push([randomX, randomY + 1]);
      coord3.push([randomX, randomY + 2]);
    }

    let spreadCoord = spreadCoordinateArray(coord);
    let strCoord = spreadCoord.map((array) => array.join(','));
    if (coord3.every((coord) => !strCoord.includes(coord.join(',')))) {
      coord.push(coord3);
    }
  }

  while (coord.length < 10) {
    let coord4 = [];
    let randomX = Math.floor(Math.random() * 7);
    let randomY = Math.floor(Math.random() * 7);
    let randomCoordinate = [randomX, randomY];
    let randomOrientation = Math.round(Math.random());
    coord4.push(randomCoordinate);

    if (randomOrientation === 0) {
      coord4.push([randomX + 1, randomY]);
      coord4.push([randomX + 2, randomY]);
      coord4.push([randomX + 3, randomY]);
    } else {
      coord4.push([randomX, randomY + 1]);
      coord4.push([randomX, randomY + 2]);
      coord4.push([randomX, randomY + 3]);
    }

    let spreadCoord = spreadCoordinateArray(coord);
    let strCoord = spreadCoord.map((array) => array.join(','));
    if (coord4.every((coord) => !strCoord.includes(coord.join(',')))) {
      coord.push(coord4);
    }
  }

  return coord;
}

const spreadCoordinateArray = (coordinateArray) => {
  let spreadArray = [];
  coordinateArray.forEach((array) => {
    if (typeof array[0] === 'number') {
      spreadArray.push(array);
    } else {
      array.forEach((array2) => {
        spreadArray.push(array2);
      })
    }
  });
  return spreadArray;
}

const createComputer = () => {
  const shipCoord = generateRandomShipCoordinates();
  const computer = Player(shipCoord);
  computer.isComputer = true;
  return computer;
}

export { Ship, Gameboard, Player, generateRandomShipCoordinates, spreadCoordinateArray, createComputer };
