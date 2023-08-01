let STORE = {
  lastID: 0,
  score: 0,
  damage: 15,
  upgrades: {
    objects: {
      circle: {
        radius: 10,
        speed: 100,
        value: 10,
      },
    },
  },
  objects: [

  ],
  addPoint(p) {
    STORE.score += p;
    UPDATE_VIEW_INFO();
  },
  addObject(obj) {
    obj.id = this.returnAvailableId();
    if (!obj.type) {
      let objNum = getRandomInt(1, 3);
      STORE.objects.push(objNum == 1 ? new Square(obj) : new Circle(obj));
    }
    else{
      switch (obj.type) {
        case "Circle":
          STORE.objects.push(new Circle(obj));
          break;
        case "Square":
          STORE.objects.push(new Square(obj));
          break;
        default: console.log("Такого типа не существует")
      }
    }

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
  returnAvailableId(){
    console.log(this.lastID)
    let id = this.lastID + 1
    this.lastID++;
    return id;
  }
};
