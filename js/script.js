const CANVAS = document.getElementById("canvas");
const ctx = CANVAS.getContext("2d");
let width = (CANVAS.width = innerWidth);
let height = (CANVAS.height = innerHeight - 200);




function updateScore() {
  document.getElementById("score").textContent = STORE.SCORE;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
