class Character extends ColidableObject {
  animateIdle = [
    "./assets/2_character_pepe/1_idle/idle/I-1.png",
    "./assets/2_character_pepe/1_idle/idle/I-2.png",
    "./assets/2_character_pepe/1_idle/idle/I-3.png",
    "./assets/2_character_pepe/1_idle/idle/I-4.png",
    "./assets/2_character_pepe/1_idle/idle/I-5.png",
    "./assets/2_character_pepe/1_idle/idle/I-6.png",
    "./assets/2_character_pepe/1_idle/idle/I-7.png",
    "./assets/2_character_pepe/1_idle/idle/I-8.png",
    "./assets/2_character_pepe/1_idle/idle/I-9.png",
  ];

  animateLongIdle = [
    "./assets/2_character_pepe/1_idle/long_idle/I-11.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-12.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-13.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-14.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-15.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-16.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-17.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-18.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-19.png",
    "./assets/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

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

  animatedDeath = [
    "./assets/2_character_pepe/5_dead/D-51.png",
    "./assets/2_character_pepe/5_dead/D-52.png",
    "./assets/2_character_pepe/5_dead/D-53.png",
    "./assets/2_character_pepe/5_dead/D-54.png",
    "./assets/2_character_pepe/5_dead/D-55.png",
    "./assets/2_character_pepe/5_dead/D-56.png",
    "./assets/2_character_pepe/5_dead/D-57.png",
  ];

  animatedDamage = [
    "./assets/2_character_pepe/4_hurt/H-41.png",
    "./assets/2_character_pepe/4_hurt/H-42.png",
    "./assets/2_character_pepe/4_hurt/H-43.png",
  ];

  currentImage = 0;
  speed = 6.5;
  world;
  jumpAnimationPlayed = false;
  deathAnimationPlayed = false;
  deathSequenceStarted = false;
  offset = {
    top: 120,
    bottom: 10,
    left: 70,
    right: 70,
  };

  constructor() {
    super();
    this.loadImage("./assets/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.animatedMove);
    this.loadImages(this.animatedJump);
    this.loadImages(this.animatedDeath);
    this.loadImages(this.animatedDamage);
    this.loadImages(this.animateIdle);
    this.loadImages(this.animateLongIdle);

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
      if (this.isDead() && !this.deathSequenceStarted) {
        this.deathSequenceStarted = true;
        this.playDeathSequence();
        return;
      }
      if (this.deathSequenceStarted) {
        return;
      }
      if (this.getDamage()) {
        this.playAnimation(this.animatedDamage);
        if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
          this.x += this.speed * 0.8;
        }
        if (this.world.keyboard.A && this.x > 0) {
          this.x -= this.speed * 0.8;
        }
        this.world.camera_x = -this.x - 1;
        return;
      }
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
        if (!this.jumpAnimationPlayed) {
          this.currentImage = 0;
          this.jumpAnimationPlayed = true;
        }
        if (this.currentImage < this.animatedJump.length) {
          this.playAnimation(this.animatedJump);
        }
      } else {
        this.jumpAnimationPlayed = false;
        if (this.world.keyboard.D || this.world.keyboard.A) {
          this.playAnimation(this.animatedMove);
        }
      }
    }, 115);
  }

  playDeathSequence() {
    let deathFrame = 0;
    const deathInterval = setInterval(() => {
      if (deathFrame < this.animatedDeath.length) {
        this.playAnimation(this.animatedDeath);
        deathFrame++;
      } else {
        clearInterval(deathInterval);
        this.deathJumpUp();
      }
    }, 100);
  }

  deathJumpUp() {
    this.speedY = 25;
    const fallInterval = setInterval(() => {
      this.y -= this.speedY;
      this.speedY -= 1.5;
      if (this.y > 500) {
        this.y = 500;
        clearInterval(fallInterval);
      }
    }, 1000 / 25);
  }
}
