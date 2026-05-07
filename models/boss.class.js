class Boss extends ColidableObject {
  height = 425;
  width = 300;
  y = 45;
  speed = 20;
  speedY = 0;
  energy = 200;
  isDead = false;
  hadFirstContact = false;
  arrivedAtTarget = false;
  attackInterval = null;

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
    "./assets/4_enemie_boss_chicken/5_dead/G24.png",
    "./assets/4_enemie_boss_chicken/5_dead/G25.png",
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
        this.playAnimation(this.animatedDead);
      } else if (this.energy < 200 && this.energy > 0 && !this.isAttacking) {
        this.playAnimation(this.animatedHurt);
      } else if (this.isAttacking) {
        this.playAnimation(this.animatedAttack);
      } else if (this.hadFirstContact) {
        this.handleBossPhases();
      } else {
        this.playAnimation(this.animatedAlert);
        this.checkPlayerDistance();
      }
    }, 150);
  }

  shootChicken() {
    this.isAttacking = true;
    if (this.world) {
      let baby = new BabyChicken(this.x);
      this.world.level.enemies.push(baby);
    }
    setTimeout(() => {
      this.isAttacking = false;
    }, 800);
  }

  checkPlayerDistance() {
    if (this.world && this.world.character.x > 3400) {
      this.hadFirstContact = true;
      console.log("Der Boss wurde getriggert!");
    }
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
    if (this.attackInterval) return;
    this.attackInterval = setInterval(() => {
      this.shootChicken();
    }, 1500);
  }

  fly() {
    if (this.energy == 80) {
      this.playAnimation(this.animatedFly);
      this.speedY = 40;
    }
  }

  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isDead = true;
    }
  }
}
