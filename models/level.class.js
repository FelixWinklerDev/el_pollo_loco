class Level {
  enemies;
  cloud;
  background;
  level_end_x = 3500;

  constructor(enemies, cloud, bottles, coins, background) {
    this.enemies = enemies;
    this.cloud = cloud;
    this.bottles = bottles;
    this.coins = coins;
    this.background = background;
  }
}
