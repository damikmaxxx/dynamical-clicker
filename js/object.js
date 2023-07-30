class Object {
  constructor(obj) {
    this.id = obj.id || Date.now();
    this.x = obj.x || 50;
    this.y = obj.y || 50;
    this.xS = obj.xS || 2;
    this.yS = obj.yS || 2;
    this.r = obj.r || 50;
  }

  action() {
    this.checkBorder();
    this.move();
    this.render();
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
    console.log("move");
    this.x += this.xS;
    this.y += this.yS;
  }
  render() {
    console.log("object render")
  }
  insideCanvas() {
    if (this.x + this.r >= canvas.width) this.x = canvas.width - this.r;
    if (this.y + this.r >= canvas.height) this.y = canvas.height - this.r;
  }
}
