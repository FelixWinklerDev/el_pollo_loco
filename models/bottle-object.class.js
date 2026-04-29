class Bottle extends ColidableObject {
  height = 80;
  width = 60;

  bottles = 0;

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 200 + Math.random() * 2000;
    this.y = 340;
  }
}
