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

  isSplashing = false;
  isFalling = false;
  throwInterval = null;
  animationInterval = null;
  splashTimeout = null;
  splashDuration = 300;

  constructor(x, y) {
    super().loadImage(this.animateThrow[0]);
    this.loadImages(this.animateThrow);
    this.loadImages(this.animateSplash);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 0;
    this.acceleration = 0.25;
    this.throw();
  }

  throw() {
    this.throwInterval = setInterval(() => {
      if (world && world.isPaused) return;
      if (!this.isSplashing) {
        this.x += 15;
        if (this.isFalling && !this.isInAir()) {
          this.startSplash();
        }
      }
    }, 1000 / 25);
    setTimeout(() => {
      if (world && world.isPaused) return;
      if (!this.isSplashing) {
        this.isFalling = true;
        this.applyGravity();
      }
    }, 800);
    this.animationInterval = setInterval(() => {
      if (world && world.isPaused) return;
      if (this.isSplashing) {
        this.playAnimation(this.animateSplash);
      } else {
        this.playAnimation(this.animateThrow);
      }
    }, 25);
  }

  splashDuration = 500;

  startSplash() {
    if (this.isSplashing) {
      return;
    }
    this.isSplashing = true;
    this.currentImage = 0;
    if (this.throwInterval) {
      clearInterval(this.throwInterval);
      this.throwInterval = null;
    }
    setTimeout(() => {
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
        this.animationInterval = null;
      }
      this.readyToRemove = true;
    }, this.splashDuration);
  }

  isInAir() {
    return this.y < 360;
  }
}
