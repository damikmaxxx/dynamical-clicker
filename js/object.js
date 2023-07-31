class Object {
  constructor(obj) {
    this.id = obj?.id || Date.now();
    this.x = obj?.x || 50;
    this.y = obj?.y || 50;
    this.xS = obj?.xS || 2;
    this.yS = obj?.yS || 2;
    this.r = obj?.r || 50;
    this.hover = obj?.hover || 50;
    this.value = obj?.value || 50;
  }

  action() {
    this.checkBorder();
    this.move();
    this.render();
    this.decreaseValue(0.1);
  }
  checkBorder() {
    let borderTouch = false;
    if (this.x + this.r >= canvas.width && this.xS > 0) {
      this.xS = -this.xS;
      borderTouch = true;
    }
    if (this.x - this.r <= 0) {
      this.xS = Math.abs(this.xS);
      borderTouch = true;
    }
    if (this.y + this.r >= canvas.height && this.yS > 0) {
      this.yS = -this.yS;
      borderTouch = true;
    }
    if (this.y - this.r <= 0) {
      this.yS = Math.abs(this.yS);
      borderTouch = true;
    }

    if (borderTouch) {
      this.xS += getRandomFloat(-this.xS * 0.1, this.xS * 0.1);
      this.yS += getRandomFloat(-this.yS * 0.1, this.yS * 0.1);
    }
  }
  move() {
    this.x += this.xS;
    this.y += this.yS;
  }
  renderText() {
    let fontSize = this.r/2
    ctx.beginPath();
    ctx.font = fontSize + 'px Verdana';
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(this.value), this.x, this.y);
  }
  insideCanvas() {
    if (this.x + this.r >= canvas.width) this.x = canvas.width - this.r;
    if (this.y + this.r >= canvas.height) this.y = canvas.height - this.r;
  }
  decreaseValue(val){
    this.value > 0 ? this.value -= val : this.deleteFromStore();
  }
  deleteFromStore(){
    STORE.deleteObject(this.id)
  }
}
