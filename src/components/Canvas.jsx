import React, { useRef, useEffect } from "react";
import styles from './Canvas.module.scss';
import staticDrawing from "../drawing/staticDraw";
import dynamicDrawing from "../drawing/dynamicDraw";
import { useWindowSize } from "../hooks/windowResize";

const Canvas = () => {
  
  const staticCanvasRef = useRef(null);
  const dynamicCanvasRef = useRef(null);

  const setClock = () => {
    const currentDate = new Date();
    const splitDate = currentDate.toString().split(" ");
    const day = splitDate[2];
   

    const dayLastDigit = day.charAt(day.length - 1);
    let suffix = '';
    switch (day) {
      case "11":
      case "12":  
      case "13":
        suffix = 'th';
        break;
      default:
        switch (dayLastDigit) {
          case "1":
              suffix = 'st';
            break;
          case "2":
              suffix = 'nd';
            break;
          case "3":
              suffix = 'rd';
            break;
          default:
            suffix = 'th';
            break;
        }
      break;
    }

    const date = `${splitDate[1].toUpperCase()} ${day}${suffix}`;

    function Clock() 
    {
      this.secondRatio = currentDate.getSeconds() / 60;
      this.minuteRatio = (this.secondRatio + currentDate.getMinutes()) / 60;
      this.hourRatio = (this.minuteRatio + currentDate.getHours()) / 12;
      this.date = date;
    }

    return new Clock();
  }

  
  const windowSize = useWindowSize();

  useEffect(() => {
    const staticCanvas = staticCanvasRef.current;
    const dynamicCanvas = dynamicCanvasRef.current;

    let staticCanvasProps = staticDrawing(staticCanvas);
    //initialize dynamicDrawing
    dynamicDrawing(dynamicCanvas, setClock(), staticCanvasProps);

    const intervalID = setInterval(() => {
      dynamicDrawing(dynamicCanvas, setClock(), staticCanvasProps);
    }, 1000);
  
    return ( () => {clearInterval(intervalID)});
    
    // OVO NE MOZE :( :(
    // requestAnimationFrame(() => dynamicDrawing(dynamicCanvas, setClock(), staticCanvasProps));

  }, [windowSize]);



  return (
    <div className={styles.canvasWrapper}>
      <canvas 
        className={styles.canvas}
        ref={staticCanvasRef}
      >
        Your browser does not support HTML canvas.
      </canvas>
      <canvas 
        className={styles.canvas}
        ref={dynamicCanvasRef}
      >
      </canvas>
    </div>
  )
};

export default Canvas;