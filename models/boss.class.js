/**
 * Class representing the main end boss enemy in the game.
 * Controls boss movement, state phases, attack behaviors, animations, and sound triggers.
 * Inherits from ColidableObject.
 * @extends ColidableObject
 */
class Boss extends ColidableObject {
  /** @type {number} Height of the boss in pixels. */
  height = 425;

  /** @type {number} Width of the boss in pixels. */
  width = 300;

  /** @type {number} Y-coordinate position on the canvas. */
  y = 45;

  /** @type {number} Movement speed of the boss. */
  speed = 30;

  /** @type {number} Vertical velocity of the boss. */
  speedY = 0;

  /** @type {number} Current health/energy points of the boss. */
  energy = 100;

  /** @type {boolean} Indicates whether the boss is dead. */
  isDead = false;

  /** @type {boolean} Indicates whether the player has triggered the boss encounter. */
  hadFirstContact = false;

  /** @type {boolean} Indicates whether the boss has moved into its target combat position. */
  arrivedAtTarget = false;

  /** @type {boolean} Indicates whether the boss is currently performing an attack animation. */
  isAttacking = false;

  /** @type {number|null} Interval ID for spawning attack projectiles. */
  attackTimer = null;

  /** @type {boolean} Indicates whether the boss background music has started playing. */
  bossMusicStarted = false;

  /** @type {number|null} Interval ID for playing the death animation sequence. */
  deathAnimationTimer = null;

  /** @type {number} Frame duration in milliseconds for the death animation. */
  deathAnimationFrameDuration = 150;

  /** @type {number} Current index tracker for the death animation sequence. */
  deathCurrentImage = 0;

