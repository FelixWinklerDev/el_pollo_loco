class Chicken extends MoveableObject {
  height = 100;
  width = 80;
  y = 340;

  constructor() {
    super().loadImage(
      "./assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    );
    this.x = 600 + Math.random() * 500;
  }
}
