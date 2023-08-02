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
        speed:15,
        fragments: 30,
        damage: 5,
        range:2,
      },
    },
  },
  items: {
    grenade: 5,
  },
  activeItem: [],
  objects: [],

  addPoint(p) {
    STORE.score += p;
    UPDATE_VIEW_INFO();
  },
  addObject(obj) {
    obj.id = this.returnAvailableId();
    switch (obj.type) {
      case "Circle":
        STORE.objects.push(new Circle(obj));
        break;
      case "Square":
        STORE.objects.push(new Square(obj));
        break;
      default:
        console.log("Такого типа не существует");
    }
  },
  activateItem(info) {
    console.log(info)
    if (info.type == "grenade" && STORE.items.grenade > 0) {
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
      STORE.items.grenade--;
    }
  },
  active() {
    const reverse = STORE.objects.map(
      (_, index) => STORE.objects[STORE.objects.length - 1 - index]
    );
    reverse.forEach((el) => {
      el.action();
    });
    STORE.activeItem.forEach((el) => {
      el.action();
    });
  },
  mouseHoverObjects() {
    STORE.objects.forEach((el) => {
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
    STORE.objects = STORE.objects.filter((el) => !(el.id == id));
  },
  deleteActiveItem(id) {
    STORE.activeItem = STORE.activeItem.filter((el) => !(el.id == id));
  },
  returnAvailableId() {
    let id = this.lastID + 1;
    this.lastID++;
    return id;
  },
  renderObjects() {
    const reverse = STORE.objects.map(
      (_, index) => STORE.objects[STORE.objects.length - 1 - index]
    );
    reverse.forEach((el) => {
      el.render();
    });
  },
  spawnerObjects(width, height) {
    let objNum = getRandomInt(1, 3);
    let speed = 0.05;
    let radius = getRandomInt(10, 50);
    STORE.addObject({
      x: getRandomInt(0, width - radius),
      y: getRandomInt(0, height - radius),
      xS: getRandomFloat(-this.properties.objects, speed + 1),
      yS: getRandomFloat(-speed, speed + 1),
      r: radius,
      type: objNum == 1 ? "Square" : "Circle",
    });
  },
};
