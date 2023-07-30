let STORE = {
  SCORE: 0,
  objects: [
    new Circle({ id: 1, x: 100, y: 100, xS: 1, yS: 1, r: 50,hover:false, }),
    new Circle({ id: 2, x: 200, y: 200, xS: 2, yS: -1, r: 20,hover:false, }),
  ],
  addPoint(p) {
    STORE.SCORE += p;
    updateScore();
  },
};

function addObject(obj){
  
  STORE.objects.push(
    new Circle(obj)
  );
  STORE.COUNT_ELEMENTS += STORE.objects.length;
}

function mouseHover(){
  STORE.objects.forEach((el) => {
      el.hover = el.x + el.r > mouse.x &&
      el.x - el.r < mouse.x &&
      el.y + el.r > mouse.y &&
      el.y - el.r < mouse.y ? true : false;
  });
}