import {generateCells, enableDragAndDrop, enableRotation, generateShips} from "../modules/dom.js";

generateShips();
enableDragAndDrop();
enableRotation();

const disableDragAndDrop = () => {
  const draggables = document.querySelectorAll('[draggable="true"]');
  draggables.forEach((div) => {
    div.draggable = false;
    div.style.cursor = 'default';
    div.style.pointerEvents = 'none';
    div.classList.add('disabled')
  });
}

// disableDragAndDrop();