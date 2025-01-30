const gameMode = document.querySelector('.game-modes');
const vsComputer = document.querySelector('.computer');

const player1UIBoard = document.querySelector('.board-1');
const compUIBoard = document.querySelector('.board-2');
const scoreboard = document.querySelector('.scoreboard');

const shipContainer = document.querySelector('.ships');
const ships = document.querySelectorAll('.ship');

const buttonContainers = document.querySelector('.board-buttons');
const resetBtn = document.querySelector('.reset-button');
const rotateBtn = document.querySelector('.rotate-button');
const finishBtn = document.querySelector('.finish-button');
const closeScoreboardBtn = scoreboard.querySelector('.close');
const playAgainBtn = document.querySelector('.play-again-button');

const loader = document.querySelector('.loader');

const boardLength = 100;
let cells = [];
let targetCells = [];
let shipDetails = [];
let currentBlock = null;
let draggedShip = null;
let successDrop = false;
let blockPositions = 'horizontal';

function showGameModes(battleFunction) {
  gameMode.showModal();
  finishBtn.addEventListener('click', () => {
    if (allShipsPlaced(ships)) return alert('Must place all ships');
    battleFunction();
  });
}

function showScoreboard(score1, score2) {
  const player1Score = scoreboard.querySelector('.player-1 .score');
  const opponentScore = scoreboard.querySelector('.opponent .score');
  player1Score.innerText = score1;
  opponentScore.innerText = score2;
  scoreboard.showModal();
}

function endRound(boardData, UIBoard) {
  playAgainBtn.classList.add('hidden');
  hideAllBoardCovers();
  battlePhaseOff();
  preparationPhase(boardData, UIBoard);
}

function setupPlayAgain(boardData, UIBoard) {
  const boundEndRound = endRound.bind(null, boardData, UIBoard);
  playAgainBtn.addEventListener('click', boundEndRound);
}

function showPlayAgainBtn() {
  playAgainBtn.classList.remove('hidden');
}

// BOARD FUNCTIONS

// Render UI board cells
function renderBoardCells(boardData, UIBoard) {
  const board = UIBoard.querySelector('.board');
  boardData.forEach((row, x) => {
    row.forEach((col, y) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      board.appendChild(cell);
    });
  });
}

// Add drag events to cells where ships are to be placed
function addDragEvents(UIBoard) {
  cells = UIBoard.querySelectorAll(`.cell`);
  cells.forEach((cell) => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dropShip);
  });
}

// Check if all UI ships are placed
function allShipsPlaced(ships) {
  return Array.from(ships).some((ship) => {
    if (!ship.classList.contains('hidden')) return true;
  });
}

// Remove all cells in boards
function resetBoards(...UIBoards) {
  UIBoards.forEach((board) => {
    const cells = board.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.remove();
    });
  });
}

// CELL FUNCTIONS

function hoverCell(e) {
  const cell = e.target;
  if (
    cell.classList.contains('cell') &&
    !cell.classList.contains('hit') &&
    !cell.classList.contains('miss')
  ) {
    cell.classList.add('on-select');
  }
}

function clickCell(entity, cb, e) {
  const cell = e.target;
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);
  if (
    cell.classList.contains('cell') &&
    !cell.classList.contains('hit') &&
    !cell.classList.contains('miss')
  ) {
    cell.classList.remove('on-select');
    cb(entity, x, y);
  }
}

function validateClickedCell(x, y, impact) {
  let uncoveredBoard = document.querySelector(
    '.board-cover.hidden',
  ).parentElement;
  updateCell(uncoveredBoard, x, y, impact);
}

function addCellEvents(UIBoard, entity, cb) {
  const board = UIBoard.querySelector('.board');
  board.addEventListener('mouseover', hoverCell);
  board.addEventListener('click', (e) => clickCell(entity, cb, e));
}

function updateCell(UIboard, x, y, impact) {
  const targetCell = UIboard.querySelector(
    `.cell[data-x="${x}"][data-y="${y}"]`,
  );
  targetCell.classList.add(impact);
}

// GAMEPLAY FUNCTIONS

function preparationPhase(boardData, UIBoard) {
  resetShipHandler();
  resetBoards(player1UIBoard, compUIBoard);
  renderBoardCells(boardData, UIBoard);
  addDragEvents(UIBoard);
}

function battlePhaseOn() {
  shipContainer.classList.add('hidden');
  buttonContainers.classList.add('hidden');
  compUIBoard.classList.remove('hidden');
}

function battlePhaseOff() {
  shipContainer.classList.remove('hidden');
  buttonContainers.classList.remove('hidden');
  compUIBoard.classList.add('hidden');
}

function toggleLoader() {
  loader.classList.toggle('hidden');
}

// DRAG N DROP FEATURE

// Add drag events for every UI ships
ships.forEach((ship) => {
  const blocks = ship.querySelectorAll('.block');
  blocks.forEach((block) => {
    block.addEventListener('mousedown', () => (currentBlock = block));
  });
  ship.addEventListener('dragstart', dragStart);
  ship.addEventListener('dragend', dragEnd);
});

// HELPER FUNCTIONS

// Remove highlights for every target cells highlighted
function removeHighlights() {
  targetCells.forEach((cell) => {
    cell.classList.remove('highlight');
  });
  targetCells = [];
}

// Get target cell
function getTargetCell(block, blockX, blockY, cellX, cellY) {
  const offsetX = parseInt(block.dataset.offsetX) - blockX;
  const offsetY = parseInt(block.dataset.offsetY) - blockY;
  const targetCell = document.querySelector(
    `.cell[data-x="${cellX + offsetX}"][data-y="${cellY + offsetY}"]`,
  );
  return targetCell;
}

