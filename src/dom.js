import './style.css';
import {
  player1,
  player2,
  computer,
  randomPlacement,
  placePlayerShips,
  startRound,
  play,
  attackBoard,
  resetBoardData,
} from './battleship.js';

const gameMode = document.querySelector('.game-modes');
const vsComputer = document.querySelector('.computer');
const vsP2 = document.querySelector('.p2p');

const player1UIBoard = document.querySelector('.board-1');
const player2UIBoard = document.querySelector('.board-2');
const compUIBoard = document.querySelector('.board-3');
const scoreboard = document.querySelector('.scoreboard');

const shipContainer = document.querySelector('.ships');
const ships = document.querySelectorAll('.ship');

const buttonContainers = document.querySelectorAll('.board-buttons');
const rotateBtn = document.querySelector('.rotate-button');
const closeScoreboardBtn = scoreboard.querySelector('.close');
const playAgainBtn = document.querySelector('.play-again-button');

const loader = document.querySelector('.loader');

const boardLength = 100;
let mode;
let cells = [];
let currentBoard = [];
let shipDetails = [];
let currentBlock = null;
let draggedShip = null;
let successDrop = false;
let blockPositions = 'horizontal';

vsComputer.addEventListener('click', () => {
  mode = 'vsAI';
  player1UIBoard.classList.add('active');
  compUIBoard.classList.add('active');
  preparationPhase(player1, player1UIBoard);
  setupResetBtn(player1, player1UIBoard);
  setupRandomBtn(player1, player1UIBoard);
  setupFinishBtn(player1UIBoard, () => {
    battlePhaseOn();
  });
  gameMode.close();
});

vsP2.addEventListener('click', () => {
  mode = 'P2P';
  player1UIBoard.classList.add('active');
  player2UIBoard.classList.add('active');
  preparationPhase(player1, player1UIBoard);
  setupResetBtn(player1, player1UIBoard);
  setupResetBtn(player2, player2UIBoard);
  setupRandomBtn(player1, player1UIBoard);
  setupRandomBtn(player2, player2UIBoard);
  setupFinishBtn(player1UIBoard, () => {
    toggleLoader();
    player1UIBoard.classList.add('hidden');
    player2UIBoard.classList.remove('hidden');
    placePlayerShips(player1);
    preparationPhase(player2, player2UIBoard);
    setTimeout(() => toggleLoader(), 1000);
  });
  setupFinishBtn(player2UIBoard, () => {
    player1UIBoard.classList.remove('hidden');
    battlePhaseOn();
  });
  gameMode.close();
});

function getMode() {
  return mode;
}

// GAMEPLAY FUNCTIONS

function preparationPhase(player, UIBoard) {
  resetShipHandler(player);
  resetBoards(UIBoard);
  renderBoardCells(player.gameboard.board, UIBoard);
  addDragEvents(UIBoard);
}

function battlePhaseOn() {
  toggleLoader();

  shipContainer.classList.add('hidden');
  buttonContainers.forEach((cont) => {
    cont.classList.add('hidden');
  });

  if (mode === 'vsAI') {
    compUIBoard.classList.remove('hidden');
    startRound(mode);
    renderComputerBoard();
  } else if (mode === 'P2P') {
    player1UIBoard.classList.remove('hidden');
    hideFilled(player2UIBoard);
    startRound(mode);
    renderPlayerBoards();
  }

  toggleBoardCovers(player1UIBoard);
  setTimeout(() => toggleLoader(), 3000);
  // console.log(player1, player2, computer);
}

function battlePhaseOff() {
  shipContainer.classList.remove('hidden');
  buttonContainers.forEach((cont) => {
    cont.classList.remove('hidden');
  });
  compUIBoard.classList.add('hidden');
  player2UIBoard.classList.add('hidden');
}

function toggleLoader() {
  loader.classList.toggle('hidden');
}

function endRound() {
  playAgainBtn.classList.add('hidden');
  hideAllBoardCovers();
  battlePhaseOff();
  preparationPhase(player1, player1UIBoard);
}

