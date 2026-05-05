let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("gameCanvas");
  world = new World(canvas, keyboard);
  console.log("my Character is", world.character);
}

window.addEventListener("keypress", (event) => {
  "key pressed";
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
  "key released";
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

function openDialog() {
  const dialogRef = document.getElementById("aboutUs");
  dialogRef.showModal();
}

function closeDialog() {
  const dialogRef = document.getElementById("aboutUs");
  dialogRef.close();
}

function openImprintDialog() {
  const dialogRef = document.getElementById("imprint");
  dialogRef.showModal();
}

function closeImprintDialog() {
  const dialogRef = document.getElementById("imprint");
  dialogRef.close();
}
