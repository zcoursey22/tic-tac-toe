var playerToken;
var computerToken;
var playersTurn;
var gameOver = false;

$(function() {

  $('.choice-button').click(function() {
    playerToken = $(this).text();
    if (playerToken === 'X') {
      computerToken = 'O';
      playersTurn = true;
    } else {
      computerToken = 'X';
      playersTurn = false;
    }
    $('#choice').css('display', 'none');
    $('#grid-container').css('display', 'block');
    newGame();
  });

  function newGame() {
    board = ['','','','','','','','',''];
    gameOver = false;
    for (var i = 0; i < board.length; i++) {
      $(`#${i + 1}`).text('\xa0');
    }
    if (playersTurn == false) computerPick();
    $('.grid-item').unbind('click').bind('click', turn);
  }

  function turn(playersTurn) {
    if (gameOver == true || board[Number($(this).attr('id')) - 1] == computerToken) return;
    board[Number($(this).attr('id')) - 1] = playerToken;
    $(this).text(board[Number($(this).attr('id')) - 1]);
    if (board.every(e => e != '')) {
      gameComplete()
      return;
    }
    computerPick();
    return false;
  }

  function computerPick() {
    var pick;
    do {
      pick = Math.floor(Math.random() * 9);
    } while (board[pick] !== '');
    board[pick] = computerToken;
    $(`#${pick + 1}`).text(board[pick]);
    if (board.every(e => e != '')) {
      gameComplete()
      return;
    }
  }

  function gameComplete() {
    gameOver = true;
    playersTurn = !playersTurn;
    var tokenCopy = playerToken;
    playerToken = computerToken;
    computerToken = tokenCopy;
    setTimeout(function() {
      newGame();
    }, 1000);
  }

});
