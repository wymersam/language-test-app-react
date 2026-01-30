import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  lazy,
  Suspense,
} from "react";

const AdvancedTestOne = lazy(
  () => import("./LanguageTests/AdvancedTests/AdvancedTestOne"),
);
const TestResults = lazy(() => import("./ResultsPages/TestResults"));

export default function OptionToProgress({ scoreSix }) {
  const currentScore = scoreSix;

  // Store score in localStorage for persistence (only when score changes)
  useEffect(() => {
    localStorage.setItem("testScore", currentScore);
  }, [currentScore]);

  const [next, setNext] = useState(false);
  const [finish, setFinish] = useState(false);

  // Handle navigation with useCallback for performance
  const handleNext = useCallback(() => {
    setNext(true);
  }, []);

  const handleFinish = useCallback(() => {
    setFinish(true);
  }, []);

  const scoreDisplay = useMemo(() => {
    return `${currentScore}/40`;
  }, [currentScore]);

  return (
    <div className="option-progress-container">
      {!next && !finish ? (
        <div className="results-page">
          <div className="test-results-container">
            <header className="results-header">
              <div className="celebration-icon" aria-hidden="true">
                🎉
              </div>
              <h1 className="results-title">Excellent Progress!</h1>
              <p className="results-subtitle">
                You scored {scoreDisplay} - well done!
              </p>
            </header>

            <section className="score-section" aria-labelledby="options-title">
              <div className="achievement-card">
                <div className="achievement-content">
                  <h3 className="achievement-title">
                    🏆 Advanced Level Unlocked
                  </h3>
                </div>
              </div>

              <div className="options-container">
                <div className="option-card next-option">
                  <div className="option-content">
                    <h3 className="option-title">Continue Testing</h3>
                    <p className="option-description">
                      Take 20 more advanced questions to determine your precise
                      level (B2-C2)
                    </p>
                  </div>
                  <button
                    className="btn btn-primary option-btn"
                    onClick={handleNext}
                    aria-describedby="next-description"
                  >
                    <span className="btn-text">Continue Advanced Test</span>
                    <span className="btn-icon" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>

                <div className="option-card finish-option">
                  <div className="option-content">
                    <h3 className="option-title">Finish Now</h3>
                    <p className="option-description">
                      Complete your assessment and see your current results
                      (maximum level is B2)
                    </p>
                  </div>
                  <button
                    className="btn btn-secondary option-btn"
                    onClick={handleFinish}
                    aria-describedby="finish-description"
                  >
                    <span className="btn-text">See My Results</span>
                    <span className="btn-icon" aria-hidden="true">
                      ✓
                    </span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : next ? (
        <Suspense
          fallback={
            <div className="loading-spinner">Loading advanced test...</div>
          }
        >
          <AdvancedTestOne scoreSix={currentScore} />
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <div className="loading-spinner">Loading your results...</div>
          }
        >
          <TestResults
            score={{ scoreSix: currentScore }}
            scorePropertyName="scoreSix"
            showScoreCard={true}
          />
        </Suspense>
      )}
    </div>
  );
}
