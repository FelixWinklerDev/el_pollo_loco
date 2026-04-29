class Coinbar extends Statusbar {
  coinImage = "./assets/7_statusbars/3_icons/icon_coin.png";

  counter = 0

  constructor() {
    super();
    this.x = 360;
    this.y = 0;
    this.height = 50;
    this.width = 150;
    this.loadImages(this.coinImage);
    this.countingCoins(0)
  }

  countingCoins(value) {
    this.counter = value;
    
  }
}
