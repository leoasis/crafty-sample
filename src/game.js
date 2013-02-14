Game = {
  mapGrid: {
    tilesX: 24,
    tilesY: 16,
    tile: {
      width: 16,
      height: 16
    }
  },

  get width() {
    return this.mapGrid.tilesX * this.mapGrid.tile.width;
  },

  get height() {
    return this.mapGrid.tilesY * this.mapGrid.tile.height;
  },

  start: function() {
    Crafty.init(this.width, this.height);
    Crafty.background('rgb(87, 109, 20)');

    Crafty.scene('Loading');
  }
};

$textCss = {
  'font-size': '24px',
  'font-family': 'Arial',
  'color': 'white',
  'text-align': 'center'
};
