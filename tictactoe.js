//
//  TicTacToe Class
//

// Create the class
var TicTacToe = function(board) {

  // Get the board
  this.board = board;

  // Bind the move event
  this.bindEvents();
}

// Bind Events
TicTacToe.prototype.bindEvents = function() {
  // Bind the move event
  this.board.addEventListener('move', this.checkScore.bind(this));

  // Bind the cell click event
  this.board.addEventListener('click', this.takeTurn.bind(this));

  // Bind the finished event
  this.board.addEventListener('finished', this.finish.bind(this));

  // Bind the reset event
  document.querySelector('.reset').addEventListener('click', this.reset.bind(this));
}

// Take Turn
TicTacToe.prototype.takeTurn = function(event) {
  if (this.checkClass(event.target, 'cell') && !this.checkClass(this.board, 'finished')) {
    if (this.canMoveTo(event.target)) {
      this.placeMarker(this.data.turn, event.target.dataset.row, event.target.dataset.col, this, event.target);
    }
  }
}

// Keep the score
TicTacToe.prototype.data = {
  xScore    : [],
  oScore    : [],
  turnCount : 0,
  turn      : 'x'
}

// Positions player's marker in a cell of the grid
// - symbol can be "x" or "o",
// - row and column can be an integer from 0 to 2.
TicTacToe.prototype.placeMarker = function(symbol, row, column, self, cell) {

  // Make the cell active
  cell.className += ' active';

  // Mark the cell with the symbol
  cell.querySelector('.' + symbol).className += ' active';

  // Trigger the move event
  self.trigger('move', { symbol: symbol, row: row, column: column, cell: cell });
}

// Indicates whether any symbol can be moved to (cell)
// Returns true if (celll) is not occupied by another symbol
TicTacToe.prototype.canMoveTo = function(cell) {
  if (!this.checkClass(cell, 'active')) {
    return true;
  }
}

// Trigger an event
TicTacToe.prototype.trigger = function(event, options) {
  // Create the event
  var e = new CustomEvent(event, { 'detail': options });
  // Dispatch the event
  this.board.dispatchEvent(e);
}

// Listen for events
TicTacToe.prototype.on = function(eventName, callback) {
  // Listen for an event
  this.board.addEventListener(eventName, function(e) {
    // Make sure the callback is a function
    if (typeof callback === "function") {
        callback(e.detail);
    }
  });
}

// Check the score
TicTacToe.prototype.checkScore = function(options) {

  var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  // Increment the score
  if (options.detail.symbol === 'x') {
    this.data.xScore.push(options.detail.cell.dataset.cell);
  } else {
    this.data.oScore.push(options.detail.cell.dataset.cell);
  }

  for (i in winningCombinations) {
    if (winningCombinations[i].sort().toString() == this.data.xScore.sort().toString()) {
      this.trigger('finished', 'x won');
      alert('x won');
      break;
    }

    if (winningCombinations[i].sort().toString() == this.data.oScore.sort().toString()) {
      this.trigger('finished', 'o won');
      alert('o won');
      break;
    }
  }

  if (this.data.turnCount === 8) {
    this.trigger('finished', 'draw');
    alert('Draw');
  }

  // Increment the turn count
  this.data.turnCount++;

  // Change Player
  this.changePlayer();

}

TicTacToe.prototype.changePlayer = function() {
  if (this.data.turn === 'x') {
    this.data.turn = 'o';
  } else {
    this.data.turn = 'x';
  }
}

TicTacToe.prototype.finish = function() {
  this.board.className += ' finished';
}

TicTacToe.prototype.reset = function() {
  this.board.className = 'board';

  // Clear the board
  var activeCells = this.board.querySelectorAll('.active');

  for (var i = 0; i < activeCells.length; i++) {
    activeCells[i].className = activeCells[i].className.replace(' active','');
  }

  // Reset the game
  this.data.xScore    = [];
  this.data.oScore    = [];
  this.data.turnCount = 0;
  this.data.turn      = 'x';

}


// Check for CSS class
TicTacToe.prototype.checkClass = function(el, class_to_match) {
  var c;
  if (el && el.className && typeof class_to_match === "string") {
      c = el.getAttribute("class");
      c = " "+ c + " ";
      return c.indexOf(" " + class_to_match + " ") > -1;
  } else {
      return false;
  }
}