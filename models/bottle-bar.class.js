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

  setBottles(amount) {
    this.bottles = amount;
  }
}
