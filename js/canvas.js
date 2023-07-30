class Canvas {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
  }
  start() {
    setInterval(() => {
      this.update();
    }, 10);
    // setInterval(() => {
    //   this.spawnerObjects();
    // }, 1000);
  }
  update() {
    ctx.clearRect(0, 0, this.width, this.height);
    this.borderCanvas();
    this.objectsActions();
    mouseHover();
  }
  borderCanvas() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.strokeRect(0, 0, this.width, this.height);
  }

  spawnerObjects() {
    let speed = 1;
    let radius = getRandomInt(10, 100)
    addObject({
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
