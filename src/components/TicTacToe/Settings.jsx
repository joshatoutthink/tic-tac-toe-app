import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimateSharedLayout,
  AnimatePresence,
} from "framer-motion";
import { X } from "./Marker";

export default function Settings({ children, parentRefContainer }) {
  const ref = useRef(null);
  const [pHeight, setPHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const y = useMotionValue(0);
  useEffect(() => {
    if (ref && ref.current) {
      setPHeight(ref.current.getBoundingClientRect().height - 420);
    }
  }, [ref]);
  useEffect(() => {
    if (isOpen) {
      y.set(pHeight);
    }
    console.log(y.get(), pHeight);
  }, [isOpen]);
  return (
    <AnimatePresence>
      <motion.div
        layout={"settings"}
        ref={ref}
        key={"settings"}
        className={`settings-panel glass ${isOpen && "open"}`}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragMomentum={false}
        dragElastic={1}
        transition={{
          stiffness: 1000,
          damping: 0,
          bounceDamping: 10000,
        }}
        drag="y"
        onDrag={(_, info) => {
          y.set(info.offset.y);
        }}
        onDragEnd={(_, info) => {
          console.log(info);
          if (!isOpen) {
            if (info.offset.y <= -100) {
              setIsOpen(true);
            }
          }
          if (isOpen) {
            if (info.offset.y >= 100) {
              setIsOpen(false);
            }
          }
        }}
      >
        <button
          className="close"
          style={{
            padding: 0,
            width: 50,
            height: 25,
            position: "absolute",
            top: 20,
            left: `50%`,
            transform: `translateX(-50%)`,
          }}
          onClick={() => setIsOpen((p) => !p)}
        >
          <svg
            viewBox="0 0 100 30"
            stroke="floralwhite"
            strokeWidth="2"
            fill="none"
          >
            <path
              d="M 0,30 L50,0 100,30"
              style={{
                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                transformOrigin: `center`,
              }}
            />
          </svg>
        </button>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function hasWindow() {
  return typeof window !== "undefined";
}
