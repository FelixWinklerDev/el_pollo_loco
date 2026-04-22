class Level {
  enemies;
  cloud;
  background;
  level_end_x = 2140;

  constructor(enemies, cloud, background) {
    this.enemies = enemies;
    this.cloud = cloud;
    this.background = background;
  }
}
