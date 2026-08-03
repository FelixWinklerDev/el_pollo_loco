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
  pepe_idle: new Audio("./assets/audio/main-song.mp3"),
};
let musicStarted = false;
let isMuted = false;

gameSounds.menu_music.loop = true;
gameSounds.boss_music.loop = true;

// audio.js
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
  isMuted = !isMuted;
  let btn = document.getElementById("muteBtn");
  if (isMuted) {
    btn.innerText = "SOUNDS: OFF";
    stopSound(gameSounds.menu_music);
    stopSound(gameSounds.boss_music);
  } else {
    btn.innerText = "SOUNDS: ON";
    let boss = world.level.enemies.find((e) => e instanceof Boss);
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