  /**
   * Image paths for walking animation.
   * @type {string[]}
   */
  animatedWalk = [
    "./assets/4_enemie_boss_chicken/1_walk/G1.png",
    "./assets/4_enemie_boss_chicken/1_walk/G2.png",
    "./assets/4_enemie_boss_chicken/1_walk/G3.png",
    "./assets/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Image paths for alert/idle state animation.
   * @type {string[]}
   */
  animatedAlert = [
    "./assets/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * Image paths for attack animation.
   * @type {string[]}
   */
  animatedAttack = [
    "./assets/4_enemie_boss_chicken/3_attack/G13.png",
    "./assets/4_enemie_boss_chicken/3_attack/G14.png",
    "./assets/4_enemie_boss_chicken/3_attack/G15.png",
    "./assets/4_enemie_boss_chicken/3_attack/G16.png",
    "./assets/4_enemie_boss_chicken/3_attack/G17.png",
    "./assets/4_enemie_boss_chicken/3_attack/G18.png",
    "./assets/4_enemie_boss_chicken/3_attack/G19.png",
    "./assets/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Image paths for flying/jump animation.
   * @type {string[]}
   */
  animatedFly = [
    "./assets/4_enemie_boss_chicken/3_attack/G17.png",
    "./assets/4_enemie_boss_chicken/3_attack/G18.png",
  ];

  /**
   * Image paths for hurt animation state.
   * @type {string[]}
   */
  animatedHurt = [
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Image paths for death sequence animation.
   * @type {string[]}
   */
  animatedDead = [
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
    "./assets/4_enemie_boss_chicken/5_dead/G24.png",
    "./assets/4_enemie_boss_chicken/5_dead/G25.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /** @type {number} Current animation frame tracker. */
  currentImage = 0;

  /**
   * Hitbox offsets for collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 60,
    bottom: 10,
    left: 50,
    right: 10,
  };

  /**
   * Creates an instance of Boss.
   * Loads initial images, sets start position, and initializes animation logic.
   */
  constructor() {
    super().loadImage(this.animatedAlert[0]);
    this.loadImages(this.animatedAlert);
    this.loadImages(this.animatedWalk);
    this.loadImages(this.animatedAttack);
    this.loadImages(this.animatedFly);
    this.loadImages(this.animatedHurt);
    this.loadImages(this.animatedDead);
    this.x = 4300;
    this.animateBoss();
  }

  /**
   * Starts the main boss animation and state loop.
   * Handles transitions between walking, alert, attacking, hurt, and death states.
   * @returns {void}
   */
  animateBoss() {
    setInterval(() => {
      if (this.isDead) {
        if (!this.deathAnimationTimer) {
          this.startDeathAnimation(this.animatedDead);
        }
        return;
      }
      if (world && world.isPaused) return;
      if (this.hadFirstContact && !this.isAttacking) {
        this.handleBossPhases();
      } else if (!this.hadFirstContact) {
        this.checkPlayerDistance();
      }
      if (this.isAttacking) {
        this.playAnimation(this.animatedAttack);
      } else if (this.energy < 100 && this.isHurt()) {
        this.playAnimation(this.animatedHurt);
      } else if (this.hadFirstContact) {
        this.playAnimation(this.animatedAlert);
      } else {
        this.playAnimation(this.animatedAlert);
      }
    }, 150);
  }

  /**
   * Checks player horizontal position to trigger first contact with the boss.
   * @returns {void}
   */
  checkPlayerDistance() {
    if (this.world && this.world.character.x > 3300 && !this.hadFirstContact) {
      this.hadFirstContact = true;
      this.playBossMusic();
    }
  }

  /**
   * Triggers the transition to boss background music.
   * @returns {void}
   */
  playBossMusic() {
    if (!this.bossMusicStarted && typeof switchToBossMusic === "function") {
      switchToBossMusic();
      this.bossMusicStarted = true;
    }
  }

  /**
   * Spawns a BabyChicken projectile enemy during an attack phase.
   * @returns {void}
   */
  shootChicken() {
    if (world && world.isPaused) return;
    this.isAttacking = true;
    if (this.world) {
      let baby = new BabyChicken(this.x, this.energy);
      this.world.level.enemies.push(baby);
      playSound(gameSounds.boss_sound);
    }
    setTimeout(() => {
      this.isAttacking = false;
    }, 850);
  }

  /**
   * Continuously moves the boss to the left at a set tick rate.
   * @returns {void}
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Manages position and transition from initial approach to attack state.
   * @returns {void}
   */
  handleBossPhases() {
    if (!this.arrivedAtTarget && this.x > 3700) {
      this.x -= this.speed;
      this.playAnimation(this.animatedWalk);
    } else {
      this.arrivedAtTarget = true;
      this.playAnimation(this.animatedAlert);
      this.startAttacking();
    }
  }

  /**
   * Initiates recurring attack interval to throw projectile enemies.
   * @returns {void}
   */
  startAttacking() {
    if (!this.attackTimer) {
      this.attackTimer = setInterval(() => {
        if (world && world.isPaused) return;
        this.shootChicken();
      }, 1500);
    }
  }

  /**
   * Reduces health, updates hit timestamp, or handles boss death state.
   * @returns {void}
   */
  hit() {
    this.energy -= 10;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
      playSound(gameSounds.boss_dead);
      this.stopBoss();
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the boss was hit recently within 0.5 seconds.
   * @returns {boolean} True if the boss is currently in a hurt state.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.5;
  }

  /**
   * Marks the boss as dead and schedules object cleanup.
   * @returns {void}
   */
  die() {
    this.isDead = true;
    setTimeout(() => {
      this.readyToRemove = true;
    }, 2000);
  }

  /**
   * Initializes and executes the frame-by-frame death animation interval.
   * @param {string[]} images - Array of image paths for the death animation.
   * @returns {void}
   */
  startDeathAnimation(images) {
    if (this.deathAnimationTimer) {
      return;
    }
    this.deathCurrentImage = 0;
    this.deathAnimationTimer = setInterval(() => {
      this.playDeathAnimation(images);
      if (this.deathCurrentImage >= images.length) {
        clearInterval(this.deathAnimationTimer);
        this.deathAnimationTimer = null;
        this.currentImage = images.length - 1;
        this.readyToRemove = true;
      }
    }, this.deathAnimationFrameDuration);
  }

  /**
   * Advances and displays individual frames of the death sequence.
   * @param {string[]} images - Array of image paths for the death animation.
   * @returns {void}
   */
  playDeathAnimation(images) {
    let i = this.deathCurrentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.deathCurrentImage++;
    if (this.deathCurrentImage >= images.length) {
      this.currentImage = images.length - 1;
      this.isDead = true;
    }
  }

  /**
   * Clears the active attack interval when the boss is defeated or stopped.
   * @returns {void}
   */
  stopBoss() {
    if (this.attackTimer) {
      clearInterval(this.attackTimer);
      this.attackTimer = null;
    }
  }
}
