/**
 * Class representing a background cloud object in the game world.
 * Drifts continuously to the left with randomized starting coordinates.
 * Inherits from MoveableObject.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
  /** @type {number} Height of the cloud in pixels. */
  height = 250;

  /** @type {number} Width of the cloud in pixels. */
  width = 400;

  /**
   * Creates an instance of Cloud.
   * Loads image asset, sets randomized spawn positions, and starts horizontal movement.
   * @param {string} imagePath - Path to the cloud image asset.
   */
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = -100 + Math.random() * 1000 + Math.random() * 1000;
    this.y = -5 + Math.random() * 100;
    this.moveFrame();
  }

  /**
   * Initiates cloud movement frames.
   * @returns {void}
   */
  moveFrame() {
    this.moveLeft();
  }

  /**
   * Continuously moves the cloud to the left at a standard frame rate (60 FPS).
   * @returns {void}
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
