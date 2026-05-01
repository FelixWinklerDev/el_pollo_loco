class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Healthbar();
  bottleCounter = new BottleCounter();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runChecks();
  }

  setWorld() {
    this.character.world = this;
  }

  runChecks() {
    this.checkCollision();
    this.checkBottleCollision();
  }

  checkCollision() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.collidingHitbox(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.health);
        }
      });
    }, 200);
  }

  checkBottleCollision() {
    setInterval(() => {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.collidingHitbox(bottle)) {
          this.character.collectBottle();
          this.level.bottles.splice(index, 1);
          this.bottleCounter.setBottles(this.character.bottleAmount);
        }
      });
    }, 50);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.cloud);
    this.ctx.translate(-this.camera_x, 0);
    // ---------- Space for fixed Objects ----------
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleCounter);
    // ---------- Back to normal -------------------
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
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
    if (mo.showHitbox) {
      mo.showHitbox(this.ctx);
    }
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
