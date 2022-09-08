import React, { Component } from "react";
import styles from './Canvas.module.scss';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: null,
      day: null,
      hours: null,
      minutes: null,
      seconds: null
    };
    this.canvasRef = React.createRef();
    this.contextRef = React.createRef();
    
  }
  // CLASS METHODS
  // setClock () {
  //   const currentDate = new Date();
  //   let seconds = currentDate.getSeconds();

  //   console.log('bambula')

  //   this.setState({
  //     month: 'bambula',
  //     day: null,
  //     hours: null,
  //     minutes: (currentDate.getSeconds() + currentDate.getMinutes()) / 60,
  //     seconds: seconds
  //   });
  // }

  draw () {
    console.log("Hello from Draw");
  }

  // LIFECYCLE

  componentDidMount () {
    this.setClock();
    this.setState({
      month: 'bambula',
      day: null,
      hours: null,
 
    });
    console.log("STATE", this.state);


    const canvas = this.canvasRef.current;
    const canvasFrame = canvas.getBoundingClientRect();
    canvas.width = canvasFrame.width;
    canvas.height = canvasFrame.height;
    console.log("Hello canvas width", canvas.width);
    console.log("Hello canvas height", canvas.height);

    const ctx = canvas.getContext('2d');
    ctx.scale(2,2);
    ctx.lineCap = 'round';

    // CRTEATE MODULE SYSTEM AND FUNCTIONS INSIDE THEM
    ctx.beginPath();
    ctx.rect(30,30,30,30);
    ctx.stroke();

    this.contextRef.current = ctx;
  }


  render () {
    return (
      <div className={styles.canvasWrapper}>
        <canvas 
          className={styles.canvas}
          ref={this.canvasRef}
        >
          Your browser does not support HTML canvas.
        </canvas>
      </div>
    )
  }
};

export default Canvas;