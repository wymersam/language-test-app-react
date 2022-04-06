import React, { useState } from "react";
import AdvancedTestOne from "./LanguageTests/AdvancedTests/AdvancedTestOne";
import TestResultsAdvanced from "./ResultsPages/TestResultsAdvanced";

export default function OptionToProgress(score) {
  let currentScore = score.scoreSix;
  localStorage.setItem("testScore", currentScore);
  const [next, setNext] = useState(false);
  const [finish, setFinish] = useState(false);

  function handleNext() {
    setNext(true);
  }

  function handleFinish() {
    setFinish(true);
  }

  return (
    <>
      {!next && !finish ? (
        <section className="test-results-container">
          <h3 className="">
            Congratulations! You scored at least 35/40. The following 20
            questions will be more advanced.
          </h3>
          <h4>Click 'Next' to continue the test</h4>
          <p>or</p>
          <h4>Click 'Finish' to finish the test and see your results</h4>
          <div className="btn-wrap">
            <button className="finish-btn" onClick={() => handleFinish()}>
              Finish
            </button>
            <button className="advance-btn" onClick={() => handleNext()}>
              Next
            </button>
          </div>
        </section>
      ) : next ? (
        <AdvancedTestOne />
      ) : (
        <TestResultsAdvanced />
      )}
    </>
  );
}
