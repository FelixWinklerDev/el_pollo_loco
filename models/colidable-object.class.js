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
    this.health -= 10;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  getDamage() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.2;
  }

  isDead() {
    return this.health == 0;
  }

  showHitbox(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Boss ||
      this instanceof Bottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "green";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom,
      );
      ctx.stroke();
    }
  }

  jump() {
    this.speedY = 20;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveRight() {
    setInterval(() => {
      this.x += this.speed;
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
