/**
 * Class representing the coin inventory counter in the game UI.
 * Renders the coin icon and current count on the canvas.
 * @extends Statusbar
 */
class CoinCounter extends Statusbar {
  /** @type {number} Current count of collected coins. */
  coins = 0;

  /**
   * Creates an instance of CoinCounter.
   * Loads the coin icon asset and sets default position and dimensions.
   */
  constructor() {
    super();
    this.loadImage("./assets/7_statusbars/3_icons/icon_coin.png");
    this.x = 310;
    this.y = 0;
    this.width = 50;
    this.height = 50;
  }

  /**
   * Updates the tracked coin amount.
   * @param {number} amount - The new number of coins.
   * @returns {void}
   */
  coinAmount(amount) {
    this.coins = amount;
  }

  /**
   * Draws the coin icon and current coin count onto the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.coins, this.x + 50, this.y + 38);
  }
}
