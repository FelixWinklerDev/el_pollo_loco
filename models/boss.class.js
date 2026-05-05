class Boss extends ColidableObject {
  height = 425;
  width = 300;
  y = 45;
  speed = 0;
  speedY = 0;
  energy = 200;
  isDead = false;

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
    this.x = 2400;
    this.enemyMoveAnimation();
  }

  enemyMoveAnimation() {
    setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.animatedDead);
      } else if (this.energy < 100) {
        this.playAnimation(this.animatedHurt);
      } else {
        this.playAnimation(this.animatedAlert);
      }
    }, 200);
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
