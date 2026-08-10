/**
 * Main game engine class responsible for canvas rendering, game loop management,
 * camera tracking, collision detection, object lifecycle, and UI/overlay states.
 */
class World {
  /** @type {Character} Player character instance. */
  character = new Character();
  /** @type {Level} Current level containing enemies, background layers, and collectibles. */
  level = level1;
  /** @type {HTMLCanvasElement} Canvas element used for rendering. */
  canvas;
  /** @type {CanvasRenderingContext2D} 2D rendering context for the canvas. */
  ctx;
  /** @type {Keyboard} Input tracking manager instance. */
  keyboard;
  /** @type {number} Camera horizontal translation offset. */
  camera_x = 0;
  /** @type {Healthbar} Player health status bar UI element. */
  statusBar = new Healthbar();
  /** @type {BottleCounter} Collected bottles UI counter element. */
  bottleCounter = new BottleCounter();
  /** @type {CoinCounter} Collected coins UI counter element. */
  coinCounter = new CoinCounter();
  /** @type {ThrowableObject[]} Active throwable bottle objects currently in the world. */
  throwableObjects = [];
  /** @type {BossHealthbar} Boss health status bar UI element. */
  bossHealth = new BossHealthbar();
  /** @type {HTMLImageElement} Preloaded image displayed upon winning the game. */
  winScreen = new Image();
  /** @type {HTMLImageElement} Preloaded image displayed upon losing the game. */
  loseScreen = new Image();
  /** @type {number|null} Interval ID for game state and collision checks. */
  checkInterval;
  /** @type {number|null} Handle for the active `requestAnimationFrame` loop. */
  animationFrameId;
  /** @type {boolean} State flag indicating whether the victory or defeat screen is currently active. */
  endScreenShown = false;
  /** @type {boolean} State flag indicating if the game loop and interactions are paused. */
  isPaused = false;
  /**
   * Initializes the game world, sets up canvas contexts, preloads end-game graphics, and starts checks and draw loops.
   * @param {HTMLCanvasElement} canvas - Target rendering canvas element.
   * @param {Keyboard} keyboard - Input state tracker instance.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.winScreen.src = "./assets/you_won_you_lost/you_win_b.png";
    this.loseScreen.src =
      "./assets/9_intro_outro_screens/game_over/oh_no_you_lost!.png";
    this.gameWon = false;
    this.gameLost = false;
    this.runChecks();
  }

  /**
   * Assigns a reference of this World instance to the character and boss entities.
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Boss) {
        enemy.world = this;
      }
    });
  }

  /**
   * Pauses world execution and resets character idle/snoring timers.
   * @returns {void}
   */
  pause() {
    this.isPaused = true;
    stopSnoring();
    if (this.character) {
      clearTimeout(this.character.idleTimer);
      this.character.idleSoundStarted = false;
    }
  }

  /**
   * Resumes world execution and restarts character idle tracking.
   * @returns {void}
   */
  resume() {
    this.isPaused = false;
    if (this.character) {
      this.character.resetIdleTimer();
    }
  }

  /**
   * Toggles between paused and active game states.
   * @returns {void}
   */
  togglePause() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  /**
   * Starts a high-frequency interval timer to run collision detection, entity cleanup, and end-game condition checks.
   * @returns {void}
   */
  runChecks() {
    this.runInterval = setInterval(() => {
      if (this.isPaused) return;
      this.checkCollision();
      this.checkBottleCollision();
      this.checkThrowItemCollisions();
      this.checkCoinCollision();
      this.checkBossDeath();
      this.checkGameOver();
    }, 25);
  }

