import { Circle } from './definitions';
import * as draw from './drawFunctions'


const drawing = (canvas) => {

    const canvasFrame = canvas.getBoundingClientRect();
    canvas.width = canvasFrame.width;
    canvas.height = canvasFrame.height;

    const ctx = canvas.getContext('2d');

    const clockCircle = new Circle({
      x: canvas.width * 0.5, 
      y: canvas.height * 0.5,
      r: canvas.height * 0.45,
    });


    draw.circle(ctx, clockCircle, 1, '#171a1e', 8, 'white');
    draw.circle(ctx, clockCircle, 0.9, null, 2, 'white');
    
    // draw.circle(ctx, dateCircle, 1,'#171a1e', 10 , 'white');

    // ctx.beginPath();
    // ctx.moveTo(dateCircle.x - dateCircle.r, dateCircle.y);
    // ctx.moveTo(dateCircle.x + dateCircle.r, dateCircle.y);
    // ctx.lineWidth = dateCircle.r * 0.001
    // ctx.stroke();

    draw.radial(ctx, clockCircle, 0.7, 60, draw.ticks);
    draw.radial(ctx, clockCircle, 0.5, 12, draw.numbers);

 

    return {ctx, clockCircle};
}

export default drawing;