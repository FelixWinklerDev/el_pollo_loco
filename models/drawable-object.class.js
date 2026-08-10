/**
 * Base class representing a renderable object in the game canvas.
 * Manages spatial positioning, single image loading, image caching, and rendering.
 */
class DrawableObject {
  /** @type {number} Horizontal position on the canvas in pixels. */
  x = 20;

  /** @type {number} Vertical position on the canvas in pixels. */
  y = 20;

  /** @type {HTMLImageElement} Current active image element rendered on canvas. */
  img;

  /** @type {Object.<string, HTMLImageElement>} Cache mapping file paths to loaded Image objects. */
  imageCache = {};

  /** @type {number} Current frame index tracker for sprite animations. */
  currentImage = 0;

  /**
   * Instantiates and assigns a single image asset to `img`.
   * @param {string} path - The relative or absolute file path to the image asset.
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads multiple image assets and stores them in `imageCache` for smooth animation transitions.
   * @param {string[]} arr - Array of file paths to image assets.
   * @returns {void}
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Renders the current image onto the provided 2D canvas context using the object's spatial parameters.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
