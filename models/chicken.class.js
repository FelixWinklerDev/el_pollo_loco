class Chicken extends MoveableObject {
  height = 100;
  width = 80;
  y = 340;
  animatedMove = [
    "./assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  currentImage = 0;

  constructor() {
    super();
    this.loadImages(this.animatedMove);
    this.loadImage("./assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 600 + Math.random() * 500;
    this.speed = 0.3 + Math.random() * 0.25;
    this.enemyMoveAnimation();
  }

  enemyMoveAnimation() {
    this.moveLeft();
    setInterval(() => {
      let i = this.currentImage % this.animatedMove.length;
      let path = this.animatedMove[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }
}
