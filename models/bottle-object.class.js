/**
 * Class representing a collectible bottle item on the ground.
 * Inherits from ColidableObject.
 * @extends ColidableObject
 */
class Bottle extends ColidableObject {
  /** @type {number} Height of the bottle in pixels. */
  height = 80;

  /** @type {number} Width of the bottle in pixels. */
  width = 60;

  /**
   * Creates an instance of Bottle.
   * Sets the image asset and initializes a randomized horizontal spawn position.
   * @param {string} imagePath - Path to the bottle image asset.
   */
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 200 + Math.random() * 2000;
    this.y = 350;
  }
}