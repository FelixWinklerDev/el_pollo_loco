/**
 * Class representing a thrown projectile item (salsa bottle) in the game.
 * Manages trajectory, gravity application upon fall, collision impact splash animations, and cleanup lifecycle.
 * Inherits from ColidableObject.
 * @extends ColidableObject
 */
class ThrowableObject extends ColidableObject {
  /**
   * Image paths for the rotating bottle flight animation.
   * @type {string[]}
   */
  animateThrow = [
    "./assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Image paths for the splash animation on impact.
   * @type {string[]}
   */
  animateSplash = [
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /** @type {boolean} State flag indicating if the bottle has impacted and is splashing. */
  isSplashing = false;

  /** @type {boolean} State flag indicating if the bottle has begun its downward arc under gravity. */
  isFalling = false;

  /** @type {number|null} ID handle for the trajectory interval timer. */
  throwInterval = null;

  /** @type {number|null} ID handle for the sprite frame animation interval timer. */
  animationInterval = null;

  /** @type {number|null} Timeout handle for splash duration control. */
  splashTimeout = null;

  /** @type {number} Duration of the splash animation state in milliseconds. */
  splashDuration = 500;

  /**
   * Creates an instance of ThrowableObject.
   * Preloads flight and splash animations, initializes position and size parameters, and triggers the throw sequence.
   * @param {number} x - Initial horizontal position on the canvas.
   * @param {number} y - Initial vertical position on the canvas.
   */
  constructor(x, y) {
    super().loadImage(this.animateThrow[0]);
    this.loadImages(this.animateThrow);
    this.loadImages(this.animateSplash);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 0;
    this.acceleration = 0.25;
    this.throw();
  }

  /**
   * Initiates horizontal movement, schedules gravity application after an initial delay, and starts frame rotation/splash animation loops.
   * @returns {void}
   */
  throw() {
    this.throwInterval = setInterval(() => {
      if (world && world.isPaused) return;
      if (!this.isSplashing) {
        this.x += 15;
        if (this.isFalling && !this.isInAir()) {
          this.startSplash();
        }
      }
    }, 1000 / 25);
    setTimeout(() => {
      if (world && world.isPaused) return;
      if (!this.isSplashing) {
        this.isFalling = true;
        this.applyGravity();
      }
    }, 800);
    this.animationInterval = setInterval(() => {
      if (world && world.isPaused) return;
      if (this.isSplashing) {
        this.playAnimation(this.animateSplash);
      } else {
        this.playAnimation(this.animateThrow);
      }
    }, 25);
  }

  /**
   * Stops trajectory timers, transitions state to splashing, plays splash frames, and marks the object for removal when finished.
   * @returns {void}
   */
  startSplash() {
    if (this.isSplashing) {
      return;
    }
    this.isSplashing = true;
    this.currentImage = 0;
    if (this.throwInterval) {
      clearInterval(this.throwInterval);
      this.throwInterval = null;
    }
    setTimeout(() => {
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
        this.animationInterval = null;
      }
      this.readyToRemove = true;
    }, this.splashDuration);
  }

  /**
   * Checks if the bottle is above ground height threshold.
   * Overrides ColidableObject's `isInAir` threshold specific to thrown objects (y < 360).
   * @override
   * @returns {boolean} True if the bottle is in the air, false if it hit ground level.
   */
  isInAir() {
    return this.y < 360;
  }
}
