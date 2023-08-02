class Grenade {
  time = 0;
  use = false;
  constructor(obj) {
    this.id = obj?.id || STORE?.returnAvailableId();
    this.damage = obj?.damage || 0;
    this.fragments = obj?.fragments || 10;
    this.speed = obj?.speed || 2;
    this.range = obj?.range || 10;
    this.x = obj?.x || 50;
    this.y = obj?.y || 50;
  }

  action() {
    this.time += 1;
    

    if(!this.use) this.renderItem();
    if (this.time == 20) this.activate();
  }
  renderItem(){
    this.use = true;
    console.log("Asda")
    STORE.addObject({
        x: this.x,
        y: this.y,
        xS: 0,
        yS: 0,
        r: 30,
        value:2,
        isParticle: true,
        type: "Circle",
    });
  }
  activate() {
    for (let i = 0; i < this.fragments; i++) {
      STORE.addObject({
        x: this.x,
        y: this.y,
        xS: getRandomFloat(-this.speed, this.speed + 1),
        yS: getRandomFloat(-this.speed, this.speed + 1),
        r: getRandomFloat(2, 10),
        value: getRandomInt(this.range/10, this.range + 1),
        isParticle: true,
        type: "Circle",
      });
    }
    STORE.deleteActiveItem(this.id);
  }
  render() {

  }
}
