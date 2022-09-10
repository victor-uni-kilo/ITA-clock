import React, { Component } from "react";
import styles from './Canvas.module.scss';
import drawing from "../drawing/mainDraw";
import dynamicDrawing from "../drawing/dynamicDraw";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      // date: this.state.dateObj.getDate(),
      // day: this.weekday[this.state.dateObj.getDay()],
      // month: this.state.getMonth();
    }
    this.staticCanvasRef = React.createRef();
    this.dynamicCanvasRef = React.createRef();
    // this.contextRef = React.createRef();
    // this.contextRef = React.createRef();
  }

  setClock () {
    const currentDate = new Date();
  
    function Clock() 
    {
      this.secondRatio = currentDate.getSeconds() / 60;
      this.minuteRatio = (this.secondRatio + currentDate.getMinutes()) / 60;
      this.hourRatio = (this.minuteRatio + currentDate.getHours()) / 12;
    }

    return new Clock();
  }

  // setDate = () => {
  //   const now = new Date();
  //   const splitDate = now.toString().split(" ");
  //   let currentDate = {
  //     dayOfWeek: splitDate[0].toUpperCase,
  //     month:  splitDate[1].toUpperCase,
  //     day: splitDate[2],
  //   }
  //   return currentDate
  // }

  // LIFECYCLE

  componentDidMount () {
    // console.log('COMPONENT DID MOUNT')

    const staticCanvas = this.staticCanvasRef.current;
    const dynamicCanvas = this.dynamicCanvasRef.current;

    let staticCanvasProps = drawing(staticCanvas);

    setInterval(() => {
      console.log(this.setClock());
      dynamicDrawing(dynamicCanvas, this.setClock(), staticCanvasProps);
    }, 1000);
    
  };
  
  // shouldComponentUpdate (prevProps, prevState) {
    //   USE THIS TO UPDATE CLOCK ONLY EACH DAY
    // };
    
    
    render () {
    return (
      <div className={styles.canvasWrapper}>
        <canvas 
          className={styles.canvas}
          ref={this.staticCanvasRef}
        >
          Your browser does not support HTML canvas.
        </canvas>
        <canvas 
          className={styles.canvas}
          ref={this.dynamicCanvasRef}
        >
        </canvas>
      </div>
    )
  }
};

export default Canvas;