function showScoreboard(score1, score2) {
  const player1Score = scoreboard.querySelector('.player-1 .score');
  const opponentScore = scoreboard.querySelector('.opponent .score');
  if (mode === 'P2P')
    scoreboard.querySelector('.opponent .name').innerText = 'Player 2';
  player1Score.innerText = score1;
  opponentScore.innerText = score2;
  scoreboard.showModal();
}

// SETUP BUTTONS

function showPlayAgainBtn() {
  playAgainBtn.classList.remove('hidden');
}

function setupResetBtn(player, UIBoard) {
  const resetBtn = UIBoard.querySelector('.reset-button');
  resetBtn.addEventListener('click', () => {
    resetShipHandler(player);
  });
}

function setupRandomBtn(player, UIBoard) {
  const randomBtn = UIBoard.querySelector('.randomize-button');
  randomBtn.addEventListener('click', () => {
    const boardData = randomPlacement(player);
    resetBoards(UIBoard);
    renderBoardCells(boardData, UIBoard);
    addFilled(boardData, UIBoard);
    addDragEvents(UIBoard);
    hideAllShips();
    cells = UIBoard.querySelectorAll('.cell');
  });
}

function setupFinishBtn(UIBoard, cb) {
  const finishBtn = UIBoard.querySelector('.finish-button');
  finishBtn.addEventListener('click', () => {
    if (allShipsPlaced(ships)) return alert('Must place all ships');
    cb();
  });
}

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

const resetShipHandler = (player) => {
  if (!cells) return;
  cells.forEach((cell) => {
    cell.classList.remove('filled');
  });
  ships.forEach((ship) => ship.classList.remove('hidden'));
  shipDetails = [];
  resetBoardData(player);
};

rotateBtn.addEventListener('click', rotateShipHandler);
closeScoreboardBtn.addEventListener('click', () => scoreboard.close());
playAgainBtn.addEventListener('click', () => endRound());

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
addBoardCover(player2UIBoard, `Player 2's Turn`);
addBoardCover(compUIBoard, `Computer's Turn`);

function toggleBoardCovers(...targetBoards) {
  targetBoards.forEach((board) => {
    const coverBoard = board.querySelector('.board-cover');
    coverBoard.classList.toggle('hidden');
    coverBoard.parentElement.classList.remove('not-selectable');
  });
}

function hideAllBoardCovers() {
  const boardCovers = document.querySelectorAll('.board-cover');
  boardCovers.forEach((cover) => cover.classList.add('hidden'));
}

// BOARD FUNCTIONS

document.querySelectorAll('.board').forEach((board) => {
  board.targetCells = [];
});

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

function addFilled(boardData, UIBoard) {
  const board = UIBoard.querySelector('.board');
  boardData.forEach((row, x) => {
    row.forEach((col, y) => {
      if (boardData[x][y] === 1) {
        const cell = board.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add('filled');
      }
    });
  });
}

function hideFilled(UIBoard) {
  const board = UIBoard.querySelector('.board');
  const cells = board.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.classList.remove('filled');
  });
}

function addDragEvents(UIBoard) {
  cells = UIBoard.querySelectorAll(`.cell`);
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

function resetBoards(...UIBoards) {
  UIBoards.forEach((board) => {
    board.querySelector('.board').classList.remove('not-selectable');
    const cells = board.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.remove();
    });
  });
}

function updateUIBoard(mode, opponent, x, y, impact) {
  const toggleCovers = () => {
    if (mode === 'vsAI') {
      toggleBoardCovers(player1UIBoard, compUIBoard);
    } else if (mode === 'P2P') {
      toggleBoardCovers(player1UIBoard, player2UIBoard);
    }
  };
  if (impact === 'game over') impact = 'hit';
  validateClickedCell(x, y, impact);
  if (impact === 'game over') return;
  if (impact === 'hit') return;

  if (opponent !== computer) {
    setTimeout(toggleCovers, 1000);
  } else {
    toggleCovers();
  }
}

function renderComputerBoard() {
  resetBoards(compUIBoard);
  renderBoardCells(computer.gameboard.board, compUIBoard);
  addCellEvents(compUIBoard, computer);
}

