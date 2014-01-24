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
  this.board.addEventListener('move', TicTacToe.prototype.checkScore.bind(this));

  // Bind the cell click event
  this.board.addEventListener('click', TicTacToe.prototype.takeTurn.bind(this));
}

// Take Turn
TicTacToe.prototype.takeTurn = function(event) {
  if (TicTacToe.prototype.checkClass(event.target, 'cell')) {
    var symbol = 'x';
    TicTacToe.prototype.placeMarker(symbol, event.target.dataset.row, event.target.dataset.col, this);
  }
}

// Keep the score
TicTacToe.prototype.scores = {
  xScore    : [],
  oScore    : [],
  turnCount : 0
}

// Positions player's marker in a cell of the grid
// - symbol can be "x" or "o",
// - row and column can be an integer from 0 to 2.
TicTacToe.prototype.placeMarker = function(symbol, row, column, self) {

  // Find the correct location on the board
  var cell = document.querySelector('.cell-' + row + '-' + column);

  // Check if we can select the cell
  if (!this.canMoveTo(cell)) {
    cell.querySelector('.' + symbol).className += 'active';
  }

  // Trigger the move event
  self.trigger('move', { symbol: symbol, row: row, column: column });

}

// Indicates whether any symbol can be moved to (cell)
// Returns true if (celll) is not occupied by another symbol
TicTacToe.prototype.canMoveTo = function(cell) {
  if (this.checkClass(cell, 'active')) {
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

  var winningCombinations = [
    [0, 0, 0, 1, 0, 2],
    [1, 0, 1, 1, 1, 2],
    [2, 0, 2, 1, 2, 2],
    [0 ,0, 1, 0, 2, 0],
    [0, 1, 1, 1, 2, 1],
    [0, 2, 1, 2, 2, 2],
    [0, 0, 1, 1, 2, 2],
    [0, 2, 1, 1, 2, 0]
  ];

  if (options.detail.symbol === 'x') {
    this.scores.xScore.push(options.detail.row, options.detail.column);
  } else {
    this.scores.oScore.push(options.detail.row, options.detail.column);
  }

  for (i in winningCombinations) {
    if (winningCombinations[i].sort().toString() == this.scores.xScore.sort().toString()) {
      this.trigger('finished', 'x won');
      break;
    }
    if (winningCombinations[i].sort().toString() == this.scores.oScore.sort().toString()) {
      this.board.trigger('finished', 'o won');
      break;
    }
    // console.log(this.scores.turnCount);
    // if (this.scores.turnCount === 8) {
    //   this.board.trigger('finished', 'draw');
    // }
    // this.scores.turnCount++;
  }

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