import {generateCells, enableDragAndDrop, enableRotation, generateShips, disableDragAndDrop} from "../modules/dom.js";
import { Player, createComputer } from "../modules/game-logic.js";

generateShips();
enableDragAndDrop();
enableRotation();

const newGameBtn = document.querySelector('#new-game');
newGameBtn.addEventListener('click', () => {
  disableDragAndDrop();
  game();
})

const getPlayerShipCoordFromDOM = () => {
  const playerShipHeads = document.querySelectorAll('.draggable');
  const shipCoord = [];
  playerShipHeads.forEach((shipHead)=> {
    const parent = shipHead.parentElement;
    const length = Number(shipHead.dataset.length);
    const position = shipHead.dataset.position;
    const x = Number(parent.dataset.xCoord);
    const y = Number(parent.dataset.yCoord);
    const coord = [x, y];

    if (length === 1) {
      shipCoord.push(coord);
    }

    if (length === 2) {
      let coord2 = [];
      if (position === 'horizontal') {
        coord2.push(coord);
        coord2.push([x + 1, y]);
      } else {
        coord2.push(coord);
        coord2.push([x, y - 1]);
      }

      shipCoord.push(coord2);
    }

    if (length === 3) {
      let coord3 = [];
      if (position === 'horizontal') {
        coord3.push(coord);
        coord3.push([x + 1, y]);
        coord3.push([x + 2, y]);
      } else {
        coord3.push(coord);
        coord3.push([x, y - 1]);
        coord3.push([x, y - 2]);
      }

      shipCoord.push(coord3);
    }

    if (length === 4) {
      let coord4 = [];
      if (position === 'horizontal') {
        coord4.push(coord);
        coord4.push([x + 1, y]);
        coord4.push([x + 2, y]);
        coord4.push([x + 3, y]);
      } else {
        coord4.push(coord);
        coord4.push([x, y - 1]);
        coord4.push([x, y - 2]);
        coord4.push([x, y - 3]);
      }

      shipCoord.push(coord4);
    }
  })

  return shipCoord;
};

const game = () => {
  const whiteouts = document.querySelectorAll('.whiteout');
  const playerWhiteout = whiteouts[0];
  const computerWhiteout = whiteouts[1];
  playerWhiteout.style.display = 'block';

  const computer = createComputer();
  const playerCoord = getPlayerShipCoordFromDOM();
  const player = Player(playerCoord);
  console.log(computer);
  console.log(player);
  
  const computerCells = document.querySelectorAll('#computer .cell');
  computerCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const x = Number(cell.dataset.xCoord);
      const y = Number(cell.dataset.yCoord);
      const coord = [x, y];
      const result = computer.gameboard.receiveAttack(coord);
      
      if (result === 'Hit') {
        cell.style.backgroundColor = 'red';
      } else {
        cell.style.backgroundColor = 'gray';
      }

      cell.style.pointerEvents = 'none';

      if (computer.gameboard.allShipsSunk()) {
        const textDisplay = document.querySelector('#text-display');
        computerWhiteout.style.display = 'block';
        textDisplay.textContent = 'Winner: Player';
      } else {
        computerWhiteout.style.display = 'block';
        playerWhiteout.style.display = 'none';
        setTimeout(computerPlays, 500);
      }
    })
  })

  const computerPlays = () => {
    computer.computerTurn(player);
    const attackCoord = player.gameboard.prevAttacks[player.gameboard.prevAttacks.length - 1].split(',');
    console.log(attackCoord);
    const [x, y] = attackCoord;
    const grid = document.querySelector('#player');
    grid.querySelector(`[data-x-coord="${x}"][data-y-coord="${y}"]`).style.backgroundColor = 'black';


    if (player.gameboard.allShipsSunk()) {
      const textDisplay = document.querySelector('#text-display');
      playerWhiteout.style.display = 'block';
      textDisplay.textContent = 'Winner: Computer';
    } else {
      playerWhiteout.style.display = 'block';
      computerWhiteout.style.display = 'none';
    }
  }
}
