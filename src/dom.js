const gameMode = document.querySelector('.game-modes');
const board1 = document.querySelector('.board-1 .board');
const ships = document.querySelectorAll('.ship');
const resetBtn = document.querySelector('.resetBtn');
const rotateBtn = document.querySelector('.rotateBtn');
const vsComputer = document.querySelector('.computer');
const boardLength = 100;

let draggedShip = null;
let currentBlock = null;
let successDrop = false;
let blockPositions = 'horizontal';
let cells = [];
let targetCells = [];
let shipDetails = [];

function showGameModes() {
  gameMode.showModal();
  gameMode.classList.add('show');
  vsComputer.addEventListener('click', () => {
    gameMode.close();
    gameMode.classList.remove('show');
  });
}

function renderBoardCells(playerBoard) {
  playerBoard.forEach((row, x) => {
    row.forEach((col, y) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      board1.appendChild(cell);
    });
  });

  cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dropShip);
  });
}

function allShipsPlaced(ships) {
  return Array.from(ships).some((ship) => {
    if (!ship.classList.contains('hidden')) return true;
  });
}

// DRAG N DROP FEATURE

// Helper Functions

function removeHighlights() {
  targetCells.forEach((cell) => {
    cell.classList.remove('highlight');
  });
  targetCells = [];
}

function validateCells(blocks, blockX, blockY, cellX, cellY, cb) {
  let result = false;

  blocks.forEach((block) => {
    const offsetX = parseInt(block.dataset.offsetX) - blockX;
    const offsetY = parseInt(block.dataset.offsetY) - blockY;
    const targetCell = document.querySelector(
      `.cell[data-x="${cellX + offsetX}"][data-y="${cellY + offsetY}"]`,
    );

    if (targetCell) cb(targetCell);

    if (targetCell && targetCell.classList.contains('filled')) {
      result = true;
    }
  });

  return result;
}

function getTargetCell(blocks, blockX, blockY, cellX, cellY) {
  let result = [];

  blocks.forEach((block) => {
    const offsetX = parseInt(block.dataset.offsetX) - blockX;
    const offsetY = parseInt(block.dataset.offsetY) - blockY;
    const targetCell = document.querySelector(
      `.cell[data-x="${cellX + offsetX}"][data-y="${cellY + offsetY}"]`,
    );

    if (targetCell)
      result.push({
        x: targetCell.dataset.x,
        y: targetCell.dataset.y,
        position: blockPositions,
        length: parseInt(block.parentElement.dataset.size),
      });
  });

  return result[0];
}

function outOfBounds(cell, block, boardLength, blockLength) {
  if (cell - block > boardLength - blockLength || cell - block < 0) return true;
}

function getShipDetails() {
  return shipDetails.sort((a, b) => {
    return a.length - b.length;
  });
}

ships.forEach((ship) => {
  const blocks = ship.querySelectorAll('.block');
  blocks.forEach((block) => {
    block.addEventListener('mousedown', () => (currentBlock = block));
  });
  ship.addEventListener('dragstart', dragStart);
  ship.addEventListener('dragend', dragEnd);
});

// Event Handlers

function dragStart(e) {
  draggedShip = this;

  // Auto offset
  const rect = this.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  // Ghost Element
  const ghost = draggedShip.cloneNode(true);
  ghost.style.opacity = '0.5';
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, offsetX, offsetY);

  setTimeout(() => {
    draggedShip.classList.add('hidden');
    document.body.removeChild(ghost);
  }, 0);
}

function dragEnd() {
  if (!successDrop) draggedShip.classList.remove('hidden');
  draggedShip = null;
  successDrop = false;
  removeHighlights();
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();

  const startX = parseInt(this.dataset.x);
  const startY = parseInt(this.dataset.y);
  const blocks = draggedShip.querySelectorAll('.block');
  const currentBlockX = parseInt(currentBlock.dataset.offsetX);
  const currentBlockY = parseInt(currentBlock.dataset.offsetY);

  validateCells(
    blocks,
    currentBlockX,
    currentBlockY,
    startX,
    startY,
    (cell) => {
      targetCells.push(cell);
      if (!cell.classList.contains('filled')) cell.classList.add('highlight');
    },
  );
}

function dragLeave(e) {
  e.preventDefault();
  removeHighlights();
}

function dropShip(e) {
  e.preventDefault();

  const startX = parseInt(this.dataset.x);
  const startY = parseInt(this.dataset.y);
  const blocks = draggedShip.querySelectorAll('.block');
  const currentBlockX = parseInt(currentBlock.dataset.offsetX);
  const currentBlockY = parseInt(currentBlock.dataset.offsetY);
  const blockLength = parseInt(currentBlock.parentElement.dataset.size);

  if (
    blockPositions === 'vertical' &&
    outOfBounds(startX, currentBlockX, boardLength, blockLength)
  ) {
    return;
  }
  if (
    blockPositions === 'horizontal' &&
    outOfBounds(startY, currentBlockY, boardLength, blockLength)
  ) {
    return;
  }

  const isFilled = Array.from(blocks).some((block) => {
    const offsetX = parseInt(block.dataset.offsetX) - currentBlockX;
    const offsetY = parseInt(block.dataset.offsetY) - currentBlockY;

    const targetCell = document.querySelector(
      `.cell[data-x="${startX + offsetX}"][data-y="${startY + offsetY}"]`,
    );

    if (targetCell === null) return true;
    return targetCell.classList.contains('filled');
  });
  if (isFilled) return;

  validateCells(
    blocks,
    currentBlockX,
    currentBlockY,
    startX,
    startY,
    (cell) => {
      cell.classList.remove('highlight');
      cell.classList.add('filled');
    },
  );

  const firstTargetCell = getTargetCell(
    blocks,
    currentBlockX,
    currentBlockY,
    startX,
    startY,
  );
  shipDetails.push(firstTargetCell);

  successDrop = true;
}

// Button Events

rotateBtn.addEventListener('click', () => {
  ships.forEach((shape) => {
    const isHorizontal = shape.dataset.position === 'horizontal';
    blockPositions = isHorizontal ? 'vertical' : 'horizontal';
    shape.dataset.position = isHorizontal ? 'vertical' : 'horizontal';
    shape.style.flexDirection = isHorizontal ? 'column' : 'row';
    shape.querySelectorAll('.block').forEach((block) => {
      [block.dataset.offsetX, block.dataset.offsetY] = [
        block.dataset.offsetY,
        block.dataset.offsetX,
      ];
    });
  });
});

resetBtn.addEventListener('click', () => {
  if (!cells) return;
  cells.forEach((cell) => {
    cell.classList.remove('filled');
  });
  ships.forEach((ship) => ship.classList.remove('hidden'));
  shipDetails = [];
});

export {renderBoardCells, showGameModes, getShipDetails, allShipsPlaced};
