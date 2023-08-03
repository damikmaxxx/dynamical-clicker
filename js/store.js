let STORE = {
  activeCursor: "grenade",
  lastID: 0,
  score: 0,
  damage: 15,
  properties: {
    objects: {
      circle: {
        radius: 10,
        speed: 100,
        value: 50,
      },
      square: {
        radius: 10,
        speed: 100,
        value: 50,
      },
    },
    items: {
      grenade: {
        speed: 15,
        fragments: 30,
        damage: 10,
        range: 2,
      },
    },
  },
  items: {
    grenade: 50,
  },
  activeItem: [],
  objects: [],

  addPoint(p) {
    this.score += p;
    UPDATE_VIEW_INFO();
  },
  addObject(obj) {
    obj.id = this.returnAvailableId();
    switch (obj.type) {
      case "Circle":
        this.objects.push(new Circle(obj));
        break;
      case "Square":
        this.objects.push(new Square(obj));
        break;
      default:
        console.log("Такого типа не существует");
    }
  },
  activateItem(info) {
    if (info.type == "grenade" && this.items.grenade > 0) {
      STORE.activeItem.push(
        new Grenade({
          x: info.x,
          y: info.y,
          speed: info.speed || this.properties.items.grenade.speed,
          fragments: info.fragments || this.properties.items.grenade.fragments,
          damage: info.damage || this.properties.items.grenade.damage,
          range: info.range || this.properties.items.grenade.range,
        })
      );
      this.items.grenade--;
    }
  },
  active() {
    const reverse = this.objects.map(
      (_, index) => this.objects[this.objects.length - 1 - index]
    );
    reverse.forEach((el) => {
      el.action();
    });
    this.activeItem.forEach((el) => {
      el.action();
    });
  },
  mouseHoverObjects() {
    this.objects.forEach((el) => {
      el.hover =
        el.x + el.r > mouse.x &&
        el.x - el.r < mouse.x &&
        el.y + el.r > mouse.y &&
        el.y - el.r < mouse.y
          ? true
          : false;
    });
  },

  deleteObject(id) {
    this.objects = this.objects.filter((el) => !(el.id == id));
  },
  deleteActiveItem(id) {
    this.activeItem = this.activeItem.filter((el) => !(el.id == id));
  },
  returnAvailableId() {
    let id = this.lastID + 1;
    this.lastID++;
    return id;
  },
  renderObjects() {
    const reverse = this.objects.map(
      (_, index) => this.objects[this.objects.length - 1 - index]
    );
    reverse.forEach((el) => {
      el.render();
    });
  },
  spawnerObjects(width, height) {
    let objNum = getRandomInt(1, 3);
    let speed = 0.05;
    let radius = getRandomInt(10, 50);
    this.addObject({
      x: getRandomInt(0, width - radius),
      y: getRandomInt(0, height - radius),
      xS: getRandomFloat(-this.properties.objects, speed + 1),
      yS: getRandomFloat(-speed, speed + 1),
      r: radius,
      type: objNum == 1 ? "Square" : "Circle",
    });
  },
  checkTouch(x, y, r,id) {
      return this.objects.filter((el) => {
        return (el.id != id) && 
          (el.x + el.r > x - r && el.y - el.r < y + r) &&
          (el.x - el.r < x + r && el.y + el.r > y - r)
      })
  },
};
