

const CANVAS = document.getElementById("canvas");
const ctx = CANVAS.getContext("2d");
let width = (CANVAS.width = innerWidth);
let height = (CANVAS.height = innerHeight - 200);






function UPDATE_VIEW_INFO() {
  document.getElementById("score").textContent = Math.round(STORE.score);
  document.getElementById("damage").textContent = STORE.weapon[STORE.activeWeapon].damage;
  document.getElementById("grenade").textContent = STORE.items.grenade;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function inRad(num) {
  return num * Math.PI / 180;
}

