import React from "react";
import { motion } from "framer-motion";

export default function Marker({ player }) {
  return (
    <div>
      <svg viewBox="0 0 100 100" stroke="white" strokeWidth="2" fill="none">
        {player === "x" ? <X /> : player === "o" ? <O /> : null}
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
    <MotionMarker>
      <path d="M1,1 L99,99" />
      <path d="M99,1 L1,99" />
    </MotionMarker>
  );
}
function O() {
  return (
    <MotionMarker dir={-1}>
      <circle cx="50" cy="50" r="48" />
    </MotionMarker>
  );
}
