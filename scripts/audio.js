/**
 * Collection of all HTMLAudioElement instances used for game sound effects and background music.
 * @type {Object.<string, HTMLAudioElement>}
 */
const gameSounds = {
  menu_music: new Audio("./assets/audio/main-song.mp3"),
  boss_music: new Audio("./assets/audio/boss-song.mp3"),
  chicken_sound: new Audio("./assets/audio/chicken-noise-casual.mp3"),
  chicken_death: new Audio("./assets/audio/chicken-scream.mp3"),
  coin_sound: new Audio("./assets/audio/drop-coin.mp3"),
  jump_sound: new Audio("./assets/audio/jump.mp3"),
  bounce_sound: new Audio("./assets/audio/bounce.mp3"),
  bottle_sound: new Audio("./assets/audio/bottle-clink.mp3"),
  bottle_break: new Audio("./assets/audio/bottle-break.mp3"),
  boss_sound: new Audio("./assets/audio/turkey.mp3"),
  boss_hit: new Audio("./assets/audio/turkey-hit.mp3"),
  boss_dead: new Audio("./assets/audio/boss-dead.mp3"),
  pepe_hurt: new Audio("./assets/audio/hurt.mp3"),
  pepe_death: new Audio("./assets/audio/falling-scream.mp3"),
  pepe_idle: new Audio("./assets/audio/snoring-long.mp3"),
  victory: new Audio("./assets/audio/victory-sound.mp3"),
  game_over: new Audio("./assets/audio/game-over.mp3"),
};

/** @type {boolean} State flag indicating if background music playback has started. */
let musicStarted = false;

/** @type {boolean} Global mute state loaded from localStorage. */
let isMuted = localStorage.getItem("isMuted") === "true";

gameSounds.menu_music.loop = true;
gameSounds.boss_music.loop = true;
gameSounds.pepe_idle.loop = true;

document.addEventListener("DOMContentLoaded", () => {
  applyMuteState();
});

/**
 * Syncs the muted state across all audio elements and updates the UI mute button icon and accessibility label.
 * @returns {void}
 */
function applyMuteState() {
  Object.values(gameSounds).forEach((sound) => {
    sound.muted = isMuted;
  });
  let btn = document.getElementById("muteBtn");
  let img = btn?.querySelector("img");
  if (img) {
    if (isMuted) {
      img.src = "./assets/html-img/elionas-speaker-mute-1521312_640.png";
      img.alt = "music muted";
    } else {
      img.src = "./assets/html-img/elionas-speaker-1521312_640.png";
      img.alt = "music toggle";
    }
  }
}

/**
 * Resets playback position and plays a sound effect if global audio is not muted.
 * @param {HTMLAudioElement} sound - The audio instance to play.
 * @returns {void}
 */
function playSound(sound) {
  if (isMuted) {
    return;
  }
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

/**
 * Pauses an audio element and resets its playback position to zero.
 * @param {HTMLAudioElement} sound - The audio instance to stop.
 * @returns {void}
 */
function stopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}

/**
 * Toggles the global mute state, persists preference to localStorage, and updates audio state and UI icons.
 * @returns {void}
 */
function toggleMute() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted);
  applyMuteState();
  if (isMuted) {
    stopSound(gameSounds.menu_music);
    stopSound(gameSounds.boss_music);
  } else {
    let boss = world?.level?.enemies?.find((e) => e instanceof Boss);
    if (boss && boss.hadFirstContact && !boss.isDead) {
      playSound(gameSounds.boss_music);
    } else {
      playSound(gameSounds.menu_music);
    }
  }
}

/**
 * Pauses background music tracks (menu and boss music).
 * @returns {void}
 */
function pauseAllBackgroundMusic() {
  gameSounds.menu_music.pause();
  gameSounds.boss_music.pause();
}

/**
 * Pauses all non-background sound effects.
 * @returns {void}
 */
function pauseAllSounds() {
  gameSounds.chicken_sound.pause();
  gameSounds.chicken_death.pause();
  gameSounds.coin_sound.pause();
  gameSounds.jump_sound.pause();
  gameSounds.bounce_sound.pause();
  gameSounds.bottle_sound.pause();
  gameSounds.bottle_break.pause();
  gameSounds.boss_sound.pause();
  gameSounds.boss_hit.pause();
  gameSounds.boss_dead.pause();
  gameSounds.pepe_hurt.pause();
  gameSounds.pepe_death.pause();
  gameSounds.pepe_idle.pause();
  gameSounds.victory.pause();
  gameSounds.game_over.pause();
}

/**
 * Plays the appropriate background music depending on whether the boss encounter has been triggered.
 * @returns {void}
 */
function startAllBackgroundMusic() {
  pauseAllBackgroundMusic();
  if (
    world &&
    world.level.enemies.find((e) => e instanceof Boss)?.hadFirstContact
  ) {
    playSound(gameSounds.boss_music);
  } else {
    playSound(gameSounds.menu_music);
  }
}

/**
 * Transitions active background music to the boss battle theme.
 * @returns {void}
 */
function switchToBossMusic() {
  if (isMuted) {
    return;
  }
  pauseAllBackgroundMusic();
  playSound(gameSounds.boss_music);
}

/**
 * Stops background music and plays the victory jingle.
 * @returns {void}
 */
function playWinMusic() {
  pauseAllBackgroundMusic();
  playSound(gameSounds.victory);
}

/**
 * Stops background music and plays the game over jingle.
 * @returns {void}
 */
function playGameOverMusic() {
  pauseAllBackgroundMusic();
  playSound(gameSounds.game_over);
}

/**
 * Pauses and resets character snoring/idle audio.
 * @returns {void}
 */
function stopSnoring() {
  if (gameSounds && gameSounds.pepe_idle) {
    gameSounds.pepe_idle.pause();
    gameSounds.pepe_idle.currentTime = 0;
  }
}
