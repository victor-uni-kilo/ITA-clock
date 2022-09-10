// import Circle from './definitions';
import radialDraw, {drawTicks, drawNumbers} from './drawFunctions'
// import setClock from './Clock';
import degrees_to_radians from './helpers';

const dynamicDrawing = (canvas, Clock, props) => {

    const canvasFrame = canvas.getBoundingClientRect();
    canvas.width = canvasFrame.width;
    canvas.height = canvasFrame.height;

    const ctx = canvas.getContext('2d');
    console.log("HELLO AGAIN");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // INITAL GRAPHICS
    const rotateHand = (context, rotationCircle, rScaleFactor, timeRatio) => {

        const railRadius = rotationCircle.r * rScaleFactor;
        const halfCircle = degrees_to_radians(180);
        const angleDiv = degrees_to_radians(-360 * timeRatio);
        const angle = halfCircle + angleDiv;
        const handLength = props.clockCircle.r * rScaleFactor;
          //The point (0,r) ends up at x=rsinθ, y=rcosθ.
          let positionX = railRadius * Math.sin(angle);
          let positionY = railRadius * Math.cos(angle);
      
          context.beginPath();
          context.moveTo(props.clockCircle.x, props.clockCircle.y);
          context.lineTo(props.clockCircle.x + positionX, props.clockCircle.y + positionY);
          ctx.strokeStyle = 'red'
          context.stroke();
          
      
      }

    //   ctx.font = `50px Impact`;
    //   ctx.fillStyle = 'red';
    //   ctx.fillText(Clock.secondRatio, 300, 300);

    rotateHand(ctx, props.clockCircle, 0.5, Clock.secondRatio);
    
    // Clock >> SETINTEVAL >> RADIAL MOVE
 
}

export default dynamicDrawing;