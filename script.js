let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let musicStarted = false;

function startGame() {
  menu_sound.pause();
  menu_sound.currentTime = 0;
  document.getElementById("mainMenu").classList.add("d-none");
  initateLevel();
  init();
}

function restartGame() {
  if (world) {
    world.stopGame();
  }
  initateLevel();
  init();
}

function init() {
  canvas = document.getElementById("gameCanvas");
  world = new World(canvas, keyboard);
}

function toggleMute() {
  isMuted = !isMuted;
  let btn = document.getElementById("muteBtn");
  if (isMuted) {
    menu_sound.pause();
    btn.innerText = "SOUND: OFF";
  } else {
    menu_sound.play();
    btn.innerText = "SOUND: ON";
  }
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

function openHowToPlayDialog() {
  const dialogRef = document.getElementById("howToPlay");
  dialogRef.showModal();
}

function closeHowToPlayDialog() {
  const dialogRef = document.getElementById("howToPlay");
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

function showStartScreen() {
  document.getElementById("settingsScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
}
