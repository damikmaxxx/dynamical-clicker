class magicAnimation {
  animArr = [];
  constructor() {}
  start(nameMagic, x = mouse.x, y = mouse.y) {
    switch (nameMagic) {
      case "circleElements":
        this.animArr.push(new circleElementsMagic({ x: mouse.x, y: mouse.y }));
        break;
    }
  }

  update() {
    this.animArr.forEach((el) => {
      el.render();
    });
  }
  end(id) {
    this.animArr = this.animArr.filter((el) => el.id != id);
  }
}
