class Boss extends ColidableObject {
  height = 425;
  width = 300;
  y = 45;
  speed = 30;
  speedY = 0;
  energy = 100;
  isDead = false;
  hadFirstContact = false;
  arrivedAtTarget = false;
  isAttacking = false;
  attackTimer = null;
  bossMusicStarted = false;
  deathAnimationTimer = null;
  deathAnimationFrameDuration = 150;
  deathCurrentImage = 0;

  animatedWalk = [
    "./assets/4_enemie_boss_chicken/1_walk/G1.png",
    "./assets/4_enemie_boss_chicken/1_walk/G2.png",
    "./assets/4_enemie_boss_chicken/1_walk/G3.png",
    "./assets/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  animatedAlert = [
    "./assets/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  animatedAttack = [
    "./assets/4_enemie_boss_chicken/3_attack/G13.png",
    "./assets/4_enemie_boss_chicken/3_attack/G14.png",
    "./assets/4_enemie_boss_chicken/3_attack/G15.png",
    "./assets/4_enemie_boss_chicken/3_attack/G16.png",
    "./assets/4_enemie_boss_chicken/3_attack/G17.png",
    "./assets/4_enemie_boss_chicken/3_attack/G18.png",
    "./assets/4_enemie_boss_chicken/3_attack/G19.png",
    "./assets/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  animatedFly = [
    "./assets/4_enemie_boss_chicken/3_attack/G17.png",
    "./assets/4_enemie_boss_chicken/3_attack/G18.png",
  ];

  animatedHurt = [
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  animatedDead = [
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
    "./assets/4_enemie_boss_chicken/5_dead/G24.png",
    "./assets/4_enemie_boss_chicken/5_dead/G25.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
    "./assets/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  currentImage = 0;
  offset = {
    top: 60,
    bottom: 10,
    left: 50,
    right: 10,
  };
  constructor() {
    super().loadImage(this.animatedAlert[0]);
    this.loadImages(this.animatedAlert);
    this.loadImages(this.animatedWalk);
    this.loadImages(this.animatedAttack);
    this.loadImages(this.animatedFly);
    this.loadImages(this.animatedHurt);
    this.loadImages(this.animatedDead);
    this.x = 4300;
    this.animateBoss();
  }

  animateBoss() {
    setInterval(() => {
      if (this.isDead) {
        if (!this.deathAnimationTimer) {
          this.startDeathAnimation(this.animatedDead);
        }
        return;
      }
      if (world && world.isPaused) return;
      if (this.hadFirstContact && !this.isAttacking) {
        this.handleBossPhases();
      } else if (!this.hadFirstContact) {
        this.checkPlayerDistance();
      }
      if (this.isAttacking) {
        this.playAnimation(this.animatedAttack);
      } else if (this.energy < 100 && this.isHurt()) {
        this.playAnimation(this.animatedHurt);
      } else if (this.hadFirstContact) {
        this.playAnimation(this.animatedAlert);
      } else {
        this.playAnimation(this.animatedAlert);
      }
    }, 150);
  }

  checkPlayerDistance() {
    if (this.world && this.world.character.x > 3300 && !this.hadFirstContact) {
      this.hadFirstContact = true;
      this.playBossMusic();
    }
  }

  playBossMusic() {
    if (!this.bossMusicStarted && typeof switchToBossMusic === "function") {
      switchToBossMusic();
      this.bossMusicStarted = true;
    }
  }

  shootChicken() {
    if (world && world.isPaused) return;
    this.isAttacking = true;
    if (this.world) {
      let baby = new BabyChicken(this.x, this.energy);
      this.world.level.enemies.push(baby);
      playSound(gameSounds.boss_sound);
    }
    setTimeout(() => {
      this.isAttacking = false;
    }, 850);
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  handleBossPhases() {
    if (!this.arrivedAtTarget && this.x > 3700) {
      this.x -= this.speed;
      this.playAnimation(this.animatedWalk);
    } else {
      this.arrivedAtTarget = true;
      this.playAnimation(this.animatedAlert);
      this.startAttacking();
    }
  }

  startAttacking() {
    if (!this.attackTimer) {
      this.attackTimer = setInterval(() => {
        if (world && world.isPaused) return;
        this.shootChicken();
      }, 1500);
    }
  }

  hit() {
    this.energy -= 10;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
      playSound(gameSounds.boss_dead);
      this.stopBoss();
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.5;
  }

  die() {
    this.isDead = true;
    setTimeout(() => {
      this.readyToRemove = true;
    }, 2000);
  }

  startDeathAnimation(images) {
    if (this.deathAnimationTimer) {
      return;
    }
    this.deathCurrentImage = 0;
    this.deathAnimationTimer = setInterval(() => {
      this.playDeathAnimation(images);
      if (this.deathCurrentImage >= images.length) {
        clearInterval(this.deathAnimationTimer);
        this.deathAnimationTimer = null;
        this.currentImage = images.length - 1;
        this.readyToRemove = true;
      }
    }, this.deathAnimationFrameDuration);
  }

  playDeathAnimation(images) {
    let i = this.deathCurrentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.deathCurrentImage++;
    if (this.deathCurrentImage >= images.length) {
      this.currentImage = images.length - 1;
      this.isDead = true;
    }
  }

  stopBoss() {
    if (this.attackTimer) {
      clearInterval(this.attackTimer);
      this.attackTimer = null;
    }
  }
}
