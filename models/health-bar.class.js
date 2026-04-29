class Healthbar extends Statusbar {
  healthbarImages = [
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.x = 10;
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
