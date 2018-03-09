var playerToken;
var computerToken;
var playersTurn;
var gameOver = false;
var playerWon = false;
var draw = false;
var winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

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
    $('#grid-container').css('display', 'grid');
    newGame();
  });

  function newGame() {
    board = ['','','','','','','','',''];
    gameOver = false;
    draw = false;
    playerWon = false;
    for (var i = 0; i < board.length; i++) {
      $(`#${i + 1}`).text('\xa0');
    }
    if (playersTurn == false) computerPick(8);
    $('.grid-item').unbind('click').bind('click', turn);
  }

  function turn(playersTurn) {
    if (gameOver == true || board[Number($(this).attr('id')) - 1] == computerToken || board[Number($(this).attr('id')) - 1] == playerToken) return;
    board[Number($(this).attr('id')) - 1] = playerToken;
    $(this).text(board[Number($(this).attr('id')) - 1]);
    $(this).css('font-weight', 'bold');
    if (won() || board.every(e => e != '')) {
      gameComplete()
      return;
    }
    computerPick(Number($(this).attr('id')) - 1);
    return false;
  }

  function computerPick(playerMove) {
    var pick;
    var canWin = false;
    var playerCanWin = false;
    var winPick;
    var playerWinPick;
    var a = `${playerToken},,,,,,,,`;
    var b = `,${playerToken},,,,,,,`;
    var c = `,,${playerToken},,,,,,`;
    var d = `,,,${playerToken},,,,,`;
    var e = `,,,,${playerToken},,,,`;
    var f = `,,,,,${playerToken},,,`;
    var g = `,,,,,,${playerToken},,`;
    var h = `,,,,,,,${playerToken},`;
    var i = `,,,,,,,,${playerToken}`;

    for (var i = 0; i < winPatterns.length; i++) {
      if (board[winPatterns[i][0]] == '' && board[winPatterns[i][1]] == computerToken && board[winPatterns[i][2]] == computerToken) {
        winPick = winPatterns[i][0];
        canWin = true;
      } else if (board[winPatterns[i][0]] == computerToken && board[winPatterns[i][1]] == '' && board[winPatterns[i][2]] == computerToken) {
        winPick = winPatterns[i][1];
        canWin = true;
      } else if (board[winPatterns[i][0]] == computerToken && board[winPatterns[i][1]] == computerToken && board[winPatterns[i][2]] == '') {
        winPick = winPatterns[i][2];
        canWin = true;
      }
    }

    for (var i = 0; i < winPatterns.length; i++) {
      if (board[winPatterns[i][0]] == '' && board[winPatterns[i][1]] == playerToken && board[winPatterns[i][2]] == playerToken) {
        playerWinPick = winPatterns[i][0];
        playerCanWin = true;
      } else if (board[winPatterns[i][0]] == playerToken && board[winPatterns[i][1]] == '' && board[winPatterns[i][2]] == playerToken) {
        playerWinPick = winPatterns[i][1];
        playerCanWin = true;
      } else if (board[winPatterns[i][0]] == playerToken && board[winPatterns[i][1]] == playerToken && board[winPatterns[i][2]] == '') {
        playerWinPick = winPatterns[i][2];
        playerCanWin = true;
      }
    }

    if (board.toString() == ',,,,,,,,') pick = 0;
    else if (board.toString() == e) {
      do {
        pick = Math.floor(Math.random() * 9);
      } while (pick != 0 && pick != 2 && pick != 6 && pick != 8);
    } else if (board[4] == '') {
      pick = 4;
    } else if (board.toString() == `${computerToken},,,,${playerToken},,,,`) pick = 8;
    else if (canWin == true) pick = winPick;
    else if (playerCanWin == true) pick = playerWinPick;
    else if (playerMove == 0 && board[8] == '') pick = 8;
    else if (playerMove == 1 && board[7] == '') pick = 7;
    else if (playerMove == 2 && board[6] == '') pick = 6;
    else if (playerMove == 3 && board[5] == '') pick = 5;
    else if (playerMove == 4) {
      do {
        pick = Math.floor(Math.random() * 9);
      } while (board[pick] != '');
    } else if (playerMove == 5 && board[3] == '') pick = 3;
    else if (playerMove == 6 && board[2] == '') pick = 2;
    else if (playerMove == 7 && board[1] == '') pick = 1;
    else if (playerMove == 8 && board[0] == '') pick = 0;
    else {
      do {
        pick = Math.floor(Math.random() * 9);
      } while (board[pick] != '');
    }

    board[pick] = computerToken;
    $(`#${pick + 1}`).text(board[pick]);
    $(`#${pick + 1}`).css('font-weight', 'normal');
    canWin = false;
    playerCanWin = false;
    if (won() || board.every(e => e != '')) {
      gameComplete()
      return;
    }
  }

  function gameComplete() {
    gameOver = true;
    if (playerWon) console.log('you won!');
    else if (board.every(e => e != '')) console.log('it was a draw!');
    else console.log('you lost!');
    playersTurn = !playersTurn;
    setTimeout(function() {
      $('#line').css('display', 'none');
      newGame();
    }, 1500);
  }

  function won() {
    for (var i = 0; i < winPatterns.length; i++) {
      if (board[winPatterns[i][0]] == playerToken && board[winPatterns[i][1]] == playerToken && board[winPatterns[i][2]] == playerToken) {
        playerWon = true;
        drawLine(i);
        return true;
      } else if (board[winPatterns[i][0]] == computerToken && board[winPatterns[i][1]] == computerToken && board[winPatterns[i][2]] == computerToken) {
        playerWon = false;
        drawLine(i);
        return true;
      }
    }
  }

  function drawLine(num) {
    var rotation = 0;
    var translationX = 0;
    var translationY = 0;
    if (num == 0) {
      rotation = 0;
      translationX = 0;
      translationY = '-10vw';
    } else if (num == 1) {
      rotation = 0;
      translationX = 0;
      translationY = 0;
    } else if (num == 2) {
      rotation = 0;
      translationX = 0;
      translationY = '10vw';
    } else if (num == 3) {
      rotation = '90deg';
      translationX = 0;
      translationY = '10vw';
    } else if (num == 4) {
      rotation = '90deg';
      translationX = 0;
      translationY = 0;
    } else if (num == 5) {
      rotation = '90deg';
      translationX = 0;
      translationY = '-10vw';
    } else if (num == 6) {
      rotation = '45deg';
      translationX = 0;
      translationY = 0;
    } else {
      rotation = '-45deg';
      translationX = 0;
      translationY = 0;
    }
    $('#line').css({'display': 'block', 'transform': 'rotate(' + rotation + ') translateX(' + translationX + ')  translateY(' + translationY + ')'});
  }

});
