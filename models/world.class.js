class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Healthbar();
  bottleCounter = new BottleCounter();
  coinCounter = new CoinCounter();
  throwableObjects = [];
  bossHealth = new BossHealthbar();
  winScreen = new Image();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runChecks();
    this.winScreen.src = "./assets/You won, you lost/You Win A.png";
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Boss) {
        enemy.world = this;
      }
    });
  }

  runChecks() {
    setInterval(() => {
      this.checkCollision();
      this.checkBottleCollision();
      this.checkThrowItemCollisions();
      this.checkCoinCollision();
      this.checkBottleOutOfCam();
      this.checkBossDeath();
    }, 50);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.collidingHitbox(enemy) && enemy.energy > 0) {
        this.handleCharacterEnemyCollision(enemy);
      }
      if (enemy.isDead) {
        this.level.enemies.splice(index, 1);
      }
    });
  }

  handleCharacterEnemyCollision(enemy) {
    if (this.stomped(enemy)) {
      enemy.hit();
      this.character.speedY = 15;
      return;
    }
    if (!this.character.getDamage()) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.health);
    }
  }

  stomped(enemy) {
    const charLeft = this.character.x + this.character.offset.left;
    const charRight =
      this.character.x + this.character.width - this.character.offset.right;
    const charBottom =
      this.character.y + this.character.height - this.character.offset.bottom;
    const enemyLeft = enemy.x + enemy.offset.left;
    const enemyRight = enemy.x + enemy.width - enemy.offset.right;
    const enemyTop = enemy.y + enemy.offset.top;
    const isFalling = this.character.speedY < 0;
    const isDirectlyOver = charLeft < enemyRight && charRight > enemyLeft;
    const isStomp = charBottom >= enemyTop && charBottom <= enemyTop + 20;
    return isFalling && isDirectlyOver && isStomp;
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

  bottleHit(enemy, bottle) {
    enemy.hit(10);
    if (enemy instanceof Boss) {
      this.bossHealth.setPercentage(enemy.energy);
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

  checkBottleOutOfCam() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.x > -this.camera_x + 720 || bottle.x < -this.camera_x - 100) {
        this.removeThrowableObject(bottle);
      }
    });
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.collidingHitbox(coin)) {
        this.character.collectCoin();
        this.level.coins.splice(index, 1);
        this.coinCounter.coinAmount(this.character.coinAmount);
      }
    });
  }

  checkBossDeath() {
    let boss = this.level.enemies.find((e) => e instanceof Boss);
    if (boss && boss.isDead) {
      setTimeout(() => {
        this.showWinScreen();
      }, 2000);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.cloud);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleCounter);
    this.addToMap(this.coinCounter);
    if (this.bossTriggered()) {
      this.addToMap(this.bossHealth);
    }
    if (this.gameWon) {
      this.ctx.drawImage(
        this.winImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height,
      );
    }
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
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

  bossTriggered() {
    let boss = this.level.enemies.find((e) => e instanceof Boss);
    return boss && boss.hadFirstContact;
  }

  showWinScreen() {
    this.stopGame();
    document.getElementById("winningScreen").classList.remove("d-none");
  }

  stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}
