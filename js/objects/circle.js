class Circle extends Object {
  constructor(obj) {
    super(obj); // вызывает конструктор super класса и передаёт параметр name
  }
  render() {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255,248,220)";
    ctx.fillStyle = "rgba(255,248,220)";
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if(this.hover){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.r + 6, 0, Math.PI * 2);
        ctx.stroke();
    }

    this.renderText()
  
  }
}
