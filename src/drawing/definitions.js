const Circle = function (props) {
    this.x = props.x 
    this.y = props.y 
    this.r = props.r ? props.r : this.y;
    this.draw = function (context) {
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      if (props.fill) {
        context.fill();
        context.fillStyle = props.fill;
      }

      if (props.stroke) {
        context.strokeStyle = props.stroke;
        context.stroke();
      } 
    }
  }

export default Circle;