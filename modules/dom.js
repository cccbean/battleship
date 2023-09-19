const generateCells = () => {
  const gameboardDiv = document.querySelectorAll('.grid');
  gameboardDiv.forEach((gameboard) => {
    for (let i = 10; i >= 1; i--) {
      for (let j = 1; j <= 10; j++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.xCoord = `${j}`;
        cellDiv.dataset.yCoord = `${i}`;
        gameboard.appendChild(cellDiv);
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

  // Check for disabled cells along the full length of the ship, not just the head
  cells.forEach((cell) => {
    cell.addEventListener('dragover', (e) => {
      e.preventDefault();

      const dragging = document.querySelector('.dragging');
      const length = dragging.dataset.length;
      const position = dragging.dataset.position;

      if (!cell.classList.contains('disabled')) {
        if (length > 1) {
          if (position === 'horizontal') {
            const x = Number(cell.dataset.xCoord);
            if (x <= 10 - length + 1) {
              cell.appendChild(dragging);
            }
          } else {
            const y = Number(cell.dataset.yCoord);
            if (y >= length) {
              cell.appendChild(dragging);
            }
          }
        } else {
          cell.appendChild(dragging);
        }
      }
    });
  });
};

// Rotate has to check for disabled cells too...
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
        if (y >= length) {
          ship.dataset.position = 'vertical';

          if (length === 2) {
            document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');

            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
          }

          if (length === 3) {
            document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');
            document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.remove('disabled');

            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.add('disabled');
          }

          if (length === 4) {
            document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.remove('disabled');
            document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.remove('disabled');
            document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.remove('disabled');

            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.add('disabled');
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.add('disabled');
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.add('disabled');
          }
        }
      } else {
        if (x <= 10 - length + 1) {
          ship.dataset.position = 'horizontal';

          if (length === 2) {
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');

            document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
          }

          if (length === 3) {
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.remove('disabled');

            document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
            document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.add('disabled');
          }

          if (length === 4) {
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 1}"]`).classList.remove('disabled');
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 2}"]`).classList.remove('disabled');
            document.querySelector(`[data-x-coord="${x}"][data-y-coord="${y - 3}"]`).classList.remove('disabled');

            document.querySelector(`[data-x-coord="${x + 1}"][data-y-coord="${y}"]`).classList.add('disabled');
            document.querySelector(`[data-x-coord="${x + 2}"][data-y-coord="${y}"]`).classList.add('disabled');
            document.querySelector(`[data-x-coord="${x + 3}"][data-y-coord="${y}"]`).classList.add('disabled');
          }
        }
      }
    });
  });
};

export { generateCells, enableDragAndDrop, enableRotation };
