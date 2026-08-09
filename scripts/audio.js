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

let musicStarted = false;
let isMuted = localStorage.getItem("isMuted") === "true";

gameSounds.menu_music.loop = true;
gameSounds.boss_music.loop = true;
gameSounds.pepe_idle.loop = true;

document.addEventListener("DOMContentLoaded", () => {
  applyMuteState();
});

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

function playSound(sound) {
  if (isMuted) {
    return;
  }
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function stopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}

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

function pauseAllBackgroundMusic() {
  gameSounds.menu_music.pause();
  gameSounds.boss_music.pause();
}

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

function switchToBossMusic() {
  if (isMuted) {
    return;
  }
  pauseAllBackgroundMusic();
  playSound(gameSounds.boss_music);
}

function playWinMusic() {
  pauseAllBackgroundMusic();
  playSound(gameSounds.victory);
}

function playGameOverMusic() {
  pauseAllBackgroundMusic();
  playSound(gameSounds.game_over);
}

function stopSnoring() {
  if (gameSounds && gameSounds.pepe_idle) {
    gameSounds.pepe_idle.pause();
    gameSounds.pepe_idle.currentTime = 0;
  }
}
