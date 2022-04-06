import React from "react";
import ContactUs from "../ContactUs";

export default function FinalTestResults(newScore) {
  let currentScore = newScore.finalScore;

  return (
    <>
      <div className="test-results-container">
        {currentScore >= 45 && currentScore <= 53 ? (
          <section>
            <h2>Congratulations! You achieved level C1</h2>
            <ContactUs level={"C1"} />
          </section>
        ) : currentScore >= 54 ? (
          <div className="test-results-page">
            <section>
              <h2>Congratulations! You achieved level C2</h2>
              <ContactUs level={"C2"} />
            </section>
          </div>
        ) : currentScore <= 44 ? (
          <div className="test-results-page">
            <section>
              <h2>Congratulations! You achieved level B2</h2>
              <ContactUs level={"B2"} />
            </section>
          </div>
        ) : (
          <section>
            <h2>Congratulations! You achieved level B1</h2>
            <ContactUs level={"B1"} />
          </section>
        )}
      </div>
    </>
  );
}
