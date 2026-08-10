/**
 * Class representing the bottle inventory counter in the game UI.
 * Renders the bottle icon and current count on the canvas.
 * @extends Statusbar
 */
class BottleCounter extends Statusbar {
  /** @type {number} Current count of collected bottles. */
  bottles = 0;

  /**
   * Creates an instance of BottleCounter.
   * Sets default position, dimensions, and loads the bottle icon asset.
   */
  constructor() {
    super();
    this.x = 0;
    this.y = 50;
    this.width = 50;
    this.height = 50;
    this.loadImage("./assets/6_salsa_bottle/salsa_bottle.png");
  }

  /**
   * Draws the bottle icon and current bottle count onto the canvas.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.bottles, this.x + 50, this.y + 39);
  }

  /**
   * Updates the bottle count.
   * @param {number} amount - The new number of bottles.
   * @returns {void}
   */
  setBottles(amount) {
    this.bottles = amount;
  }
}
