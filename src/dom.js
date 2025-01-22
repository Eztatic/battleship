const dialog = document.querySelector('dialog');
const board1 = document.querySelector('.board');
const ships = document.querySelectorAll('.ship');
const vsComputer = document.querySelector('.computer');
const boardLength = 100;
let cells = [];

let draggedShip = null;
let currentBlock = null;
let successDrop = false;
let blockPositions = 'horizontal';
let targetCells = [];

function showGameModes() {
  dialog.showModal();
  dialog.classList.add('show');
  vsComputer.addEventListener('click', () => {
    dialog.close();
    dialog.classList.remove('show');
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

// DRAG FEATURE

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

function outOfBounds(cell, block, boardLength, blockLength) {
  if (cell - block > boardLength - blockLength || cell - block < 0) return true;
}

ships.forEach((ship) => {
  const blocks = ship.querySelectorAll('.block');
  blocks.forEach((block) => {
    block.addEventListener('mousedown', () => (currentBlock = block));
  });
  ship.addEventListener('dragstart', dragStart);
  ship.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
  draggedShip = this;

  const rect = this.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  const ghost = document.createElement('div');
  ghost.className = 'ship';
  ghost.style.position = 'absolute';
  ghost.style.opacity = '0.5';
  const blocks = this.querySelectorAll('.block');

  blocks.forEach((block) => {
    const clone = block.cloneNode(true);
    ghost.appendChild(clone);
  });

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

  successDrop = true;
}

export {renderBoardCells, showGameModes};
