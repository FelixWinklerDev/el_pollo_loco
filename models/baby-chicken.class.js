class BabyChicken extends ColidableObject {
  height = 50;
  width = 50;
  y = 350;
  speed = 4;
  energy = 10;

  animatedWalk = [
    "./assets/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./assets/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./assets/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor(startX) {
    super().loadImage(this.animatedWalk[0]);
    this.loadImages(this.animatedWalk);
    this.x = startX;
    this.speed = 5 + Math.random() * 5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.x -= this.speed;
      }
    }, 1000 / 60);
    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.animatedWalk);
      }
    }, 50);
  }

  hit() {
    this.speed = 0;
    this.energy = 0;
    this.loadImage("./assets/3_enemies_chicken/chicken_small/2_dead/dead.png");
    setTimeout(() => {
      this.readyToRemove = true;
    }, 500);
  }
}
