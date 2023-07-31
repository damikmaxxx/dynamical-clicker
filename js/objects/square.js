class Square extends Object {
  rotate = 0;
  constructor(obj) {
    super(obj); // вызывает конструктор super класса и передаёт параметр name
  }
  render() {
    this.rotate++;
    console.log(this.x, this.y, inRad(this.rotate));
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(inRad(this.rotate));

    ctx.strokeStyle = "rgba(255,248,220)";
    ctx.fillStyle = "rgba(255,248,220)";
    ctx.fillRect(-this.r, -this.r, this.r * 2, this.r * 2);

    if (this.hover) {
        let d = 10;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeRect(-this.r - d/2, -this.r - d/2, this.r * 2 + d, this.r * 2 + d);
      ctx.stroke();
    }
    ctx.rotate(inRad(-this.rotate));
    ctx.translate(-this.x, -this.y);
    this.renderText();
  }
}
