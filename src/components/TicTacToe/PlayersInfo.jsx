import React from "react";
import { X, O } from "./Marker";
import "./players-info.css";
export default function PlayersInfo({ info }) {
  return (
    <div className="players-info">
      <div className={`player ${info.active == "x" ? "active" : ""}`}>
        <div className="player-name">{info.name}</div>
        <svg
          viewBox="0 0 100 100"
          stroke="floralwhite"
          strokeWidth="10"
          fill="none"
          style={{ filter: "drop-shadow(0 0 30px black)", width: `.76rem` }}
        >
          <X />
        </svg>
      </div>
      <div className={`player ${info.active == "o" ? "active" : ""} robot`}>
        <div className="player-name">Robot</div>
        <svg
          viewBox="0 0 100 100"
          stroke="floralwhite"
          strokeWidth="10"
          fill="none"
          style={{ filter: "drop-shadow(0 0 30px black)", width: `.76rem` }}
        >
          <O />
        </svg>
      </div>
    </div>
  );
}
