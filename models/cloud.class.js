class Cloud extends MoveableObject {
  height = 250;
  width = 400;

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 50 + Math.random() * 1000;
    this.y = 5 + Math.random() * 100;
    this.moveFrame();
  }

  moveFrame() {
    this.moveLeft();
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
