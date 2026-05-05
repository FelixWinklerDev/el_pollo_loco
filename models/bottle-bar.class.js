class BottleCounter extends Statusbar {
  bottles = 0;

  constructor() {
    super();
    this.x = 0;
    this.y = 50;
    this.width = 50;
    this.height = 50;
    this.loadImage("./assets/6_salsa_bottle/salsa_bottle.png");
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.bottles, this.x + 50, this.y + 39);
  }

  setBottles(amount) {
    this.bottles = amount;
  }
}
