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
    setInterval(() => {
      this.checkCollision();
      this.checkBottleCollision();
      this.checkEnemyCollisions();
      this.checkThrowItemCollisions();
    }, 100);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.collidingHitbox(enemy) && enemy.energy > 0) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.health);
      }
      if (enemy.isDead) {
        this.level.enemies.splice(index, 1);
      }
    });
  }

  checkBottleCollision() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.collidingHitbox(bottle)) {
        this.character.collectBottle();
        this.level.bottles.splice(index, 1);
        this.bottleCounter.setBottles(this.character.bottleAmount);
      }
    });
  }

  checkThrowItemCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.energy > 0 && bottle.collidingHitbox(enemy)) {
          this.bottleHit(enemy, bottle);
        }
      });
    });
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.collidingHitbox(enemy) && enemy.energy > 0) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.health);
      }
    });
  }

  bottleHit(enemy, bottle) {
    if (enemy instanceof Boss) {
      enemy.hit(20);
    } else {
      enemy.hit(10);
    }
    this.removeThrowableObject(bottle);
  }

  removeThrowableObject(bottle) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(bottle);
      if (index !== -1) {
        this.throwableObjects.splice(index, 1);
      }
    });
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