// Store target cells
function addTargetCell(targetCells, targetCell, block) {
  targetCells.push({
    x: parseInt(targetCell.dataset.x),
    y: parseInt(targetCell.dataset.y),
    position: blockPositions,
    length: parseInt(block.parentElement.dataset.size),
  });
}

// Validate target cells
function validateCells(blocks, blockX, blockY, cellX, cellY, cb) {
  const targetCells = [];

  blocks.forEach((block) => {
    let targetCell = getTargetCell(block, blockX, blockY, cellX, cellY);

    if (targetCell) {
      addTargetCell(targetCells, targetCell, block);
      cb(targetCell);
    }
  });

  return targetCells[0];
}

// Check if ship placement is out of bounds
function outOfBounds(cell, block, boardLength, blockLength) {
  if (cell - block > boardLength - blockLength || cell - block < 0) return true;
}

// Sorts ship details in ascending order before available for access
function getShipDetails() {
  return shipDetails.sort((a, b) => {
    return a.length - b.length;
  });
}

// DRAG EVENT HANDLERS

function dragStart(e) {
  // Set dragged ship to the current ship being dragged
  draggedShip = this;

  // Get offset for accurate placement of ships in board
  const rect = this.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  // Customize ghost element or on drag element by making a
  // copy of the current dragged element
  const ghost = draggedShip.cloneNode(true);
  ghost.style.opacity = '0.5';
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, offsetX, offsetY);

  // When ship has started dragging hide its origin element
  setTimeout(() => {
    draggedShip.classList.add('hidden');
    document.body.removeChild(ghost);
  }, 0);
}

function dragEnd() {
  // If ship was dragged but not placed, restore the ships visibility
  if (!successDrop) draggedShip.classList.remove('hidden');
  // If ship was placed successfully, reset drag details and remove highlighted
  // styles in board
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

  // Highlight cells that are available for placement based on
  // dragged ship's position and length
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

  // Check if a vertical ship placement is out of bounds
  if (
    blockPositions === 'vertical' &&
    outOfBounds(startX, currentBlockX, boardLength, blockLength)
  ) {
    return;
  }
  // Check if a horizontal ship placement is out of bounds
  if (
    blockPositions === 'horizontal' &&
    outOfBounds(startY, currentBlockY, boardLength, blockLength)
  ) {
    return;
  }

  // Check if the intended placement of the ship is not empty
  const isFilled = Array.from(blocks).some((block) => {
    let targetCell = getTargetCell(
      block,
      currentBlockX,
      currentBlockY,
      startX,
      startY,
    );

    if (targetCell === null) return true;
    return targetCell.classList.contains('filled');
  });
  if (isFilled) return;

  // Place ship if it passes all conditions(out of bounds, filled placement)
  const firstTargetCell = validateCells(
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

  // Store ship details by getting the ships x, y, position, and length to
  // be stored in the database
  shipDetails.push(firstTargetCell);

  // If ship has been placed successfully change status to true
  successDrop = true;
}

// EVENT HANDLERS FOR BUTTONS

const rotateShipHandler = () => {
  ships.forEach((ship) => {
    const isHorizontal = ship.dataset.position === 'horizontal';
    blockPositions = isHorizontal ? 'vertical' : 'horizontal';
    ship.dataset.position = isHorizontal ? 'vertical' : 'horizontal';
    ship.style.flexDirection = isHorizontal ? 'column' : 'row';
    ship.querySelectorAll('.block').forEach((block) => {
      [block.dataset.offsetX, block.dataset.offsetY] = [
        block.dataset.offsetY,
        block.dataset.offsetX,
      ];
    });
  });
};

const resetShipHandler = () => {
  if (!cells) return;
  cells.forEach((cell) => {
    cell.classList.remove('filled');
  });
  ships.forEach((ship) => ship.classList.remove('hidden'));
  shipDetails = [];
};

// ADD BUTTON EVENTS

rotateBtn.addEventListener('click', rotateShipHandler);
resetBtn.addEventListener('click', resetShipHandler);
closeScoreboardBtn.addEventListener('click', () => {
  scoreboard.close();
});
vsComputer.addEventListener('click', () => {
  gameMode.close();
});

// BOARD COVERS FUNCTIONALITY

function addBoardCover(targetBoard, text) {
  const board = targetBoard.querySelector('.board');
  const coverBoard = document.createElement('div');
  coverBoard.innerText = text;
  coverBoard.classList.add('board-cover');
  coverBoard.classList.add('hidden');
  board.appendChild(coverBoard);
}
addBoardCover(player1UIBoard, `Player 1's Turn`);
addBoardCover(compUIBoard, `Computer's Turn`);

function toggleBoardCovers(...targetBoards) {
  targetBoards.forEach((board) => {
    const coverBoard = board.querySelector('.board-cover');
    coverBoard.classList.toggle('hidden');
  });
}

function hideAllBoardCovers() {
  const boardCovers = document.querySelectorAll('.board-cover');
  boardCovers.forEach((cover) => cover.classList.add('hidden'));
}

export {
  showGameModes,
  preparationPhase,
  renderBoardCells,
  addDragEvents,
  getShipDetails,
  toggleLoader,
  battlePhaseOn,
  toggleBoardCovers,
  updateCell,
  showScoreboard,
  showPlayAgainBtn,
  setupPlayAgain,
  validateClickedCell,
  addCellEvents,
};
