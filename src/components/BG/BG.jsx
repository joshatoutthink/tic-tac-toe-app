import React, { useState, useEffect } from "react";
import "./BG-styles.css";
function BG() {
  const [[windowWidth, windowHeight], setWindowSize] = useState([1223, 740]);
  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);
  const hRatio = windowWidth / windowHeight;
  const wRatio = windowHeight / windowWidth;

  return (
    <div className="bg">
      <svg
        id="#svg-bg"
        viewBox={`0 0 ${windowWidth} ${windowHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <rect width={windowWidth} height={windowHeight} fill="#6100DC" />
          <g filter="url(#filter0_f)">
            <circle
              cx={1145 / wRatio}
              cy={262 / hRatio}
              r={600 / (wRatio * hRatio)}
              fill="#CA00DC"
            />
          </g>
          <g filter="url(#filter0_f)">
            <circle
              cx={wRatio * 446}
              cy={hRatio * 740}
              r={900 / (wRatio * hRatio)}
              fill="hsl(43 93% 85%)"
            />
          </g>
          <g filter="url(#filter0_f)">
            <circle
              cx={25 / wRatio}
              cy={262 / hRatio}
              r={700 / (wRatio * hRatio)}
              fill="#13EDFBbb"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f"
            x={0 - windowWidth / 4}
            y={0 - windowHeight / 4}
            width={windowWidth + windowWidth / 2}
            height={windowHeight + windowHeight / 2}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="200"
              result="effect1_foregroundBlur"
            />
          </filter>

          <clipPath id="clip0">
            <rect width={windowWidth} height={windowHeight} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
export default BG;
