import React from "react";
import ContactUs from "../ContactUs";

export default function FinalTestResults(newScore) {
  let currentScore = newScore.finalScore;

  return (
    <>
      <section className="test-results-container">
        {currentScore >= 45 && currentScore <= 53 ? (
          <article>
            <h2>Congratulations! You achieved level C1</h2>
            <ContactUs level={"C1"} />
          </article>
        ) : currentScore >= 54 ? (
          <article className="test-results-page">
            <h2>Congratulations! You achieved level C2</h2>
            <ContactUs level={"C2"} />
          </article>
        ) : currentScore <= 44 ? (
          <article className="test-results-page">
            <h2>Congratulations! You achieved level B2</h2>
            <ContactUs level={"B2"} />
          </article>
        ) : (
          <article className="test-results-page">
            <h2>Congratulations! You achieved level B1</h2>
            <ContactUs level={"B1"} />
          </article>
        )}
      </section>
    </>
  );
}
