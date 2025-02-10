"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/battleship.js":
/*!***************************!*\
  !*** ./src/battleship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.attackBoard = attackBoard;
exports.computer = void 0;
exports.endGame = endGame;
exports.placePlayerShips = placePlayerShips;
exports.play = play;
exports.player2 = exports.player1 = void 0;
exports.randomPlacement = randomPlacement;
exports.resetBoardData = resetBoardData;
exports.startRound = startRound;
var _gameboard = _interopRequireDefault(__webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js"));
var _ship = _interopRequireDefault(__webpack_require__(/*! ./ship.js */ "./src/ship.js"));
var _player = _interopRequireDefault(__webpack_require__(/*! ./player.js */ "./src/player.js"));
var _computer = _interopRequireDefault(__webpack_require__(/*! ./computer.js */ "./src/computer.js"));
var DOM = _interopRequireWildcard(__webpack_require__(/*! ./dom.js */ "./src/dom.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var player1UIBoard = document.querySelector('.board-1');
var player2UIBoard = document.querySelector('.board-2');
var compUIBoard = document.querySelector('.board-3');
var player1 = exports.player1 = new _player["default"]('Player 1', new _gameboard["default"]());
var player2 = exports.player2 = new _player["default"]('Player 2', new _gameboard["default"]());
var computer = exports.computer = new _computer["default"](new _gameboard["default"]());
var shipsLengths = [2, 3, 3, 4, 5];
function createShips(shipsLengths) {
  var ships = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  shipsLengths.forEach(function (length) {
    ships.push(new _ship["default"](length));
  });
  return ships;
}
function randomPlacement(player) {
  var playerShips = createShips(shipsLengths);
  resetBoardData(player);
  playerShips.forEach(function (ship) {
    player.placeShipRandomly(ship);
  });
  return player.gameboard.board;
}
function placePlayerShips(player) {
  var playerShips = createShips(shipsLengths);
  var shipDetails = DOM.getShipDetails();
  if (shipDetails.length < 5) return;
  for (var i = 0; i < shipsLengths.length; i++) {
    player.gameboard.placeShip(shipDetails[i].x, shipDetails[i].y, playerShips[i], shipDetails[i].position);
  }
}
function placeComputerShips() {
  var computerShips = createShips(shipsLengths);
  computerShips.forEach(function (ship) {
    computer.placeShipRandomly(ship);
  });
}
function resetBoardData() {
  for (var _len = arguments.length, entities = new Array(_len), _key = 0; _key < _len; _key++) {
    entities[_key] = arguments[_key];
  }
  entities.forEach(function (entity) {
    entity.gameboard.resetBoard();
  });
}
function resetTurns(entity1, entity2) {
  entity1.turn = false;
  entity2.turn = false;
}
function startRound(mode) {
  if (mode === 'vsAI') {
    placePlayerShips(player1);
    placeComputerShips();
    resetTurns(player1, computer);
  } else if (mode === 'P2P') {
    placePlayerShips(player2);
    resetTurns(player1, player2);
  }
  player1.switchTurn();
}
function switchTurn(mode) {
  var entity2 = computer;
  if (mode === 'P2P') entity2 = player2;
  player1.switchTurn();
  entity2.switchTurn();
  return player1.turn ? player1 : entity2;
}
function getCurrentTurn(mode) {
  var entity2 = computer;
  if (mode === 'P2P') entity2 = player2;
  return player1.turn === true ? player1 : entity2;
}
function checkWinner(mode) {
  var entity2 = computer;
  if (mode === 'P2P') entity2 = player2;
  if (player1.gameboard.allShipsSunk()) {
    return "".concat(entity2.name, " Wins");
  } else if (entity2.gameboard.allShipsSunk()) {
    return "".concat(player1.name, " Wins");
  }
}
function attackBoard(opponent, x, y, mode) {
  var impact = opponent.gameboard.receiveAttack(x, y);
  if (checkWinner(mode)) {
    endGame();
    return 'game over';
  }
  if (impact === 'hit') return 'hit';
  switchTurn(mode);
  return 'miss';
}
function play() {
  var mode = DOM.getMode();
  var currentTurn = getCurrentTurn(mode);
  if (currentTurn === computer) {
    var computerTurn = function computerTurn() {
      var _computer$attackBoard = computer.attackBoardRandomly(player1.gameboard),
        _computer$attackBoard2 = _slicedToArray(_computer$attackBoard, 2),
        x = _computer$attackBoard2[0],
        y = _computer$attackBoard2[1];
      var result = attackBoard(player1, x, y, mode);
      DOM.updateUIBoard(mode, player1, x, y, result);
      if (result === 'game-over') {
        return;
      }
      if (result === 'hit') {
        setTimeout(function () {
          return attackAdjacent(player1, [x, y]);
        }, 1000);
        // setTimeout(computerTurn, 1000);
      }
    };
    setTimeout(computerTurn, 1000);
  }
}
function attackAdjacent(opponent, lastHit) {
  var mode = DOM.getMode();
  var nextAttack = computer.enhancedAttackMode(opponent.gameboard, lastHit);
  if (nextAttack) {
    var _nextAttack = _slicedToArray(nextAttack, 2),
      newX = _nextAttack[0],
      newY = _nextAttack[1];
    var newResult = attackBoard(opponent, newX, newY, mode);
    DOM.updateUIBoard(mode, opponent, newX, newY, newResult);
    if (newResult === 'game-over') {
      return;
    }
    if (newResult === 'hit') {
      setTimeout(function () {
        return attackAdjacent(opponent, nextAttack);
      }, 1000);
    }
  }
}
function endGame() {
  var mode = DOM.getMode();
  var entity2 = computer;
  var entity2Board = compUIBoard;
  if (mode === 'P2P') {
    entity2 = player2;
    entity2Board = player2UIBoard;
  }
  var winner = checkWinner(mode);
  var winnerBoard = winner === 'Player 1 Wins' ? player1UIBoard : entity2Board;
  var coverBoard = winnerBoard.querySelector('.board-cover');
  var hiddenBoard = document.querySelector('.active:has(.board-cover.hidden)');
  if (winner) {
    coverBoard.innerText = winner;
    hiddenBoard.querySelector('.board').classList.add('not-selectable');
    getCurrentTurn(mode).incrementScore();
    DOM.showScoreboard(player1.score, entity2.score);
    DOM.showPlayAgainBtn();
    resetBoardData(player1, entity2);
  }
}

/***/ }),

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Computer = exports["default"] = /*#__PURE__*/function () {
  function Computer(board) {
    _classCallCheck(this, Computer);
    this.name = 'Computer';
    this.score = 0;
    this.turn = false;
    this.gameboard = board;
  }
  return _createClass(Computer, [{
    key: "placeShipRandomly",
    value: function placeShipRandomly(ship) {
      while (true) {
        var randomX = Math.floor(Math.random() * 10);
        var randomY = Math.floor(Math.random() * 10);
        var randomDirection = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        var placedShip = this.gameboard.placeShip(randomX, randomY, ship, randomDirection);
        if (placedShip) break;
      }
    }
  }, {
    key: "attackBoardRandomly",
    value: function attackBoardRandomly(opponentBoard) {
      while (opponentBoard) {
        var randomX = Math.floor(Math.random() * 10);
        var randomY = Math.floor(Math.random() * 10);
        if (opponentBoard.board[randomX][randomY] === 0 || opponentBoard.board[randomX][randomY] === 1) {
          return [randomX, randomY];
        }
      }
    }
  }, {
    key: "enhancedAttackMode",
    value: function enhancedAttackMode(opponentBoard, lastShipHit) {
      var _lastShipHit = _slicedToArray(lastShipHit, 2),
        x = _lastShipHit[0],
        y = _lastShipHit[1];
      var directions = [{
        xOffset: -1,
        yOffset: 0
      },
      // top
      {
        xOffset: 1,
        yOffset: 0
      },
      // bottom
      {
        xOffset: 0,
        yOffset: -1
      },
      // left
      {
        xOffset: 0,
        yOffset: 1
      } // right
      ];
      for (var _i = 0, _directions = directions; _i < _directions.length; _i++) {
        var _opponentBoard$board;
        var _directions$_i = _directions[_i],
          xOffset = _directions$_i.xOffset,
          yOffset = _directions$_i.yOffset;
        var target = (_opponentBoard$board = opponentBoard.board[x + xOffset]) === null || _opponentBoard$board === void 0 ? void 0 : _opponentBoard$board[y + yOffset];
        if (target !== undefined && target >= 0) {
          return [x + xOffset, y + yOffset];
        }
      }
      return undefined;
    }
  }, {
    key: "incrementScore",
    value: function incrementScore() {
      this.score++;
    }
  }, {
    key: "switchTurn",
    value: function switchTurn() {
      this.turn = this.turn ? false : true;
    }
  }]);
}();

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getMode = getMode;
exports.getShipDetails = getShipDetails;
exports.showPlayAgainBtn = showPlayAgainBtn;
exports.showScoreboard = showScoreboard;
exports.updateUIBoard = updateUIBoard;
__webpack_require__(/*! ./style.css */ "./src/style.css");
var _battleship = __webpack_require__(/*! ./battleship.js */ "./src/battleship.js");
var gameMode = document.querySelector('.game-modes');
var vsComputer = document.querySelector('.computer');
var vsP2 = document.querySelector('.p2p');
var player1UIBoard = document.querySelector('.board-1');
var player2UIBoard = document.querySelector('.board-2');
var compUIBoard = document.querySelector('.board-3');
var scoreboard = document.querySelector('.scoreboard');
var shipContainer = document.querySelector('.ships');
var ships = document.querySelectorAll('.ship');
var buttonContainers = document.querySelectorAll('.board-buttons');
var rotateBtn = document.querySelector('.rotate-button');
var closeScoreboardBtn = scoreboard.querySelector('.close');
var playAgainBtn = document.querySelector('.play-again-button');
var loader = document.querySelector('.loader');
var boardLength = 100;
var mode;
var cells = [];
var currentBoard = [];
var shipDetails = [];
var currentBlock = null;
var draggedShip = null;
var successDrop = false;
var blockPositions = 'horizontal';
vsComputer.addEventListener('click', function () {
  mode = 'vsAI';
  player1UIBoard.classList.add('active');
  compUIBoard.classList.add('active');
  preparationPhase(_battleship.player1, player1UIBoard);
  setupResetBtn(_battleship.player1, player1UIBoard);
  setupRandomBtn(_battleship.player1, player1UIBoard);
  setupFinishBtn(player1UIBoard, function () {
    battlePhaseOn();
  });
  gameMode.close();
});
vsP2.addEventListener('click', function () {
  mode = 'P2P';
  player1UIBoard.classList.add('active');
  player2UIBoard.classList.add('active');
  preparationPhase(_battleship.player1, player1UIBoard);
  setupResetBtn(_battleship.player1, player1UIBoard);
  setupResetBtn(_battleship.player2, player2UIBoard);
  setupRandomBtn(_battleship.player1, player1UIBoard);
  setupRandomBtn(_battleship.player2, player2UIBoard);
  setupFinishBtn(player1UIBoard, function () {
    toggleLoader();
    player1UIBoard.classList.add('hidden');
    player2UIBoard.classList.remove('hidden');
    (0, _battleship.placePlayerShips)(_battleship.player1);
    preparationPhase(_battleship.player2, player2UIBoard);
    setTimeout(function () {
      return toggleLoader();
    }, 1000);
  });
  setupFinishBtn(player2UIBoard, function () {
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
  buttonContainers.forEach(function (cont) {
    cont.classList.add('hidden');
  });
  if (mode === 'vsAI') {
    compUIBoard.classList.remove('hidden');
    (0, _battleship.startRound)(mode);
    renderComputerBoard();
  } else if (mode === 'P2P') {
    player1UIBoard.classList.remove('hidden');
    hideFilled(player2UIBoard);
    (0, _battleship.startRound)(mode);
    renderPlayerBoards();
  }
  toggleBoardCovers(player1UIBoard);
  setTimeout(function () {
    return toggleLoader();
  }, 3000);
  // console.log(player1, player2, computer);
}
function battlePhaseOff() {
  shipContainer.classList.remove('hidden');
  buttonContainers.forEach(function (cont) {
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
  preparationPhase(_battleship.player1, player1UIBoard);
}
function showScoreboard(score1, score2) {
  var player1Score = scoreboard.querySelector('.player-1 .score');
  var opponentScore = scoreboard.querySelector('.opponent .score');
  if (mode === 'P2P') scoreboard.querySelector('.opponent .name').innerText = 'Player 2';
  player1Score.innerText = score1;
  opponentScore.innerText = score2;
  scoreboard.showModal();
}

// SETUP BUTTONS

function showPlayAgainBtn() {
  playAgainBtn.classList.remove('hidden');
}
function setupResetBtn(player, UIBoard) {
  var resetBtn = UIBoard.querySelector('.reset-button');
  resetBtn.addEventListener('click', function () {
    resetShipHandler(player);
  });
}
function setupRandomBtn(player, UIBoard) {
  var randomBtn = UIBoard.querySelector('.randomize-button');
  randomBtn.addEventListener('click', function () {
    var boardData = (0, _battleship.randomPlacement)(player);
    resetBoards(UIBoard);
    renderBoardCells(boardData, UIBoard);
    addFilled(boardData, UIBoard);
    addDragEvents(UIBoard);
    hideAllShips();
    cells = UIBoard.querySelectorAll('.cell');
  });
}
function setupFinishBtn(UIBoard, cb) {
  var finishBtn = UIBoard.querySelector('.finish-button');
  finishBtn.addEventListener('click', function () {
    if (allShipsPlaced(ships)) return alert('Must place all ships');
    cb();
  });
}
var rotateShipHandler = function rotateShipHandler() {
  ships.forEach(function (ship) {
    var isHorizontal = ship.dataset.position === 'horizontal';
    blockPositions = isHorizontal ? 'vertical' : 'horizontal';
    ship.dataset.position = isHorizontal ? 'vertical' : 'horizontal';
    ship.style.flexDirection = isHorizontal ? 'column' : 'row';
    ship.querySelectorAll('.block').forEach(function (block) {
      var _ref = [block.dataset.offsetY, block.dataset.offsetX];
      block.dataset.offsetX = _ref[0];
      block.dataset.offsetY = _ref[1];
    });
  });
};
var resetShipHandler = function resetShipHandler(player) {
  if (!cells) return;
  cells.forEach(function (cell) {
    cell.classList.remove('filled');
  });
  ships.forEach(function (ship) {
    return ship.classList.remove('hidden');
  });
  shipDetails = [];
  (0, _battleship.resetBoardData)(player);
};
rotateBtn.addEventListener('click', rotateShipHandler);
closeScoreboardBtn.addEventListener('click', function () {
  return scoreboard.close();
});
playAgainBtn.addEventListener('click', function () {
  return endRound();
});

// BOARD COVERS FUNCTIONALITY

function addBoardCover(targetBoard, text) {
  var board = targetBoard.querySelector('.board');
  var coverBoard = document.createElement('div');
  coverBoard.innerText = text;
  coverBoard.classList.add('board-cover');
  coverBoard.classList.add('hidden');
  board.appendChild(coverBoard);
}
addBoardCover(player1UIBoard, "Player 1's Turn");
addBoardCover(player2UIBoard, "Player 2's Turn");
addBoardCover(compUIBoard, "Computer's Turn");
function toggleBoardCovers() {
  for (var _len = arguments.length, targetBoards = new Array(_len), _key = 0; _key < _len; _key++) {
    targetBoards[_key] = arguments[_key];
  }
  targetBoards.forEach(function (board) {
    var coverBoard = board.querySelector('.board-cover');
    coverBoard.classList.toggle('hidden');
    coverBoard.parentElement.classList.remove('not-selectable');
  });
}
function hideAllBoardCovers() {
  var boardCovers = document.querySelectorAll('.board-cover');
  boardCovers.forEach(function (cover) {
    return cover.classList.add('hidden');
  });
}

// BOARD FUNCTIONS

document.querySelectorAll('.board').forEach(function (board) {
  board.targetCells = [];
});

// Render UI board cells
function renderBoardCells(boardData, UIBoard) {
  var board = UIBoard.querySelector('.board');
  boardData.forEach(function (row, x) {
    row.forEach(function (col, y) {
      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      board.appendChild(cell);
    });
  });
}
function addFilled(boardData, UIBoard) {
  var board = UIBoard.querySelector('.board');
  boardData.forEach(function (row, x) {
    row.forEach(function (col, y) {
      if (boardData[x][y] === 1) {
        var cell = board.querySelector(".cell[data-x=\"".concat(x, "\"][data-y=\"").concat(y, "\"]"));
        cell.classList.add('filled');
      }
    });
  });
}
function hideFilled(UIBoard) {
  var board = UIBoard.querySelector('.board');
  var cells = board.querySelectorAll('.cell');
  cells.forEach(function (cell) {
    cell.classList.remove('filled');
  });
}
function addDragEvents(UIBoard) {
  cells = UIBoard.querySelectorAll(".cell");
  cells.forEach(function (cell) {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dropShip);
  });
}
function allShipsPlaced(ships) {
  return Array.from(ships).some(function (ship) {
    if (!ship.classList.contains('hidden')) return true;
  });
}
function resetBoards() {
  for (var _len2 = arguments.length, UIBoards = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    UIBoards[_key2] = arguments[_key2];
  }
  UIBoards.forEach(function (board) {
    board.querySelector('.board').classList.remove('not-selectable');
    var cells = board.querySelectorAll('.cell');
    cells.forEach(function (cell) {
      cell.remove();
    });
  });
}
function updateUIBoard(mode, opponent, x, y, impact) {
  var toggleCovers = function toggleCovers() {
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
  if (opponent !== _battleship.computer) {
    setTimeout(toggleCovers, 1000);
  } else {
    toggleCovers();
  }
}
function renderComputerBoard() {
  resetBoards(compUIBoard);
  renderBoardCells(_battleship.computer.gameboard.board, compUIBoard);
  addCellEvents(compUIBoard, _battleship.computer);
}
function renderPlayerBoards() {
  addCellEvents(player1UIBoard, _battleship.player1);
  addCellEvents(player2UIBoard, _battleship.player2);
}

// CELL FUNCTIONS

function hoverCell(e) {
  var cell = e.target;
  if (cell.classList.contains('cell') && !cell.classList.contains('hit') && !cell.classList.contains('miss')) {
    cell.classList.add('on-select');
  }
}
function clickCell(opponent, e) {
  var cell = e.target;
  var x = parseInt(e.target.dataset.x);
  var y = parseInt(e.target.dataset.y);
  if (cell.classList.contains('cell') && !cell.classList.contains('hit') && !cell.classList.contains('miss')) {
    cell.classList.remove('on-select');
    var impact = (0, _battleship.attackBoard)(opponent, x, y, mode);
    if (impact === 'miss') cell.parentElement.classList.add('not-selectable');
    updateUIBoard(mode, opponent, x, y, impact);
    (0, _battleship.play)();
  }
}
function validateClickedCell(x, y, impact) {
  var uncoveredBoard = document.querySelector('.active:has(.board-cover.hidden)');
  updateCell(uncoveredBoard, x, y, impact);
}
function addCellEvents(UIBoard, opponent) {
  var board = UIBoard.querySelector('.board');
  board.addEventListener('mouseover', hoverCell);
  // board.addEventListener('click', (e) => clickCell(opponent, e));
  board.onclick = function (e) {
    clickCell(opponent, e);
  };
}
function updateCell(UIBoard, x, y, impact) {
  var targetCell = UIBoard.querySelector(".cell[data-x=\"".concat(x, "\"][data-y=\"").concat(y, "\"]"));
  targetCell.classList.add(impact);
}

// DRAG N DROP FEATURE

// Add drag events for every UI ships
ships.forEach(function (ship) {
  var blocks = ship.querySelectorAll('.block');
  blocks.forEach(function (block) {
    block.addEventListener('mousedown', function () {
      return currentBlock = block;
    });
  });
  ship.addEventListener('dragstart', dragStart);
  ship.addEventListener('dragend', dragEnd);
});
function hideAllShips() {
  ships.forEach(function (ship) {
    return ship.classList.add('hidden');
  });
}

// HELPER FUNCTIONS

// Remove highlights for every target cells highlighted
function removeHighlights(board) {
  if (!board || !board.targetCells) return;
  board.targetCells.forEach(function (cell) {
    cell.classList.remove('highlight');
  });
  board.targetCells = [];
}

// Get target cell
function getTargetCell(block, blockX, blockY, cellX, cellY, board) {
  var offsetX = parseInt(block.dataset.offsetX) - blockX;
  var offsetY = parseInt(block.dataset.offsetY) - blockY;
  var targetCell = board.querySelector(".cell[data-x=\"".concat(cellX + offsetX, "\"][data-y=\"").concat(cellY + offsetY, "\"]"));
  return targetCell;
}

// Store target cells
function addTargetCell(targetCells, targetCell, block) {
  targetCells.push({
    x: parseInt(targetCell.dataset.x),
    y: parseInt(targetCell.dataset.y),
    position: blockPositions,
    length: parseInt(block.parentElement.dataset.size)
  });
}

// Validate target cells
function validateCells(blocks, blockX, blockY, cellX, cellY, cb, board) {
  var targetCells = [];
  blocks.forEach(function (block) {
    var targetCell = getTargetCell(block, blockX, blockY, cellX, cellY, board);
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
  return shipDetails.sort(function (a, b) {
    return a.length - b.length;
  });
}

// DRAG EVENT HANDLERS

function dragStart(e) {
  // Set dragged ship to the current ship being dragged
  draggedShip = this;

  // Get offset for accurate placement of ships in board
  var rect = this.getBoundingClientRect();
  var offsetX = event.clientX - rect.left;
  var offsetY = event.clientY - rect.top;

  // Customize ghost element or on drag element by making a
  // copy of the current dragged element
  var ghost = draggedShip.cloneNode(true);
  ghost.style.opacity = '0.5';
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, offsetX, offsetY);

  // When ship has started dragging hide its origin element
  setTimeout(function () {
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
  var board = this.closest('.board');
  if (!board) return;
  currentBoard = board; // Track the current board

  var startX = parseInt(this.dataset.x);
  var startY = parseInt(this.dataset.y);
  var blocks = draggedShip.querySelectorAll('.block');
  var currentBlockX = parseInt(currentBlock.dataset.offsetX);
  var currentBlockY = parseInt(currentBlock.dataset.offsetY);

  // Clear previous highlights
  removeHighlights(board);

  // Highlight cells that are available for placement based on
  // dragged ship's position and length
  validateCells(blocks, currentBlockX, currentBlockY, startX, startY, function (cell) {
    board.targetCells.push(cell);
    if (!cell.classList.contains('filled')) cell.classList.add('highlight');
  }, board);
}
function dragLeave(e) {
  e.preventDefault();
  var board = this.closest('.board');
  if (!board) return;
  removeHighlights(board);
}
function dropShip(e) {
  e.preventDefault();
  var board = this.closest('.board');
  if (!board) return;
  var startX = parseInt(this.dataset.x);
  var startY = parseInt(this.dataset.y);
  var blocks = draggedShip.querySelectorAll('.block');
  var currentBlockX = parseInt(currentBlock.dataset.offsetX);
  var currentBlockY = parseInt(currentBlock.dataset.offsetY);
  var blockLength = parseInt(currentBlock.parentElement.dataset.size);

  // Check if a vertical ship placement is out of bounds
  if (blockPositions === 'vertical' && outOfBounds(startX, currentBlockX, boardLength, blockLength)) {
    return;
  }
  // Check if a horizontal ship placement is out of bounds
  if (blockPositions === 'horizontal' && outOfBounds(startY, currentBlockY, boardLength, blockLength)) {
    return;
  }

  // Check if the intended placement of the ship is not empty
  var isFilled = Array.from(blocks).some(function (block) {
    var targetCell = getTargetCell(block, currentBlockX, currentBlockY, startX, startY, board);
    if (targetCell === null) return true;
    return targetCell.classList.contains('filled');
  });
  if (isFilled) return;

  // Place ship if it passes all conditions(out of bounds, filled placement)
  var firstTargetCell = validateCells(blocks, currentBlockX, currentBlockY, startX, startY, function (cell) {
    cell.classList.remove('highlight');
    cell.classList.add('filled');
  }, board);
  shipDetails.push(firstTargetCell);
  successDrop = true;
  removeHighlights(board);
}
window.onload = function () {
  gameMode.showModal();
};

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Gameboard = exports["default"] = /*#__PURE__*/function () {
  function Gameboard() {
    _classCallCheck(this, Gameboard);
    this.board = this.createBoard();
    this.ships = [];
  }
  return _createClass(Gameboard, [{
    key: "createBoard",
    value: function createBoard() {
      var board = [];
      for (var i = 0; i < 10; i++) {
        var row = new Array(10).fill(0);
        board.push(row);
      }
      return board;
    }
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds(x, y, ship, direction) {
      return direction === 'horizontal' && y > 10 - ship.length || direction === 'vertical' && x > 10 - ship.length;
    }
  }, {
    key: "placeShip",
    value: function placeShip(x, y, ship, direction) {
      var _this = this;
      if (this.isOutOfBounds(x, y, ship, direction)) return false;
      var coordinates = [];
      for (var i = 0; i < ship.length; i++) {
        var row = direction === 'vertical' ? x + i : x;
        var col = direction === 'horizontal' ? y + i : y;
        if (this.board[row][col] === 1) return false;
        coordinates.push([row, col]);
      }
      coordinates.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          row = _ref2[0],
          col = _ref2[1];
        return _this.board[row][col] = 1;
      });
      ship.coordinates = coordinates;
      this.ships.push(ship);
      return true;
    }
  }, {
    key: "validateAttack",
    value: function validateAttack(x, y) {
      var boardCell = this.board[x][y];
      if (boardCell === 0) {
        this.board[x][y] = -2;
        return 'miss';
      }
      if (boardCell === 1) {
        this.board[x][y] = -1;
        return 'hit';
      }
      return 'invalid';
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(x, y) {
      var result = this.validateAttack(x, y);
      if (result === 'hit') {
        var _iterator = _createForOfIteratorHelper(this.ships),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var ship = _step.value;
            var _iterator2 = _createForOfIteratorHelper(ship.coordinates),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                  shipX = _step2$value[0],
                  shipY = _step2$value[1];
                if (shipX === x && shipY === y) {
                  ship.hit();
                  ship.isSunk();
                  return 'hit';
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return result;
    }
  }, {
    key: "allShipsSunk",
    value: function allShipsSunk() {
      return this.ships.every(function (ship) {
        return ship.sunk === true;
      });
    }
  }, {
    key: "resetBoard",
    value: function resetBoard() {
      this.board = this.createBoard();
      this.ships = [];
    }
  }]);
}();

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Player = exports["default"] = /*#__PURE__*/function () {
  function Player(name, board) {
    _classCallCheck(this, Player);
    this.name = name;
    this.score = 0;
    this.turn = false;
    this.gameboard = board;
  }
  return _createClass(Player, [{
    key: "placeShipRandomly",
    value: function placeShipRandomly(ship) {
      while (true) {
        var randomX = Math.floor(Math.random() * 10);
        var randomY = Math.floor(Math.random() * 10);
        var randomDirection = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        var placedShip = this.gameboard.placeShip(randomX, randomY, ship, randomDirection);
        if (placedShip) break;
      }
    }
  }, {
    key: "incrementScore",
    value: function incrementScore() {
      this.score++;
    }
  }, {
    key: "switchTurn",
    value: function switchTurn() {
      this.turn = this.turn ? false : true;
    }
  }]);
}();

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ship = exports["default"] = /*#__PURE__*/function () {
  function Ship(length) {
    _classCallCheck(this, Ship);
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
    this.coordinates = [];
  }
  return _createClass(Ship, [{
    key: "hit",
    value: function hit() {
      this.hitCount++;
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      if (this.hitCount === this.length) {
        this.sunk = true;
      }
    }
  }]);
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --dark: #052f5f;
  --neutral: #005377;
  --light: #eeebd3;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Rubik', serif;
}

body {
  background-color: var(--neutral);
  width: 100vw;
}

main {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#game-logo {
  height: 10rem;
  margin-bottom: 1rem;
  position: relative;
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  -webkit-user-drag: none;
}

/* Dialogs */

dialog > .content {
  background-color: var(--light);
  padding: 2.5rem 4rem;
  border-radius: 2rem;
  outline: 4px solid var(--dark);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-rows: 0.01fr 1fr;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 1rem;
  z-index: 1;
}

dialog::backdrop {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(17px);
  -webkit-backdrop-filter: blur(17px);
}

dialog p {
  font-size: 2.5rem;
  font-weight: 500;
  grid-column: span 2;
}

/* Game Mode Dialog */

dialog.game-modes .mode,
dialog.scoreboard .name {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
}

dialog.game-modes > .content > .mode-container {
  padding: 4rem 2rem;
  cursor: pointer;
}

dialog.game-modes > .content > .mode-container:hover {
  background: rgba(131, 131, 131, 0.5);
  box-shadow: 0 8px 32px 0 rgba(150, 150, 150, 0.7);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
  border-radius: 10px;
  outline: 1px solid rgba(255, 255, 255, 0.18);
}

dialog.game-modes img {
  height: 150px;
}

/* Scoreboard Dialog */

dialog.scoreboard {
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
}

dialog.scoreboard .score {
  font-weight: 700;
  font-size: 6rem;
  text-align: center;
}

dialog.scoreboard .name {
  margin-top: 0;
}

dialog.scoreboard .close {
  font-size: 2rem;
  color: var(--light);
  background-color: var(--neutral);
  width: 50px;
  height: 50px;
  outline: 2px solid var(--dark);
  border-radius: 50%;
  position: absolute;
  top: -20px;
  right: -20px;
  cursor: pointer;
}

dialog.scoreboard .close:hover {
  background-color: var(--light);
  color: var(--dark);
}

/* Board */

.title {
  color: var(--light);
  text-align: center;
  padding: 1rem 0;
}

.board {
  max-width: fit-content;
  max-height: fit-content;
  border: 4px solid var(--dark);
  display: grid;
  grid-template: repeat(10, 50px) / repeat(10, 50px);
  gap: 4px;
  position: relative;
}

.cell {
  width: 100%;
  height: 100%;
  background-color: var(--light);
}

/* Ships */

.ships {
  height: 680px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 45px 30px 4fr 4fr;
  gap: 1rem;
  overflow: hidden;
}

.ships > .title {
  padding-bottom: 0;
  grid-column: 1 / span 3;
}

.instruction {
  color: var(--light);
  font-size: 1.5rem;
  width: 600px;
  text-align: center;
  grid-column: 1 / span 3;
  justify-self: center;
}

.ships > div {
  background-color: var(--light);
  width: 334px;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  user-select: none;
  -webkit-user-drag: none;
}

.ships > div > .ship {
  margin: auto;
}

.ships > div > p {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  user-select: none;
  -webkit-user-drag: none;
}

.ship {
  width: 290px;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: grab;
}

.ship:active,
.ship:focus {
  cursor: grabbing;
}

.block {
  width: 50px;
  height: 50px;
  background-color: var(--dark);
}

/* Buttons */

.board-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
}

.ships > .rotate-button {
  width: 13rem;
  padding: 0.75rem 1rem;
  grid-row: 4;
  grid-column: 3;
  justify-self: end;
  align-self: end;
}

[class\$='button'] {
  background-color: var(--light);
  font-size: 1.25rem;
  font-weight: 500;
  width: 10rem;
  height: fit-content;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
}

[class\$='button']:hover {
  opacity: 0.75;
}

.play-again-button {
  width: 13rem;
  padding: 1rem 2rem;
  display: block;
  position: absolute;
  top: 57.5%;
  left: 50%;
  transform: translate(-50%, -57.5%);
}

/* Visibility */

.hidden {
  display: none;
  opacity: 0;
  visibility: hidden;
}

.cell.highlight {
  opacity: 0.5;
  cursor: grabbing;
}

.board-cover {
  color: var(--light);
  font-size: 2.5rem;
  font-weight: 700;
  width: 100%;
  height: 100%;
  background: rgb(49, 106, 131);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-drag: none;
  z-index: 2;
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
}

/* Cell Styling */

.filled {
  background-color: var(--dark);
}

.not-selectable {
  cursor: initial;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.on-select {
  cursor: pointer;
}

.on-select:hover {
  opacity: 0.75;
}

.miss {
  opacity: 0.25;
}

.hit {
  background-color: #ff5b5b;
}

/* Loader */

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--neutral);
  z-index: 3;
  transition:
    opacity 0.75s ease-out,
    visibility 0.75s ease-out;
}

.loader::before {
  content: '';
  width: 75px;
  height: 75px;
  margin-bottom: 1rem;
  border: 15px solid var(--light);
  border-top-color: var(--dark);
  border-radius: 50%;
  animation: loading 0.75s ease infinite;
}

@keyframes loading {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n  --dark: #052f5f;\r\n  --neutral: #005377;\r\n  --light: #eeebd3;\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  margin: 0;\r\n  font-family: 'Rubik', serif;\r\n}\r\n\r\nbody {\r\n  background-color: var(--neutral);\r\n  width: 100vw;\r\n}\r\n\r\nmain {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n#game-logo {\r\n  height: 10rem;\r\n  margin-bottom: 1rem;\r\n  position: relative;\r\n  top: 4%;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  user-select: none;\r\n  -webkit-user-drag: none;\r\n}\r\n\r\n/* Dialogs */\r\n\r\ndialog > .content {\r\n  background-color: var(--light);\r\n  padding: 2.5rem 4rem;\r\n  border-radius: 2rem;\r\n  outline: 4px solid var(--dark);\r\n  position: fixed;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  display: grid;\r\n  grid-template-rows: 0.01fr 1fr;\r\n  grid-template-columns: 1fr 1fr;\r\n  place-items: center;\r\n  gap: 1rem;\r\n  z-index: 1;\r\n}\r\n\r\ndialog::backdrop {\r\n  background: rgba(255, 255, 255, 0.25);\r\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\r\n  backdrop-filter: blur(17px);\r\n  -webkit-backdrop-filter: blur(17px);\r\n}\r\n\r\ndialog p {\r\n  font-size: 2.5rem;\r\n  font-weight: 500;\r\n  grid-column: span 2;\r\n}\r\n\r\n/* Game Mode Dialog */\r\n\r\ndialog.game-modes .mode,\r\ndialog.scoreboard .name {\r\n  font-size: 1.5rem;\r\n  text-align: center;\r\n  margin-top: 1rem;\r\n}\r\n\r\ndialog.game-modes > .content > .mode-container {\r\n  padding: 4rem 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\ndialog.game-modes > .content > .mode-container:hover {\r\n  background: rgba(131, 131, 131, 0.5);\r\n  box-shadow: 0 8px 32px 0 rgba(150, 150, 150, 0.7);\r\n  backdrop-filter: blur(1.5px);\r\n  -webkit-backdrop-filter: blur(1.5px);\r\n  border-radius: 10px;\r\n  outline: 1px solid rgba(255, 255, 255, 0.18);\r\n}\r\n\r\ndialog.game-modes img {\r\n  height: 150px;\r\n}\r\n\r\n/* Scoreboard Dialog */\r\n\r\ndialog.scoreboard {\r\n  transition:\r\n    opacity 0.5s ease,\r\n    visibility 0.5s ease;\r\n}\r\n\r\ndialog.scoreboard .score {\r\n  font-weight: 700;\r\n  font-size: 6rem;\r\n  text-align: center;\r\n}\r\n\r\ndialog.scoreboard .name {\r\n  margin-top: 0;\r\n}\r\n\r\ndialog.scoreboard .close {\r\n  font-size: 2rem;\r\n  color: var(--light);\r\n  background-color: var(--neutral);\r\n  width: 50px;\r\n  height: 50px;\r\n  outline: 2px solid var(--dark);\r\n  border-radius: 50%;\r\n  position: absolute;\r\n  top: -20px;\r\n  right: -20px;\r\n  cursor: pointer;\r\n}\r\n\r\ndialog.scoreboard .close:hover {\r\n  background-color: var(--light);\r\n  color: var(--dark);\r\n}\r\n\r\n/* Board */\r\n\r\n.title {\r\n  color: var(--light);\r\n  text-align: center;\r\n  padding: 1rem 0;\r\n}\r\n\r\n.board {\r\n  max-width: fit-content;\r\n  max-height: fit-content;\r\n  border: 4px solid var(--dark);\r\n  display: grid;\r\n  grid-template: repeat(10, 50px) / repeat(10, 50px);\r\n  gap: 4px;\r\n  position: relative;\r\n}\r\n\r\n.cell {\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: var(--light);\r\n}\r\n\r\n/* Ships */\r\n\r\n.ships {\r\n  height: 680px;\r\n  display: grid;\r\n  grid-template-columns: repeat(3, 1fr);\r\n  grid-template-rows: 45px 30px 4fr 4fr;\r\n  gap: 1rem;\r\n  overflow: hidden;\r\n}\r\n\r\n.ships > .title {\r\n  padding-bottom: 0;\r\n  grid-column: 1 / span 3;\r\n}\r\n\r\n.instruction {\r\n  color: var(--light);\r\n  font-size: 1.5rem;\r\n  width: 600px;\r\n  text-align: center;\r\n  grid-column: 1 / span 3;\r\n  justify-self: center;\r\n}\r\n\r\n.ships > div {\r\n  background-color: var(--light);\r\n  width: 334px;\r\n  padding: 1rem 1.5rem;\r\n  border-radius: 1rem;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.5rem;\r\n  user-select: none;\r\n  -webkit-user-drag: none;\r\n}\r\n\r\n.ships > div > .ship {\r\n  margin: auto;\r\n}\r\n\r\n.ships > div > p {\r\n  text-align: center;\r\n  font-size: 1.5rem;\r\n  font-weight: 500;\r\n  user-select: none;\r\n  -webkit-user-drag: none;\r\n}\r\n\r\n.ship {\r\n  width: 290px;\r\n  margin-top: 2px;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 4px;\r\n  cursor: grab;\r\n}\r\n\r\n.ship:active,\r\n.ship:focus {\r\n  cursor: grabbing;\r\n}\r\n\r\n.block {\r\n  width: 50px;\r\n  height: 50px;\r\n  background-color: var(--dark);\r\n}\r\n\r\n/* Buttons */\r\n\r\n.board-buttons {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-top: 6px;\r\n}\r\n\r\n.ships > .rotate-button {\r\n  width: 13rem;\r\n  padding: 0.75rem 1rem;\r\n  grid-row: 4;\r\n  grid-column: 3;\r\n  justify-self: end;\r\n  align-self: end;\r\n}\r\n\r\n[class$='button'] {\r\n  background-color: var(--light);\r\n  font-size: 1.25rem;\r\n  font-weight: 500;\r\n  width: 10rem;\r\n  height: fit-content;\r\n  padding: 0.5rem 2rem;\r\n  border: none;\r\n  border-radius: 0.75rem;\r\n  cursor: pointer;\r\n}\r\n\r\n[class$='button']:hover {\r\n  opacity: 0.75;\r\n}\r\n\r\n.play-again-button {\r\n  width: 13rem;\r\n  padding: 1rem 2rem;\r\n  display: block;\r\n  position: absolute;\r\n  top: 57.5%;\r\n  left: 50%;\r\n  transform: translate(-50%, -57.5%);\r\n}\r\n\r\n/* Visibility */\r\n\r\n.hidden {\r\n  display: none;\r\n  opacity: 0;\r\n  visibility: hidden;\r\n}\r\n\r\n.cell.highlight {\r\n  opacity: 0.5;\r\n  cursor: grabbing;\r\n}\r\n\r\n.board-cover {\r\n  color: var(--light);\r\n  font-size: 2.5rem;\r\n  font-weight: 700;\r\n  width: 100%;\r\n  height: 100%;\r\n  background: rgb(49, 106, 131);\r\n  backdrop-filter: blur(2px);\r\n  -webkit-backdrop-filter: blur(2px);\r\n  position: absolute;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  user-select: none;\r\n  -webkit-user-drag: none;\r\n  z-index: 2;\r\n  transition:\r\n    opacity 0.25s ease,\r\n    visibility 0.25s ease;\r\n}\r\n\r\n/* Cell Styling */\r\n\r\n.filled {\r\n  background-color: var(--dark);\r\n}\r\n\r\n.not-selectable {\r\n  cursor: initial;\r\n  pointer-events: none;\r\n  user-select: none;\r\n  -webkit-user-drag: none;\r\n}\r\n\r\n.on-select {\r\n  cursor: pointer;\r\n}\r\n\r\n.on-select:hover {\r\n  opacity: 0.75;\r\n}\r\n\r\n.miss {\r\n  opacity: 0.25;\r\n}\r\n\r\n.hit {\r\n  background-color: #ff5b5b;\r\n}\r\n\r\n/* Loader */\r\n\r\n.loader {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: var(--neutral);\r\n  z-index: 3;\r\n  transition:\r\n    opacity 0.75s ease-out,\r\n    visibility 0.75s ease-out;\r\n}\r\n\r\n.loader::before {\r\n  content: '';\r\n  width: 75px;\r\n  height: 75px;\r\n  margin-bottom: 1rem;\r\n  border: 15px solid var(--light);\r\n  border-top-color: var(--dark);\r\n  border-radius: 50%;\r\n  animation: loading 0.75s ease infinite;\r\n}\r\n\r\n@keyframes loading {\r\n  from {\r\n    transform: rotate(0turn);\r\n  }\r\n  to {\r\n    transform: rotate(1turn);\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/dom.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0ZBQWdGLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxXQUFXLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLGFBQWEsT0FBTyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLGFBQWEsTUFBTSxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLFdBQVcsS0FBSyxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxXQUFXLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxNQUFNLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxXQUFXLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLFdBQVcsS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLE9BQU8sT0FBTyxhQUFhLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLFdBQVcsS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxPQUFPLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssWUFB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Q1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcclxuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwLmpzJztcclxuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllci5qcyc7XHJcbmltcG9ydCBDb21wdXRlciBmcm9tICcuL2NvbXB1dGVyLmpzJztcclxuaW1wb3J0ICogYXMgRE9NIGZyb20gJy4vZG9tLmpzJztcclxuXHJcbmNvbnN0IHBsYXllcjFVSUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLTEnKTtcclxuY29uc3QgcGxheWVyMlVJQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtMicpO1xyXG5jb25zdCBjb21wVUlCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC0zJyk7XHJcblxyXG5jb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcignUGxheWVyIDEnLCBuZXcgR2FtZWJvYXJkKCkpO1xyXG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcignUGxheWVyIDInLCBuZXcgR2FtZWJvYXJkKCkpO1xyXG5jb25zdCBjb21wdXRlciA9IG5ldyBDb21wdXRlcihuZXcgR2FtZWJvYXJkKCkpO1xyXG5jb25zdCBzaGlwc0xlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTaGlwcyhzaGlwc0xlbmd0aHMsIHNoaXBzID0gW10pIHtcclxuICBzaGlwc0xlbmd0aHMuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XHJcbiAgICBzaGlwcy5wdXNoKG5ldyBTaGlwKGxlbmd0aCkpO1xyXG4gIH0pO1xyXG4gIHJldHVybiBzaGlwcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9tUGxhY2VtZW50KHBsYXllcikge1xyXG4gIGNvbnN0IHBsYXllclNoaXBzID0gY3JlYXRlU2hpcHMoc2hpcHNMZW5ndGhzKTtcclxuICByZXNldEJvYXJkRGF0YShwbGF5ZXIpO1xyXG4gIHBsYXllclNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIHBsYXllci5wbGFjZVNoaXBSYW5kb21seShzaGlwKTtcclxuICB9KTtcclxuICByZXR1cm4gcGxheWVyLmdhbWVib2FyZC5ib2FyZDtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxhY2VQbGF5ZXJTaGlwcyhwbGF5ZXIpIHtcclxuICBjb25zdCBwbGF5ZXJTaGlwcyA9IGNyZWF0ZVNoaXBzKHNoaXBzTGVuZ3Rocyk7XHJcbiAgY29uc3Qgc2hpcERldGFpbHMgPSBET00uZ2V0U2hpcERldGFpbHMoKTtcclxuICBpZiAoc2hpcERldGFpbHMubGVuZ3RoIDwgNSkgcmV0dXJuO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHNMZW5ndGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChcclxuICAgICAgc2hpcERldGFpbHNbaV0ueCxcclxuICAgICAgc2hpcERldGFpbHNbaV0ueSxcclxuICAgICAgcGxheWVyU2hpcHNbaV0sXHJcbiAgICAgIHNoaXBEZXRhaWxzW2ldLnBvc2l0aW9uLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlQ29tcHV0ZXJTaGlwcygpIHtcclxuICBjb25zdCBjb21wdXRlclNoaXBzID0gY3JlYXRlU2hpcHMoc2hpcHNMZW5ndGhzKTtcclxuICBjb21wdXRlclNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIGNvbXB1dGVyLnBsYWNlU2hpcFJhbmRvbWx5KHNoaXApO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldEJvYXJkRGF0YSguLi5lbnRpdGllcykge1xyXG4gIGVudGl0aWVzLmZvckVhY2goKGVudGl0eSkgPT4ge1xyXG4gICAgZW50aXR5LmdhbWVib2FyZC5yZXNldEJvYXJkKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0VHVybnMoZW50aXR5MSwgZW50aXR5Mikge1xyXG4gIGVudGl0eTEudHVybiA9IGZhbHNlO1xyXG4gIGVudGl0eTIudHVybiA9IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydFJvdW5kKG1vZGUpIHtcclxuICBpZiAobW9kZSA9PT0gJ3ZzQUknKSB7XHJcbiAgICBwbGFjZVBsYXllclNoaXBzKHBsYXllcjEpO1xyXG4gICAgcGxhY2VDb21wdXRlclNoaXBzKCk7XHJcbiAgICByZXNldFR1cm5zKHBsYXllcjEsIGNvbXB1dGVyKTtcclxuICB9IGVsc2UgaWYgKG1vZGUgPT09ICdQMlAnKSB7XHJcbiAgICBwbGFjZVBsYXllclNoaXBzKHBsYXllcjIpO1xyXG4gICAgcmVzZXRUdXJucyhwbGF5ZXIxLCBwbGF5ZXIyKTtcclxuICB9XHJcblxyXG4gIHBsYXllcjEuc3dpdGNoVHVybigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzd2l0Y2hUdXJuKG1vZGUpIHtcclxuICBsZXQgZW50aXR5MiA9IGNvbXB1dGVyO1xyXG4gIGlmIChtb2RlID09PSAnUDJQJykgZW50aXR5MiA9IHBsYXllcjI7XHJcbiAgcGxheWVyMS5zd2l0Y2hUdXJuKCk7XHJcbiAgZW50aXR5Mi5zd2l0Y2hUdXJuKCk7XHJcbiAgcmV0dXJuIHBsYXllcjEudHVybiA/IHBsYXllcjEgOiBlbnRpdHkyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDdXJyZW50VHVybihtb2RlKSB7XHJcbiAgbGV0IGVudGl0eTIgPSBjb21wdXRlcjtcclxuICBpZiAobW9kZSA9PT0gJ1AyUCcpIGVudGl0eTIgPSBwbGF5ZXIyO1xyXG4gIHJldHVybiBwbGF5ZXIxLnR1cm4gPT09IHRydWUgPyBwbGF5ZXIxIDogZW50aXR5MjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tXaW5uZXIobW9kZSkge1xyXG4gIGxldCBlbnRpdHkyID0gY29tcHV0ZXI7XHJcbiAgaWYgKG1vZGUgPT09ICdQMlAnKSBlbnRpdHkyID0gcGxheWVyMjtcclxuICBpZiAocGxheWVyMS5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgIHJldHVybiBgJHtlbnRpdHkyLm5hbWV9IFdpbnNgO1xyXG4gIH0gZWxzZSBpZiAoZW50aXR5Mi5nYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcclxuICAgIHJldHVybiBgJHtwbGF5ZXIxLm5hbWV9IFdpbnNgO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNrQm9hcmQob3Bwb25lbnQsIHgsIHksIG1vZGUpIHtcclxuICBjb25zdCBpbXBhY3QgPSBvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcclxuXHJcbiAgaWYgKGNoZWNrV2lubmVyKG1vZGUpKSB7XHJcbiAgICBlbmRHYW1lKCk7XHJcbiAgICByZXR1cm4gJ2dhbWUgb3Zlcic7XHJcbiAgfVxyXG5cclxuICBpZiAoaW1wYWN0ID09PSAnaGl0JykgcmV0dXJuICdoaXQnO1xyXG5cclxuICBzd2l0Y2hUdXJuKG1vZGUpO1xyXG5cclxuICByZXR1cm4gJ21pc3MnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwbGF5KCkge1xyXG4gIGNvbnN0IG1vZGUgPSBET00uZ2V0TW9kZSgpO1xyXG4gIGNvbnN0IGN1cnJlbnRUdXJuID0gZ2V0Q3VycmVudFR1cm4obW9kZSk7XHJcblxyXG4gIGlmIChjdXJyZW50VHVybiA9PT0gY29tcHV0ZXIpIHtcclxuICAgIGNvbnN0IGNvbXB1dGVyVHVybiA9ICgpID0+IHtcclxuICAgICAgY29uc3QgW3gsIHldID0gY29tcHV0ZXIuYXR0YWNrQm9hcmRSYW5kb21seShwbGF5ZXIxLmdhbWVib2FyZCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF0dGFja0JvYXJkKHBsYXllcjEsIHgsIHksIG1vZGUpO1xyXG4gICAgICBET00udXBkYXRlVUlCb2FyZChtb2RlLCBwbGF5ZXIxLCB4LCB5LCByZXN1bHQpO1xyXG5cclxuICAgICAgaWYgKHJlc3VsdCA9PT0gJ2dhbWUtb3ZlcicpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXN1bHQgPT09ICdoaXQnKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdHRhY2tBZGphY2VudChwbGF5ZXIxLCBbeCwgeV0pLCAxMDAwKTtcclxuICAgICAgICAvLyBzZXRUaW1lb3V0KGNvbXB1dGVyVHVybiwgMTAwMCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2V0VGltZW91dChjb21wdXRlclR1cm4sIDEwMDApO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNrQWRqYWNlbnQob3Bwb25lbnQsIGxhc3RIaXQpIHtcclxuICBjb25zdCBtb2RlID0gRE9NLmdldE1vZGUoKTtcclxuICBjb25zdCBuZXh0QXR0YWNrID0gY29tcHV0ZXIuZW5oYW5jZWRBdHRhY2tNb2RlKG9wcG9uZW50LmdhbWVib2FyZCwgbGFzdEhpdCk7XHJcblxyXG4gIGlmIChuZXh0QXR0YWNrKSB7XHJcbiAgICBjb25zdCBbbmV3WCwgbmV3WV0gPSBuZXh0QXR0YWNrO1xyXG4gICAgY29uc3QgbmV3UmVzdWx0ID0gYXR0YWNrQm9hcmQob3Bwb25lbnQsIG5ld1gsIG5ld1ksIG1vZGUpO1xyXG4gICAgRE9NLnVwZGF0ZVVJQm9hcmQobW9kZSwgb3Bwb25lbnQsIG5ld1gsIG5ld1ksIG5ld1Jlc3VsdCk7XHJcblxyXG4gICAgaWYgKG5ld1Jlc3VsdCA9PT0gJ2dhbWUtb3ZlcicpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdSZXN1bHQgPT09ICdoaXQnKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXR0YWNrQWRqYWNlbnQob3Bwb25lbnQsIG5leHRBdHRhY2spLCAxMDAwKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuZEdhbWUoKSB7XHJcbiAgY29uc3QgbW9kZSA9IERPTS5nZXRNb2RlKCk7XHJcbiAgbGV0IGVudGl0eTIgPSBjb21wdXRlcjtcclxuICBsZXQgZW50aXR5MkJvYXJkID0gY29tcFVJQm9hcmQ7XHJcbiAgaWYgKG1vZGUgPT09ICdQMlAnKSB7XHJcbiAgICBlbnRpdHkyID0gcGxheWVyMjtcclxuICAgIGVudGl0eTJCb2FyZCA9IHBsYXllcjJVSUJvYXJkO1xyXG4gIH1cclxuICBjb25zdCB3aW5uZXIgPSBjaGVja1dpbm5lcihtb2RlKTtcclxuICBjb25zdCB3aW5uZXJCb2FyZCA9XHJcbiAgICB3aW5uZXIgPT09ICdQbGF5ZXIgMSBXaW5zJyA/IHBsYXllcjFVSUJvYXJkIDogZW50aXR5MkJvYXJkO1xyXG4gIGNvbnN0IGNvdmVyQm9hcmQgPSB3aW5uZXJCb2FyZC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtY292ZXInKTtcclxuICBjb25zdCBoaWRkZW5Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAnLmFjdGl2ZTpoYXMoLmJvYXJkLWNvdmVyLmhpZGRlbiknLFxyXG4gICk7XHJcbiAgaWYgKHdpbm5lcikge1xyXG4gICAgY292ZXJCb2FyZC5pbm5lclRleHQgPSB3aW5uZXI7XHJcbiAgICBoaWRkZW5Cb2FyZC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQnKS5jbGFzc0xpc3QuYWRkKCdub3Qtc2VsZWN0YWJsZScpO1xyXG4gICAgZ2V0Q3VycmVudFR1cm4obW9kZSkuaW5jcmVtZW50U2NvcmUoKTtcclxuICAgIERPTS5zaG93U2NvcmVib2FyZChwbGF5ZXIxLnNjb3JlLCBlbnRpdHkyLnNjb3JlKTtcclxuICAgIERPTS5zaG93UGxheUFnYWluQnRuKCk7XHJcbiAgICByZXNldEJvYXJkRGF0YShwbGF5ZXIxLCBlbnRpdHkyKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgcGxheWVyMSxcclxuICBwbGF5ZXIyLFxyXG4gIGNvbXB1dGVyLFxyXG4gIHJhbmRvbVBsYWNlbWVudCxcclxuICBwbGFjZVBsYXllclNoaXBzLFxyXG4gIHN0YXJ0Um91bmQsXHJcbiAgcGxheSxcclxuICBhdHRhY2tCb2FyZCxcclxuICByZXNldEJvYXJkRGF0YSxcclxuICBlbmRHYW1lLFxyXG59O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wdXRlciB7XHJcbiAgY29uc3RydWN0b3IoYm9hcmQpIHtcclxuICAgIHRoaXMubmFtZSA9ICdDb21wdXRlcic7XHJcbiAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgIHRoaXMudHVybiA9IGZhbHNlO1xyXG4gICAgdGhpcy5nYW1lYm9hcmQgPSBib2FyZDtcclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcFJhbmRvbWx5KHNoaXApIHtcclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGNvbnN0IHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGNvbnN0IHJhbmRvbURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xyXG4gICAgICBjb25zdCBwbGFjZWRTaGlwID0gdGhpcy5nYW1lYm9hcmQucGxhY2VTaGlwKFxyXG4gICAgICAgIHJhbmRvbVgsXHJcbiAgICAgICAgcmFuZG9tWSxcclxuICAgICAgICBzaGlwLFxyXG4gICAgICAgIHJhbmRvbURpcmVjdGlvbixcclxuICAgICAgKTtcclxuICAgICAgaWYgKHBsYWNlZFNoaXApIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNrQm9hcmRSYW5kb21seShvcHBvbmVudEJvYXJkKSB7XHJcbiAgICB3aGlsZSAob3Bwb25lbnRCb2FyZCkge1xyXG4gICAgICBjb25zdCByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgb3Bwb25lbnRCb2FyZC5ib2FyZFtyYW5kb21YXVtyYW5kb21ZXSA9PT0gMCB8fFxyXG4gICAgICAgIG9wcG9uZW50Qm9hcmQuYm9hcmRbcmFuZG9tWF1bcmFuZG9tWV0gPT09IDFcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIFtyYW5kb21YLCByYW5kb21ZXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5oYW5jZWRBdHRhY2tNb2RlKG9wcG9uZW50Qm9hcmQsIGxhc3RTaGlwSGl0KSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBsYXN0U2hpcEhpdDtcclxuICAgIGNvbnN0IGRpcmVjdGlvbnMgPSBbXHJcbiAgICAgIHt4T2Zmc2V0OiAtMSwgeU9mZnNldDogMH0sIC8vIHRvcFxyXG4gICAgICB7eE9mZnNldDogMSwgeU9mZnNldDogMH0sIC8vIGJvdHRvbVxyXG4gICAgICB7eE9mZnNldDogMCwgeU9mZnNldDogLTF9LCAvLyBsZWZ0XHJcbiAgICAgIHt4T2Zmc2V0OiAwLCB5T2Zmc2V0OiAxfSwgLy8gcmlnaHRcclxuICAgIF07XHJcblxyXG4gICAgZm9yIChjb25zdCB7eE9mZnNldCwgeU9mZnNldH0gb2YgZGlyZWN0aW9ucykge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBvcHBvbmVudEJvYXJkLmJvYXJkW3ggKyB4T2Zmc2V0XT8uW3kgKyB5T2Zmc2V0XTtcclxuXHJcbiAgICAgIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCAmJiB0YXJnZXQgPj0gMCkge1xyXG4gICAgICAgIHJldHVybiBbeCArIHhPZmZzZXQsIHkgKyB5T2Zmc2V0XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpbmNyZW1lbnRTY29yZSgpIHtcclxuICAgIHRoaXMuc2NvcmUrKztcclxuICB9XHJcblxyXG4gIHN3aXRjaFR1cm4oKSB7XHJcbiAgICB0aGlzLnR1cm4gPSB0aGlzLnR1cm4gPyBmYWxzZSA6IHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQge1xyXG4gIHBsYXllcjEsXHJcbiAgcGxheWVyMixcclxuICBjb21wdXRlcixcclxuICByYW5kb21QbGFjZW1lbnQsXHJcbiAgcGxhY2VQbGF5ZXJTaGlwcyxcclxuICBzdGFydFJvdW5kLFxyXG4gIHBsYXksXHJcbiAgYXR0YWNrQm9hcmQsXHJcbiAgcmVzZXRCb2FyZERhdGEsXHJcbn0gZnJvbSAnLi9iYXR0bGVzaGlwLmpzJztcclxuXHJcbmNvbnN0IGdhbWVNb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtbW9kZXMnKTtcclxuY29uc3QgdnNDb21wdXRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlcicpO1xyXG5jb25zdCB2c1AyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnAycCcpO1xyXG5cclxuY29uc3QgcGxheWVyMVVJQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtMScpO1xyXG5jb25zdCBwbGF5ZXIyVUlCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC0yJyk7XHJcbmNvbnN0IGNvbXBVSUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLTMnKTtcclxuY29uc3Qgc2NvcmVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZWJvYXJkJyk7XHJcblxyXG5jb25zdCBzaGlwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXBzJyk7XHJcbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKTtcclxuXHJcbmNvbnN0IGJ1dHRvbkNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtYnV0dG9ucycpO1xyXG5jb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlLWJ1dHRvbicpO1xyXG5jb25zdCBjbG9zZVNjb3JlYm9hcmRCdG4gPSBzY29yZWJvYXJkLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xyXG5jb25zdCBwbGF5QWdhaW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1hZ2Fpbi1idXR0b24nKTtcclxuXHJcbmNvbnN0IGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKTtcclxuXHJcbmNvbnN0IGJvYXJkTGVuZ3RoID0gMTAwO1xyXG5sZXQgbW9kZTtcclxubGV0IGNlbGxzID0gW107XHJcbmxldCBjdXJyZW50Qm9hcmQgPSBbXTtcclxubGV0IHNoaXBEZXRhaWxzID0gW107XHJcbmxldCBjdXJyZW50QmxvY2sgPSBudWxsO1xyXG5sZXQgZHJhZ2dlZFNoaXAgPSBudWxsO1xyXG5sZXQgc3VjY2Vzc0Ryb3AgPSBmYWxzZTtcclxubGV0IGJsb2NrUG9zaXRpb25zID0gJ2hvcml6b250YWwnO1xyXG5cclxudnNDb21wdXRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlID0gJ3ZzQUknO1xyXG4gIHBsYXllcjFVSUJvYXJkLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIGNvbXBVSUJvYXJkLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIHByZXBhcmF0aW9uUGhhc2UocGxheWVyMSwgcGxheWVyMVVJQm9hcmQpO1xyXG4gIHNldHVwUmVzZXRCdG4ocGxheWVyMSwgcGxheWVyMVVJQm9hcmQpO1xyXG4gIHNldHVwUmFuZG9tQnRuKHBsYXllcjEsIHBsYXllcjFVSUJvYXJkKTtcclxuICBzZXR1cEZpbmlzaEJ0bihwbGF5ZXIxVUlCb2FyZCwgKCkgPT4ge1xyXG4gICAgYmF0dGxlUGhhc2VPbigpO1xyXG4gIH0pO1xyXG4gIGdhbWVNb2RlLmNsb3NlKCk7XHJcbn0pO1xyXG5cclxudnNQMi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBtb2RlID0gJ1AyUCc7XHJcbiAgcGxheWVyMVVJQm9hcmQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgcGxheWVyMlVJQm9hcmQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgcHJlcGFyYXRpb25QaGFzZShwbGF5ZXIxLCBwbGF5ZXIxVUlCb2FyZCk7XHJcbiAgc2V0dXBSZXNldEJ0bihwbGF5ZXIxLCBwbGF5ZXIxVUlCb2FyZCk7XHJcbiAgc2V0dXBSZXNldEJ0bihwbGF5ZXIyLCBwbGF5ZXIyVUlCb2FyZCk7XHJcbiAgc2V0dXBSYW5kb21CdG4ocGxheWVyMSwgcGxheWVyMVVJQm9hcmQpO1xyXG4gIHNldHVwUmFuZG9tQnRuKHBsYXllcjIsIHBsYXllcjJVSUJvYXJkKTtcclxuICBzZXR1cEZpbmlzaEJ0bihwbGF5ZXIxVUlCb2FyZCwgKCkgPT4ge1xyXG4gICAgdG9nZ2xlTG9hZGVyKCk7XHJcbiAgICBwbGF5ZXIxVUlCb2FyZC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIHBsYXllcjJVSUJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgcGxhY2VQbGF5ZXJTaGlwcyhwbGF5ZXIxKTtcclxuICAgIHByZXBhcmF0aW9uUGhhc2UocGxheWVyMiwgcGxheWVyMlVJQm9hcmQpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0b2dnbGVMb2FkZXIoKSwgMTAwMCk7XHJcbiAgfSk7XHJcbiAgc2V0dXBGaW5pc2hCdG4ocGxheWVyMlVJQm9hcmQsICgpID0+IHtcclxuICAgIHBsYXllcjFVSUJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgYmF0dGxlUGhhc2VPbigpO1xyXG4gIH0pO1xyXG4gIGdhbWVNb2RlLmNsb3NlKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZ2V0TW9kZSgpIHtcclxuICByZXR1cm4gbW9kZTtcclxufVxyXG5cclxuLy8gR0FNRVBMQVkgRlVOQ1RJT05TXHJcblxyXG5mdW5jdGlvbiBwcmVwYXJhdGlvblBoYXNlKHBsYXllciwgVUlCb2FyZCkge1xyXG4gIHJlc2V0U2hpcEhhbmRsZXIocGxheWVyKTtcclxuICByZXNldEJvYXJkcyhVSUJvYXJkKTtcclxuICByZW5kZXJCb2FyZENlbGxzKHBsYXllci5nYW1lYm9hcmQuYm9hcmQsIFVJQm9hcmQpO1xyXG4gIGFkZERyYWdFdmVudHMoVUlCb2FyZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJhdHRsZVBoYXNlT24oKSB7XHJcbiAgdG9nZ2xlTG9hZGVyKCk7XHJcblxyXG4gIHNoaXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgYnV0dG9uQ29udGFpbmVycy5mb3JFYWNoKChjb250KSA9PiB7XHJcbiAgICBjb250LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gIH0pO1xyXG5cclxuICBpZiAobW9kZSA9PT0gJ3ZzQUknKSB7XHJcbiAgICBjb21wVUlCb2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIHN0YXJ0Um91bmQobW9kZSk7XHJcbiAgICByZW5kZXJDb21wdXRlckJvYXJkKCk7XHJcbiAgfSBlbHNlIGlmIChtb2RlID09PSAnUDJQJykge1xyXG4gICAgcGxheWVyMVVJQm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICBoaWRlRmlsbGVkKHBsYXllcjJVSUJvYXJkKTtcclxuICAgIHN0YXJ0Um91bmQobW9kZSk7XHJcbiAgICByZW5kZXJQbGF5ZXJCb2FyZHMoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUJvYXJkQ292ZXJzKHBsYXllcjFVSUJvYXJkKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHRvZ2dsZUxvYWRlcigpLCAzMDAwKTtcclxuICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIxLCBwbGF5ZXIyLCBjb21wdXRlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJhdHRsZVBoYXNlT2ZmKCkge1xyXG4gIHNoaXBDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgYnV0dG9uQ29udGFpbmVycy5mb3JFYWNoKChjb250KSA9PiB7XHJcbiAgICBjb250LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gIH0pO1xyXG4gIGNvbXBVSUJvYXJkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gIHBsYXllcjJVSUJvYXJkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVMb2FkZXIoKSB7XHJcbiAgbG9hZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlbmRSb3VuZCgpIHtcclxuICBwbGF5QWdhaW5CdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgaGlkZUFsbEJvYXJkQ292ZXJzKCk7XHJcbiAgYmF0dGxlUGhhc2VPZmYoKTtcclxuICBwcmVwYXJhdGlvblBoYXNlKHBsYXllcjEsIHBsYXllcjFVSUJvYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1Njb3JlYm9hcmQoc2NvcmUxLCBzY29yZTIpIHtcclxuICBjb25zdCBwbGF5ZXIxU2NvcmUgPSBzY29yZWJvYXJkLnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItMSAuc2NvcmUnKTtcclxuICBjb25zdCBvcHBvbmVudFNjb3JlID0gc2NvcmVib2FyZC5xdWVyeVNlbGVjdG9yKCcub3Bwb25lbnQgLnNjb3JlJyk7XHJcbiAgaWYgKG1vZGUgPT09ICdQMlAnKVxyXG4gICAgc2NvcmVib2FyZC5xdWVyeVNlbGVjdG9yKCcub3Bwb25lbnQgLm5hbWUnKS5pbm5lclRleHQgPSAnUGxheWVyIDInO1xyXG4gIHBsYXllcjFTY29yZS5pbm5lclRleHQgPSBzY29yZTE7XHJcbiAgb3Bwb25lbnRTY29yZS5pbm5lclRleHQgPSBzY29yZTI7XHJcbiAgc2NvcmVib2FyZC5zaG93TW9kYWwoKTtcclxufVxyXG5cclxuLy8gU0VUVVAgQlVUVE9OU1xyXG5cclxuZnVuY3Rpb24gc2hvd1BsYXlBZ2FpbkJ0bigpIHtcclxuICBwbGF5QWdhaW5CdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwUmVzZXRCdG4ocGxheWVyLCBVSUJvYXJkKSB7XHJcbiAgY29uc3QgcmVzZXRCdG4gPSBVSUJvYXJkLnF1ZXJ5U2VsZWN0b3IoJy5yZXNldC1idXR0b24nKTtcclxuICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHJlc2V0U2hpcEhhbmRsZXIocGxheWVyKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0dXBSYW5kb21CdG4ocGxheWVyLCBVSUJvYXJkKSB7XHJcbiAgY29uc3QgcmFuZG9tQnRuID0gVUlCb2FyZC5xdWVyeVNlbGVjdG9yKCcucmFuZG9taXplLWJ1dHRvbicpO1xyXG4gIHJhbmRvbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnN0IGJvYXJkRGF0YSA9IHJhbmRvbVBsYWNlbWVudChwbGF5ZXIpO1xyXG4gICAgcmVzZXRCb2FyZHMoVUlCb2FyZCk7XHJcbiAgICByZW5kZXJCb2FyZENlbGxzKGJvYXJkRGF0YSwgVUlCb2FyZCk7XHJcbiAgICBhZGRGaWxsZWQoYm9hcmREYXRhLCBVSUJvYXJkKTtcclxuICAgIGFkZERyYWdFdmVudHMoVUlCb2FyZCk7XHJcbiAgICBoaWRlQWxsU2hpcHMoKTtcclxuICAgIGNlbGxzID0gVUlCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cEZpbmlzaEJ0bihVSUJvYXJkLCBjYikge1xyXG4gIGNvbnN0IGZpbmlzaEJ0biA9IFVJQm9hcmQucXVlcnlTZWxlY3RvcignLmZpbmlzaC1idXR0b24nKTtcclxuICBmaW5pc2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpZiAoYWxsU2hpcHNQbGFjZWQoc2hpcHMpKSByZXR1cm4gYWxlcnQoJ011c3QgcGxhY2UgYWxsIHNoaXBzJyk7XHJcbiAgICBjYigpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCByb3RhdGVTaGlwSGFuZGxlciA9ICgpID0+IHtcclxuICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICBjb25zdCBpc0hvcml6b250YWwgPSBzaGlwLmRhdGFzZXQucG9zaXRpb24gPT09ICdob3Jpem9udGFsJztcclxuICAgIGJsb2NrUG9zaXRpb25zID0gaXNIb3Jpem9udGFsID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcclxuICAgIHNoaXAuZGF0YXNldC5wb3NpdGlvbiA9IGlzSG9yaXpvbnRhbCA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XHJcbiAgICBzaGlwLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBpc0hvcml6b250YWwgPyAnY29sdW1uJyA6ICdyb3cnO1xyXG4gICAgc2hpcC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2snKS5mb3JFYWNoKChibG9jaykgPT4ge1xyXG4gICAgICBbYmxvY2suZGF0YXNldC5vZmZzZXRYLCBibG9jay5kYXRhc2V0Lm9mZnNldFldID0gW1xyXG4gICAgICAgIGJsb2NrLmRhdGFzZXQub2Zmc2V0WSxcclxuICAgICAgICBibG9jay5kYXRhc2V0Lm9mZnNldFgsXHJcbiAgICAgIF07XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlc2V0U2hpcEhhbmRsZXIgPSAocGxheWVyKSA9PiB7XHJcbiAgaWYgKCFjZWxscykgcmV0dXJuO1xyXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XHJcbiAgfSk7XHJcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gc2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSk7XHJcbiAgc2hpcERldGFpbHMgPSBbXTtcclxuICByZXNldEJvYXJkRGF0YShwbGF5ZXIpO1xyXG59O1xyXG5cclxucm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlU2hpcEhhbmRsZXIpO1xyXG5jbG9zZVNjb3JlYm9hcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY29yZWJvYXJkLmNsb3NlKCkpO1xyXG5wbGF5QWdhaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBlbmRSb3VuZCgpKTtcclxuXHJcbi8vIEJPQVJEIENPVkVSUyBGVU5DVElPTkFMSVRZXHJcblxyXG5mdW5jdGlvbiBhZGRCb2FyZENvdmVyKHRhcmdldEJvYXJkLCB0ZXh0KSB7XHJcbiAgY29uc3QgYm9hcmQgPSB0YXJnZXRCb2FyZC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQnKTtcclxuICBjb25zdCBjb3ZlckJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY292ZXJCb2FyZC5pbm5lclRleHQgPSB0ZXh0O1xyXG4gIGNvdmVyQm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmQtY292ZXInKTtcclxuICBjb3ZlckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gIGJvYXJkLmFwcGVuZENoaWxkKGNvdmVyQm9hcmQpO1xyXG59XHJcbmFkZEJvYXJkQ292ZXIocGxheWVyMVVJQm9hcmQsIGBQbGF5ZXIgMSdzIFR1cm5gKTtcclxuYWRkQm9hcmRDb3ZlcihwbGF5ZXIyVUlCb2FyZCwgYFBsYXllciAyJ3MgVHVybmApO1xyXG5hZGRCb2FyZENvdmVyKGNvbXBVSUJvYXJkLCBgQ29tcHV0ZXIncyBUdXJuYCk7XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVCb2FyZENvdmVycyguLi50YXJnZXRCb2FyZHMpIHtcclxuICB0YXJnZXRCb2FyZHMuZm9yRWFjaCgoYm9hcmQpID0+IHtcclxuICAgIGNvbnN0IGNvdmVyQm9hcmQgPSBib2FyZC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtY292ZXInKTtcclxuICAgIGNvdmVyQm9hcmQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XHJcbiAgICBjb3ZlckJvYXJkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbm90LXNlbGVjdGFibGUnKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUFsbEJvYXJkQ292ZXJzKCkge1xyXG4gIGNvbnN0IGJvYXJkQ292ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWNvdmVyJyk7XHJcbiAgYm9hcmRDb3ZlcnMuZm9yRWFjaCgoY292ZXIpID0+IGNvdmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpKTtcclxufVxyXG5cclxuLy8gQk9BUkQgRlVOQ1RJT05TXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQnKS5mb3JFYWNoKChib2FyZCkgPT4ge1xyXG4gIGJvYXJkLnRhcmdldENlbGxzID0gW107XHJcbn0pO1xyXG5cclxuLy8gUmVuZGVyIFVJIGJvYXJkIGNlbGxzXHJcbmZ1bmN0aW9uIHJlbmRlckJvYXJkQ2VsbHMoYm9hcmREYXRhLCBVSUJvYXJkKSB7XHJcbiAgY29uc3QgYm9hcmQgPSBVSUJvYXJkLnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZCcpO1xyXG4gIGJvYXJkRGF0YS5mb3JFYWNoKChyb3csIHgpID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjb2wsIHkpID0+IHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcclxuICAgICAgY2VsbC5kYXRhc2V0LnggPSB4O1xyXG4gICAgICBjZWxsLmRhdGFzZXQueSA9IHk7XHJcbiAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEZpbGxlZChib2FyZERhdGEsIFVJQm9hcmQpIHtcclxuICBjb25zdCBib2FyZCA9IFVJQm9hcmQucXVlcnlTZWxlY3RvcignLmJvYXJkJyk7XHJcbiAgYm9hcmREYXRhLmZvckVhY2goKHJvdywgeCkgPT4ge1xyXG4gICAgcm93LmZvckVhY2goKGNvbCwgeSkgPT4ge1xyXG4gICAgICBpZiAoYm9hcmREYXRhW3hdW3ldID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IGJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWApO1xyXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlRmlsbGVkKFVJQm9hcmQpIHtcclxuICBjb25zdCBib2FyZCA9IFVJQm9hcmQucXVlcnlTZWxlY3RvcignLmJvYXJkJyk7XHJcbiAgY29uc3QgY2VsbHMgPSBib2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xyXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZERyYWdFdmVudHMoVUlCb2FyZCkge1xyXG4gIGNlbGxzID0gVUlCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKGAuY2VsbGApO1xyXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3Zlcik7XHJcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcik7XHJcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSk7XHJcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcm9wU2hpcCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFsbFNoaXBzUGxhY2VkKHNoaXBzKSB7XHJcbiAgcmV0dXJuIEFycmF5LmZyb20oc2hpcHMpLnNvbWUoKHNoaXApID0+IHtcclxuICAgIGlmICghc2hpcC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSByZXR1cm4gdHJ1ZTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVzZXRCb2FyZHMoLi4uVUlCb2FyZHMpIHtcclxuICBVSUJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4ge1xyXG4gICAgYm9hcmQucXVlcnlTZWxlY3RvcignLmJvYXJkJykuY2xhc3NMaXN0LnJlbW92ZSgnbm90LXNlbGVjdGFibGUnKTtcclxuICAgIGNvbnN0IGNlbGxzID0gYm9hcmQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgICAgY2VsbC5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVVSUJvYXJkKG1vZGUsIG9wcG9uZW50LCB4LCB5LCBpbXBhY3QpIHtcclxuICBjb25zdCB0b2dnbGVDb3ZlcnMgPSAoKSA9PiB7XHJcbiAgICBpZiAobW9kZSA9PT0gJ3ZzQUknKSB7XHJcbiAgICAgIHRvZ2dsZUJvYXJkQ292ZXJzKHBsYXllcjFVSUJvYXJkLCBjb21wVUlCb2FyZCk7XHJcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdQMlAnKSB7XHJcbiAgICAgIHRvZ2dsZUJvYXJkQ292ZXJzKHBsYXllcjFVSUJvYXJkLCBwbGF5ZXIyVUlCb2FyZCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBpZiAoaW1wYWN0ID09PSAnZ2FtZSBvdmVyJykgaW1wYWN0ID0gJ2hpdCc7XHJcbiAgdmFsaWRhdGVDbGlja2VkQ2VsbCh4LCB5LCBpbXBhY3QpO1xyXG4gIGlmIChpbXBhY3QgPT09ICdnYW1lIG92ZXInKSByZXR1cm47XHJcbiAgaWYgKGltcGFjdCA9PT0gJ2hpdCcpIHJldHVybjtcclxuXHJcbiAgaWYgKG9wcG9uZW50ICE9PSBjb21wdXRlcikge1xyXG4gICAgc2V0VGltZW91dCh0b2dnbGVDb3ZlcnMsIDEwMDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0b2dnbGVDb3ZlcnMoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckNvbXB1dGVyQm9hcmQoKSB7XHJcbiAgcmVzZXRCb2FyZHMoY29tcFVJQm9hcmQpO1xyXG4gIHJlbmRlckJvYXJkQ2VsbHMoY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkLCBjb21wVUlCb2FyZCk7XHJcbiAgYWRkQ2VsbEV2ZW50cyhjb21wVUlCb2FyZCwgY29tcHV0ZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJQbGF5ZXJCb2FyZHMoKSB7XHJcbiAgYWRkQ2VsbEV2ZW50cyhwbGF5ZXIxVUlCb2FyZCwgcGxheWVyMSk7XHJcbiAgYWRkQ2VsbEV2ZW50cyhwbGF5ZXIyVUlCb2FyZCwgcGxheWVyMik7XHJcbn1cclxuXHJcbi8vIENFTEwgRlVOQ1RJT05TXHJcblxyXG5mdW5jdGlvbiBob3ZlckNlbGwoZSkge1xyXG4gIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcclxuICBpZiAoXHJcbiAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpICYmXHJcbiAgICAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpICYmXHJcbiAgICAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKVxyXG4gICkge1xyXG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdvbi1zZWxlY3QnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsaWNrQ2VsbChvcHBvbmVudCwgZSkge1xyXG4gIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcclxuICBjb25zdCB4ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC54KTtcclxuICBjb25zdCB5ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC55KTtcclxuICBpZiAoXHJcbiAgICBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpICYmXHJcbiAgICAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpICYmXHJcbiAgICAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKVxyXG4gICkge1xyXG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdvbi1zZWxlY3QnKTtcclxuICAgIGNvbnN0IGltcGFjdCA9IGF0dGFja0JvYXJkKG9wcG9uZW50LCB4LCB5LCBtb2RlKTtcclxuICAgIGlmIChpbXBhY3QgPT09ICdtaXNzJykgY2VsbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ25vdC1zZWxlY3RhYmxlJyk7XHJcbiAgICB1cGRhdGVVSUJvYXJkKG1vZGUsIG9wcG9uZW50LCB4LCB5LCBpbXBhY3QpO1xyXG4gICAgcGxheSgpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVDbGlja2VkQ2VsbCh4LCB5LCBpbXBhY3QpIHtcclxuICBsZXQgdW5jb3ZlcmVkQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgJy5hY3RpdmU6aGFzKC5ib2FyZC1jb3Zlci5oaWRkZW4pJyxcclxuICApO1xyXG4gIHVwZGF0ZUNlbGwodW5jb3ZlcmVkQm9hcmQsIHgsIHksIGltcGFjdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENlbGxFdmVudHMoVUlCb2FyZCwgb3Bwb25lbnQpIHtcclxuICBjb25zdCBib2FyZCA9IFVJQm9hcmQucXVlcnlTZWxlY3RvcignLmJvYXJkJyk7XHJcbiAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaG92ZXJDZWxsKTtcclxuICAvLyBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBjbGlja0NlbGwob3Bwb25lbnQsIGUpKTtcclxuICBib2FyZC5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGNsaWNrQ2VsbChvcHBvbmVudCwgZSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ2VsbChVSUJvYXJkLCB4LCB5LCBpbXBhY3QpIHtcclxuICBjb25zdCB0YXJnZXRDZWxsID0gVUlCb2FyZC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgYC5jZWxsW2RhdGEteD1cIiR7eH1cIl1bZGF0YS15PVwiJHt5fVwiXWAsXHJcbiAgKTtcclxuICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5hZGQoaW1wYWN0KTtcclxufVxyXG5cclxuLy8gRFJBRyBOIERST1AgRkVBVFVSRVxyXG5cclxuLy8gQWRkIGRyYWcgZXZlbnRzIGZvciBldmVyeSBVSSBzaGlwc1xyXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgY29uc3QgYmxvY2tzID0gc2hpcC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2snKTtcclxuICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcclxuICAgIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IChjdXJyZW50QmxvY2sgPSBibG9jaykpO1xyXG4gIH0pO1xyXG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZHJhZ1N0YXJ0KTtcclxuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBoaWRlQWxsU2hpcHMoKSB7XHJcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gc2hpcC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XHJcbn1cclxuXHJcbi8vIEhFTFBFUiBGVU5DVElPTlNcclxuXHJcbi8vIFJlbW92ZSBoaWdobGlnaHRzIGZvciBldmVyeSB0YXJnZXQgY2VsbHMgaGlnaGxpZ2h0ZWRcclxuZnVuY3Rpb24gcmVtb3ZlSGlnaGxpZ2h0cyhib2FyZCkge1xyXG4gIGlmICghYm9hcmQgfHwgIWJvYXJkLnRhcmdldENlbGxzKSByZXR1cm47XHJcbiAgYm9hcmQudGFyZ2V0Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdobGlnaHQnKTtcclxuICB9KTtcclxuICBib2FyZC50YXJnZXRDZWxscyA9IFtdO1xyXG59XHJcblxyXG4vLyBHZXQgdGFyZ2V0IGNlbGxcclxuZnVuY3Rpb24gZ2V0VGFyZ2V0Q2VsbChibG9jaywgYmxvY2tYLCBibG9ja1ksIGNlbGxYLCBjZWxsWSwgYm9hcmQpIHtcclxuICBjb25zdCBvZmZzZXRYID0gcGFyc2VJbnQoYmxvY2suZGF0YXNldC5vZmZzZXRYKSAtIGJsb2NrWDtcclxuICBjb25zdCBvZmZzZXRZID0gcGFyc2VJbnQoYmxvY2suZGF0YXNldC5vZmZzZXRZKSAtIGJsb2NrWTtcclxuICBjb25zdCB0YXJnZXRDZWxsID0gYm9hcmQucXVlcnlTZWxlY3RvcihcclxuICAgIGAuY2VsbFtkYXRhLXg9XCIke2NlbGxYICsgb2Zmc2V0WH1cIl1bZGF0YS15PVwiJHtjZWxsWSArIG9mZnNldFl9XCJdYCxcclxuICApO1xyXG4gIHJldHVybiB0YXJnZXRDZWxsO1xyXG59XHJcblxyXG4vLyBTdG9yZSB0YXJnZXQgY2VsbHNcclxuZnVuY3Rpb24gYWRkVGFyZ2V0Q2VsbCh0YXJnZXRDZWxscywgdGFyZ2V0Q2VsbCwgYmxvY2spIHtcclxuICB0YXJnZXRDZWxscy5wdXNoKHtcclxuICAgIHg6IHBhcnNlSW50KHRhcmdldENlbGwuZGF0YXNldC54KSxcclxuICAgIHk6IHBhcnNlSW50KHRhcmdldENlbGwuZGF0YXNldC55KSxcclxuICAgIHBvc2l0aW9uOiBibG9ja1Bvc2l0aW9ucyxcclxuICAgIGxlbmd0aDogcGFyc2VJbnQoYmxvY2sucGFyZW50RWxlbWVudC5kYXRhc2V0LnNpemUpLFxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBWYWxpZGF0ZSB0YXJnZXQgY2VsbHNcclxuZnVuY3Rpb24gdmFsaWRhdGVDZWxscyhibG9ja3MsIGJsb2NrWCwgYmxvY2tZLCBjZWxsWCwgY2VsbFksIGNiLCBib2FyZCkge1xyXG4gIGNvbnN0IHRhcmdldENlbGxzID0gW107XHJcblxyXG4gIGJsb2Nrcy5mb3JFYWNoKChibG9jaykgPT4ge1xyXG4gICAgbGV0IHRhcmdldENlbGwgPSBnZXRUYXJnZXRDZWxsKGJsb2NrLCBibG9ja1gsIGJsb2NrWSwgY2VsbFgsIGNlbGxZLCBib2FyZCk7XHJcblxyXG4gICAgaWYgKHRhcmdldENlbGwpIHtcclxuICAgICAgYWRkVGFyZ2V0Q2VsbCh0YXJnZXRDZWxscywgdGFyZ2V0Q2VsbCwgYmxvY2spO1xyXG4gICAgICBjYih0YXJnZXRDZWxsKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRhcmdldENlbGxzWzBdO1xyXG59XHJcblxyXG4vLyBDaGVjayBpZiBzaGlwIHBsYWNlbWVudCBpcyBvdXQgb2YgYm91bmRzXHJcbmZ1bmN0aW9uIG91dE9mQm91bmRzKGNlbGwsIGJsb2NrLCBib2FyZExlbmd0aCwgYmxvY2tMZW5ndGgpIHtcclxuICBpZiAoY2VsbCAtIGJsb2NrID4gYm9hcmRMZW5ndGggLSBibG9ja0xlbmd0aCB8fCBjZWxsIC0gYmxvY2sgPCAwKSByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLy8gU29ydHMgc2hpcCBkZXRhaWxzIGluIGFzY2VuZGluZyBvcmRlciBiZWZvcmUgYXZhaWxhYmxlIGZvciBhY2Nlc3NcclxuZnVuY3Rpb24gZ2V0U2hpcERldGFpbHMoKSB7XHJcbiAgcmV0dXJuIHNoaXBEZXRhaWxzLnNvcnQoKGEsIGIpID0+IHtcclxuICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBEUkFHIEVWRU5UIEhBTkRMRVJTXHJcblxyXG5mdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xyXG4gIC8vIFNldCBkcmFnZ2VkIHNoaXAgdG8gdGhlIGN1cnJlbnQgc2hpcCBiZWluZyBkcmFnZ2VkXHJcbiAgZHJhZ2dlZFNoaXAgPSB0aGlzO1xyXG5cclxuICAvLyBHZXQgb2Zmc2V0IGZvciBhY2N1cmF0ZSBwbGFjZW1lbnQgb2Ygc2hpcHMgaW4gYm9hcmRcclxuICBjb25zdCByZWN0ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBjb25zdCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICBjb25zdCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xyXG5cclxuICAvLyBDdXN0b21pemUgZ2hvc3QgZWxlbWVudCBvciBvbiBkcmFnIGVsZW1lbnQgYnkgbWFraW5nIGFcclxuICAvLyBjb3B5IG9mIHRoZSBjdXJyZW50IGRyYWdnZWQgZWxlbWVudFxyXG4gIGNvbnN0IGdob3N0ID0gZHJhZ2dlZFNoaXAuY2xvbmVOb2RlKHRydWUpO1xyXG4gIGdob3N0LnN0eWxlLm9wYWNpdHkgPSAnMC41JztcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdob3N0KTtcclxuICBlLmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UoZ2hvc3QsIG9mZnNldFgsIG9mZnNldFkpO1xyXG5cclxuICAvLyBXaGVuIHNoaXAgaGFzIHN0YXJ0ZWQgZHJhZ2dpbmcgaGlkZSBpdHMgb3JpZ2luIGVsZW1lbnRcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGRyYWdnZWRTaGlwLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChnaG9zdCk7XHJcbiAgfSwgMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdFbmQoKSB7XHJcbiAgLy8gSWYgc2hpcCB3YXMgZHJhZ2dlZCBidXQgbm90IHBsYWNlZCwgcmVzdG9yZSB0aGUgc2hpcCdzIHZpc2liaWxpdHlcclxuICBpZiAoIXN1Y2Nlc3NEcm9wKSBkcmFnZ2VkU2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAvLyBJZiBzaGlwIHdhcyBwbGFjZWQgc3VjY2Vzc2Z1bGx5LCByZXNldCBkcmFnIGRldGFpbHMgYW5kIHJlbW92ZSBoaWdobGlnaHRlZFxyXG4gIC8vIHN0eWxlcyBpbiBib2FyZFxyXG4gIGRyYWdnZWRTaGlwID0gbnVsbDtcclxuICBzdWNjZXNzRHJvcCA9IGZhbHNlO1xyXG5cclxuICAvLyBSZW1vdmUgaGlnaGxpZ2h0cyBmcm9tIHRoZSBjdXJyZW50IGJvYXJkXHJcbiAgaWYgKGN1cnJlbnRCb2FyZCkge1xyXG4gICAgcmVtb3ZlSGlnaGxpZ2h0cyhjdXJyZW50Qm9hcmQpO1xyXG4gICAgY3VycmVudEJvYXJkID0gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdFbnRlcihlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBib2FyZCA9IHRoaXMuY2xvc2VzdCgnLmJvYXJkJyk7XHJcbiAgaWYgKCFib2FyZCkgcmV0dXJuO1xyXG5cclxuICBjdXJyZW50Qm9hcmQgPSBib2FyZDsgLy8gVHJhY2sgdGhlIGN1cnJlbnQgYm9hcmRcclxuXHJcbiAgY29uc3Qgc3RhcnRYID0gcGFyc2VJbnQodGhpcy5kYXRhc2V0LngpO1xyXG4gIGNvbnN0IHN0YXJ0WSA9IHBhcnNlSW50KHRoaXMuZGF0YXNldC55KTtcclxuICBjb25zdCBibG9ja3MgPSBkcmFnZ2VkU2hpcC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2snKTtcclxuICBjb25zdCBjdXJyZW50QmxvY2tYID0gcGFyc2VJbnQoY3VycmVudEJsb2NrLmRhdGFzZXQub2Zmc2V0WCk7XHJcbiAgY29uc3QgY3VycmVudEJsb2NrWSA9IHBhcnNlSW50KGN1cnJlbnRCbG9jay5kYXRhc2V0Lm9mZnNldFkpO1xyXG5cclxuICAvLyBDbGVhciBwcmV2aW91cyBoaWdobGlnaHRzXHJcbiAgcmVtb3ZlSGlnaGxpZ2h0cyhib2FyZCk7XHJcblxyXG4gIC8vIEhpZ2hsaWdodCBjZWxscyB0aGF0IGFyZSBhdmFpbGFibGUgZm9yIHBsYWNlbWVudCBiYXNlZCBvblxyXG4gIC8vIGRyYWdnZWQgc2hpcCdzIHBvc2l0aW9uIGFuZCBsZW5ndGhcclxuICB2YWxpZGF0ZUNlbGxzKFxyXG4gICAgYmxvY2tzLFxyXG4gICAgY3VycmVudEJsb2NrWCxcclxuICAgIGN1cnJlbnRCbG9ja1ksXHJcbiAgICBzdGFydFgsXHJcbiAgICBzdGFydFksXHJcbiAgICAoY2VsbCkgPT4ge1xyXG4gICAgICBib2FyZC50YXJnZXRDZWxscy5wdXNoKGNlbGwpO1xyXG4gICAgICBpZiAoIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWxsZWQnKSkgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHQnKTtcclxuICAgIH0sXHJcbiAgICBib2FyZCxcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnTGVhdmUoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBib2FyZCA9IHRoaXMuY2xvc2VzdCgnLmJvYXJkJyk7XHJcbiAgaWYgKCFib2FyZCkgcmV0dXJuO1xyXG4gIHJlbW92ZUhpZ2hsaWdodHMoYm9hcmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wU2hpcChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCBib2FyZCA9IHRoaXMuY2xvc2VzdCgnLmJvYXJkJyk7XHJcbiAgaWYgKCFib2FyZCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCBzdGFydFggPSBwYXJzZUludCh0aGlzLmRhdGFzZXQueCk7XHJcbiAgY29uc3Qgc3RhcnRZID0gcGFyc2VJbnQodGhpcy5kYXRhc2V0LnkpO1xyXG4gIGNvbnN0IGJsb2NrcyA9IGRyYWdnZWRTaGlwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jaycpO1xyXG4gIGNvbnN0IGN1cnJlbnRCbG9ja1ggPSBwYXJzZUludChjdXJyZW50QmxvY2suZGF0YXNldC5vZmZzZXRYKTtcclxuICBjb25zdCBjdXJyZW50QmxvY2tZID0gcGFyc2VJbnQoY3VycmVudEJsb2NrLmRhdGFzZXQub2Zmc2V0WSk7XHJcbiAgY29uc3QgYmxvY2tMZW5ndGggPSBwYXJzZUludChjdXJyZW50QmxvY2sucGFyZW50RWxlbWVudC5kYXRhc2V0LnNpemUpO1xyXG5cclxuICAvLyBDaGVjayBpZiBhIHZlcnRpY2FsIHNoaXAgcGxhY2VtZW50IGlzIG91dCBvZiBib3VuZHNcclxuICBpZiAoXHJcbiAgICBibG9ja1Bvc2l0aW9ucyA9PT0gJ3ZlcnRpY2FsJyAmJlxyXG4gICAgb3V0T2ZCb3VuZHMoc3RhcnRYLCBjdXJyZW50QmxvY2tYLCBib2FyZExlbmd0aCwgYmxvY2tMZW5ndGgpXHJcbiAgKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vIENoZWNrIGlmIGEgaG9yaXpvbnRhbCBzaGlwIHBsYWNlbWVudCBpcyBvdXQgb2YgYm91bmRzXHJcbiAgaWYgKFxyXG4gICAgYmxvY2tQb3NpdGlvbnMgPT09ICdob3Jpem9udGFsJyAmJlxyXG4gICAgb3V0T2ZCb3VuZHMoc3RhcnRZLCBjdXJyZW50QmxvY2tZLCBib2FyZExlbmd0aCwgYmxvY2tMZW5ndGgpXHJcbiAgKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBpZiB0aGUgaW50ZW5kZWQgcGxhY2VtZW50IG9mIHRoZSBzaGlwIGlzIG5vdCBlbXB0eVxyXG4gIGNvbnN0IGlzRmlsbGVkID0gQXJyYXkuZnJvbShibG9ja3MpLnNvbWUoKGJsb2NrKSA9PiB7XHJcbiAgICBsZXQgdGFyZ2V0Q2VsbCA9IGdldFRhcmdldENlbGwoXHJcbiAgICAgIGJsb2NrLFxyXG4gICAgICBjdXJyZW50QmxvY2tYLFxyXG4gICAgICBjdXJyZW50QmxvY2tZLFxyXG4gICAgICBzdGFydFgsXHJcbiAgICAgIHN0YXJ0WSxcclxuICAgICAgYm9hcmQsXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0YXJnZXRDZWxsID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiB0YXJnZXRDZWxsLmNsYXNzTGlzdC5jb250YWlucygnZmlsbGVkJyk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChpc0ZpbGxlZCkgcmV0dXJuO1xyXG5cclxuICAvLyBQbGFjZSBzaGlwIGlmIGl0IHBhc3NlcyBhbGwgY29uZGl0aW9ucyhvdXQgb2YgYm91bmRzLCBmaWxsZWQgcGxhY2VtZW50KVxyXG4gIGNvbnN0IGZpcnN0VGFyZ2V0Q2VsbCA9IHZhbGlkYXRlQ2VsbHMoXHJcbiAgICBibG9ja3MsXHJcbiAgICBjdXJyZW50QmxvY2tYLFxyXG4gICAgY3VycmVudEJsb2NrWSxcclxuICAgIHN0YXJ0WCxcclxuICAgIHN0YXJ0WSxcclxuICAgIChjZWxsKSA9PiB7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0Jyk7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICB9LFxyXG4gICAgYm9hcmQsXHJcbiAgKTtcclxuXHJcbiAgc2hpcERldGFpbHMucHVzaChmaXJzdFRhcmdldENlbGwpO1xyXG4gIHN1Y2Nlc3NEcm9wID0gdHJ1ZTtcclxuICByZW1vdmVIaWdobGlnaHRzKGJvYXJkKTtcclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICBnYW1lTW9kZS5zaG93TW9kYWwoKTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgZ2V0U2hpcERldGFpbHMsXHJcbiAgc2hvd1Njb3JlYm9hcmQsXHJcbiAgc2hvd1BsYXlBZ2FpbkJ0bixcclxuICB1cGRhdGVVSUJvYXJkLFxyXG4gIGdldE1vZGUsXHJcbn07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gdGhpcy5jcmVhdGVCb2FyZCgpO1xyXG4gICAgdGhpcy5zaGlwcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQm9hcmQoKSB7XHJcbiAgICBjb25zdCBib2FyZCA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IG5ldyBBcnJheSgxMCkuZmlsbCgwKTtcclxuICAgICAgYm9hcmQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgaXNPdXRPZkJvdW5kcyh4LCB5LCBzaGlwLCBkaXJlY3Rpb24pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIChkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiB5ID4gMTAgLSBzaGlwLmxlbmd0aCkgfHxcclxuICAgICAgKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiB4ID4gMTAgLSBzaGlwLmxlbmd0aClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoeCwgeSwgc2hpcCwgZGlyZWN0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKHgsIHksIHNoaXAsIGRpcmVjdGlvbikpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCByb3cgPSBkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyB4ICsgaSA6IHg7XHJcbiAgICAgIGNvbnN0IGNvbCA9IGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8geSArIGkgOiB5O1xyXG4gICAgICBpZiAodGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IDEpIHJldHVybiBmYWxzZTtcclxuICAgICAgY29vcmRpbmF0ZXMucHVzaChbcm93LCBjb2xdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb29yZGluYXRlcy5mb3JFYWNoKChbcm93LCBjb2xdKSA9PiAodGhpcy5ib2FyZFtyb3ddW2NvbF0gPSAxKSk7XHJcbiAgICBzaGlwLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXM7XHJcbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZUF0dGFjayh4LCB5KSB7XHJcbiAgICBjb25zdCBib2FyZENlbGwgPSB0aGlzLmJvYXJkW3hdW3ldO1xyXG5cclxuICAgIGlmIChib2FyZENlbGwgPT09IDApIHtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IC0yO1xyXG4gICAgICByZXR1cm4gJ21pc3MnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChib2FyZENlbGwgPT09IDEpIHtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IC0xO1xyXG4gICAgICByZXR1cm4gJ2hpdCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICdpbnZhbGlkJztcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52YWxpZGF0ZUF0dGFjayh4LCB5KTtcclxuXHJcbiAgICBpZiAocmVzdWx0ID09PSAnaGl0Jykge1xyXG4gICAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xyXG4gICAgICAgIGZvciAoY29uc3QgW3NoaXBYLCBzaGlwWV0gb2Ygc2hpcC5jb29yZGluYXRlcykge1xyXG4gICAgICAgICAgaWYgKHNoaXBYID09PSB4ICYmIHNoaXBZID09PSB5KSB7XHJcbiAgICAgICAgICAgIHNoaXAuaGl0KCk7XHJcbiAgICAgICAgICAgIHNoaXAuaXNTdW5rKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAnaGl0JztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgYWxsU2hpcHNTdW5rKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICByZXNldEJvYXJkKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IHRoaXMuY3JlYXRlQm9hcmQoKTtcclxuICAgIHRoaXMuc2hpcHMgPSBbXTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBib2FyZCkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgdGhpcy50dXJuID0gZmFsc2U7XHJcbiAgICB0aGlzLmdhbWVib2FyZCA9IGJvYXJkO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwUmFuZG9tbHkoc2hpcCkge1xyXG4gICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29uc3QgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgY29uc3QgcmFuZG9tRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XHJcbiAgICAgIGNvbnN0IHBsYWNlZFNoaXAgPSB0aGlzLmdhbWVib2FyZC5wbGFjZVNoaXAoXHJcbiAgICAgICAgcmFuZG9tWCxcclxuICAgICAgICByYW5kb21ZLFxyXG4gICAgICAgIHNoaXAsXHJcbiAgICAgICAgcmFuZG9tRGlyZWN0aW9uLFxyXG4gICAgICApO1xyXG4gICAgICBpZiAocGxhY2VkU2hpcCkgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbmNyZW1lbnRTY29yZSgpIHtcclxuICAgIHRoaXMuc2NvcmUrKztcclxuICB9XHJcblxyXG4gIHN3aXRjaFR1cm4oKSB7XHJcbiAgICB0aGlzLnR1cm4gPSB0aGlzLnR1cm4gPyBmYWxzZSA6IHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdENvdW50ID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLmNvb3JkaW5hdGVzID0gW107XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRDb3VudCsrO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdENvdW50ID09PSB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcclxuICAtLWRhcms6ICMwNTJmNWY7XHJcbiAgLS1uZXV0cmFsOiAjMDA1Mzc3O1xyXG4gIC0tbGlnaHQ6ICNlZWViZDM7XHJcbn1cclxuXHJcbioge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1mYW1pbHk6ICdSdWJpaycsIHNlcmlmO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1uZXV0cmFsKTtcclxuICB3aWR0aDogMTAwdnc7XHJcbn1cclxuXHJcbm1haW4ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuI2dhbWUtbG9nbyB7XHJcbiAgaGVpZ2h0OiAxMHJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IDQlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLXdlYmtpdC11c2VyLWRyYWc6IG5vbmU7XHJcbn1cclxuXHJcbi8qIERpYWxvZ3MgKi9cclxuXHJcbmRpYWxvZyA+IC5jb250ZW50IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodCk7XHJcbiAgcGFkZGluZzogMi41cmVtIDRyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcclxuICBvdXRsaW5lOiA0cHggc29saWQgdmFyKC0tZGFyayk7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogNTAlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMC4wMWZyIDFmcjtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDFyZW07XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuZGlhbG9nOjpiYWNrZHJvcCB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcclxuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IDAgcmdiYSgzMSwgMzgsIDEzNSwgMC4zNyk7XHJcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDE3cHgpO1xyXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDE3cHgpO1xyXG59XHJcblxyXG5kaWFsb2cgcCB7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBncmlkLWNvbHVtbjogc3BhbiAyO1xyXG59XHJcblxyXG4vKiBHYW1lIE1vZGUgRGlhbG9nICovXHJcblxyXG5kaWFsb2cuZ2FtZS1tb2RlcyAubW9kZSxcclxuZGlhbG9nLnNjb3JlYm9hcmQgLm5hbWUge1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiAxcmVtO1xyXG59XHJcblxyXG5kaWFsb2cuZ2FtZS1tb2RlcyA+IC5jb250ZW50ID4gLm1vZGUtY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiA0cmVtIDJyZW07XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG5kaWFsb2cuZ2FtZS1tb2RlcyA+IC5jb250ZW50ID4gLm1vZGUtY29udGFpbmVyOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDEzMSwgMTMxLCAxMzEsIDAuNSk7XHJcbiAgYm94LXNoYWRvdzogMCA4cHggMzJweCAwIHJnYmEoMTUwLCAxNTAsIDE1MCwgMC43KTtcclxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMS41cHgpO1xyXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEuNXB4KTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTgpO1xyXG59XHJcblxyXG5kaWFsb2cuZ2FtZS1tb2RlcyBpbWcge1xyXG4gIGhlaWdodDogMTUwcHg7XHJcbn1cclxuXHJcbi8qIFNjb3JlYm9hcmQgRGlhbG9nICovXHJcblxyXG5kaWFsb2cuc2NvcmVib2FyZCB7XHJcbiAgdHJhbnNpdGlvbjpcclxuICAgIG9wYWNpdHkgMC41cyBlYXNlLFxyXG4gICAgdmlzaWJpbGl0eSAwLjVzIGVhc2U7XHJcbn1cclxuXHJcbmRpYWxvZy5zY29yZWJvYXJkIC5zY29yZSB7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICBmb250LXNpemU6IDZyZW07XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5kaWFsb2cuc2NvcmVib2FyZCAubmFtZSB7XHJcbiAgbWFyZ2luLXRvcDogMDtcclxufVxyXG5cclxuZGlhbG9nLnNjb3JlYm9hcmQgLmNsb3NlIHtcclxuICBmb250LXNpemU6IDJyZW07XHJcbiAgY29sb3I6IHZhcigtLWxpZ2h0KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1uZXV0cmFsKTtcclxuICB3aWR0aDogNTBweDtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLWRhcmspO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAtMjBweDtcclxuICByaWdodDogLTIwcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG5kaWFsb2cuc2NvcmVib2FyZCAuY2xvc2U6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcclxuICBjb2xvcjogdmFyKC0tZGFyayk7XHJcbn1cclxuXHJcbi8qIEJvYXJkICovXHJcblxyXG4udGl0bGUge1xyXG4gIGNvbG9yOiB2YXIoLS1saWdodCk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDFyZW0gMDtcclxufVxyXG5cclxuLmJvYXJkIHtcclxuICBtYXgtd2lkdGg6IGZpdC1jb250ZW50O1xyXG4gIG1heC1oZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWRhcmspO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCA1MHB4KSAvIHJlcGVhdCgxMCwgNTBweCk7XHJcbiAgZ2FwOiA0cHg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4uY2VsbCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcclxufVxyXG5cclxuLyogU2hpcHMgKi9cclxuXHJcbi5zaGlwcyB7XHJcbiAgaGVpZ2h0OiA2ODBweDtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA0NXB4IDMwcHggNGZyIDRmcjtcclxuICBnYXA6IDFyZW07XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLnNoaXBzID4gLnRpdGxlIHtcclxuICBwYWRkaW5nLWJvdHRvbTogMDtcclxuICBncmlkLWNvbHVtbjogMSAvIHNwYW4gMztcclxufVxyXG5cclxuLmluc3RydWN0aW9uIHtcclxuICBjb2xvcjogdmFyKC0tbGlnaHQpO1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIHdpZHRoOiA2MDBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZ3JpZC1jb2x1bW46IDEgLyBzcGFuIDM7XHJcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zaGlwcyA+IGRpdiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xyXG4gIHdpZHRoOiAzMzRweDtcclxuICBwYWRkaW5nOiAxcmVtIDEuNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDAuNXJlbTtcclxuICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcclxufVxyXG5cclxuLnNoaXBzID4gZGl2ID4gLnNoaXAge1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxuLnNoaXBzID4gZGl2ID4gcCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLXdlYmtpdC11c2VyLWRyYWc6IG5vbmU7XHJcbn1cclxuXHJcbi5zaGlwIHtcclxuICB3aWR0aDogMjkwcHg7XHJcbiAgbWFyZ2luLXRvcDogMnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogNHB4O1xyXG4gIGN1cnNvcjogZ3JhYjtcclxufVxyXG5cclxuLnNoaXA6YWN0aXZlLFxyXG4uc2hpcDpmb2N1cyB7XHJcbiAgY3Vyc29yOiBncmFiYmluZztcclxufVxyXG5cclxuLmJsb2NrIHtcclxuICB3aWR0aDogNTBweDtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XHJcbn1cclxuXHJcbi8qIEJ1dHRvbnMgKi9cclxuXHJcbi5ib2FyZC1idXR0b25zIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBtYXJnaW4tdG9wOiA2cHg7XHJcbn1cclxuXHJcbi5zaGlwcyA+IC5yb3RhdGUtYnV0dG9uIHtcclxuICB3aWR0aDogMTNyZW07XHJcbiAgcGFkZGluZzogMC43NXJlbSAxcmVtO1xyXG4gIGdyaWQtcm93OiA0O1xyXG4gIGdyaWQtY29sdW1uOiAzO1xyXG4gIGp1c3RpZnktc2VsZjogZW5kO1xyXG4gIGFsaWduLXNlbGY6IGVuZDtcclxufVxyXG5cclxuW2NsYXNzXFwkPSdidXR0b24nXSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xyXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIHdpZHRoOiAxMHJlbTtcclxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gIHBhZGRpbmc6IDAuNXJlbSAycmVtO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuW2NsYXNzXFwkPSdidXR0b24nXTpob3ZlciB7XHJcbiAgb3BhY2l0eTogMC43NTtcclxufVxyXG5cclxuLnBsYXktYWdhaW4tYnV0dG9uIHtcclxuICB3aWR0aDogMTNyZW07XHJcbiAgcGFkZGluZzogMXJlbSAycmVtO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDU3LjUlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTcuNSUpO1xyXG59XHJcblxyXG4vKiBWaXNpYmlsaXR5ICovXHJcblxyXG4uaGlkZGVuIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG59XHJcblxyXG4uY2VsbC5oaWdobGlnaHQge1xyXG4gIG9wYWNpdHk6IDAuNTtcclxuICBjdXJzb3I6IGdyYWJiaW5nO1xyXG59XHJcblxyXG4uYm9hcmQtY292ZXIge1xyXG4gIGNvbG9yOiB2YXIoLS1saWdodCk7XHJcbiAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZDogcmdiKDQ5LCAxMDYsIDEzMSk7XHJcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XHJcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIC13ZWJraXQtdXNlci1kcmFnOiBub25lO1xyXG4gIHotaW5kZXg6IDI7XHJcbiAgdHJhbnNpdGlvbjpcclxuICAgIG9wYWNpdHkgMC4yNXMgZWFzZSxcclxuICAgIHZpc2liaWxpdHkgMC4yNXMgZWFzZTtcclxufVxyXG5cclxuLyogQ2VsbCBTdHlsaW5nICovXHJcblxyXG4uZmlsbGVkIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrKTtcclxufVxyXG5cclxuLm5vdC1zZWxlY3RhYmxlIHtcclxuICBjdXJzb3I6IGluaXRpYWw7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLXdlYmtpdC11c2VyLWRyYWc6IG5vbmU7XHJcbn1cclxuXHJcbi5vbi1zZWxlY3Qge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm9uLXNlbGVjdDpob3ZlciB7XHJcbiAgb3BhY2l0eTogMC43NTtcclxufVxyXG5cclxuLm1pc3Mge1xyXG4gIG9wYWNpdHk6IDAuMjU7XHJcbn1cclxuXHJcbi5oaXQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjViNWI7XHJcbn1cclxuXHJcbi8qIExvYWRlciAqL1xyXG5cclxuLmxvYWRlciB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW5ldXRyYWwpO1xyXG4gIHotaW5kZXg6IDM7XHJcbiAgdHJhbnNpdGlvbjpcclxuICAgIG9wYWNpdHkgMC43NXMgZWFzZS1vdXQsXHJcbiAgICB2aXNpYmlsaXR5IDAuNzVzIGVhc2Utb3V0O1xyXG59XHJcblxyXG4ubG9hZGVyOjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIGhlaWdodDogNzVweDtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gIGJvcmRlcjogMTVweCBzb2xpZCB2YXIoLS1saWdodCk7XHJcbiAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tZGFyayk7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGFuaW1hdGlvbjogbG9hZGluZyAwLjc1cyBlYXNlIGluZmluaXRlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGxvYWRpbmcge1xyXG4gIGZyb20ge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMHR1cm4pO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxdHVybik7XHJcbiAgfVxyXG59XHJcbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFVBQVU7RUFDVixTQUFTO0VBQ1QsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsZ0NBQWdDO0VBQ2hDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsT0FBTztFQUNQLFNBQVM7RUFDVCwyQkFBMkI7RUFDM0IsaUJBQWlCO0VBQ2pCLHVCQUF1QjtBQUN6Qjs7QUFFQSxZQUFZOztBQUVaO0VBQ0UsOEJBQThCO0VBQzlCLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLGVBQWU7RUFDZixRQUFRO0VBQ1IsU0FBUztFQUNULGdDQUFnQztFQUNoQyxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsU0FBUztFQUNULFVBQVU7QUFDWjs7QUFFQTtFQUNFLHFDQUFxQztFQUNyQyxnREFBZ0Q7RUFDaEQsMkJBQTJCO0VBQzNCLG1DQUFtQztB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QUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFlBQVk7RUFDWiw2QkFBNkI7RUFDN0IsMEJBQTBCO0VBQzFCLGtDQUFrQztFQUNsQyxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixVQUFVO0VBQ1Y7O3lCQUV1QjtBQUN6Qjs7QUFFQSxpQkFBaUI7O0FBRWpCO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixpQkFBaUI7RUFDakIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQSxXQUFXOztBQUVYO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLGFBQWE7RUFDYixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsZ0NBQWdDO0VBQ2hDLFVBQVU7RUFDVjs7NkJBRTJCO0FBQzdCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLCtCQUErQjtFQUMvQiw2QkFBNkI7RUFDN0Isa0JBQWtCO0VBQ2xCLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFO0lBQ0Usd0JBQXdCO0VBQzFCO0VBQ0E7SUFDRSx3QkFBd0I7RUFDMUI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxyXFxuICAtLWRhcms6ICMwNTJmNWY7XFxyXFxuICAtLW5ldXRyYWw6ICMwMDUzNzc7XFxyXFxuICAtLWxpZ2h0OiAjZWVlYmQzO1xcclxcbn1cXHJcXG5cXHJcXG4qIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgZm9udC1mYW1pbHk6ICdSdWJpaycsIHNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW5ldXRyYWwpO1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbn1cXHJcXG5cXHJcXG5tYWluIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNnYW1lLWxvZ28ge1xcclxcbiAgaGVpZ2h0OiAxMHJlbTtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IDQlO1xcclxcbiAgbGVmdDogNTAlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xcclxcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRGlhbG9ncyAqL1xcclxcblxcclxcbmRpYWxvZyA+IC5jb250ZW50IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcXHJcXG4gIHBhZGRpbmc6IDIuNXJlbSA0cmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcXHJcXG4gIG91dGxpbmU6IDRweCBzb2xpZCB2YXIoLS1kYXJrKTtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogNTAlO1xcclxcbiAgbGVmdDogNTAlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAwLjAxZnIgMWZyO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxufVxcclxcblxcclxcbmRpYWxvZzo6YmFja2Ryb3Age1xcclxcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcXHJcXG4gIGJveC1zaGFkb3c6IDAgOHB4IDMycHggMCByZ2JhKDMxLCAzOCwgMTM1LCAwLjM3KTtcXHJcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxN3B4KTtcXHJcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDE3cHgpO1xcclxcbn1cXHJcXG5cXHJcXG5kaWFsb2cgcCB7XFxyXFxuICBmb250LXNpemU6IDIuNXJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICBncmlkLWNvbHVtbjogc3BhbiAyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHYW1lIE1vZGUgRGlhbG9nICovXFxyXFxuXFxyXFxuZGlhbG9nLmdhbWUtbW9kZXMgLm1vZGUsXFxyXFxuZGlhbG9nLnNjb3JlYm9hcmQgLm5hbWUge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5kaWFsb2cuZ2FtZS1tb2RlcyA+IC5jb250ZW50ID4gLm1vZGUtY29udGFpbmVyIHtcXHJcXG4gIHBhZGRpbmc6IDRyZW0gMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuZGlhbG9nLmdhbWUtbW9kZXMgPiAuY29udGVudCA+IC5tb2RlLWNvbnRhaW5lcjpob3ZlciB7XFxyXFxuICBiYWNrZ3JvdW5kOiByZ2JhKDEzMSwgMTMxLCAxMzEsIDAuNSk7XFxyXFxuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IDAgcmdiYSgxNTAsIDE1MCwgMTUwLCAwLjcpO1xcclxcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEuNXB4KTtcXHJcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEuNXB4KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICBvdXRsaW5lOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE4KTtcXHJcXG59XFxyXFxuXFxyXFxuZGlhbG9nLmdhbWUtbW9kZXMgaW1nIHtcXHJcXG4gIGhlaWdodDogMTUwcHg7XFxyXFxufVxcclxcblxcclxcbi8qIFNjb3JlYm9hcmQgRGlhbG9nICovXFxyXFxuXFxyXFxuZGlhbG9nLnNjb3JlYm9hcmQge1xcclxcbiAgdHJhbnNpdGlvbjpcXHJcXG4gICAgb3BhY2l0eSAwLjVzIGVhc2UsXFxyXFxuICAgIHZpc2liaWxpdHkgMC41cyBlYXNlO1xcclxcbn1cXHJcXG5cXHJcXG5kaWFsb2cuc2NvcmVib2FyZCAuc2NvcmUge1xcclxcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXHJcXG4gIGZvbnQtc2l6ZTogNnJlbTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuZGlhbG9nLnNjb3JlYm9hcmQgLm5hbWUge1xcclxcbiAgbWFyZ2luLXRvcDogMDtcXHJcXG59XFxyXFxuXFxyXFxuZGlhbG9nLnNjb3JlYm9hcmQgLmNsb3NlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1saWdodCk7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1uZXV0cmFsKTtcXHJcXG4gIHdpZHRoOiA1MHB4O1xcclxcbiAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLWRhcmspO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAtMjBweDtcXHJcXG4gIHJpZ2h0OiAtMjBweDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuZGlhbG9nLnNjb3JlYm9hcmQgLmNsb3NlOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1kYXJrKTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQm9hcmQgKi9cXHJcXG5cXHJcXG4udGl0bGUge1xcclxcbiAgY29sb3I6IHZhcigtLWxpZ2h0KTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDFyZW0gMDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIG1heC13aWR0aDogZml0LWNvbnRlbnQ7XFxyXFxuICBtYXgtaGVpZ2h0OiBmaXQtY29udGVudDtcXHJcXG4gIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWRhcmspO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgNTBweCkgLyByZXBlYXQoMTAsIDUwcHgpO1xcclxcbiAgZ2FwOiA0cHg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi5jZWxsIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTaGlwcyAqL1xcclxcblxcclxcbi5zaGlwcyB7XFxyXFxuICBoZWlnaHQ6IDY4MHB4O1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDQ1cHggMzBweCA0ZnIgNGZyO1xcclxcbiAgZ2FwOiAxcmVtO1xcclxcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzID4gLnRpdGxlIHtcXHJcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcclxcbiAgZ3JpZC1jb2x1bW46IDEgLyBzcGFuIDM7XFxyXFxufVxcclxcblxcclxcbi5pbnN0cnVjdGlvbiB7XFxyXFxuICBjb2xvcjogdmFyKC0tbGlnaHQpO1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICB3aWR0aDogNjAwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBncmlkLWNvbHVtbjogMSAvIHNwYW4gMztcXHJcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHMgPiBkaXYge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xcclxcbiAgd2lkdGg6IDMzNHB4O1xcclxcbiAgcGFkZGluZzogMXJlbSAxLjVyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDAuNXJlbTtcXHJcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcclxcbiAgLXdlYmtpdC11c2VyLWRyYWc6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5zaGlwcyA+IGRpdiA+IC5zaGlwIHtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzID4gZGl2ID4gcCB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gIC13ZWJraXQtdXNlci1kcmFnOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICB3aWR0aDogMjkwcHg7XFxyXFxuICBtYXJnaW4tdG9wOiAycHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogNHB4O1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcDphY3RpdmUsXFxyXFxuLnNoaXA6Zm9jdXMge1xcclxcbiAgY3Vyc29yOiBncmFiYmluZztcXHJcXG59XFxyXFxuXFxyXFxuLmJsb2NrIHtcXHJcXG4gIHdpZHRoOiA1MHB4O1xcclxcbiAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxyXFxufVxcclxcblxcclxcbi8qIEJ1dHRvbnMgKi9cXHJcXG5cXHJcXG4uYm9hcmQtYnV0dG9ucyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgbWFyZ2luLXRvcDogNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHMgPiAucm90YXRlLWJ1dHRvbiB7XFxyXFxuICB3aWR0aDogMTNyZW07XFxyXFxuICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XFxyXFxuICBncmlkLXJvdzogNDtcXHJcXG4gIGdyaWQtY29sdW1uOiAzO1xcclxcbiAganVzdGlmeS1zZWxmOiBlbmQ7XFxyXFxuICBhbGlnbi1zZWxmOiBlbmQ7XFxyXFxufVxcclxcblxcclxcbltjbGFzcyQ9J2J1dHRvbiddIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcXHJcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICB3aWR0aDogMTByZW07XFxyXFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcclxcbiAgcGFkZGluZzogMC41cmVtIDJyZW07XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjc1cmVtO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG5bY2xhc3MkPSdidXR0b24nXTpob3ZlciB7XFxyXFxuICBvcGFjaXR5OiAwLjc1O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheS1hZ2Fpbi1idXR0b24ge1xcclxcbiAgd2lkdGg6IDEzcmVtO1xcclxcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDU3LjUlO1xcclxcbiAgbGVmdDogNTAlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTU3LjUlKTtcXHJcXG59XFxyXFxuXFxyXFxuLyogVmlzaWJpbGl0eSAqL1xcclxcblxcclxcbi5oaWRkZW4ge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIG9wYWNpdHk6IDA7XFxyXFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5jZWxsLmhpZ2hsaWdodCB7XFxyXFxuICBvcGFjaXR5OiAwLjU7XFxyXFxuICBjdXJzb3I6IGdyYWJiaW5nO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY292ZXIge1xcclxcbiAgY29sb3I6IHZhcigtLWxpZ2h0KTtcXHJcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZDogcmdiKDQ5LCAxMDYsIDEzMSk7XFxyXFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTtcXHJcXG4gIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDJweCk7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcXHJcXG4gIHotaW5kZXg6IDI7XFxyXFxuICB0cmFuc2l0aW9uOlxcclxcbiAgICBvcGFjaXR5IDAuMjVzIGVhc2UsXFxyXFxuICAgIHZpc2liaWxpdHkgMC4yNXMgZWFzZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQ2VsbCBTdHlsaW5nICovXFxyXFxuXFxyXFxuLmZpbGxlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrKTtcXHJcXG59XFxyXFxuXFxyXFxuLm5vdC1zZWxlY3RhYmxlIHtcXHJcXG4gIGN1cnNvcjogaW5pdGlhbDtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLm9uLXNlbGVjdCB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5vbi1zZWxlY3Q6aG92ZXIge1xcclxcbiAgb3BhY2l0eTogMC43NTtcXHJcXG59XFxyXFxuXFxyXFxuLm1pc3Mge1xcclxcbiAgb3BhY2l0eTogMC4yNTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY1YjViO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBMb2FkZXIgKi9cXHJcXG5cXHJcXG4ubG9hZGVyIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1uZXV0cmFsKTtcXHJcXG4gIHotaW5kZXg6IDM7XFxyXFxuICB0cmFuc2l0aW9uOlxcclxcbiAgICBvcGFjaXR5IDAuNzVzIGVhc2Utb3V0LFxcclxcbiAgICB2aXNpYmlsaXR5IDAuNzVzIGVhc2Utb3V0O1xcclxcbn1cXHJcXG5cXHJcXG4ubG9hZGVyOjpiZWZvcmUge1xcclxcbiAgY29udGVudDogJyc7XFxyXFxuICB3aWR0aDogNzVweDtcXHJcXG4gIGhlaWdodDogNzVweDtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxyXFxuICBib3JkZXI6IDE1cHggc29saWQgdmFyKC0tbGlnaHQpO1xcclxcbiAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tZGFyayk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICBhbmltYXRpb246IGxvYWRpbmcgMC43NXMgZWFzZSBpbmZpbml0ZTtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBsb2FkaW5nIHtcXHJcXG4gIGZyb20ge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwdHVybik7XFxyXFxuICB9XFxyXFxuICB0byB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDF0dXJuKTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5vcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiX2dhbWVib2FyZCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3NoaXAiLCJfcGxheWVyIiwiX2NvbXB1dGVyIiwiRE9NIiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUiLCJlIiwiV2Vha01hcCIsInIiLCJ0IiwiX19lc01vZHVsZSIsIl90eXBlb2YiLCJoYXMiLCJnZXQiLCJuIiwiX19wcm90b19fIiwiYSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImkiLCJzZXQiLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJUeXBlRXJyb3IiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibGVuZ3RoIiwibCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiZiIsIm8iLCJuZXh0IiwiZG9uZSIsInB1c2giLCJ2YWx1ZSIsImlzQXJyYXkiLCJwbGF5ZXIxVUlCb2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBsYXllcjJVSUJvYXJkIiwiY29tcFVJQm9hcmQiLCJwbGF5ZXIxIiwiZXhwb3J0cyIsIlBsYXllciIsIkdhbWVib2FyZCIsInBsYXllcjIiLCJjb21wdXRlciIsIkNvbXB1dGVyIiwic2hpcHNMZW5ndGhzIiwiY3JlYXRlU2hpcHMiLCJzaGlwcyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImZvckVhY2giLCJTaGlwIiwicmFuZG9tUGxhY2VtZW50IiwicGxheWVyIiwicGxheWVyU2hpcHMiLCJyZXNldEJvYXJkRGF0YSIsInNoaXAiLCJwbGFjZVNoaXBSYW5kb21seSIsImdhbWVib2FyZCIsImJvYXJkIiwicGxhY2VQbGF5ZXJTaGlwcyIsInNoaXBEZXRhaWxzIiwiZ2V0U2hpcERldGFpbHMiLCJwbGFjZVNoaXAiLCJ4IiwieSIsInBvc2l0aW9uIiwicGxhY2VDb21wdXRlclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsIl9sZW4iLCJlbnRpdGllcyIsIl9rZXkiLCJlbnRpdHkiLCJyZXNldEJvYXJkIiwicmVzZXRUdXJucyIsImVudGl0eTEiLCJlbnRpdHkyIiwidHVybiIsInN0YXJ0Um91bmQiLCJtb2RlIiwic3dpdGNoVHVybiIsImdldEN1cnJlbnRUdXJuIiwiY2hlY2tXaW5uZXIiLCJhbGxTaGlwc1N1bmsiLCJjb25jYXQiLCJhdHRhY2tCb2FyZCIsIm9wcG9uZW50IiwiaW1wYWN0IiwicmVjZWl2ZUF0dGFjayIsImVuZEdhbWUiLCJwbGF5IiwiZ2V0TW9kZSIsImN1cnJlbnRUdXJuIiwiY29tcHV0ZXJUdXJuIiwiX2NvbXB1dGVyJGF0dGFja0JvYXJkIiwiYXR0YWNrQm9hcmRSYW5kb21seSIsIl9jb21wdXRlciRhdHRhY2tCb2FyZDIiLCJyZXN1bHQiLCJ1cGRhdGVVSUJvYXJkIiwic2V0VGltZW91dCIsImF0dGFja0FkamFjZW50IiwibGFzdEhpdCIsIm5leHRBdHRhY2siLCJlbmhhbmNlZEF0dGFja01vZGUiLCJfbmV4dEF0dGFjayIsIm5ld1giLCJuZXdZIiwibmV3UmVzdWx0IiwiZW50aXR5MkJvYXJkIiwid2lubmVyIiwid2lubmVyQm9hcmQiLCJjb3ZlckJvYXJkIiwiaGlkZGVuQm9hcmQiLCJpbm5lclRleHQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbmNyZW1lbnRTY29yZSIsInNob3dTY29yZWJvYXJkIiwic2NvcmUiLCJzaG93UGxheUFnYWluQnRuIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJyYW5kb21EaXJlY3Rpb24iLCJwbGFjZWRTaGlwIiwib3Bwb25lbnRCb2FyZCIsImxhc3RTaGlwSGl0IiwiX2xhc3RTaGlwSGl0IiwiZGlyZWN0aW9ucyIsInhPZmZzZXQiLCJ5T2Zmc2V0IiwiX2kiLCJfZGlyZWN0aW9ucyIsIl9vcHBvbmVudEJvYXJkJGJvYXJkIiwiX2RpcmVjdGlvbnMkX2kiLCJ0YXJnZXQiLCJfYmF0dGxlc2hpcCIsImdhbWVNb2RlIiwidnNDb21wdXRlciIsInZzUDIiLCJzY29yZWJvYXJkIiwic2hpcENvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidXR0b25Db250YWluZXJzIiwicm90YXRlQnRuIiwiY2xvc2VTY29yZWJvYXJkQnRuIiwicGxheUFnYWluQnRuIiwibG9hZGVyIiwiYm9hcmRMZW5ndGgiLCJjZWxscyIsImN1cnJlbnRCb2FyZCIsImN1cnJlbnRCbG9jayIsImRyYWdnZWRTaGlwIiwic3VjY2Vzc0Ryb3AiLCJibG9ja1Bvc2l0aW9ucyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmVwYXJhdGlvblBoYXNlIiwic2V0dXBSZXNldEJ0biIsInNldHVwUmFuZG9tQnRuIiwic2V0dXBGaW5pc2hCdG4iLCJiYXR0bGVQaGFzZU9uIiwiY2xvc2UiLCJ0b2dnbGVMb2FkZXIiLCJyZW1vdmUiLCJVSUJvYXJkIiwicmVzZXRTaGlwSGFuZGxlciIsInJlc2V0Qm9hcmRzIiwicmVuZGVyQm9hcmRDZWxscyIsImFkZERyYWdFdmVudHMiLCJjb250IiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImhpZGVGaWxsZWQiLCJyZW5kZXJQbGF5ZXJCb2FyZHMiLCJ0b2dnbGVCb2FyZENvdmVycyIsImJhdHRsZVBoYXNlT2ZmIiwidG9nZ2xlIiwiZW5kUm91bmQiLCJoaWRlQWxsQm9hcmRDb3ZlcnMiLCJzY29yZTEiLCJzY29yZTIiLCJwbGF5ZXIxU2NvcmUiLCJvcHBvbmVudFNjb3JlIiwic2hvd01vZGFsIiwicmVzZXRCdG4iLCJyYW5kb21CdG4iLCJib2FyZERhdGEiLCJhZGRGaWxsZWQiLCJoaWRlQWxsU2hpcHMiLCJjYiIsImZpbmlzaEJ0biIsImFsbFNoaXBzUGxhY2VkIiwiYWxlcnQiLCJyb3RhdGVTaGlwSGFuZGxlciIsImlzSG9yaXpvbnRhbCIsImRhdGFzZXQiLCJzdHlsZSIsImZsZXhEaXJlY3Rpb24iLCJibG9jayIsIl9yZWYiLCJvZmZzZXRZIiwib2Zmc2V0WCIsImNlbGwiLCJhZGRCb2FyZENvdmVyIiwidGFyZ2V0Qm9hcmQiLCJ0ZXh0IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwidGFyZ2V0Qm9hcmRzIiwicGFyZW50RWxlbWVudCIsImJvYXJkQ292ZXJzIiwiY292ZXIiLCJ0YXJnZXRDZWxscyIsInJvdyIsImNvbCIsImRyYWdPdmVyIiwiZHJhZ0VudGVyIiwiZHJhZ0xlYXZlIiwiZHJvcFNoaXAiLCJzb21lIiwiY29udGFpbnMiLCJfbGVuMiIsIlVJQm9hcmRzIiwiX2tleTIiLCJ0b2dnbGVDb3ZlcnMiLCJ2YWxpZGF0ZUNsaWNrZWRDZWxsIiwiYWRkQ2VsbEV2ZW50cyIsImhvdmVyQ2VsbCIsImNsaWNrQ2VsbCIsInBhcnNlSW50IiwidW5jb3ZlcmVkQm9hcmQiLCJ1cGRhdGVDZWxsIiwib25jbGljayIsInRhcmdldENlbGwiLCJibG9ja3MiLCJkcmFnU3RhcnQiLCJkcmFnRW5kIiwicmVtb3ZlSGlnaGxpZ2h0cyIsImdldFRhcmdldENlbGwiLCJibG9ja1giLCJibG9ja1kiLCJjZWxsWCIsImNlbGxZIiwiYWRkVGFyZ2V0Q2VsbCIsInNpemUiLCJ2YWxpZGF0ZUNlbGxzIiwib3V0T2ZCb3VuZHMiLCJibG9ja0xlbmd0aCIsInNvcnQiLCJiIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImV2ZW50IiwiY2xpZW50WCIsImxlZnQiLCJjbGllbnRZIiwidG9wIiwiZ2hvc3QiLCJjbG9uZU5vZGUiLCJvcGFjaXR5IiwiYm9keSIsImRhdGFUcmFuc2ZlciIsInNldERyYWdJbWFnZSIsInJlbW92ZUNoaWxkIiwicHJldmVudERlZmF1bHQiLCJjbG9zZXN0Iiwic3RhcnRYIiwic3RhcnRZIiwiY3VycmVudEJsb2NrWCIsImN1cnJlbnRCbG9ja1kiLCJpc0ZpbGxlZCIsImZpcnN0VGFyZ2V0Q2VsbCIsIndpbmRvdyIsIm9ubG9hZCIsImNyZWF0ZUJvYXJkIiwiZmlsbCIsImlzT3V0T2ZCb3VuZHMiLCJkaXJlY3Rpb24iLCJfdGhpcyIsImNvb3JkaW5hdGVzIiwiX3JlZjIiLCJ2YWxpZGF0ZUF0dGFjayIsImJvYXJkQ2VsbCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9zdGVwMiR2YWx1ZSIsInNoaXBYIiwic2hpcFkiLCJoaXQiLCJpc1N1bmsiLCJlcnIiLCJldmVyeSIsInN1bmsiLCJoaXRDb3VudCJdLCJzb3VyY2VSb290IjoiIn0=