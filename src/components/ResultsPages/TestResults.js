import React from "react";
import ContactUs from "../ContactUs";

export default function TestResults(score) {
  const currentScore = score.scoreSix;

  function getLevelFromScore(currentScore) {
    if (currentScore <= 15) {
      return "A1";
    } else if (currentScore >= 16 && currentScore <= 23) {
      return "A2";
    } else if (currentScore >= 24 && currentScore <= 30) {
      return "B1";
    } else if (currentScore >= 31 && currentScore <= 35) {
      return "B2";
    }
  }

  return (
    <>
      <section className="test-results-container">
        <h2>
          Congratulations! You achieved level {getLevelFromScore(currentScore)}
        </h2>
        <ContactUs level={getLevelFromScore(currentScore)} />
      </section>
    </>
  );
}
