class CoinCounter extends Statusbar {
  coins = 0;

  constructor() {
    super();
    this.loadImage("./assets/7_statusbars/3_icons/icon_coin.png");
    this.x = 310;
    this.y = 0;
    this.width = 50;
    this.height = 50;
  }

  coinAmount(amount) {
    this.coins = amount;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.coins, this.x + 50, this.y + 38);
  }
}
