class Character extends MoveableObject {
  constructor() {
    super().loadImage("./assets/2_character_pepe/2_walk/W-21.png");
    this.x = 10;
    this.y = 140;
    this.width = 240;
    this.height = 300;
  }

  jump() {
    console.log("jump");
  }
}
