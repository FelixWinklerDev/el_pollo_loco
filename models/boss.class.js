class Boss extends ColidableObject {
  height = 425;
  width = 300;
  y = 45;
  speed = 0;
  energy = 100;
  isDead = false;

  animatedWalk = [
    "./assets/4_enemie_boss_chicken/4_hurt/G1.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G2.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G3.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G4.png",
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
    "./assets/4_enemie_boss_chicken/4_hurt/G13.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G14.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G15.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G16.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G17.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G18.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G19.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G20.png",
  ];

  animatedHurt = [
    "./assets/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  animatedDead = [
    "./assets/4_enemie_boss_chicken/4_hurt/G24.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G25.png",
    "./assets/4_enemie_boss_chicken/4_hurt/G26.png",
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
    this.x = 2400;
    this.enemyMoveAnimation();
  }

  enemyMoveAnimation() {
    setInterval(() => {
      this.playAnimation(this.animatedAlert);
    }, 200);
  }

  hit(damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.die();
    } else {
      this.playAnimation(this.animatedHurt);
    }
  }
}
