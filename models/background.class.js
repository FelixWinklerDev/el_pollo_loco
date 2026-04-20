class BackgroundObject extends MoveableObject {
  y = 0;
  height = 100;
  width = 200;

  constructor(imagePath) {
    super().loadImage(imagePath);
  }
}
