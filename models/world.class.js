class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollision();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollision() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.collidingHitbox(enemy)) {
          this.character.health -= 10;
        }
      });
    }, 200);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.cloud);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    if (mo.mirrored) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    mo.draw(this.ctx);
    mo.showHitbox(this.ctx);
    if (mo.mirrored) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }
}
