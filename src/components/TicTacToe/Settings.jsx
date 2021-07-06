import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
export default function Settings({ children, parentRefContainer }) {
  const ref = useRef(null);
  const blurRef = useRef(null);
  const [pHeight, setPHeight] = useState(0);

  useEffect(() => {
    if (ref && ref.current) {
      setPHeight(ref.current.getBoundingClientRect().height - 420);
    }
  }, [ref]);

  return (
    <>
      <div ref={blurRef} className="blur"></div>
      <motion.div
        ref={ref}
        className="settings-panel glass"
        dragConstraints={{
          top: -1 * pHeight,
          bottom: 0,
        }}
        dragMomentum={true}
        dragElastic={1}
        drag="y"
        onDrag={(_, info) => {}}
      >
        {children}
      </motion.div>
    </>
  );
}

function hasWindow() {
  return typeof window !== "undefined";
}
