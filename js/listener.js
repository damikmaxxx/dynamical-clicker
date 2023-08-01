CANVAS.addEventListener("mousedown", (e) => {
  let objLen = STORE.objects.length;

  let clickObj = STORE.objects.find((el) => {
    return (
      el.x + el.r > e.offsetX &&
      el.x - el.r < e.offsetX &&
      el.y + el.r > e.offsetY &&
      el.y - el.r < e.offsetY
    );
  });
  if(!clickObj) return;
  STORE.addPoint(clickObj.getDamage(STORE.damage));
});

window.onresize = resize;
function resize() {
  canvas.resize(width, height);
}

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.offsetX; // получаем координату X мыши
  mouse.y = e.offsetY; // получаем координату Y мыши
});
