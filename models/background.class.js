/**
 * Class representing a background layer/object in the game world.
 * Inherits from MoveableObject.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
  /** @type {number} Width of the background image in pixels. */
  width = 720;

  /** @type {number} Height of the background image in pixels. */
  height = 480;

  /**
   * Creates an instance of BackgroundObject.
   * @param {string} imagePath - Path to the background image asset.
   * @param {number} x - The horizontal position on the canvas.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
