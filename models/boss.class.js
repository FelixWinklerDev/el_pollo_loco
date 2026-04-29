class Boss extends ColidableObject {
  height = 425;
  width = 300;
  y = 45;
  speed = 0;
  animatedMove = [
    "./assets/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  currentImage = 0;
  offset = {
    top: 60,
    bottom: 10,
    left: 50,
    right: 10,
  };
  constructor() {
    super().loadImage(this.animatedMove[0]);
    this.loadImages(this.animatedMove);
    this.x = 2400;
    this.enemyMoveAnimation();
  }

  enemyMoveAnimation() {
    this.moveLeft();
    setInterval(() => {
      this.playAnimation(this.animatedMove);
    }, 200);
  }
}
