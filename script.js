let canvas;
let world;
let keyboard = new Keyboard();

function closeRotateDeviceDialog() {
  const dialog = document.getElementById("rotateDeviceDialog");
  if (dialog) {
    dialog.classList.add("dismissed");
  }
}

window
  .matchMedia("(orientation: landscape)")
  .addEventListener("change", function (e) {
    if (e.matches) {
      const dialog = document.getElementById("rotateDeviceDialog");
      if (dialog) {
        dialog.classList.remove("dismissed");
      }
    }
  });

function startGame() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  gameSounds.menu_music.pause();
  gameSounds.menu_music.currentTime = 0;
  document.getElementById("mainMenu").classList.add("d-none");
  startNewSession();
}

function restartGame() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  if (world) {
    world.stopGame();
    pauseAllSounds();
    pauseAllBackgroundMusic();
  }
  startNewSession();
}

function startNewSession() {
  if (world) {
    world.stopGame();
  }
  pauseAllSounds();
  initateLevel();
  init();
  startAllBackgroundMusic();
}

function init() {
  canvas = document.getElementById("gameCanvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
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

function bindTouchToKey(elementId, keyboardProperty) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard[keyboardProperty] = true;
  });
  element.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard[keyboardProperty] = false;
  });
}

function setupMobileControls() {
  bindTouchToKey("btnLeft", "A");
  bindTouchToKey("btnRight", "D");
  bindTouchToKey("btnJump", "W");
  bindTouchToKey("btnThrow", "E");
}

window.addEventListener("DOMContentLoaded", setupMobileControls);
document.addEventListener("DOMContentLoaded", () => {
  applyControlsVisibility();
});

function closeMobileMenuIfOpen() {
  const footer = document.getElementById("main-footer");
  if (footer && footer.classList.contains("mobile-open")) {
    footer.classList.remove("mobile-open");
  }
}

function toggleMobileMenu() {
  const footer = document.getElementById("main-footer");
  if (footer) {
    footer.classList.toggle("mobile-open");
  }
}

let controlsHidden = localStorage.getItem("controlsHidden") === "true";

function toggleControlGroups() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  controlsHidden = !controlsHidden;
  localStorage.setItem("controlsHidden", controlsHidden);
  applyControlsVisibility();
}

function applyControlsVisibility() {
  const mobileControls = document.querySelector(".mobile-controls");
  const toggleBtn = document.getElementById("toggle-controlls");
  if (mobileControls) {
    if (controlsHidden) {
      mobileControls.classList.add("d-none");
    } else {
      mobileControls.classList.remove("d-none");
    }
  }
}

function openDialog() {
  closeMobileMenuIfOpen();
  const dialogRef = document.getElementById("aboutUs");
  dialogRef?.showModal();
}

function closeDialog() {
  const dialogRef = document.getElementById("aboutUs");
  dialogRef?.close();
}

function openHowToPlayDialog() {
  closeMobileMenuIfOpen();
  const dialogRef = document.getElementById("howToPlay");
  dialogRef?.showModal();
}

function closeHowToPlayDialog() {
  const dialogRef = document.getElementById("howToPlay");
  dialogRef?.close();
}

function openImprintDialog(event) {
  if (event) event.preventDefault();
  closeMobileMenuIfOpen();
  const dialogRef = document.getElementById("imprint-dialog");
  dialogRef?.showModal();
}

function closeImprintDialog() {
  const dialogRef = document.getElementById("imprint-dialog");
  dialogRef?.close();
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
