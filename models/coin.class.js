class Coin extends DrawableObject {
  animatedCoin = [
    "./assets/8_coin/coin_1.png",
    "./assets/8_coin/coin_2.png"
  ]
  width = 100;
  height = 100;

  offset = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  };

  constructor(x, y) {
    super();
    this.loadImages(this.animatedCoin);
    this.x = x;
    this.y = y;
  }
}
