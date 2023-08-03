class Circle extends Object {
  constructor(obj) {
    super(obj);
  }

  render() {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (this.hover && !this.isParticle) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(this.x, this.y, this.r + 6, 0, Math.PI * 2);
      ctx.stroke();
    }
    this.renderText();
  }
}

