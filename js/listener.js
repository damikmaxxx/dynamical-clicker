CANVAS.addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    STORE.activateWeapon()
  }
  if (e.button == 2) {
    STORE.activateItem({ type: "grenade", x: mouse.x, y: mouse.y });
  }
});

window.onresize = resize;
function resize() {
  canvas.resize(width, height);
}

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.offsetX; // получаем координату X мыши
  mouse.y = e.offsetY; // получаем координату Y мыши
});

canvas.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});
