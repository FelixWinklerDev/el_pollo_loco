let canvas;
let world;
let keyboard = new Keyboard();

function closeRotateDeviceDialog() {
  const dialog = document.getElementById("rotateDeviceDialog");
  if (dialog) {
    dialog.classList.add("dismissed");
  }
}

window.matchMedia("(orientation: landscape)").addEventListener("change", function(e) {
  if (e.matches) {
    const dialog = document.getElementById("rotateDeviceDialog");
    if (dialog) {
      dialog.classList.remove("dismissed");
    }
  }
});

function startGame() {
  gameSounds.menu_music.pause();
  gameSounds.menu_music.currentTime = 0;
  document.getElementById("mainMenu").classList.add("d-none");
  initateLevel();
  init();
  startAllBackgroundMusic();
}

function restartGame() {
  if (world) {
    world.stopGame();
    pauseAllSounds();
    pauseAllBackgroundMusic();
  }
  initateLevel();
  init();
  startAllBackgroundMusic();
}

function init() {
  canvas = document.getElementById("gameCanvas");
  world = new World(canvas, keyboard);
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

function openFullscreen() {
  let elem = document.getElementById("game-wrapper");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  let elem = document.getElementById("game-wrapper");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
