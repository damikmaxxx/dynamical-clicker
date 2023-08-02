class Canvas {
  time = 0;
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;

  }
  start(info) {
    STORE.score = info?.score || 0;
    STORE.damage = info?.damage || 0;
    this.spawnObj = info?.spawnObj  || 10000;
    UPDATE_VIEW_INFO();
    setInterval(() => {
      if (!ACTIVE_GAME) return;
      this.updateRender();
    }, 1000/60);
    setInterval(() => {
      if (!ACTIVE_GAME) return;
      this.active();
      console.log("0.01sec");
    }, 10);
  }
  updateRender() {
    ctx.clearRect(0, 0, this.width, this.height);
    STORE.renderObjects();
    
  }
  active(){
    if(this.time%this.spawnObj == 0) this.spawnerObjects()
    this.objectsActions();
    STORE.mouseHoverObjects();
    this.time += 10;
    console.log(this.time,this.spawnObj)
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
    const reverse = STORE.objects.map((_, index) => STORE.objects[STORE.objects.length - 1 - index]);
    reverse.forEach((el) => {
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
