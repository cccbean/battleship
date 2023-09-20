import { generateRandomShipCoordinates, spreadCoordinateArray } from "./game-logic.js";

const generateCells = () => {
  const gameboardDiv = document.querySelectorAll('.grid');
  gameboardDiv.forEach((gameboard) => {
    if (gameboard.id === 'computer') {
      for (let i = 9; i >= 0; i--) {
        for (let j = 0; j <= 9; j++) {
          const cellDiv = document.createElement('div');
          cellDiv.classList.add('cell');
          cellDiv.dataset.xCoord = `${j}`;
          cellDiv.dataset.yCoord = `${i}`;
          gameboard.appendChild(cellDiv);
        }
      }
    }
  });
};

const enableDragAndDrop = () => {
  const draggables = document.querySelectorAll('.draggable');
  const cells = document.querySelectorAll('.cell');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (e) => {
      const dragImg = document.querySelector('#drag-img');
      e.dataTransfer.setDragImage(dragImg, 10, 10);

      draggable.classList.add('dragging');

      const length = Number(draggable.dataset.length);
      const position = draggable.dataset.position;
      const parent = draggable.parentElement;
      const x = Number(parent.dataset.xCoord);
      const y = Number(parent.dataset.yCoord);

      if (length === 1) {
        parent.classList.remove('disabled');
      }

      if (length === 2) {
        if (position === 'horizontal') {
          parent.classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');
        } else {
          parent.classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');
        }
      }

      if (length === 3) {
        if (position === 'horizontal') {
          parent.classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.remove('disabled');
        } else {
          parent.classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.remove('disabled');
        }
      }

      if (length === 4) {
        if (position === 'horizontal') {
          parent.classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.remove('disabled');
        } else {
          parent.classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.remove('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.remove('disabled');
        }
      }
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');

      const length = Number(draggable.dataset.length);
      const position = draggable.dataset.position;
      const parent = draggable.parentElement;
      const x = Number(parent.dataset.xCoord);
      const y = Number(parent.dataset.yCoord);

      if (length === 1) {
        parent.classList.add('disabled');
      }

      if (length === 2) {
        if (position === 'horizontal') {
          parent.classList.add('disabled');
          document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
        } else {
          parent.classList.add('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
        }
      }

      if (length === 3) {
        if (position === 'horizontal') {
          parent.classList.add('disabled');
          document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
          document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.add('disabled');
        } else {
          parent.classList.add('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.add('disabled');
        }
      }

      if (length === 4) {
        if (position === 'horizontal') {
          parent.classList.add('disabled');
          document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
          document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.add('disabled');
          document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.add('disabled');
        } else {
          parent.classList.add('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.add('disabled');
          document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.add('disabled');
        }
      }
    });
  });

  cells.forEach((cell) => {
    cell.addEventListener('dragover', (e) => {
      e.preventDefault();

      const dragging = document.querySelector('.dragging');
      const length = Number(dragging.dataset.length);
      const position = dragging.dataset.position;
      const x = Number(cell.dataset.xCoord);
      const y = Number(cell.dataset.yCoord);

      if (length === 1) {
        if (!cell.classList.contains('disabled')) {
          cell.appendChild(dragging);
        }
      } else {
        if (position === 'horizontal') {
          if (x <= 9 - length + 1) {
            if (length === 2) {
              if (!cell.classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.contains('disabled')) {
                cell.appendChild(dragging);
              }
            }

            if (length === 3) {
              if (!cell.classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.contains('disabled')) {
                cell.appendChild(dragging);
              }
            }

            if (length === 4) {
              if (!cell.classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.contains('disabled')) {
                cell.appendChild(dragging);
              }
            }
          }
        } else {
          if (y >= length - 1) {
            if (length === 2) {
              if (!cell.classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.contains('disabled')) {
                cell.appendChild(dragging);
              }
            }

            if (length === 3) {
              if (!cell.classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.contains('disabled')) {
                cell.appendChild(dragging);
              }
            }

            if (length === 4) {
              if (!cell.classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.contains('disabled')) {
                cell.appendChild(dragging);
              }
            }
          }
        }
      }
    });
  });
};

const enableRotation = () => {
  const ships = document.querySelectorAll('.draggable');
  ships.forEach((ship) => {
    ship.addEventListener('click', () => {
      const length = Number(ship.dataset.length);
      const position = ship.dataset.position;
      const parent = ship.parentElement;
      const x = Number(parent.dataset.xCoord);
      const y = Number(parent.dataset.yCoord);

      if (position === 'horizontal') {
        if (y >= length - 1) {
          if (length === 2) {
            if (!document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.contains('disabled')) {
              ship.dataset.position = 'vertical';

              document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');

              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled'); 
            }
          }

          if (length === 3) {
            if (!document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.contains('disabled')) {
              ship.dataset.position = 'vertical';

              document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');
              document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.remove('disabled');
  
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.add('disabled');
            }

          }

          if (length === 4) {
            if (!document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.contains('disabled')) {
              ship.dataset.position = 'vertical';

              document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');
              document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.remove('disabled');
              document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.remove('disabled');
  
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.add('disabled');
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.add('disabled');
            }
          }
        }
      } else {
        if (x <= 9 - length + 1) {
          if (length === 2) {
            if (!document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.contains('disabled')) {
              ship.dataset.position = 'horizontal';

              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');

              document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
            }
          }

          if (length === 3) {
            if (!document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.contains('disabled')) {
              ship.dataset.position = 'horizontal';

              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.remove('disabled');
  
              document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
              document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.add('disabled');
            }
          }

          if (length === 4) {
            if (!document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.contains('disabled') && !document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.contains('disabled')) {
              ship.dataset.position = 'horizontal';

              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.remove('disabled');
              document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.remove('disabled');
  
              document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
              document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.add('disabled');
              document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.add('disabled');
            }
          }
        }
      }
    });
  });
};

const generateShips = () => {
  const coordinates = generateRandomShipCoordinates();
  const grid = document.querySelector('#player');

  coordinates.forEach((coord) => {
    if (typeof coord[0] === 'number') {
      let [x, y] = coord;
      let newShip = document.createElement('div');
      newShip.classList.add('draggable');
      newShip.dataset.length = '1';
      newShip.draggable = true;
      grid.querySelector(`[data-x-coord="${x}"][data-y-coord="${y}"]`).appendChild(newShip);
    } else {
      if (coord.length === 2) {
        let [x, y] = coord[0];
        let newShip = document.createElement('div');
        newShip.classList.add('draggable');
        newShip.dataset.length = '2';
        newShip.draggable = 'true';

        let [a, b] = coord[1];
        if (x < a) {
          newShip.dataset.position = 'horizontal';
        } else {
          newShip.dataset.position = 'vertical';
          [x, y] = coord[1];
        }

        grid.querySelector(`[data-x-coord="${x}"][data-y-coord="${y}"]`).appendChild(newShip);
      }

      if (coord.length === 3) {
        let [x, y] = coord[0];
        let newShip = document.createElement('div');
        newShip.classList.add('draggable');
        newShip.dataset.length = '3';
        newShip.draggable = 'true';

        let [a, b] = coord[1];
        if (x < a) {
          newShip.dataset.position = 'horizontal';
        } else {
          newShip.dataset.position = 'vertical';
          [x, y] = coord[2];
        }

        grid.querySelector(`[data-x-coord="${x}"][data-y-coord="${y}"]`).appendChild(newShip);
      }

      if (coord.length === 4) {
        let [x, y] = coord[0];
        let newShip = document.createElement('div');
        newShip.classList.add('draggable');
        newShip.dataset.length = '4';
        newShip.draggable = 'true';

        let [a, b] = coord[1];
        if (x < a) {
          newShip.dataset.position = 'horizontal';
        } else {
          newShip.dataset.position = 'vertical';
          [x, y] = coord[3];
        }

        grid.querySelector(`[data-x-coord="${x}"][data-y-coord="${y}"]`).appendChild(newShip);
      }
    }
  });

  const spreadCoord = spreadCoordinateArray(coordinates);
  spreadCoord.forEach((coord) => {
    let [x, y] = coord;
    grid.querySelector(`[data-x-coord="${x}"][data-y-coord="${y}"]`).classList.add('disabled');
  })
}

export { generateCells, enableDragAndDrop, enableRotation, generateShips };
