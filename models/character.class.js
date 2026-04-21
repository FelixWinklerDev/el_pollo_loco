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
  speed = 3;
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
      if (this.world.keyboard.D) {
        this.x += this.speed;
      }

      if (this.world.keyboard.A) {
        this.x -= this.speed;
      }
    }, 1000 / 60);
  }

  animatedMoveRight() {
    setInterval(() => {
      if (this.world.keyboard.D) {
        let i = this.currentImage % this.animatedMove.length;
        let path = this.animatedMove[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 115);
  }

  jump() {
    console.log("jump");
  }
}