  /**
   * Checks collisions between the player character and active enemies, resolving stomps or player damage.
   * @returns {void}
   */
  checkCollision() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];
      if (this.character.collidingHitbox(enemy) && enemy.energy > 0) {
        const isStomped = this.handleCharacterEnemyCollision(enemy);
        if (isStomped) {
          break;
        }
      }
      if (enemy.readyToRemove) {
        this.level.enemies.splice(i, 1);
      }
    }
  }

  /**
   * Processes the result of a character-enemy collision (either landing a stomp or receiving damage).
   * @param {DrawableObject} enemy - Target enemy entity.
   * @returns {boolean} True if the enemy was stomped, false if player took damage.
   */
  handleCharacterEnemyCollision(enemy) {
    if (this.stomped(enemy)) {
      enemy.hit();
      this.character.speedY = 15;
      this.character.lastHit = new Date().getTime();
      playSound(gameSounds.bounce_sound);
      return true;
    }
    if (!this.character.getDamage()) {
      this.character.hit();
      playSound(gameSounds.pepe_hurt);
      this.statusBar.setPercentage(this.character.health);
    }
    return false;
  }

  /**
   * Determines if the player character is currently landing on top of an enemy from above.
   * @param {DrawableObject} enemy - Target enemy entity.
   * @returns {boolean} True if the collision condition qualifies as a stomp landing.
   */
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

  /**
   * Detects collisions between the character and ground bottle items for collection.
   * @returns {void}
   */
  checkBottleCollision() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.collidingHitbox(bottle)) {
        this.character.collectBottle();
        playSound(gameSounds.bottle_sound);
        this.level.bottles.splice(index, 1);
        this.bottleCounter.setBottles(this.character.bottleAmount);
      }
    });
  }

  /**
   * Checks for collisions between thrown salsa bottles and active enemies.
   * @returns {void}
   */
  checkThrowItemCollisions() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isSplashing || bottle.readyToRemove) {
        return;
      }
      this.level.enemies.forEach((enemy) => {
        if (enemy.energy > 0 && bottle.collidingHitbox(enemy)) {
          this.bottleHit(enemy, bottle);
          playSound(gameSounds.bottle_break);
        }
      });
    });
  }

  /**
   * Applies damage to an enemy struck by a bottle and triggers splash animations and UI updates.
   * @param {DrawableObject} enemy - Enemy struck by the projectile.
   * @param {ThrowableObject} bottle - Thrown bottle projectile object.
   * @returns {void}
   */
  bottleHit(enemy, bottle) {
    enemy.hit(10);
    if (enemy instanceof Boss) {
      this.bossHealth.setPercentage(enemy.energy);
      playSound(gameSounds.boss_hit);
    } else {
      playSound(gameSounds.chicken_death);
    }
    bottle.startSplash();
    this.removeThrowableObject(bottle, 300);
  }

  /**
   * Schedules or executes the removal of a throwable object from the world array.
   * @param {ThrowableObject} bottle - Target throwable object to remove.
   * @param {number} [delay=0] - Optional delay in milliseconds before removal.
   * @returns {void}
   */
  removeThrowableObject(bottle, delay = 0) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(bottle);
      if (index !== -1) {
        this.throwableObjects.splice(index, 1);
      }
    }, delay);
  }

  /**
   * Detects character collisions with collectible coins in the world.
   * @returns {void}
   */
  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.collidingHitbox(coin)) {
        this.character.collectCoin();
        playSound(gameSounds.coin_sound);
        this.level.coins.splice(index, 1);
        this.coinCounter.coinAmount(this.character.coinAmount);
      }
    });
  }

  /**
   * Evaluates whether the boss enemy has been defeated to trigger win sequence.
   * @returns {void}
   */
  checkBossDeath() {
    let boss = this.level.enemies.find((e) => e instanceof Boss);
    if (boss && boss.isDead && !this.gameWon) {
      this.gameWon = true;
      setTimeout(() => {
        stopSnoring();
        playWinMusic();
        this.stopGame();
      }, 2000);
    }
  }

  /**
   * Evaluates player health state to trigger game over sequence upon death.
   * @returns {void}
   */
  checkGameOver() {
    if (this.character.health <= 0 && !this.gameLost) {
      stopSnoring();
      this.gameLost = true;
      setTimeout(() => {
        playGameOverMusic();
        this.stopGame();
      }, 2000);
    }
  }

  /**
   * Renders the game over or victory background and overlay graphics onto the canvas context.
   * @returns {void}
   */
  drawEndScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let roundedCameraX = Math.round(this.camera_x);
    this.ctx.translate(roundedCameraX, 0);
    this.addObjectsToMap(this.level.background);
    this.ctx.translate(-roundedCameraX, 0);
    let img = this.gameWon ? this.winScreen : this.loseScreen;
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Primary animation rendering loop. Clears canvas, translates camera offsets, and draws all entities and UI.
   * @returns {void}
   */
  draw() {
    if (this.endScreenShown) {
      this.drawEndScreen();
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let roundedCameraX = Math.round(this.camera_x);
    this.ctx.translate(roundedCameraX, 0);
    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.cloud);
    this.ctx.translate(-roundedCameraX, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleCounter);
    this.addToMap(this.coinCounter);
    if (this.bossTriggered()) {
      this.addToMap(this.bossHealth);
    }
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    if (this.isPaused) {
      this.drawPauseScreen();
    }
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws an individual drawable object onto the canvas context, handling horizontal flipping when mirrored.
   * @param {DrawableObject} mo - Movable or drawable object instance.
   * @returns {void}
   */
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

  /**
   * Iterates through an array of drawable objects and renders each to the canvas.
   * @param {DrawableObject[]} object - Array of drawable object instances.
   * @returns {void}
   */
  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Checks whether the boss encounter has been initiated by proximity.
   * @returns {boolean} True if the boss first contact state is active.
   */
  bossTriggered() {
    let boss = this.level.enemies.find((e) => e instanceof Boss);
    return boss && boss.hadFirstContact;
  }

  /**
   * Halts game animation loops, clears intervals, and renders end screen graphics.
   * @returns {void}
   */
  stopGame() {
    this.endScreenShown = true;
    cancelAnimationFrame(this.animationFrameId);
    clearInterval(this.runInterval);
    if (this.gameWon || this.gameLost) this.drawEndScreen();
  }

  /**
   * Renders a semi-transparent dark overlay with pause text over the canvas.
   * @returns {void}
   */
  drawPauseScreen() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "50px Rye-Regular";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("PAUSE", this.canvas.width / 2, this.canvas.height / 2);
  }
}
