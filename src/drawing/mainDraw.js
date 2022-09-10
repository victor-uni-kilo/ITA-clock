import Circle from './definitions';
import radialDraw, {drawTicks, drawNumbers} from './drawFunctions'


const drawing = (canvas) => {

    const canvasFrame = canvas.getBoundingClientRect();
    canvas.width = canvasFrame.width;
    canvas.height = canvasFrame.height;

    // console.log("Hello canvas width", canvas.width);
    // console.log("Hello canvas height", canvas.height);
    
    const ctx = canvas.getContext('2d');
    // ------- STATIC DRAWING -------

    // MAIN CIRCLE 
    const contextCircle = new Circle({
        x: canvas.width * 0.5, 
        y: canvas.height * 0.5,
        r: canvas.height * 0.5,
        fill: null,
        stroke: 'white'
      });

    contextCircle.draw(ctx);

    // CLOCK and DATE circles
    const clockToDateRatio = 0.7;

    const clockCircle = new Circle({
        x: contextCircle.x, 
        y: contextCircle.y * clockToDateRatio,
        r: contextCircle.y * clockToDateRatio,
        fill: null,
        stroke: 'white'
    });

    const dateCircle = new Circle({
        x: contextCircle.x, 
        y: clockCircle.y * 2 + contextCircle.r * (1 - clockToDateRatio),
        r: contextCircle.r * (1 - clockToDateRatio),
        fill: null,
        stroke: 'white'
    });

    clockCircle.draw(ctx);
    dateCircle.draw(ctx);

    // const clockInnerCircle = new Circle({
    //     x: clockCircle.x,
    //     y: clockCircle.y, 
    //     r: clockCircle.r * 0.8,
    //     fill: null,
    //     stroke: 'white'
    // });

    // ctx.restore();
    // ctx.scale(0.8, 0.8);
    // clockCircle.draw();

    radialDraw(ctx, clockCircle, 0.8, 60, drawTicks);
    radialDraw(ctx, clockCircle, 0.6, 12, drawNumbers);
    
    return {ctx, clockCircle};
}

export default drawing;