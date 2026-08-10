/**
 * Base class extending DrawableObject to support movement speed properties
 * and dynamic sprite animation cycling from preloaded image caches.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
  /** @type {number} Movement speed value. */
  speed = 0.1;

  /**
   * Cycles through an array of image paths to play a continuous sprite animation.
   * Retrieves image objects directly from the preloaded `imageCache`.
   * @param {string[]} images - Array of image file paths used for the animation frames.
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
