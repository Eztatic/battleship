const dialog = document.querySelector('dialog');
const board1 = document.querySelector('.board');

// dialog.showModal();
// dialog.classList.add('show');

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
}

export {renderBoardCells};
