let level1;

function initateLevel() {
  level1 = new Level(
    [
      new Chicken(700 + Math.random() * 1000),
      new Chicken(850 + Math.random() * 1000),
      new Chicken(1200 + Math.random() * 1000),
      new Chicken(1550 + Math.random() * 1000),
      new Chicken(1880 + Math.random() * 1000),
      new Chicken(2300 + Math.random() * 1000),
      new Chicken(2780 + Math.random() * 1000),
      new Chicken(3180 + Math.random() * 1000),
      new Chicken(3500 + Math.random() * 1000),
      new Chicken(3780 + Math.random() * 1000),
      new Chicken(4180 + Math.random() * 1000),
      new Chicken(4500 + Math.random() * 1000),
      new Boss(),
    ],
    [
      new Cloud("./assets/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/5_background/layers/4_clouds/2.png"),
      new Cloud("./assets/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/5_background/layers/4_clouds/2.png"),
      new Cloud("./assets/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/5_background/layers/4_clouds/2.png"),
      new Cloud("./assets/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/5_background/layers/4_clouds/2.png"),
    ],
    [
      new Bottle("./assets/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/2_salsa_bottle_on_ground.png"),
      new Bottle("./assets/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    ],
    [
      new Coin(300, 200),
      new Coin(340, 150),
      new Coin(380, 200),
      new Coin(660, 200),
      new Coin(700, 50),
      new Coin(740, 200),
      new Coin(1000, 300),
      new Coin(1040, 300),
      new Coin(1080, 300),
      new Coin(1400, 180),
      new Coin(1500, 200),
      new Coin(1600, 220),
      new Coin(1700, 200),
      new Coin(1800, 180),
      new Coin(1900, 160),
    ],
    [
      new BackgroundObject("./assets/5_background/layers/air.png", 0),
      new BackgroundObject(
        "./assets/5_background/layers/3_third_layer/1.png",
        0,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/2_second_layer/1.png",
        0,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/1_first_layer/1.png",
        0,
      ),
      new BackgroundObject("./assets/5_background/layers/air.png", 718.5),
      new BackgroundObject(
        "./assets/5_background/layers/3_third_layer/2.png",
        718.5,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/2_second_layer/2.png",
        718.5,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/1_first_layer/2.png",
        718.5,
      ),
      new BackgroundObject("./assets/5_background/layers/air.png", 1437),
      new BackgroundObject(
        "./assets/5_background/layers/3_third_layer/1.png",
        1437,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/2_second_layer/1.png",
        1437,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/1_first_layer/1.png",
        1437,
      ),
      new BackgroundObject("./assets/5_background/layers/air.png", 2155.5),
      new BackgroundObject(
        "./assets/5_background/layers/3_third_layer/2.png",
        2155.5,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/2_second_layer/2.png",
        2155.5,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/1_first_layer/2.png",
        2155.5,
      ),
      new BackgroundObject("./assets/5_background/layers/air.png", 2874),
      new BackgroundObject(
        "./assets/5_background/layers/3_third_layer/1.png",
        2874,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/2_second_layer/1.png",
        2874,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/1_first_layer/1.png",
        2874,
      ),
      new BackgroundObject("./assets/5_background/layers/air.png", 3593.5),
      new BackgroundObject(
        "./assets/5_background/layers/3_third_layer/2.png",
        3593.5,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/2_second_layer/2.png",
        3593.5,
      ),
      new BackgroundObject(
        "./assets/5_background/layers/1_first_layer/2.png",
        3593.5,
      ),
    ],
  );
}
