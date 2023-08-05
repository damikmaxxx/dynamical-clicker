class Triangle extends Object {
  rotate = getRandomInt(0,181);
  constructor(obj) {
    super(obj);
  }

  render() {
    this.rotate += 0.02;
    this.triangleCreate()

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.triangle.x1, this.triangle.y1);
    ctx.lineTo(this.triangle.x2, this.triangle.y2);
    ctx.lineTo(this.triangle.x3, this.triangle.y3);
    ctx.lineTo(this.triangle.x1, this.triangle.y1);
    ctx.closePath();
    
    ctx.fill();

    if (this.hover && !this.isParticle) {
        console.log()
        this.triangleCreate(this.r + this.r*0.5 + 10)
        ctx.beginPath();
        ctx.moveTo(this.triangle.x1, this.triangle.y1);
        ctx.lineTo(this.triangle.x2, this.triangle.y2);
        ctx.lineTo(this.triangle.x3, this.triangle.y3);
        ctx.lineTo(this.triangle.x1, this.triangle.y1);
        ctx.closePath();
        ctx.stroke();
    }
    this.renderText();
  }
  triangleCreate(R = this.r + this.r*0.5 ){
    this.triangle = {
        x1: this.x + R*  Math.cos(this.rotate),
        y1: this.y + R * Math.sin(this.rotate),
  
        x2: this.x + R * Math.cos(this.rotate + (2 * Math.PI) / 3),
        y2: this.y + R * Math.sin(this.rotate + (2 * Math.PI) / 3),
  
        x3: this.x + R * Math.cos(this.rotate + (4 * Math.PI) / 3),
        y3: this.y + R * Math.sin(this.rotate + (4 * Math.PI) / 3),
      };
  }
}
