import Circle from './definitions';
import * as draw from './drawFunctions';
import COLORS from './COLORS';

const staticDrawing = (canvas) => {

    const canvasFrame = canvas.getBoundingClientRect();
    canvas.width = canvasFrame.width;
    canvas.height = canvasFrame.height;

    const ctx = canvas.getContext('2d');

    // MAIN CIRCLE
    const clockCircle = new Circle(
      canvas.width * 0.5, 
      canvas.height * 0.5,
      canvas.height * 0.45,
    );

    const clockInnerCircle = new Circle(
      clockCircle.x, 
      clockCircle.y,
      clockCircle.r * 0.9,
    );

    clockCircle.draw(ctx, COLORS.DARK, clockCircle.getRelativeLineWeight(4), COLORS.LIGHT);
    clockInnerCircle.draw(ctx, null,  clockCircle.getRelativeLineWeight(1), COLORS.LIGHT);

    draw.radial(ctx, clockCircle, 0.7, 60, draw.ticks);
    draw.radial(ctx, clockCircle, 0.5, 12, draw.numbers);

    // Send Dependencies to another context
    return {clockCircle};
}

export default staticDrawing;