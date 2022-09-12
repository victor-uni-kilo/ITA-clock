import degrees_to_radians from './helpers';
import COLORS from './COLORS';



export function radial (context, refCircle, rScaleFactor, subdivisions, drawCallback) {

  const railRadius = refCircle.r * rScaleFactor;
  const halfCircle = degrees_to_radians(180);
  const angleDiv = degrees_to_radians(360/subdivisions * -1);

  for (let i = 1; i<=subdivisions; i++) {
    let angle = i * angleDiv + halfCircle;
    //The point (0,r) ends up at x=rsinθ, y=rcosθ.
    let positionX = railRadius * Math.sin(angle);
    let positionY = railRadius * Math.cos(angle);

    drawCallback(context, refCircle, positionX, positionY, i);
  }

}

// ROTATIONAL DRAW CALLBACKS
export const ticks = (context, refCircle, positionX, positionY, index) => {
    
  let lengthMultiplier = 1.08;
  let lineWidth = refCircle.getRelativeLineWeight * 0.005;

  if (index % 5 === 0) {
    lengthMultiplier = 1.2;
    lineWidth = lineWidth * 1.5;
  }

  context.beginPath();
  context.moveTo(refCircle.x + positionX, refCircle.y + positionY);
  context.lineTo(refCircle.x + positionX * lengthMultiplier, refCircle.y + positionY * lengthMultiplier);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = COLORS.PRIMARY;
  context.stroke();

};

export const numbers = (context, refCircle, positionX, positionY, index) => {

  let numberText = index.toString();

  let textLineHeight = refCircle.r * 0.08;
  let textCenterX = context.measureText(numberText).width / 2;
  let textCenterY = textLineHeight / 1.25;

  context.font = `${textLineHeight*2}px Impact`;
  context.fillStyle = COLORS.LIGHT;
  context.fillText(numberText, refCircle.x + positionX - textCenterX, refCircle.y + positionY + textCenterY);

};

// -----------HAND OF A CLOCK------------
export const rotateHand = (context, refCircle, rScaleFactor, timeRatio, drawCallback) => {

  const railRaius = refCircle.r * rScaleFactor;
  const halfCircle = degrees_to_radians(180);
  const angleDiv = degrees_to_radians(-360 * timeRatio);
  const angle = halfCircle + angleDiv;
  //The point (0,r) ends up at x=rsinθ, y=rcosθ.
  let positionX = railRaius * Math.sin(angle);
  let positionY = railRaius * Math.cos(angle);
  
  drawCallback(context, refCircle, positionX, positionY, railRaius, angle);
    

}
// HAND OF A CALLBACK
export const handSeconds = (context, refCircle, x, y) => {

  context.beginPath();
  context.moveTo(refCircle.x, refCircle.y);
  context.lineTo(refCircle.x + x, refCircle.y + y);
  context.lineWidth = refCircle.getRelativeLineWeight(1);
  context.lineCap = "round";
  context.strokeStyle = COLORS.RED;
  context.stroke();
};

export const handMinutes = (context, refCircle, x, y, railRadius, angle) => {

  const markLength = 0.3;

  let markX = railRadius * markLength * Math.sin(angle);
  let markY = railRadius * markLength * Math.cos(angle);

  context.beginPath();
  context.moveTo(refCircle.x, refCircle.y);
  context.lineTo(refCircle.x + x, refCircle.y + y);
  context.lineWidth = refCircle.getRelativeLineWeight(4);
  context.lineCap = "round";
  context.strokeStyle = COLORS.SECONDARY;
  context.stroke();

  context.beginPath();
  context.moveTo(refCircle.x + markX, refCircle.y + markY);
  context.lineTo(refCircle.x + x, refCircle.y + y);
  context.lineWidth = refCircle.getRelativeLineWeight(1);
  context.lineCap = "round";
  context.strokeStyle = COLORS.PRIMARY;
  context.stroke();
};

export const handHours = (context, refCircle, x, y, railRadius, angle) => {

  const pointerCircleScale = 0.15;
  const pointerRadius = refCircle.r * pointerCircleScale;
  const handLength = railRadius - pointerRadius;
  const handX = handLength * Math.sin(angle);
  const handY = handLength * Math.cos(angle);

  context.beginPath();
  context.arc(refCircle.x + x, refCircle.y + y, pointerRadius, 0, 2 * Math.PI, false);
  context.strokeStyle = COLORS.SECONDARY;
  context.lineWidth = refCircle.getRelativeLineWeight(4);
  context.stroke();

  context.beginPath();
  context.moveTo(refCircle.x, refCircle.y);
  context.lineTo(refCircle.x + handX, refCircle.y + handY);
  context.lineWidth = refCircle.getRelativeLineWeight(4);
  context.strokeStyle = COLORS.SECONDARY;
  context.stroke();

  context.beginPath();
  context.arc(refCircle.x + x, refCircle.y + y, pointerRadius, 0, 2 * Math.PI, false);
  context.strokeStyle = COLORS.PRIMARY;
  context.lineWidth = refCircle.getRelativeLineWeight(1);
  context.stroke();

  context.beginPath();
  context.moveTo(refCircle.x, refCircle.y);
  context.lineTo(refCircle.x + handX, refCircle.y + handY);
  context.lineWidth = refCircle.getRelativeLineWeight(1);
  context.strokeStyle = COLORS.PRIMARY;
  context.stroke();

  // CENTER CIRCLES
  context.beginPath();
  context.arc(refCircle.x, refCircle.y, refCircle.r * 0.03, 0, 2 * Math.PI, false);
  context.fillStyle = COLORS.PRIMARY;
  context.fill();

  context.beginPath();
  context.arc(refCircle.x, refCircle.y, refCircle.r * 0.01, 0, 2 * Math.PI, false);
  context.fillStyle = COLORS.PRIMARY;
  context.fill();

};

export const displayRect = (context, refCircle, wFactor, hFactor, info) => {
  
  const width = refCircle.r * wFactor;
  const height = refCircle.r * hFactor;
  const widthOffset = refCircle.r * 0.25 - width / 2;
  
  const x = refCircle.x + widthOffset;
  const y = refCircle.y - height / 2;

  context.beginPath();
  context.rect(x, y, width, height);
  context.fillStyle = COLORS.SECONDARY;
  context.strokeStyle = COLORS.PRIMARY;
  context.stroke();
  context.fill();

  let textLineHeight = height * 0.8;
  let textWidth = width * 0.05;

  context.font = `${textLineHeight}px Impact`;
  context.fillStyle = COLORS.LIGHT;
  context.fillText(info, x + textWidth, y + textLineHeight);

}

