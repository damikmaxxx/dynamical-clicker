class Canvas {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
  }
  start(info) {
    STORE.score = info?.score || 0;
    STORE.damage = info?.damage || 0;
    UPDATE_VIEW_INFO();
    setInterval(() => {
      if (!ACTIVE_GAME) return;
      this.update();
      console.log("0.01sec");
    }, 10);
    setInterval(() => {
      if (!ACTIVE_GAME) return;
      this.spawnerObjects();
    }, info?.spawnObj || 10000);
  }
  update() {
    ctx.clearRect(0, 0, this.width, this.height);
    this.borderCanvas();
    this.objectsActions();
    STORE.mouseHoverObjects();
  }
  borderCanvas() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.strokeRect(0, 0, this.width, this.height);
  }

  spawnerObjects() {
    let speed = 0.05;
    let radius = getRandomInt(10, 50);
    STORE.addObject({
      x: getRandomInt(0, this.width - radius),
      y: getRandomInt(0, this.height - radius),
      xS: getRandomFloat(-speed, speed + 1),
      yS: getRandomFloat(-speed, speed + 1),
      r: radius,
    });
  }
  objectsActions() {
    STORE.objects.forEach((el) => {
      el.action();
    });
  }
  resize() {
    this.updateSize();
  }
  updateSize() {
    this.width = CANVAS.width = innerWidth;
    this.height = CANVAS.height = innerHeight - 200;
    STORE.objects.forEach((el) => {
      el.insideCanvas();
    });
  }
}
