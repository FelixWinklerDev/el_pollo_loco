/**
 * Class representing the end boss health status bar in the game UI.
 * Inherits from Statusbar.
 * @extends Statusbar
 */
class BossHealthbar extends Statusbar {
  /**
   * Image paths for the boss health bar stages.
   * @type {string[]}
   */
  healthbarImages = [
    "./assets/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./assets/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./assets/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./assets/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./assets/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "./assets/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /** @type {number} Current health percentage (0-100). */
  percentage = 100;

  /**
   * Creates an instance of BossHealthbar.
   * Sets dimensions, position, and loads initial assets.
   */
  constructor() {
    super();
    this.x = 560;
    this.y = 0;
    this.height = 50;
    this.width = 150;
    this.loadImages(this.healthbarImages);
    this.setPercentage(100);
  }

  /**
   * Updates the health percentage and changes the displayed status bar image accordingly.
   * @param {number} percentage - The new health percentage value.
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.healthbarImages[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on the current health percentage.
   * @returns {number} The index corresponding to the healthbar image (0 to 5).
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
