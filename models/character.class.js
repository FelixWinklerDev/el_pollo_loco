class Character extends MoveableObject {
  animatedMove = [
    "./assets/2_character_pepe/2_walk/W-21.png",
    "./assets/2_character_pepe/2_walk/W-22.png",
    "./assets/2_character_pepe/2_walk/W-23.png",
    "./assets/2_character_pepe/2_walk/W-24.png",
    "./assets/2_character_pepe/2_walk/W-25.png",
    "./assets/2_character_pepe/2_walk/W-26.png",
  ];
  currentImage = 0;
  speed = 3.5;
  world;

  constructor() {
    super();
    this.loadImage("./assets/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.animatedMove);

    this.x = 10;
    this.y = 140;
    this.width = 240;
    this.height = 300;
    this.animatedMoveRight();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.mirrored = false;
      }

      if (this.world.keyboard.A && this.x > 0) {
        this.x -= this.speed;
        this.mirrored = true;
      }
      this.world.camera_x = -this.x - 1;
    }, 1000 / 60);
  }

  animatedMoveRight() {
    setInterval(() => {
      if (this.world.keyboard.D || this.world.keyboard.A) {
        this.playAnimation(this.animatedMove);
      }
    }, 115);
  }

  jump() {
    console.log("jump");
  }
}
