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
    }, 10);
  }
  updateRender() {
    ctx.clearRect(0, 0, this.width, this.height);
    // ctx.fillStyle = "rgb(38, 44, 80)";
    // ctx.fillRect(0, 0, this.width, this.height);
    STORE.renderObjects();
    
  }
  active(){
    if(this.time%this.spawnObj == 0) STORE.spawnerObjects(this.width,this.height)
    STORE.active()
    STORE.mouseHoverObjects();
    this.time += 10;
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
