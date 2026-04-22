const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
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
    new BackgroundObject("./assets/5_background/layers/air.png", 1438),
    new BackgroundObject(
      "./assets/5_background/layers/3_third_layer/1.png",
      1438,
    ),
    new BackgroundObject(
      "./assets/5_background/layers/2_second_layer/1.png",
      1438,
    ),
    new BackgroundObject(
      "./assets/5_background/layers/1_first_layer/1.png",
      1438,
    ),
    new BackgroundObject("./assets/5_background/layers/air.png", 2157),
    new BackgroundObject(
      "./assets/5_background/layers/3_third_layer/2.png",
      2157,
    ),
    new BackgroundObject(
      "./assets/5_background/layers/2_second_layer/2.png",
      2157,
    ),
    new BackgroundObject(
      "./assets/5_background/layers/1_first_layer/2.png",
      2157,
    ),
  ],
);
