class Object {
  time = 0;
  constructor(obj) {
    this.id = obj?.id || STORE?.returnAvailableId();
    this.type = obj?.type || this.constructor.name;
    this.x = obj?.x || 50;
    this.y = obj?.y || 50;
    this.xS = obj?.xS || 0;
    this.yS = obj?.yS || 0;
    this.r = obj?.r || 50;
    this.hover = obj?.hover || 50;
    this.value = obj?.value || 50;
    this.isParticle = obj?.isParticle || false;
    this.isProjectile = obj?.isProjectile || false;
    this.damage = obj?.damage || 0;
    this.color = obj?.color || "rgba(255,255,255)";
  }

  action() {
    this.time += 1;
    this.checkBorder();
    this.move();
    this.decreaseValue(0.1);
  }
  newPos(x,y){
    this.x = x;
    this.y = y;
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
      if (this.isProjectile) this.deleteFromStore();
      this.xS += getRandomFloat(-this.xS * 0.1, this.xS * 0.1);
      this.yS += getRandomFloat(-this.yS * 0.1, this.yS * 0.1);
    }
  }
  move() {
    this.x += this.xS;
    this.y += this.yS;
    this.checkTouch();
    this.moveTrail();
  }
  moveTrail() {
    if (this.isParticle) return;
    if (this.time % 30 == 0)
      STORE.addObject({
        x: this.x - this.r * this.xS,
        y: this.y - this.r * this.yS,
        xS: -this.xS * 0.5 * getRandomFloat(-this.xS * 0.1, this.xS * 0.1),
        yS: -this.yS * 0.5 * getRandomFloat(-this.xS * 0.1, this.xS * 0.1),
        r: getRandomFloat(this.r * 0.1, this.r * 0.2),
        value: getRandomInt(3, 7),
        isParticle: true,
        type: this.type,
        color:
          "rgba(255,255,255," +
          getRandomFloat(0.1, 0.4) +
          ")",
      });
  }
  checkTouch() {
    if (!this.isProjectile) return;
    STORE.checkTouch(this.x, this.y, this.r, this.id).forEach((el) => {
      if (!el.isParticle) {
        STORE.addPoint(el.getDamage(this.damage, this.x, this.y));
        this.deleteFromStore();
        return;
      }
    });
  }
  renderText() {
    if (this.isParticle) return;
    let fontSize = this.r / 2;
    ctx.beginPath();
    ctx.font = fontSize + "px Verdana";
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(Math.round(this.value), this.x, this.y);
  }
  insideCanvas() {
    if (this.x + this.r >= canvas.width) this.x = canvas.width - this.r;
    if (this.y + this.r >= canvas.height) this.y = canvas.height - this.r;
  }
  decreaseValue(val) {
    this.value > 0 ? (this.value -= val) : this.deleteFromStore();
  }

  deleteFromStore() {
    STORE.deleteObject(this.id);
  }
  getDamage(damage, xAnim, yAnim) {
    let points = 0;
    if (this.isParticle) return 0;
    this.getAnimDamage(damage, xAnim, yAnim);
    if (this.value - damage <= 0) {
      points = this.value;
      this.deleteFromStore();
    } else {
      this.decreaseValue(damage);
      points = damage;
    }

    return points;
  }
  getAnimDamage(num, xAnim = mouse.x, yAnim = mouse.y) {
    if (this.isParticle) return;
    let speed = 2;
    for (let i = 0; i < num; i++) {
      STORE.addObject({
        x: xAnim,
        y: yAnim,
        xS: getRandomFloat(-speed, speed + 1),
        yS: getRandomFloat(-speed, speed + 1),
        r: getRandomFloat(this.r * 0.05, this.r * 0.3),
        value: getRandomInt(10, 20),
        isParticle: true,
        type: this.type,
        color:
        "rgba(255,255,255," +
        getRandomFloat(0.8, 1) +
        ")",
      });
    }
  }
}
