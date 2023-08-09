class circleElementsMagic {
  time = 0;
  arrObjects = [];
  deg = 0;
  R = 50;
  endAnim = false;
  constructor(obj) {
    this.id = STORE.returnAvailableId();
    this.x = obj?.x || mouse.x;
    this.y = obj?.y || mouse.y;
    this.damage = obj?.damage || 5;
    this.num = obj?.num || 30;
    this.endTime = 500,
    this.start();
  }
  start() {
    let id_arr = [];
    for (let i = 0; i < this.num; i++) {
      id_arr[i] = STORE.returnAvailableId();
      this.deg += 360 / this.num;
      STORE.addObject({
        id: id_arr[i],
        x: x + this.R * Math.cos(inRad(this.deg)),
        y: y + this.R * Math.sin(inRad(this.deg)),
        xS: 0,
        yS: 0,
        r: 5,
        value: 50,
        isParticle: true,
        type: "Circle",
        isProjectile: true,
        damage: this.damage,
      });
    }
    this.arrObjects = STORE.getObjectsById(id_arr);
  }
  render() {
    if (this.endAnim) {
      STORE.magicAnimation.end(this.id);
    }
    this.time++;
    this.R += 1;
    this.arrObjects.forEach((el) => {
      if (this.endTime < this.time){
        this.endAnim = true;
        el.value = 0;
      } 

      this.deg += 360 / this.num;
      el.newPos(
        this.x + this.R * Math.cos(inRad(this.deg + this.time)),
        this.y + this.R * Math.sin(inRad(this.deg + this.time)),
      );
    });
  }
}
