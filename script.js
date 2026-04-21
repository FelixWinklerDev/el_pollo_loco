let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("gameCanvas");
  world = new World(canvas, keyboard);
  console.log("my Character is", world.character);
}

window.addEventListener("keypress", (event) => {
  console.log("key pressed", event);
  if (event.code == "KeyA") {
    keyboard.A = true;
  }
  if (event.code == "KeyD") {
    keyboard.D = true;
  }
  if (event.code == "KeyW") {
    keyboard.W = true;
  }
  if (event.code == "KeyE") {
    keyboard.E = true;
  }
});

window.addEventListener("keyup", (event) => {
  console.log("key released", event);
  if (event.code == "KeyA") {
    keyboard.A = false;
  }
  if (event.code == "KeyD") {
    keyboard.D = false;
  }
  if (event.code == "KeyW") {
    keyboard.W = false;
  }
  if (event.code == "KeyE") {
    keyboard.E = false;
  }
});
