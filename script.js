let canvas;
let ctx;
let character = new Image();

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  character.src = "./assets/2_character_pepe/2_walk/W-21.png";
  setTimeout(function () {
    ctx.drawImage(character, 10, 0, 80, 120);
  }, 1000);
}
