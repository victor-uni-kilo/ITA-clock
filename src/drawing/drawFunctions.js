import degrees_to_radians from './helpers';

export const circle = (context, circle, scaleFactor, fill, strokeWidth, stroke) => {

  const radius = circle.r * scaleFactor;
  context.beginPath();
  context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
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


export const radial = (context, rotationCircle, rScaleFactor, subdivisions, drawFunction) => {

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
export const ticks = (context, rotationCircle, positionX, positionY, index) => {
    
  let lengthMultiplier = 1.08;
  let lineWidth = rotationCircle.r * 0.005;

  if (index % 5 === 0) {
    lengthMultiplier = 1.2;
    lineWidth = lineWidth * 1.5;
  }

  context.beginPath();
  context.moveTo(rotationCircle.x + positionX, rotationCircle.y + positionY);
  context.lineTo(rotationCircle.x + positionX * lengthMultiplier, rotationCircle.y + positionY * lengthMultiplier);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#f7b418";
  context.stroke();

};

export const numbers = (context, rotationCircle, positionX, positionY, index) => {

  let numberText = index.toString();

  let textLineHeight = rotationCircle.r * 0.08;
  let textCenterX = context.measureText(numberText).width / 2;
  let textCenterY = textLineHeight / 2;

  context.font = `${textLineHeight*2}px Impact`;
  context.fillStyle = "white";
  context.fillText(numberText, rotationCircle.x + positionX - textCenterX, rotationCircle.y + positionY + textCenterY);

};

// HAND OF A CLOCK
export const rotateHand = (context, rotationCircle, rScaleFactor, timeRatio, drawFunction) => {

  const railRadius = rotationCircle.r * rScaleFactor;
  const halfCircle = degrees_to_radians(180);
  const angleDiv = degrees_to_radians(-360 * timeRatio);
  const angle = halfCircle + angleDiv;
  //The point (0,r) ends up at x=rsinθ, y=rcosθ.
  let positionX = railRadius * Math.sin(angle);
  let positionY = railRadius * Math.cos(angle);
  
  drawFunction(context, rotationCircle, positionX, positionY, railRadius, angle);
    

}
// HAND OF A CALLBACK
export const handSeconds = (context, rotationCircle, x, y) => {

  context.beginPath();
  context.moveTo(rotationCircle.x, rotationCircle.y);
  context.lineTo(rotationCircle.x + x, rotationCircle.y + y);
  context.lineWidth = 3;
  context.lineCap = "round";
  context.strokeStyle = 'red';
  context.stroke();
};

export const handMinutes = (context, rotationCircle, x, y, railRadius, angle) => {

  const markLength = 0.3;

  let markX = railRadius * markLength * Math.sin(angle);
  let markY = railRadius * markLength * Math.cos(angle);

  context.beginPath();
  context.moveTo(rotationCircle.x, rotationCircle.y);
  context.lineTo(rotationCircle.x + x, rotationCircle.y + y);
  context.lineWidth = 6;
  context.lineCap = "round";
  context.strokeStyle = '#2b2a28';
  context.stroke();

  context.beginPath();
  context.moveTo(rotationCircle.x + markX, rotationCircle.y + markY);
  context.lineTo(rotationCircle.x + x, rotationCircle.y + y);
  context.lineWidth = 2;
  context.lineCap = "round";
  context.strokeStyle = '#f7b418';
  context.stroke();
};

export const handHours = (context, rotationCircle, x, y, railRadius, angle) => {

  const pointerCircleScale = 0.15;
  const pointerRadius = rotationCircle.r * pointerCircleScale;
  const handLength = railRadius - pointerRadius;
  const handX = handLength * Math.sin(angle);
  const handY = handLength * Math.cos(angle);
  
  const colorPrimary = '#f7b418';
  const colorSecondary = '#2b2a28';
  // const lineWidth =


  context.beginPath();
  context.arc(rotationCircle.x + x, rotationCircle.y + y, pointerRadius, 0, 2 * Math.PI, false);
  context.strokeStyle = colorSecondary;
  context.lineWidth = 6;
  context.stroke();

  context.beginPath();
  context.moveTo(rotationCircle.x, rotationCircle.y);
  context.lineTo(rotationCircle.x + handX, rotationCircle.y + handY);
  context.lineWidth = 8;
  context.strokeStyle = colorSecondary;
  context.stroke();

  context.beginPath();
  context.arc(rotationCircle.x + x, rotationCircle.y + y, pointerRadius, 0, 2 * Math.PI, false);
  context.strokeStyle = colorPrimary;
  context.lineWidth = 2;
  context.stroke();

  context.beginPath();
  context.moveTo(rotationCircle.x, rotationCircle.y);
  context.lineTo(rotationCircle.x + handX, rotationCircle.y + handY);
  context.lineWidth = 2;
  context.strokeStyle = colorPrimary;
  context.stroke();

  // CENTER CIRCLES
  context.beginPath();
  context.arc(rotationCircle.x, rotationCircle.y, rotationCircle.r * 0.03, 0, 2 * Math.PI, false);
  context.fillStyle = colorPrimary;
  context.fill();

  context.beginPath();
  context.arc(rotationCircle.x, rotationCircle.y, rotationCircle.r * 0.01, 0, 2 * Math.PI, false);
  context.fillStyle = colorSecondary;
  context.fill();

};

export const infoRect = (context, circle, wFactor, hFactor, flip = false, info) => {

  
  const width = circle.r * wFactor;
  const height = circle.r * hFactor;
  const widthOffset = circle.r * 0.25 - width / 2;
  console.log("wO", widthOffset);
  
  let x;
  if (flip) {
    x = circle.x - widthOffset
  } else {
    x = circle.x + widthOffset;
  }
  const y = circle.y - height / 2;

  console.log('HelloinfoRect', x, y);
  console.log(x);

  const colorPrimary = '#f7b418';
  const colorSecondary = '#2b2a28';
  const colorText = 'white';

  context.beginPath();
  context.rect(x, y, width, height);
  context.fillStyle = colorSecondary;
  context.strokeStyle = colorPrimary;
  context.stroke();
  context.fill();

  let textLineHeight = height * 0.8;
  let textLineWidth = width * 0.05;
  // let textCenterX = context.measureText(numberText).width / 2;
  // let textCenterY = textLineHeight / 2;
  context.font = `${textLineHeight}px Impact`;
  context.fillStyle = colorText;
  context.fillText(info, x + textLineWidth, y + textLineHeight);


}

