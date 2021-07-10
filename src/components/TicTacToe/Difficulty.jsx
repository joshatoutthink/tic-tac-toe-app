import React from "react";

export default function Difficulty({
  selectedDifficulty = "easy",
  handleSelectDifficulty,
}) {
  return (
    <div className="difficulty-selection">
      <h3>DIFFICULTY</h3>
      <div className="radio-group-slide flex">
        <label style={{ ["--difficulty-color"]: "var(--green)" }}>
          <input
            type="radio"
            name="difficulty"
            id="easy"
            value="easy"
            checked={selectedDifficulty == "easy"}
            onChange={handleSelectDifficulty}
          />
          <div className="label">Easy</div>
        </label>
        <label style={{ ["--difficulty-color"]: "var(--yellow)" }}>
          <input
            type="radio"
            name="difficulty"
            id="medium"
            value="medium"
            checked={selectedDifficulty == "medium"}
            onChange={handleSelectDifficulty}
          />
          <div className="label">Medium</div>
        </label>
        <label style={{ ["--difficulty-color"]: "var(--pink)" }}>
          <input
            checked={selectedDifficulty == "hard"}
            type="radio"
            name="difficulty"
            id="hard"
            value="hard"
            onChange={handleSelectDifficulty}
          />
          <div className="label">Hard</div>
        </label>
      </div>
    </div>
  );
}
