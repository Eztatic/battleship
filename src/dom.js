const gameMode = document.querySelector('.game-modes');
const scoreboard = document.querySelector('.scoreboard');
const player1UIBoard = document.querySelector('.board-1 .board');
const compUIBoard = document.querySelector('.board-2 .board');
const compBoardContainer = document.querySelector('.board-2');
const shipContainer = document.querySelector('.ships');
const ships = document.querySelectorAll('.ship');
const resetBtn = document.querySelector('.reset-button');
const rotateBtn = document.querySelector('.rotate-button');
const finishBtn = document.querySelector('.finish-button');
const buttonContainers = document.querySelector('.board-buttons');
const vsComputer = document.querySelector('.computer');
const loader = document.querySelector('.loader');
const playAgainBtn = document.querySelector('.play-again-button');
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

  vsComputer.addEventListener('click', () => {
    gameMode.close();
  });

  finishBtn.addEventListener('click', () => {
    if (allShipsPlaced(ships)) return alert('Must place all ships');
    battleFunction();
  });
}

function showScoreboard(score1, score2) {
  const closeBtn = scoreboard.querySelector('.close');
  const player1Score = scoreboard.querySelector('.player-1 .score');
  const opponentScore = scoreboard.querySelector('.opponent .score');
  player1Score.innerText = score1;
  opponentScore.innerText = score2;
  scoreboard.showModal();

  closeBtn.addEventListener('click', () => {
    scoreboard.close();
  });
}

function endRound(board, boardClass) {
  playAgainBtn.classList.add('hidden');
  hideAllBoardCovers();
  resetShipHandler();
  battlePhaseOff();
  preparationPhase(board, boardClass);
}

function showPlayAgainBtn() {
  playAgainBtn.classList.remove('hidden');
}

function setupPlayAgain(board, boardClass) {
  const boundEndRound = endRound.bind(null, board, boardClass);
  playAgainBtn.addEventListener('click', boundEndRound);
}

// Board Functions

// Render UI board cells
function renderBoardCells(board, boardClass) {
  board.forEach((row, x) => {
    row.forEach((col, y) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      document.querySelector(`.${boardClass} .board`).appendChild(cell);
    });
  });
}

// Add drag events to cells where ships are to be placed
function addDragEvents(UIBoard) {
  cells = document.querySelectorAll(`.${UIBoard} .cell`);
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
function resetBoards(...boards) {
  boards.forEach((board) => {
    const cells = board.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.remove();
    });
  });
}

// Gameplay Functions
function preparationPhase(board, boardClass) {
  resetBoards(player1UIBoard, compUIBoard);
  renderBoardCells(board, boardClass);
  addDragEvents(boardClass);
}

function battlePhaseOn() {
  shipContainer.classList.add('hidden');
  buttonContainers.classList.add('hidden');
  compBoardContainer.classList.remove('hidden');
}

function battlePhaseOff() {
  shipContainer.classList.remove('hidden');
  buttonContainers.classList.remove('hidden');
  compBoardContainer.classList.add('hidden');
}

function toggleLoader() {
  loader.classList.toggle('hidden');
}

// DRAG N DROP FEATURE

// Helper Functions

// Remove highlights for every target cells highlighted
function removeHighlights() {
  targetCells.forEach((cell) => {
    cell.classList.remove('highlight');
  });
  targetCells = [];
}

function getTargetCell(block, blockX, blockY, cellX, cellY) {
  const offsetX = parseInt(block.dataset.offsetX) - blockX;
  const offsetY = parseInt(block.dataset.offsetY) - blockY;
  const targetCell = document.querySelector(
    `.cell[data-x="${cellX + offsetX}"][data-y="${cellY + offsetY}"]`,
  );
  return targetCell;
}

function addTargetCell(targetCells, targetCell, block) {
  targetCells.push({
    x: parseInt(targetCell.dataset.x),
    y: parseInt(targetCell.dataset.y),
    position: blockPositions,
    length: parseInt(block.parentElement.dataset.size),
  });
}

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

// Validate and Update style of clicked cell
function updateCell(UIboard, x, y, impact) {
  const targetCell = UIboard.querySelector(
    `.cell[data-x="${x}"][data-y="${y}"]`,
  );
  targetCell.classList.add(impact);
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

// Add drag events for every UI ships
ships.forEach((ship) => {
  const blocks = ship.querySelectorAll('.block');
  blocks.forEach((block) => {
    block.addEventListener('mousedown', () => (currentBlock = block));
  });
  ship.addEventListener('dragstart', dragStart);
  ship.addEventListener('dragend', dragEnd);
});

// Drag Event Handlers

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

// Button Events

// Rotate ships
rotateBtn.addEventListener('click', () => {
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
});

// Restore ships to default state
const resetShipHandler = () => {
  if (!cells) return;
  cells.forEach((cell) => {
    cell.classList.remove('filled');
  });
  ships.forEach((ship) => ship.classList.remove('hidden'));
  shipDetails = [];
};

// Add event to reset button
resetBtn.addEventListener('click', resetShipHandler);

// Board Covers
function addBoardCover(targetBoard, text) {
  const coverBoard = document.createElement('div');
  coverBoard.innerText = text;
  coverBoard.classList.add('board-cover');
  coverBoard.classList.add('hidden');
  targetBoard.appendChild(coverBoard);
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
  allShipsPlaced,
  toggleLoader,
  battlePhaseOn,
  toggleBoardCovers,
  updateCell,
  showScoreboard,
  showPlayAgainBtn,
  setupPlayAgain,
};
