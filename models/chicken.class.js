/**
 * Class representing a standard chicken enemy in the game.
 * Handles movement, walk animation, and hit/death state.
 * Inherits from ColidableObject.
 * @extends ColidableObject
 */
class Chicken extends ColidableObject {
  /** @type {number} Height of the chicken in pixels. */
  height = 100;

  /** @type {number} Width of the chicken in pixels. */
  width = 80;

  /** @type {number} Y-coordinate position on the canvas. */
  y = 340;

  /** @type {number} Health/energy points of the chicken. */
  energy = 10;

  /**
   * Image paths for the walking animation.
   * @type {string[]}
   */
  animatedMove = [
    "./assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  /** @type {number} Frame index tracker for animation loops. */
  currentImage = 0;

  /**
   * Creates an instance of Chicken.
   * Loads images, sets the horizontal position, calculates a randomized movement speed, and starts animations.
   * @param {number} x - The horizontal position on the canvas.
   */
  constructor(x) {
    super();
    this.loadImages(this.animatedMove);
    this.loadImage("./assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = x;
    this.speed = 1.5 + Math.random() * 0.45;
    this.enemyMoveAnimation();
  }

  /**
   * Triggers leftward movement and starts the frame interval for playing the walk animation.
   * @returns {void}
   */
  enemyMoveAnimation() {
    this.moveLeft();
    setInterval(() => {
      if (world && world.isPaused) return;
      if (this.energy > 0) {
        this.playAnimation(this.animatedMove);
      }
    }, 200);
  }

  /**
   * Handles defeat logic when the chicken is hit.
   * Stops movement, changes sprite to dead state, and marks the object for removal after 500ms.
   * @returns {void}
   */
  hit() {
    this.speed = 0;
    this.energy = 0;
    this.loadImage("./assets/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    setTimeout(() => {
      this.readyToRemove = true;
    }, 500);
  }
}
