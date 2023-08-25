import { useState, useEffect } from "react";

interface IWindowDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMediumTablet: boolean;
  isLargeTablet: boolean;
  isSmallDesktop: boolean;
  isSmallHeight: boolean;
  isMediumDesktop: boolean;
  x1100: boolean;
}

const getWindowDimensions = (): IWindowDimensions => {
  const { innerWidth: width, innerHeight: height } = window;
  const isMobile: boolean = width < 600;
  const isTablet: boolean = width < 900;
  const isMediumTablet: boolean = width <= 750;
  const isLargeTablet: boolean = width <= 768;
  const isDesktop: boolean = width < 1280;
  const isMediumDesktop: boolean = width < 1150;
  const isSmallDesktop: boolean = width < 1024;
  const isSmallHeight: boolean = height < 820;
  const x1100: boolean = width < 1100 && width > 600;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isMediumTablet,
    isLargeTablet,
    isSmallDesktop,
    isSmallHeight,
    isMediumDesktop,
    x1100,
  };
};

const useWindowDimensions = (): IWindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<IWindowDimensions>(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
