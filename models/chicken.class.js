class Chicken extends MoveableObject {
  constructor() {
    super().loadImage(
      "./assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    );
    this.x = 100 + Math.random() * 500;
    this.y = 80;
  }
}
