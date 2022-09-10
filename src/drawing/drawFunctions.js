import degrees_to_radians from './helpers';

const clrLight = 'white';

const radialDraw = (context, rotationCircle, rScaleFactor, subdivisions, drawFunction) => {

  const railRadius = rotationCircle.r * rScaleFactor;
  const halfCircle = degrees_to_radians(180);
  const angleDiv = degrees_to_radians(-360/subdivisions);

  for (let i = 1; i<=subdivisions; i++) {
    let angle = i * angleDiv + halfCircle;
    //The point (0,r) ends up at x=rsinθ, y=rcosθ.
    let positionX = railRadius * Math.sin(angle);
    let positionY = railRadius * Math.cos(angle);

    drawFunction(context, rotationCircle, positionX, positionY, i);
    
  }

}

// ROTATIONAL DRAW CALLBACKS
export const drawTicks = (context, rotationCircle, positionX, positionY, index) => {
    
  let lengthMultiplier = 1.08;
  let lineWidth = 3;

  if (index % 5 === 0) {
    lengthMultiplier = 1.2;
    lineWidth = 4;
  }

  context.beginPath();
  context.moveTo(rotationCircle.x + positionX, rotationCircle.y + positionY);
  context.lineTo(rotationCircle.x + positionX * lengthMultiplier, rotationCircle.y + positionY * lengthMultiplier);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.fillStyle = clrLight;
  context.stroke();

};

export const drawNumbers = (context, rotationCircle, positionX, positionY, index) => {

  let numberText = index.toString();

  let textLineHeight = 22;
  let textCenterX = context.measureText(numberText).width / 2;
  let textCenterY = textLineHeight / 2;

  context.font = `${textLineHeight*2}px Impact`;
  context.fillStyle = clrLight;
  context.fillText(numberText, rotationCircle.x + positionX - textCenterX, rotationCircle.y + positionY + textCenterY);

};

export default radialDraw;