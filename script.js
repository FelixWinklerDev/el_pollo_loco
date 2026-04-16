let canvas;
let ctx;
let character = new MoveableObject();

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  console.log("my Character is", character);
}
