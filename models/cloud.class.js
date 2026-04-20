class Cloud extends MoveableObject {
  y = 0;
  height = 100;
  width = 200;

  constructor() {
    super().loadImage("./assets/5_background/layers/4_clouds/1.png");
    this.x = 50 + Math.random() * 500;
  }
}
