import React from "react";
import { motion } from "framer-motion";

export default function Marker({ player }) {
  return (
    <div>
      <svg
        viewBox="0 0 100 100"
        stroke="floralwhite"
        strokeWidth="2"
        fill="none"
        style={{ filter: "drop-shadow(0 0 30px black)" }}
      >
        <MotionMarker key={player} dir={player == "o" ? -1 : 1}>
          {player === "x" ? <X /> : player === "o" ? <O /> : ""}
        </MotionMarker>
      </svg>
    </div>
  );
}

function MotionMarker({ children, dir = 1 }) {
  return (
    <motion.g
      initial={{
        x: -10 * dir,
        opacity: 0.2,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
    >
      {children}
    </motion.g>
  );
}

function X() {
  return (
    <>
      <path d="M1,1 L99,99" />
      <path d="M99,1 L1,99" />
    </>
  );
}
function O() {
  return (
    <>
      <circle cx="50" cy="50" r="48" />
    </>
  );
}
export { X, O };
