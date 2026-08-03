class ThrowableObject extends ColidableObject {
  animateThrow = [
    "./assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  animateSplash = [
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(this.animateThrow[0]);
    this.loadImages(this.animateThrow);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 30;
    this.throw();
  }

  throw() {
    setInterval(() => {
      this.x += 15;
    }, 1000 / 25);
    setInterval(() => {
      this.playAnimation(this.animateThrow);
    }, 25);
  }
}