function renderPlayerBoards() {
  addCellEvents(player1UIBoard, player1);
  addCellEvents(player2UIBoard, player2);
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

function clickCell(opponent, e) {
  const cell = e.target;
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);
  if (
    cell.classList.contains('cell') &&
    !cell.classList.contains('hit') &&
    !cell.classList.contains('miss')
  ) {
    cell.classList.remove('on-select');
    const impact = attackBoard(opponent, x, y, mode);
    if (impact === 'miss') cell.parentElement.classList.add('not-selectable');
    updateUIBoard(mode, opponent, x, y, impact);
    play();
  }
}

function validateClickedCell(x, y, impact) {
  let uncoveredBoard = document.querySelector(
    '.active:has(.board-cover.hidden)',
  );
  updateCell(uncoveredBoard, x, y, impact);
}

function addCellEvents(UIBoard, opponent) {
  const board = UIBoard.querySelector('.board');
  board.addEventListener('mouseover', hoverCell);
  // board.addEventListener('click', (e) => clickCell(opponent, e));
  board.onclick = function (e) {
    clickCell(opponent, e);
  };
}

function updateCell(UIBoard, x, y, impact) {
  const targetCell = UIBoard.querySelector(
    `.cell[data-x="${x}"][data-y="${y}"]`,
  );
  targetCell.classList.add(impact);
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

function hideAllShips() {
  ships.forEach((ship) => ship.classList.add('hidden'));
}

// HELPER FUNCTIONS

// Remove highlights for every target cells highlighted
function removeHighlights(board) {
  if (!board || !board.targetCells) return;
  board.targetCells.forEach((cell) => {
    cell.classList.remove('highlight');
  });
  board.targetCells = [];
}

// Get target cell
function getTargetCell(block, blockX, blockY, cellX, cellY, board) {
  const offsetX = parseInt(block.dataset.offsetX) - blockX;
  const offsetY = parseInt(block.dataset.offsetY) - blockY;
  const targetCell = board.querySelector(
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
function validateCells(blocks, blockX, blockY, cellX, cellY, cb, board) {
  const targetCells = [];

  blocks.forEach((block) => {
    let targetCell = getTargetCell(block, blockX, blockY, cellX, cellY, board);

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
  // If ship was dragged but not placed, restore the ship's visibility
  if (!successDrop) draggedShip.classList.remove('hidden');
  // If ship was placed successfully, reset drag details and remove highlighted
  // styles in board
  draggedShip = null;
  successDrop = false;

  // Remove highlights from the current board
  if (currentBoard) {
    removeHighlights(currentBoard);
    currentBoard = null;
  }
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();

  const board = this.closest('.board');
  if (!board) return;

  currentBoard = board; // Track the current board

  const startX = parseInt(this.dataset.x);
  const startY = parseInt(this.dataset.y);
  const blocks = draggedShip.querySelectorAll('.block');
  const currentBlockX = parseInt(currentBlock.dataset.offsetX);
  const currentBlockY = parseInt(currentBlock.dataset.offsetY);

  // Clear previous highlights
  removeHighlights(board);

  // Highlight cells that are available for placement based on
  // dragged ship's position and length
  validateCells(
    blocks,
    currentBlockX,
    currentBlockY,
    startX,
    startY,
    (cell) => {
      board.targetCells.push(cell);
      if (!cell.classList.contains('filled')) cell.classList.add('highlight');
    },
    board,
  );
}

function dragLeave(e) {
  e.preventDefault();
  const board = this.closest('.board');
  if (!board) return;
  removeHighlights(board);
}

function dropShip(e) {
  e.preventDefault();

  const board = this.closest('.board');
  if (!board) return;

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
      board,
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
    board,
  );

  shipDetails.push(firstTargetCell);
  successDrop = true;
  removeHighlights(board);
}

window.onload = () => {
  gameMode.showModal();
};

export {
  getShipDetails,
  showScoreboard,
  showPlayAgainBtn,
  updateUIBoard,
  getMode,
};
