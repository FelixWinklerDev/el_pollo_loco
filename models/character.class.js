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
  lastThrow = 0;
  idleTimer = null;
  idleSoundStarted = false;
  longIdleActive = false;
  offset = {
    top: 120,
    bottom: 10,
    left: 70,
    right: 70,
  };
  bottleAmount = 0;
  coinAmount = 0;
  lastAction = 0;

  constructor() {
    super();
    this.loadImage("./assets/2_character_pepe/1_idle/idle/I-1.png");
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
    this.airAnimate();
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.resetIdleTimer();
    setInterval(() => {
      if (this.world && this.world.isPaused) return;
      if (this.isDead() && !this.deathSequenceStarted) {
        this.deathSequenceStarted = true;
        this.playDeathSequence();
        return;
      }
      if (this.deathSequenceStarted) {
        return;
      }
      if (this.getDamage()) {
        if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
          this.x += this.speed * 0.6;
        }
        if (this.world.keyboard.A && this.x > 0) {
          this.x -= this.speed * 0.6;
        }
        this.world.camera_x = -this.x - 5;
        return;
      }
      if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
        this.characterMoveRight();
      }
      if (this.world.keyboard.A && this.x > 0) {
        this.characterMoveLeft();
      }
      if (this.world.keyboard.W && !this.isInAir()) {
        this.jump();
      }
      if (this.world.keyboard.E && this.bottleAmount > 0) {
        this.throwBottle();
      }
      if (
        this.world.keyboard.A ||
        this.world.keyboard.D ||
        this.world.keyboard.W ||
        this.world.keyboard.E
      ) {
        this.resetIdleTimer();
      }
      this.world.camera_x = -this.x - 3;
    }, 1000 / 60);
    setInterval(() => {
      if (this.world && this.world.isPaused) return;
      if (this.isInAir()) {
        this.playAnimation(this.animatedJump);
      } else if (this.getDamage()) {
        this.playAnimation(this.animatedDamage);
      } else if (this.world.keyboard.A || this.world.keyboard.D) {
        this.playAnimation(this.animatedMove);
      } else if (this.isLongIdle()) {
        this.playAnimation(this.animateLongIdle);
      } else {
        this.handleIdleAnimations();
      }
    }, 180);
  }

  hit() {
    super.hit();
    this.resetIdleTimer();
  }

  resetIdleTimer() {
    this.lastAction = Date.now();
    this.longIdleActive = false;
    if (this.idleSoundStarted) {
      stopSnoring(); // Nutzen wir direkt unsere zentrale Stopp-Funktion
      this.idleSoundStarted = false;
    }
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      if (this.world && this.world.isPaused) return;
      this.longIdleActive = true;
      if (!this.idleSoundStarted) {
        this.idleSoundStarted = true;
        playSound(gameSounds.pepe_idle);
      }
    }, 5000);
  }

  isLongIdle() {
    return this.longIdleActive && !this.isInAir() && !this.getDamage();
  }

  airAnimate() {
    setInterval(() => {
      if (this.world && this.world.isPaused) return;
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
    }, 180);
  }

  handleIdleAnimations() {
    this.playAnimation(this.animateIdle);
  }

  playDeathSequence() {
    let deathFrame = 0;
    let deathInterval = setInterval(() => {
      if (deathFrame < this.animatedDeath.length) {
        this.playAnimation(this.animatedDeath);
        deathFrame++;
        playSound(gameSounds.pepe_death);
      } else {
        clearInterval(deathInterval);
        this.deathJumpUp();
      }
    }, 100);
  }

  deathJumpUp() {
    this.speedY = 25;
    let fallInterval = setInterval(() => {
      this.y -= this.speedY;
      this.speedY -= 1.5;
      if (this.y > 500) {
        this.y = 500;
        clearInterval(fallInterval);
      }
    }, 1000 / 25);
  }

  collectBottle() {
    if (this.bottleAmount < 15) {
      this.bottleAmount++;
    }
  }

  collectCoin() {
    if (this.coinAmount < 100) {
      this.coinAmount++;
    }
  }

  throwBottle() {
    const now = Date.now();
    if (now - this.lastThrow < 700) return;
    this.lastThrow = now;
    const startX = this.mirrored ? this.x + 20 : this.x + this.width - 60;
    const startY = this.y + 160;
    let bottle = new ThrowableObject(startX, startY);
    bottle.speedX = this.mirrored ? -10 : 10;
    bottle.speedY = -12;
    bottle.applyGravity();
    this.world.throwableObjects.push(bottle);
    this.bottleAmount--;
    this.world.bottleCounter.setBottles(this.bottleAmount);
  }
}
