import React from "react";
import ContactUs from "../ContactUs";

export default function TestResultsAdvancedTwo(newScore) {
  let currentScore = newScore.finalScore;

  function getLevelFromScore(currentScore) {
    if (currentScore >= 43 && currentScore <= 53) {
      return "C1";
    } else if (currentScore >= 54) {
      return "C2";
    } else if (currentScore <= 44) {
      return "B2";
    }
  }

  return (
    <>
      <section>
        <h2>
          Congratulations! You achieved level {getLevelFromScore(currentScore)}
        </h2>
        <h2>Here are some course recommendations based on your level:</h2>
        <div className="link-wrapper">
          <a
            href={`https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html?kathaupt=1&katid=67&katvaterid=64&katname=${getLevelFromScore(
              currentScore
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            {getLevelFromScore(currentScore)} course recommendations
          </a>
        </div>
        <ContactUs />
      </section>
    </>
  );
}
