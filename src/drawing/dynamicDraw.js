import * as draw from './drawFunctions'

const dynamicDrawing = (canvas, Clock, props) => {

    const canvasFrame = canvas.getBoundingClientRect();
    canvas.width = canvasFrame.width;
    canvas.height = canvasFrame.height;

    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // INITAL GRAPHICS
    draw.displayRect(ctx, props.clockCircle, 0.3, 0.1, Clock.date);

    draw.rotateHand(ctx, props.clockCircle, 0.85, Clock.secondRatio, draw.handSeconds);
    draw.rotateHand(ctx, props.clockCircle, 0.65, Clock.minuteRatio, draw.handMinutes);
    draw.rotateHand(ctx, props.clockCircle, 0.5, Clock.hourRatio, draw.handHours);

    // window.requestAnimationFrame(dynamicDrawing(canvas, Clock, props));
}

export default dynamicDrawing;