Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.mapGrid.tile.width,
      h: Game.mapGrid.tile.height
    });
  },

  at: function(x, y) {
    if (arguments.length === 0) {
      return { x: this.x / this.w, y: this.y / this.h };
    } else {
      this.attr({ x: x * this.w, y: y * this.h });
      return this;
    }
  }
});

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  }
});

Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Solid, spr_tree');
  }
});

Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Solid, spr_bush');
  }
});

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Solid, spr_rock');
  }
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
      .fourway(1)
      .onHit('Solid', this.stopMovement)
      .onHit('Village', this.visitVillage)
      .animate('^', 0, 0, 2)
      .animate('>', 0, 1, 2)
      .animate('v', 0, 2, 2)
      .animate('<', 0, 3, 2);

    var animationSpeed = 4;
    this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('>', animationSpeed, -1);
      } else if (data.x < 0) {
        this.animate('<', animationSpeed, -1);
      } else if (data.y > 0) {
        this.animate('v', animationSpeed, -1);
      } else if (data.y < 0) {
        this.animate('^', animationSpeed, -1);
      } else {
        this.stop();
      }
    });
  },

  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  visitVillage: function(data) {
    var village = data[0].obj;
    village.collect();
  }
});

Crafty.c('Village', {
  init: function() {
    this.requires('Actor, spr_village');
  },

  collect: function() {
    this.destroy();
    Crafty.audio.play('knock');
    Crafty.trigger('VillageVisited', this);
  }
});