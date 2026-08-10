/**
 * Class representing a collectible coin item in the game world.
 * Features an idle animation loop and hit-box offset dimensions.
 * Inherits from MoveableObject.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
  /**
   * Image paths for the coin shining/spinning animation.
   * @type {string[]}
   */
  animatedCoin = ["./assets/8_coin/coin_1.png", "./assets/8_coin/coin_2.png"];

  /** @type {number} Width of the coin in pixels. */
  width = 100;

  /** @type {number} Height of the coin in pixels. */
  height = 100;

  /**
   * Hitbox offsets for collision detection padding.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  };

  /**
   * Creates an instance of Coin.
   * Loads animation frames, positions the coin, and starts the animation loop.
   * @param {number} x - Horizontal position on the canvas.
   * @param {number} y - Vertical position on the canvas.
   */
  constructor(x, y) {
    super().loadImage("./assets/8_coin/coin_1.png");
    this.loadImages(this.animatedCoin);
    this.x = x;
    this.y = y;
    this.animate();
  }

/**
   * Starts a repetitive interval to cycle through the coin animation frames.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.animatedCoin);
    }, 300);
  }
}
