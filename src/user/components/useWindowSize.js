import { useState, useEffect } from "react";
import useSSR from 'use-ssr'

export default function useWindowSize() {
  const { isBrowser } = useSSR();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!isBrowser) return;
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isBrowser]);
  return windowSize;
}
