class ThrowableObject extends ColidableObject {
  animateThrow = [
    "./assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage(this.animateThrow[0]);
    this.loadImages(this.animateThrow);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
