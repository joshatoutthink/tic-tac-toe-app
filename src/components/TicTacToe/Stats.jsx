import React from "react";

export default function Stats({ score }) {
  return (
    <div className="stats">
      <h3>STATS</h3>
      <div className="flex">
        <div className="stat">
          <h4 className="label">Wins</h4>
          <p className="value">{score.wins}</p>
        </div>
        <div className="stat">
          <h4 className="label">Ties</h4>
          <p className="value">{score.ties}</p>
        </div>
        <div className="stat">
          <h4 className="label">Losses</h4>
          <p className="value">{score.losses}</p>
        </div>
      </div>
    </div>
  );
}
