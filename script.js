/** @type {HTMLCanvasElement} Primary game rendering canvas element. */
let canvas;

/** @type {World} Main game world state controller instance. */
let world;

/** @type {Keyboard} Input tracking manager instance. */
let keyboard = new Keyboard();

/** @type {string} Path to the pause button icon asset. */
const PAUSE_ICON = "./assets/html-img/texler-break-2398780_640.png";

/** @type {string} Path to the play button icon asset. */
const PLAY_ICON = "./assets/html-img/texler-play-2398749_640.png";

/**
 * Dismisses the screen rotation prompt modal dialog.
 * @returns {void}
 */
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

/**
 * Initializes and launches a new game from the main menu screen.
 * @returns {void}
 */
function startGame() {
  let playBtn = document.getElementById("playBtn");
  let restartBtn = document.getElementById("restartBtn");
  if (playBtn) {
    playBtn.classList.add("d-none");
    restartBtn.classList.remove("d-none");
  }
  gameSounds.menu_music.pause();
  gameSounds.menu_music.currentTime = 0;
  document.getElementById("mainMenu").classList.add("d-none");
  startNewSession();
}

/**
 * Stops the active game session, resets sound tracks, and launches a fresh game session.
 * @returns {void}
 */
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

/**
 * Clears current world state, re-initializes level entities, and launches audio/game loops.
 * @returns {void}
 */
function startNewSession() {
  if (world) {
    world.stopGame();
  }
  pauseAllSounds();
  initateLevel();
  init();
  startAllBackgroundMusic();
}

/**
 * Binds the game canvas and keyboard state to create a new World instance.
 * @returns {void}
 */
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

/**
 * Binds touch events on a DOM element to corresponding properties on the keyboard state object.
 * @param {string} elementId - ID of the target touch button element.
 * @param {keyof Keyboard} keyboardProperty - Property name on the keyboard state object to toggle.
 * @returns {void}
 */
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

/**
 * Attaches touch event listeners to mobile UI touch controls.
 * @returns {void}
 */
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

/**
 * Closes the mobile navigation/footer menu if currently open.
 * @returns {void}
 */
function closeMobileMenuIfOpen() {
  const footer = document.getElementById("main-footer");
  if (footer && footer.classList.contains("mobile-open")) {
    footer.classList.remove("mobile-open");
  }
}

/**
 * Toggles mobile footer menu state and pauses or resumes active game execution.
 * @returns {void}
 */
function toggleMobileMenu() {
  const footer = document.getElementById("main-footer");
  if (!footer) return;
  const isCurrentlyOpen = footer.classList.contains("mobile-open");
  if (isCurrentlyOpen) {
    footer.classList.remove("mobile-open");
    if (world) world.resume();
  } else {
    footer.classList.add("mobile-open");
    if (world) world.pause();
  }
}

/** @type {boolean} State flag indicating whether touch control overlays are hidden. */
let controlsHidden = localStorage.getItem("controlsHidden") === "true";

/**
 * Toggles touch control overlay visibility and saves state preference to localStorage.
 * @returns {void}
 */
function toggleControlGroups() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  controlsHidden = !controlsHidden;
  localStorage.setItem("controlsHidden", controlsHidden);
  applyControlsVisibility();
}

/**
 * Applies CSS class rules to hide or show on-screen touch controls based on user settings.
 * @returns {void}
 */
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

/**
 * Toggles the game pause state and updates UI button iconography.
 * @returns {void}
 */
function togglePauseGame() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  if (world) {
    world.togglePause();
    updatePauseButtonUI();
  }
}

/**
 * Updates the pause button graphic and alt tags according to active game pause state.
 * @returns {void}
 */
function updatePauseButtonUI() {
  const pauseBtnImg = document.querySelector("#pauseBtn img");
  if (!pauseBtnImg || !world) return;
  if (world.isPaused) {
    pauseBtnImg.src = PLAY_ICON;
    pauseBtnImg.alt = "play button";
  } else {
    pauseBtnImg.src = PAUSE_ICON;
    pauseBtnImg.alt = "pause button";
  }
}

/**
 * Opens the "About Me" modal dialog and pauses game execution.
 * @returns {void}
 */
function openDialog() {
  closeMobileMenuIfOpen();
  if (world) {
    world.pause();
  }
  const dialogRef = document.getElementById("aboutMe");
  dialogRef?.showModal();
}

/**
 * Closes the "About Me" modal dialog and resumes game execution.
 * @returns {void}
 */
function closeDialog() {
  const dialogRef = document.getElementById("aboutMe");
  dialogRef?.close();
  if (world) {
    world.resume();
  }
}

/**
 * Opens the "How to Play" modal instructions dialog and pauses game execution.
 * @returns {void}
 */
function openHowToPlayDialog() {
  closeMobileMenuIfOpen();
  if (world) {
    world.pause();
  }
  const dialogRef = document.getElementById("howToPlay");
  dialogRef?.showModal();
}

/**
 * Closes the "How to Play" modal instructions dialog and resumes game execution.
 * @returns {void}
 */
function closeHowToPlayDialog() {
  const dialogRef = document.getElementById("howToPlay");
  dialogRef?.close();
  if (world) {
    world.resume();
  }
}

/**
 * Opens the legal imprint modal dialog and pauses game execution.
 * @param {Event} [event] - Optional click event object to prevent default browser navigation.
 * @returns {void}
 */
function openImprintDialog(event) {
  if (event) event.preventDefault();
  closeMobileMenuIfOpen();
  if (world) {
    world.pause();
  }
  const dialogRef = document.getElementById("imprint-dialog");
  dialogRef?.showModal();
}

/**
 * Closes the "How to Play" modal instructions dialog and resumes game execution.
 * @returns {void}
 */
function closeImprintDialog() {
  const dialogRef = document.getElementById("imprint-dialog");
  dialogRef?.close();
  if (world) {
    world.resume();
  }
}

/**
 * Displays the main start menu screen while hiding settings screen components.
 * @returns {void}
 */
function showStartScreen() {
  document.getElementById("settingsScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
}

/**
 * Requests full-screen browser display mode for the game container element across cross-browser APIs.
 * @returns {void}
 */
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

/**
 * Exits full-screen browser display mode across cross-browser APIs.
 * @returns {void}
 */
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
