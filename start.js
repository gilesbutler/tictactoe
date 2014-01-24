//
// Start a game of TicTacToe
//

var board = document.querySelector('.board'),
    ttt = new TicTacToe(board);

ttt.on('finished', function(reason) {
  console.log('Game ended. Reason: ' + reason);
});

// ttt.placeMarker('x', 0, 0);
// ttt.placeMarker('o', 1, 0);
// ttt.placeMarker('x', 0, 1);
// ttt.placeMarker('o', 2, 0);
// ttt.placeMarker('x', 0, 2); // "finished" event is trigger passing 'x'
