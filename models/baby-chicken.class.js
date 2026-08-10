/**
 * Class representing a small chicken enemy in the game.
 * Inherits from ColidableObject.
 * @extends ColidableObject
 */
class BabyChicken extends ColidableObject {
  /** @type {number} Height of the baby chicken in pixels. */
  height = 70;

  /** @type {number} Width of the baby chicken in pixels. */
  width = 70;

  /** @type {number} Y-coordinate position on the canvas. */
  y = 340;

  /** @type {number} Movement speed of the baby chicken. */
  speed = 0;

  /** @type {number} Health/energy points of the enemy. */
  energy = 10;

  /** @type {boolean} Indicates whether the enemy is dead. */
  isDead = false;

  /** @type {number} Random vertical offset for movement variation. */
  verticalOffset = 0;

  /**
   * Hitbox offsets for collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  /**
   * Image paths for the walking animation.
   * @type {string[]}
   */
  animatedWalk = [
    "./assets/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./assets/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./assets/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates an instance of BabyChicken.
   * @param {number} startX - The initial horizontal position.
   * @param {number} [bossEnergy=100] - Current boss health used to determine vertical offset.
   */
  constructor(startX, bossEnergy = 100) {
    super();
    this.loadImages(this.animatedWalk);
    this.loadImage("./assets/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = startX;
    this.speed = 5 + Math.random() * 5;
    this.verticalOffset = Math.random() * 20 - 10;
    if (bossEnergy <= 70) {
      this.y += this.verticalOffset;
    }
    this.animate();
  }

  /**
   * Starts movement and triggers animation intervals.
   * @returns {void}
   */
  animate() {
    this.moveLeft();
    setInterval(() => {
      if (world && world.isPaused) return;
      if (this.energy > 0) {
        this.playAnimation(this.animatedWalk);
      }
    }, 200);
  }

  /**
   * Handles the hit logic when the baby chicken is defeated.
   * Stops movement, sets energy to 0, updates image to dead state, and marks for removal.
   * @returns {void}
   */
  hit() {
    this.speed = 0;
    this.energy = 0;
    this.loadImage("./assets/3_enemies_chicken/chicken_small/2_dead/dead.png");
    setTimeout(() => {
      this.readyToRemove = true;
    }, 500);
  }
}
