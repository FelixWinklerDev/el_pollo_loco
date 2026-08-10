/**
 * Class representing the character's health bar UI component.
 * Dynamically updates its sprite asset based on current health percentage.
 * Inherits from Statusbar.
 * @extends Statusbar
 */
class Healthbar extends Statusbar {
  /** 
   * Image paths representing various health percentage stages (0% to 100%).
   * @type {string[]} 
   */
  healthbarImages = [
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /** @type {number} Current health percentage (0-100). */
  percentage = 100;

  /**
   * Creates an instance of Healthbar.
   * Sets default positioning, preloads statusbar images, and initializes at 100% health.
   */
  constructor() {
    super();
    this.x = 10;
    this.y = 0;
    this.height = 50;
    this.width = 150;
    this.loadImages(this.healthbarImages);
    this.setPercentage(100);
  }

  /**
   * Updates the health percentage and switches the rendered image to match the new value.
   * @param {number} percentage - The updated health percentage (0-100).
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.healthbarImages[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Maps current health percentage value to the corresponding image array index.
   * @returns {number} The array index (0 to 5) of the matching status bar image asset.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
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
