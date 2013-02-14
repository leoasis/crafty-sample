Crafty.scene('Game', function init() {
  var occupied = new Array(Game.mapGrid.tilesX);
  for (var i = 0; i < occupied.length; i++) {
    occupied[i] = new Array(Game.mapGrid.tilesY);
    for (var j = 0; j < occupied[i].length; j++) {
      occupied[i][j] = false;
    }
  }

  var player = Crafty.e('PlayerCharacter').at(5, 5);
  occupied[player.at().x][player.at().y] = true;

  for (var x = 0; x < Game.mapGrid.tilesX; x++) {
    for (var y = 0; y < Game.mapGrid.tilesY; y++) {
      var atEdge = x === 0 ||
                   x === Game.mapGrid.tilesX - 1 ||
                   y ===  0 ||
                   y === Game.mapGrid.tilesY - 1;


      var maxVillages = 5;

      if (atEdge) {
        Crafty.e('Tree').at(x, y);

      } else if (Math.random() < 0.06) {
        var bushOrRock = Math.random() > 0.3 ? 'Bush' : 'Rock';
        Crafty.e(bushOrRock).at(x, y);
      } else if (Math.random() < 0.02 && Crafty('Village').length < maxVillages) {
        Crafty.e('Village').at(x, y);
      }
    }
  }

  Crafty.audio.play('ring');

  this.showVictory = function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Victory');
    }
  };
  this.bind('VillageVisited', this.showVictory);

}, function uninit() {
  this.unbind('VillageVisited', this.showVictory);
});

Crafty.scene('Victory', function init() {
  Crafty.e('2D, DOM, Text')
    .text('All villages visited!')
    .attr({ x: 0, y: Game.height/2 - 24, w: Game.width })
    .css($textCss);

  Crafty.audio.play('applause');

  var delay = true;
  setTimeout(function() { delay = false; }, 5000);

  this.restartGame = function() {
    if (!delay)
      Crafty.scene('Game');
  };

  this.bind('KeyDown', this.restartGame);
}, function uninit() {
  this.unbind('KeyDown', this.restartGame);
});

Crafty.scene('Loading', function init() {
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height / 2 - 24, w: Game.width })
    .css($textCss);

  Crafty.load([
    'assets/16x16_forest_1.gif',
    'assets/hunter.png',
    'assets/door_knock_3x.mp3',
    'assets/door_knock_3x.ogg',
    'assets/door_knock_3x.aac',
    'assets/board_room_applause.mp3',
    'assets/board_room_applause.ogg',
    'assets/board_room_applause.aac',
    'assets/candy_dish_lid.mp3',
    'assets/candy_dish_lid.ogg',
    'assets/candy_dish_lid.aac'], function () {

    Crafty.sprite(16, 'assets/16x16_forest_2.gif', {
      spr_tree:    [0, 0],
      spr_bush:    [1, 0],
      spr_village: [0, 1],
      spr_rock:    [1, 1]
    });

    Crafty.sprite(16, 'assets/hunter.png', {
      spr_player: [0, 2]
    }, 0, 2);

    Crafty.audio.add({
      knock:     ['assets/door_knock_3x.mp3',
                  'assets/door_knock_3x.ogg',
                  'assets/door_knock_3x.aac'],
      applause:  ['assets/board_room_applause.mp3',
                  'assets/board_room_applause.ogg',
                  'assets/board_room_applause.aac'],
      ring:      ['assets/candy_dish_lid.mp3',
                  'assets/candy_dish_lid.ogg',
                  'assets/candy_dish_lid.aac']
    });

    Crafty.scene('Game');
  });
});