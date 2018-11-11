//========
// Bomb
//========

"use strict";

function Bomb(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites[g_playerSprites];
    this.nextSprite = g_playerSprites + 1;

    this.scale = this.scale || 1;
};

Bomb.prototype = new Entity();

// Initial, inheritable, default values
Bomb.prototype.rotation = 0;
Bomb.prototype.cx;
Bomb.prototype.cy;

// lifespan of explosion
Bomb.prototype.ctdTimer = (2000 / NOMINAL_UPDATE_INTERVAL);
Bomb.prototype.explosionTime = (2000 / NOMINAL_UPDATE_INTERVAL);
Bomb.prototype.explTimer = Bomb.prototype.explosionTime;

Bomb.prototype.update = function(du) {

    //spatialManager.unregister(this);

    this.ctdTimer -= du;

    if(this.ctdTimer < 0) {
        this.explTimer -= du;
        this.sprite = g_sprites[this.nextSprite];
        this.nextSprite = g_explOffset + (Math.floor(
            g_explSprites - this.explTimer/this.explosionTime * g_explSprites
            ) % g_explSprites);
    }

    if(this.explTimer <= 0) {
        return entityManager.KILL_ME_NOW;
    }
    
    //spatialManager.register(this);
};

Bomb.prototype.render = function(ctx) {
    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};