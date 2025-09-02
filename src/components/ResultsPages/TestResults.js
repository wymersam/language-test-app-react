import React, { useMemo } from "react";
import ContactUs from "../ContactUs";

export default function TestResults({
  score,
  scorePropertyName = "scoreSix",
  showScoreCard = false,
}) {
  const LEVEL_DATA = {
    A1: {
      level: "A1",
      name: "Elementary",
      description:
        "You can understand and use familiar everyday expressions and very basic phrases.",
      color: "#e74c3c",
    },
    A2: {
      level: "A2",
      name: "Pre-intermediate",
      description:
        "You can understand sentences and frequently used expressions related to areas of most immediate relevance.",
      color: "#f39c12",
    },
    B1: {
      level: "B1",
      name: "Intermediate",
      description:
        "You can understand the main points of clear standard input on familiar matters regularly encountered.",
      color: "#3498db",
    },
    B2: {
      level: "B2",
      name: "Upper-intermediate",
      description:
        "You can understand the main ideas of complex text on both concrete and abstract topics.",
      color: "#27ae60",
    },
  };

  const currentScore = useMemo(() => {
    let extractedScore;

    if (typeof score === "object" && score !== null) {
      extractedScore = score[scorePropertyName];
    } else if (typeof score === "number") {
      extractedScore = score;
    }

    if (typeof extractedScore === "number" && !isNaN(extractedScore)) {
      return extractedScore;
    }

    console.warn("Invalid score received:", score);
    return 0;
  }, [score, scorePropertyName]);

  const getLevelFromScore = (currentScore) => {
    if (currentScore <= 15) return "A1";
    if (currentScore >= 16 && currentScore <= 23) return "A2";
    if (currentScore >= 24 && currentScore <= 30) return "B1";
    if (currentScore >= 31 && currentScore <= 40) return "B2";
    return "A1";
  };

  const currentLevel = getLevelFromScore(currentScore);
  const levelData = LEVEL_DATA[currentLevel];

  return (
    <div className="results-page">
      <div className="test-results-container">
        <header className="results-header">
          <div className="celebration-icon" aria-hidden="true">
            🎉
          </div>
          <h1 className="results-title">Congratulations!</h1>
          <p className="results-subtitle">
            You have completed the language assessment
          </p>
        </header>

        <section className="score-section" aria-labelledby="level-title">
          {showScoreCard && (
            <>
              <h2 id="score-title" className="section-heading">
                Your Final Results
              </h2>
              <div className="score-card">
                <div className="score-display">
                  <span className="score-number">{currentScore}</span>
                  <span className="score-total"> / 40 correct answers!</span>
                </div>
              </div>
            </>
          )}

          <div className="level-badge" style={{ borderColor: levelData.color }}>
            <div
              className="level-indicator"
              style={{ backgroundColor: levelData.color }}
            >
              {levelData.level}
            </div>
            <div className="level-info">
              <h3 className="level-name">{levelData.name}</h3>
              <p className="level-description">{levelData.description}</p>
            </div>
          </div>
        </section>

        <ContactUs level={currentLevel} />
      </div>
    </div>
  );
}
