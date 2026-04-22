class World {
  character = new Character();
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
  ];
  cloud = [
    new Cloud("./assets/5_background/layers/4_clouds/1.png"),
    new Cloud("./assets/5_background/layers/4_clouds/2.png"),
    new Cloud("./assets/5_background/layers/4_clouds/1.png"),
    new Cloud("./assets/5_background/layers/4_clouds/2.png"),
    new Cloud("./assets/5_background/layers/4_clouds/1.png"),
    new Cloud("./assets/5_background/layers/4_clouds/2.png"),
    new Cloud("./assets/5_background/layers/4_clouds/1.png"),
    new Cloud("./assets/5_background/layers/4_clouds/2.png"),
  ];
  background = [
    new BackgroundObject("./assets/5_background/layers/air.png", 0),
    new BackgroundObject("./assets/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject(
      "./assets/5_background/layers/2_second_layer/1.png",
      0,
    ),
    new BackgroundObject("./assets/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("./assets/5_background/layers/air.png", 719),
    new BackgroundObject(
      "./assets/5_background/layers/3_third_layer/2.png",
      719,
    ),
    new BackgroundObject(
      "./assets/5_background/layers/2_second_layer/2.png",
      719,
    ),
    new BackgroundObject(
      "./assets/5_background/layers/1_first_layer/2.png",
      719,
    ),
  ];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.background);
    this.addObjectsToMap(this.cloud);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    if (mo.mirrored) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.mirrored) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }
}
