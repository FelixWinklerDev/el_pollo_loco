/**
 * Class representing a game level layout.
 * Stores entities and environment layers, including enemies, background elements, interactive items, and boundary limits.
 */
class Level {
  /** @type {ColidableObject[]} Array of enemy entities present in the level. */
  enemies;

  /** @type {Cloud[]} Array of cloud objects rendered in the level. */
  cloud;

  /** @type {BackgroundObject[]} Array of background objects establishing the scene environment. */
  background;

  /** @type {ThrowableObject[]|Object[]} Array of collectible bottle objects placed in the level. */
  bottles;

  /** @type {Coin[]} Array of collectible coin objects placed in the level. */
  coins;

  /** @type {number} The horizontal boundary (x-coordinate) marking the end of the level. */
  level_end_x = 3550;

  /**
   * Creates an instance of Level.
   * @param {ColidableObject[]} enemies - List of enemy objects.
   * @param {Cloud[]} cloud - List of cloud environment objects.
   * @param {Object[]} bottles - List of collectible bottle items.
   * @param {Coin[]} coins - List of collectible coin items.
   * @param {BackgroundObject[]} background - List of background layer objects.
   */
  constructor(enemies, cloud, bottles, coins, background) {
    this.enemies = enemies;
    this.cloud = cloud;
    this.bottles = bottles;
    this.coins = coins;
    this.background = background;
  }
}
