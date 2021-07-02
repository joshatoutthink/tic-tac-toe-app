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
        viewBox={`0 0 ${windowWidth} ${windowHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <rect width={windowWidth} height={windowHeight} fill="#6100DC" />
          <g filter="url(#filter0_f)">
            <circle cx="1145" cy="262" r="346" fill="#CA00DC" />
          </g>
          <g filter="url(#filter2_f)">
            <circle cx="446" cy="740" r="346" fill="#FBDD8F" />
          </g>
          <g filter="url(#filter1_f)">
            <circle
              cx={wRatio * 25}
              cy={hRatio * 262}
              r={346 / (wRatio * hRatio)}
              fill="#13EDFB"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f"
            x={wRatio * 549}
            y={hRatio * -334}
            width={hRatio * 1192}
            height={hRatio * 1192}
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
              stdDeviation="125"
              result="effect1_foregroundBlur"
            />
          </filter>
          <filter
            id="filter2_f"
            x={wRatio * -500}
            y={hRatio * -206}
            width={hRatio * 1892}
            height={hRatio * 1892}
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
              stdDeviation="300"
              result="effect1_foregroundBlur"
            />
          </filter>
          <filter
            id="filter1_f"
            x={wRatio * -921}
            y={hRatio * -684}
            width={hRatio * 1892}
            height={hRatio * 1892}
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
              stdDeviation="300"
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
