class MoveableObject {
  x = 20;
  y = 20;
  img;
  imageCache = {};
  speed = 0.1;
  mirrored = false;

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
}
