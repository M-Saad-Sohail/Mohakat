'use client'
import { useState, useEffect } from "react";

interface windowSize {
  height: number;
  width: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // console.log('win', windowSize)
  return windowSize;
}

