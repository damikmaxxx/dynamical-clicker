let STORE = {
  time: 0,
  activeCursor: {
    weapons: {
      name: "hand",
      recharge: false,
    },
    magic: {
      name: "circleElements",
      recharge: false,
    },
    items: {
      name: "grenade",
      recharge: false,
    },
  },
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
        name: "граната",
        level: 1,
        speed: 15,
        fragments: 30,
        damage: 10,
        range: 2,
        cooldown: 2,
      },
    },
    weapons: {
      hand: {
        name: "рука",
        level: 1,

        cooldown: 0.2,
        damage: 20,
      },
    },
    magic: {
      circleElements: {
        name: "придумать",
        level: 1,
        damage: 5,
        fragments: 30,
        cooldown: 10,
      },
    },
  },

  items: {
    grenade: 50,
  },
  activeItem: [],
  objects: [],
  magicAnimation: new magicAnimation(),
  addPoint(p) {
    this.score += p;
  },
  addObject(obj) {
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
    if (this.activeCursor.weapons.recharge) return;
    let activeW = this.activeCursor.weapons.name;
    switch (activeW) {
      case "hand":
        let clickObj = this.objects.find((el) => {
          return (
            el.x + el.r > mouse.x &&
            el.x - el.r < mouse.x &&
            el.y + el.r > mouse.y &&
            el.y - el.r < mouse.y
          );
        });
        if (clickObj && !this.activeCursor.weapons.recharge)
          this.addPoint(
            clickObj.getDamage(this.properties.weapons[activeW].damage)
          );

        break;
      default:
        console.log("нет такого оружия");
    }

    let activateWeapon = this.activeCursor.weapons;

    this.activeCursor.weapons.recharge = true;
    this.animateCooldown("weapon", this.properties.weapons[activeW].cooldown);
    setTimeout(() => {
      activateWeapon.recharge = false;
    }, this.properties.weapons[activeW].cooldown * 1000);
  },
  animateCooldown(type, sec) {
    let typeEl;
    console.log(type);
    typeEl = document.querySelector("#cooldown-" + type).querySelector('.coldown-stage');
    console.log(typeEl);
    typeEl.style.animationDuration = sec + "s";
    typeEl.classList.add("cooldown-stage-animation");
    setTimeout(() => {
      typeEl.classList.remove("cooldown-stage-animation");
    }, sec * 1000);
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
      this.animateCooldown("item", this.properties.items[this.activeCursor.items.name].cooldown);
    }
  },
  activateMagic() {
    this.magicAnimation.start("circleElements", (x = mouse.x), (y = mouse.y));
    this.animateCooldown("magic",   this.properties.magic[this.activeCursor.magic.name].cooldown);
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

    this.magicAnimation.update();
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
  deleterArrObject(arrId) {
    for (let i = 0; i < arrId.length; i++) {
      this.objects = this.objects.filter((el) => !(el.id == id));
    }
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
        if (
          STORE.properties.weapons[item].level >= UPGRADES.weapons.hand.length
        )
          return;
        let lev = ++STORE.properties.weapons[item].level;
        STORE.properties.weapons[item] =
          UPGRADES.weapons.hand[STORE.properties.weapons[item].level - 1];
        STORE.properties.weapons[item].level = lev;
        break;
    }
  },
  getObjectsById(arrId) {
    arrObjects = [];
    for (let i = 0; i < arrId.length; i++) {
      arrObjects.push(
        this.objects.find((el) => {
          return el.id == arrId[i];
        })
      );
    }
    return arrObjects;
  },
};
