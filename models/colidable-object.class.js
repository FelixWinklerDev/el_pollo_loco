class ColidableObject extends MoveableObject {
  constructor() {
    super();
    this.mirrored = false;
    this.speedY = 0;
    this.acceleration = 1.5;
    this.health = 100;
    this.lastHit = 0;
  }

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  collidingHitbox(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    stopSnoring();
    this.health -= 20;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  getDamage() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.0;
  }

  isDead() {
    return this.health == 0;
  }

  jump() {
    this.speedY = 20;
    playSound(gameSounds.jump_sound);
  }

  moveLeft() {
    setInterval(() => {
      if (world && world.isPaused) return;
      this.x -= this.speed;
    }, 1000 / 60);
  }

  characterMoveLeft() {
    this.x -= this.speed;
    this.mirrored = true;
  }

  characterMoveRight() {
    this.x += this.speed;
    this.mirrored = false;
  }

  applyGravity() {
    setInterval(() => {
      if (this.world && this.world.isPaused) return;
      if (this instanceof ThrowableObject && !this.isFalling) {
        return;
      }
      if (this.isInAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isInAir() {
    return this.y < 140;
  }
}
