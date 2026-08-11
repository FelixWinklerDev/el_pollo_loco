/**
 * Class representing the main playable character in the game.
 * Manages player controls, animations (walking, jumping, idle, long idle, hurt, death),
 * inventory, camera tracking, gravity, and throwable objects.
 * Inherits from ColidableObject.
 * @extends ColidableObject
 */
class Character extends ColidableObject {
  /**
   * Image paths for standard idle animation.
   * @type {string[]}
   */
  animateIdle = [
    "./assets/2_character_pepe/1_idle/idle/I-1.png",
    "./assets/2_character_pepe/1_idle/idle/I-2.png",
    "./assets/2_character_pepe/1_idle/idle/I-3.png",
    "./assets/2_character_pepe/1_idle/idle/I-4.png",
    "./assets/2_character_pepe/1_idle/idle/I-5.png",
    "./assets/2_character_pepe/1_idle/idle/I-6.png",
    "./assets/2_character_pepe/1_idle/idle/I-7.png",
    "./assets/2_character_pepe/1_idle/idle/I-8.png",
    "./assets/2_character_pepe/1_idle/idle/I-9.png",
  ];

  /**
   * Image paths for long idle/sleeping animation.
   * @type {string[]}
   */
  animateLongIdle = [
    "./assets/2_character_pepe/1_idle/long_idle/I-11.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-12.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-13.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-14.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-15.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-16.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-17.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-18.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-19.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Image paths for walking animation.
   * @type {string[]}
   */
  animatedMove = [
    "./assets/2_character_pepe/2_walk/W-21.png",
    "./assets/2_character_pepe/2_walk/W-22.png",
    "./assets/2_character_pepe/2_walk/W-23.png",
    "./assets/2_character_pepe/2_walk/W-24.png",
    "./assets/2_character_pepe/2_walk/W-25.png",
    "./assets/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Image paths for jump animation.
   * @type {string[]}
   */
  animatedJump = [
    "./assets/2_character_pepe/3_jump/J-31.png",
    "./assets/2_character_pepe/3_jump/J-32.png",
    "./assets/2_character_pepe/3_jump/J-33.png",
    "./assets/2_character_pepe/3_jump/J-34.png",
    "./assets/2_character_pepe/3_jump/J-35.png",
    "./assets/2_character_pepe/3_jump/J-36.png",
    "./assets/2_character_pepe/3_jump/J-37.png",
    "./assets/2_character_pepe/3_jump/J-38.png",
    "./assets/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Image paths for death animation sequence.
   * @type {string[]}
   */
  animatedDeath = [
    "./assets/2_character_pepe/5_dead/D-51.png",
    "./assets/2_character_pepe/5_dead/D-52.png",
    "./assets/2_character_pepe/5_dead/D-53.png",
    "./assets/2_character_pepe/5_dead/D-54.png",
    "./assets/2_character_pepe/5_dead/D-55.png",
    "./assets/2_character_pepe/5_dead/D-56.png",
    "./assets/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Image paths for taking damage animation.
   * @type {string[]}
   */
  animatedDamage = [
    "./assets/2_character_pepe/4_hurt/H-41.png",
    "./assets/2_character_pepe/4_hurt/H-42.png",
    "./assets/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {number} Index tracking current frame in animation loops. */
  currentImage = 0;

  /** @type {number} Movement speed of the character. */
  speed = 6.5;

  /** @type {Object} Reference to the world instance. */
  world;

  /** @type {boolean} Indicates whether the jump animation has started playing. */
  jumpAnimationPlayed = false;

  /** @type {boolean} Indicates whether the death animation has completed. */
  deathAnimationPlayed = false;

  /** @type {boolean} Prevents repeating the initial death sequence trigger. */
  deathSequenceStarted = false;

  /** @type {number} Timestamp (in ms) of the last bottle throw. */
  lastThrow = 0;

  /** @type {number|null} Timeout ID for triggering long idle state. */
  idleTimer = null;

  /** @type {boolean} Tracks whether snoring audio is playing. */
  idleSoundStarted = false;

  /** @type {boolean} Indicates if long idle mode is active. */
  longIdleActive = false;

  /**
   * Hitbox offsets for collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 120,
    bottom: 10,
    left: 70,
    right: 70,
  };

  /** @type {number} Current count of collected salsa bottles. */
  bottleAmount = 0;

  /** @type {number} Current count of collected coins. */
  coinAmount = 0;

  /** @type {number} Timestamp (in ms) of the last registered user action. */
  lastAction = 0;

  /**
   * Creates an instance of Character.
   * Loads initial assets, sets dimensions/spawn point, applies physics, and starts movement loops.
   */
  constructor() {
    super();
    this.loadImage("./assets/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.animatedMove);
    this.loadImages(this.animatedJump);
    this.loadImages(this.animatedDeath);
    this.loadImages(this.animatedDamage);
    this.loadImages(this.animateIdle);
    this.loadImages(this.animateLongIdle);
    this.x = 10;
    this.y = 140;
    this.width = 240;
    this.height = 300;
    this.airAnimate();
    this.applyGravity();
    this.animate();
  }

  /**
   * Handles character movement inputs, damage movement, and camera updates.
   * @returns {void}
   */
  handleCharacterMovement() {
    setInterval(() => {
      if (this.world?.isPaused || this.deathSequenceStarted) return;
      if (this.isDead()) {
        this.deathSequenceStarted = true;
        return this.playDeathSequence();
      }
      if (this.getDamage()) return this.handleDamageMovement();

      this.handleInputActions();
      this.world.camera_x = -this.x - 3;
    }, 1000 / 60);
  }

  /**
   * Processes movement and action key presses.
   * @returns {void}
   */
  handleInputActions() {
    const k = this.world.keyboard;
    if (k.D && this.x < this.world.level.level_end_x) this.characterMoveRight();
    if (k.A && this.x > 0) this.characterMoveLeft();
    if (k.W && !this.isInAir()) this.jump();
    if (k.E && this.bottleAmount > 0) this.throwBottle();
    if (k.A || k.D || k.W || k.E) this.resetIdleTimer();
  }

  /**
   * Handles movement when taking damage.
   * @returns {void}
   */
  handleDamageMovement() {
    const k = this.world.keyboard;
    if (k.D && this.x < this.world.level.level_end_x)
      this.x += this.speed * 0.6;
    if (k.A && this.x > 0) this.x -= this.speed * 0.6;
    this.world.camera_x = -this.x - 5;
  }

  /**
   * Handles rendering loops for sprite animations.
   * @returns {void}
   */
  handleCharacterAnimations() {
    setInterval(() => {
      if (this.world?.isPaused) return;
      if (this.isInAir()) this.playAnimation(this.animatedJump);
      else if (this.getDamage()) this.playAnimation(this.animatedDamage);
      else if (this.world.keyboard.A || this.world.keyboard.D)
        this.playAnimation(this.animatedMove);
      else if (this.isLongIdle()) this.playAnimation(this.animateLongIdle);
      else this.handleIdleAnimations();
    }, 180);
  }

  /**
   * Initializes main game loops for input checks, movement, camera updates, and visual state rendering.
   * @returns {void}
   */
  animate() {
    this.resetIdleTimer();
    this.handleCharacterMovement();
    this.handleCharacterAnimations();
  }

  /**
   * Overrides parent hit method to register damage and reset the inactivity timer.
   * @returns {void}
   */
  hit() {
    super.hit();
    this.resetIdleTimer();
  }

  /**
   * Resets inactivity timers and schedules long idle state after 5 seconds.
   * @returns {void}
   */
  resetIdleTimer() {
    this.stopIdleState();
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => this.triggerLongIdle(), 5000);
  }

  /**
   * Stops idle snoring audio and resets activity flags.
   * @returns {void}
   */
  stopIdleState() {
    this.lastAction = Date.now();
    this.longIdleActive = false;
    if (this.idleSoundStarted) {
      stopSnoring();
      this.idleSoundStarted = false;
    }
  }

  /**
   * Checks if the game is in an active state for idle animations.
   * @returns {boolean}
   */
  isGameActive() {
    return (
      this.world &&
      !this.world.isPaused &&
      !this.world.gameLost &&
      !this.world.gameWon &&
      !this.isDead()
    );
  }

  /**
   * Triggers long idle state and plays snoring audio if active.
   * @returns {void}
   */
  triggerLongIdle() {
    if (!this.isGameActive()) return;
    this.longIdleActive = true;
    if (!this.idleSoundStarted) {
      this.idleSoundStarted = true;
      playSound(gameSounds.pepe_idle);
    }
  }

  /**
   * Evaluates if character should be in long idle state based on activity and air/damage flags.
   * @returns {boolean} True if long idle is active without air/damage interference.
   */
  isLongIdle() {
    return this.longIdleActive && !this.isInAir() && !this.getDamage();
  }

  /**
   * Manages jump/aerial animation states and ground transition resets.
   * @returns {void}
   */
  airAnimate() {
    setInterval(() => {
      if (this.world && this.world.isPaused) return;
      if (this.isInAir()) {
        if (!this.jumpAnimationPlayed) {
          this.currentImage = 0;
          this.jumpAnimationPlayed = true;
        }
        if (this.currentImage < this.animatedJump.length) {
          this.playAnimation(this.animatedJump);
        }
      } else {
        this.jumpAnimationPlayed = false;
        if (this.world.keyboard.D || this.world.keyboard.A) {
          this.playAnimation(this.animatedMove);
        }
      }
    }, 180);
  }

  /**
   * Plays standard idle animation.
   * @returns {void}
   */
  handleIdleAnimations() {
    this.playAnimation(this.animateIdle);
  }

  /**
   * Plays character death animation sequence before executing final knockback jump.
   * @returns {void}
   */
  playDeathSequence() {
    let deathFrame = 0;
    let deathInterval = setInterval(() => {
      if (deathFrame < this.animatedDeath.length) {
        this.playAnimation(this.animatedDeath);
        deathFrame++;
        playSound(gameSounds.pepe_death);
      } else {
        clearInterval(deathInterval);
        this.deathJumpUp();
      }
    }, 100);
  }

  /**
   * Applies vertical velocity boost to make the character fall off-screen upon death.
   * @returns {void}
   */
  deathJumpUp() {
    this.speedY = 25;
    let fallInterval = setInterval(() => {
      this.y -= this.speedY;
      this.speedY -= 1.5;
      if (this.y > 500) {
        this.y = 500;
        clearInterval(fallInterval);
      }
    }, 1000 / 25);
  }

  /**
   * Increments bottle count up to a maximum limit of 15.
   * @returns {void}
   */
  collectBottle() {
    if (this.bottleAmount < 15) {
      this.bottleAmount++;
    }
  }

  /**
   * Increments coin count up to a maximum limit of 100.
   * @returns {void}
   */
  collectCoin() {
    if (this.coinAmount < 100) {
      this.coinAmount++;
    }
  }

  /**
   * Instantiates a new ThrowableObject (bottle) with initial velocity and updates inventory UI.
   * Enforces a cooldown period between throws.
   * @returns {void}
   */
  throwBottle() {
    const now = Date.now();
    if (now - this.lastThrow < 700) return;
    this.lastThrow = now;
    const startX = this.mirrored ? this.x + 20 : this.x + this.width - 60;
    const startY = this.y + 160;
    let bottle = new ThrowableObject(startX, startY);
    bottle.speedX = this.mirrored ? -10 : 10;
    bottle.speedY = -12;
    bottle.applyGravity();
    this.world.throwableObjects.push(bottle);
    this.bottleAmount--;
    this.world.bottleCounter.setBottles(this.bottleAmount);
  }
}
