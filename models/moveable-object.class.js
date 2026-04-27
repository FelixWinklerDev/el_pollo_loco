class MoveableObject {
  x = 20;
  y = 20;
  img;
  imageCache = {};
  speed = 0.1;
  mirrored = false;
  speedY = 0;
  acceleration = 1.5;

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

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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

  playAnimation(image) {
    let i = this.currentImage % this.animatedMove.length;
    let path = image[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 20;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  showHitbox(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "green";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
