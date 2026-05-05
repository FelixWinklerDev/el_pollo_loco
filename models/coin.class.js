class Coin extends MoveableObject {
  animatedCoin = ["./assets/8_coin/coin_1.png", "./assets/8_coin/coin_2.png"];
  width = 100;
  height = 100;

  offset = {
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
  };

  constructor(x, y) {
    super().loadImage("./assets/8_coin/coin_1.png");
    this.loadImages(this.animatedCoin);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.animatedCoin);
    }, 300);
  }
}
