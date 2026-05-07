class BossHealthbar extends Statusbar {
  healthbarImages = [
    "./assets/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./assets/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./assets/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./assets/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./assets/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "./assets/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.x = 560;
    this.y = 0;
    this.height = 50;
    this.width = 150;
    this.loadImages(this.healthbarImages);
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    let path = this.healthbarImages[this.resolveImageIndex()];
    this.percentage = percentage;
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
