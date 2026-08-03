class BabyChicken extends ColidableObject {
  height = 70;
  width = 70;
  y = 340;
  speed = 0;
  energy = 10;
  isDead = false;
  verticalOffset = 0;
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  animatedWalk = [
    "./assets/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./assets/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./assets/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor(startX, bossEnergy = 100) {
    super();
    this.loadImages(this.animatedWalk);
    this.loadImage("./assets/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = startX;
    this.speed = 5 + Math.random() * 5;
    this.verticalOffset = Math.random() * 20 - 10;
    if (bossEnergy <= 70) {
      this.y += this.verticalOffset;
    }
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      if (this.energy > 0) {
        this.playAnimation(this.animatedWalk);
      }
    }, 200);
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
