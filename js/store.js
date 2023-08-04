let STORE = {
  time: 0,
  activeCursor: "grenade",
  lastID: 0,
  score: 0,
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
        level: 1,
        speed: 15,
        fragments: 30,
        damage: 10,
        range: 2,
      },
    },
  },
  weapon: {
    hand: {
      level: 1,
      recharge: false,
      cooldown: 0.2,
      damage: 20,
    },
  },
  activeWeapon: "hand",
  items: {
    grenade: 50,
  },
  activeItem: [],
  objects: [],

  addPoint(p) {
    this.score += p;
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
      case "Triangle":
        this.objects.push(new Triangle(obj));
        break;
      default:
        console.log("Такого типа не существует");
    }
  },
  activateWeapon() {
    if (this.weapon[this.activeWeapon].recharge) return;

    switch (this.activeWeapon) {
      case "hand":
        let clickObj = this.objects.find((el) => {
          return (
            el.x + el.r > mouse.x &&
            el.x - el.r < mouse.x &&
            el.y + el.r > mouse.y &&
            el.y - el.r < mouse.y
          );
        });
        if (clickObj && !this.weapon[this.activeWeapon].recharge)
          this.addPoint(
            clickObj.getDamage(this.weapon[this.activeWeapon].damage)
          );

        break;
      default:
        console.log("нет такого оружия");
    }

    let activateWeapon = this.weapon[this.activeWeapon];
    this.weapon[this.activeWeapon].recharge = true;
    setTimeout(() => {
      activateWeapon.recharge = false;
    }, this.weapon[this.activeWeapon].cooldown * 1000);
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
    let speed = 1;
    let radius = getRandomInt(10, 50);
    let objNum = getRandomInt(1, 4);
    let objType = 0;
    switch (objNum) {
      case 1:
        objType = "Circle";
        break;
      case 2:
        objType = "Square";
        break;
      case 3:
        objType = "Triangle";
        break;
    }
    this.addObject({
      x: getRandomInt(0, width - radius),
      y: getRandomInt(0, height - radius),
      xS: getRandomFloat(-speed, speed),
      yS: getRandomFloat(-speed, speed),
      r: radius,
      type: objType,
    });
  },
  checkTouch(x, y, r, id) {
    return this.objects.filter((el) => {
      return (
        el.id != id &&
        el.x + el.r > x - r &&
        el.y - el.r < y + r &&
        el.x - el.r < x + r &&
        el.y + el.r > y - r
      );
    });
  },
  upgrade(type, item) {
    switch (type) {
      case "weapon":
        if (STORE.weapon[item].level >= UPGRADES.weapon.hand.length) return;
        let lev = ++STORE.weapon[item].level;

        STORE.weapon[item] = UPGRADES.weapon.hand[STORE.weapon[item].level - 1];
        STORE.weapon[item].level = lev;
        break;
    }
  },
};
