class Cloud extends MoveableObject {
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 10 + Math.random() * 200;
    this.y = 0 + Math.random() * 100;
    this.height = 250;
    this.width = 400;
    this.moveFrame();
  }
  moveFrame() {
    setInterval(() => {
      this.x -= 0.1;
    }, 1000 / 60);
  }
}
