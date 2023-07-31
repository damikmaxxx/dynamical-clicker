let STORE = {
  SCORE: 0,
  damage:15,
  objects: [
    new Circle({ id: 1, x: 100, y: 100, xS: 1, yS: 1, r: 50, hover: false,value:10, }),
    new Circle({ id: 2, x: 200, y: 200, xS: 2, yS: -1, r: 20, hover: false,value:10, }),
  ],
  addPoint(p) {
    STORE.SCORE += p;
    UPDATE_VIEW_INFO();
  },
  addObject(obj) {
    STORE.objects.push(new Circle(obj));
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
    
  }
};

