import {useEffect, useState} from 'react';

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ windowWidth: 0, windowHeight: 0 });
  
    useEffect(() => {
      function updateSize() {
        setWindowSize({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
      }
  
      window.addEventListener("resize", updateSize);
      updateSize();
  
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return windowSize;
  }