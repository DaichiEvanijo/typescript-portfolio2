import { useEffect, useState } from "react";

export const useWindowSize = () =>{
  const [windowSize, setWindowSize] = useState(1920)
  
  useEffect(() =>{
    const handleWindowSizChange = () =>{
      setWindowSize(window.innerWidth)
    }
    window.addEventListener("resize", handleWindowSizChange)
  
    return () => {
      window.removeEventListener("resize",handleWindowSizChange)
    }
  },[])

  return windowSize
}