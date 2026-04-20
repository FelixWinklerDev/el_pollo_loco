class MoveableObject {
  x = 20;
  y = 20;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveLeft() {
    console.log("move left");
  }

  moveRight() {
    console.log("move right");
  }
}
