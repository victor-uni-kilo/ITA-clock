export default class Circle {
  constructor(x, y, r) {
    this.x = x 
    this.y = y 
    this.r = r ? r : this.y;
  }

  draw (context, fill, strokeWidth, stroke) {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }

    if (strokeWidth) {
      context.lineWidth = strokeWidth;
    } 

    if (stroke) {
      context.strokeStyle = stroke;
      context.stroke();
    } 
  }

  getRelativeLineWeight (lineWeightFactor) {
    // NOTE: 200 is a magic number
    return this.r / 200 * lineWeightFactor;

  }
}

