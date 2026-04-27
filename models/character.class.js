class Character extends MoveableObject {
  animatedMove = [
    "./assets/2_character_pepe/2_walk/W-21.png",
    "./assets/2_character_pepe/2_walk/W-22.png",
    "./assets/2_character_pepe/2_walk/W-23.png",
    "./assets/2_character_pepe/2_walk/W-24.png",
    "./assets/2_character_pepe/2_walk/W-25.png",
    "./assets/2_character_pepe/2_walk/W-26.png",
  ];

  animatedJump = [
    "./assets/2_character_pepe/3_jump/J-31.png",
    "./assets/2_character_pepe/3_jump/J-32.png",
    "./assets/2_character_pepe/3_jump/J-33.png",
    "./assets/2_character_pepe/3_jump/J-34.png",
    "./assets/2_character_pepe/3_jump/J-35.png",
    "./assets/2_character_pepe/3_jump/J-36.png",
    "./assets/2_character_pepe/3_jump/J-37.png",
    "./assets/2_character_pepe/3_jump/J-38.png",
    "./assets/2_character_pepe/3_jump/J-39.png",
  ];
  currentImage = 0;
  speed = 3.5;
  world;

  constructor() {
    super();
    this.loadImage("./assets/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.animatedMove);
    this.loadImages(this.animatedJump);

    this.x = 10;
    this.y = 140;
    this.width = 240;
    this.height = 300;
    this.animatedMoveRight();
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
        this.characterMoveRight();
      }
      if (this.world.keyboard.W && !this.isInAir()) {
        this.jump();
      }
      if (this.world.keyboard.A && this.x > 0) {
        this.characterMoveLeft();
      }
      this.world.camera_x = -this.x - 1;
    }, 1000 / 60);
  }

  animatedMoveRight() {
    setInterval(() => {
      if (this.isInAir()) {
        this.playAnimation(this.animatedJump);
      }

      if (this.world.keyboard.D || this.world.keyboard.A) {
        this.playAnimation(this.animatedMove);
      }
    }, 115);
  }
}
