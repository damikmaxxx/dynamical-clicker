class Object {
  constructor(obj) {
    this.id = obj?.id || STORE?.returnAvailableId();
    this.type = obj?.type || this.constructor.name;
    this.x = obj?.x || 50;
    this.y = obj?.y || 50;
    this.xS = obj?.xS || 2;
    this.yS = obj?.yS || 2;
    this.r = obj?.r || 50;
    this.hover = obj?.hover || 50;
    this.value = obj?.value || 50;
    this.isParticle = obj?.isParticle || false;
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
    if(this.isParticle) return;
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
  getDamage(damage){
    let points= 0;
    if(this.isParticle) return 0;

    if (this.value - damage <= 0){
      this.getAnimDamage(damage)
      points = this.value;
      this.deleteFromStore();
    } 
    else{
      this.getAnimDamage(damage)
      this.decreaseValue(damage)
      points = damage;
    }


    return points;
  }
  getAnimDamage(num) {
    if(this.isParticle) return;
    let speed = 2;
    for (let i = 0; i < num; i++) {
      STORE.addObject({ x: this.x, y: this.y, xS: getRandomFloat(-speed, speed + 1), yS:getRandomFloat(-speed, speed + 1), r:getRandomFloat(1, 10), value:getRandomInt(10,20),isParticle:true,type:this.type });
    }

  }
}
