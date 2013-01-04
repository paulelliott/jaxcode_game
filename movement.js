$(function() {
  var $map = $('#map'),
      $cells = $map.find('td'),
      $monsterCounter = $('#monster_count');

  Keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
  }

  //starting point
  moveTo(0);

  //monsters
  for (i = 0; i < 5; i++) {
    $cells.filter(":eq(" + randomCellIndex() + ")").addClass('monster');
  }
  $monsterCounter.text($('.monster').length);

  //movement handling
  $('body').on('keyup', function(e) {
    var $playerCell = playerCell(),
        loc = $cells.index($playerCell);

    if (e.which == Keys.UP) {
      moveTo(loc - 5);
    } else if (e.which == Keys.DOWN) {
      moveTo(loc + 5);
    } else if (e.which == Keys.LEFT) {
      moveTo(loc - 1);
    } else if (e.which == Keys.RIGHT) {
      moveTo(loc + 1);
    }
  });

  function moveTo(index) {
    $cells.text('').removeClass('player');
    $cells.filter(":eq(" + index + ")").addClass('player').text('P');
    battle();
  }

  function battle() {
    var $playerCell = playerCell();
    if ($playerCell.hasClass('monster')) {
      $playerCell.removeClass('monster');
      if (randomRoll() > randomRoll()) {
        $playerCell.text('VICTORY');
      } else {
        $playerCell.text('DEFEAT');
        $cells.filter(":eq(" + randomCellIndex() + ")").addClass('monster');
      }
      $monsterCounter.text($('.monster').length);
      if ($('.monster').length == 0) { $map.fadeOut() }
    }
  }

  function randomRoll() {
    return Math.floor(Math.random() * 100);
  }

  function randomCellIndex() {
    return Math.floor(Math.random() * 100) % 25;
  }

  function playerCell() {
    return $cells.filter('td.player');
  }
});
