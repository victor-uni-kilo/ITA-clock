export const Circle = function (props) {
    this.x = props.x 
    this.y = props.y 
    this.r = props.r ? props.r : this.y;
  }

export const Rect = function (ref, wFactor, hFactor, flip) {
  this.width = ref.r * wFactor;
  this.height = ref.r * hFactor;
  if (flip) {
    this.x = ref.x - ref.r / 2 - this.width / 2;
  }
  this.x = ref.x + ref.r / 2 - this.width / 2;
  this.y = ref.y - this.height / 2
}
