import React, { useMemo } from "react";
import ContactUs from "../ContactUs";

export default function TestResults({
  score,
  scorePropertyName = "scoreSix",
  showScoreCard = false,
  finalScore, // For advanced tests
  isAdvanced = false,
}) {
  const LEVEL_DATA = {
    A1: {
      level: "A1",
      name: "Elementary",
      description:
        "You can understand and use familiar everyday expressions and very basic phrases.",
      color: "#e74c3c",
      icon: "🎉",
    },
    A2: {
      level: "A2",
      name: "Pre-intermediate",
      description:
        "You can understand sentences and frequently used expressions related to areas of most immediate relevance.",
      color: "#f39c12",
      icon: "🎉",
    },
    B1: {
      level: "B1",
      name: "Intermediate",
      description:
        "You can understand the main points of clear standard input on familiar matters regularly encountered.",
      color: "#3498db",
      icon: "🎉",
    },
    B2: {
      level: "B2",
      name: "Upper-intermediate",
      description: isAdvanced
        ? "You can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in your field of specialization."
        : "You can understand the main ideas of complex text on both concrete and abstract topics.",
      color: "#27ae60",
      icon: isAdvanced ? "🎯" : "🎉",
    },
    C1: {
      level: "C1",
      name: "Advanced",
      description:
        "You can understand a wide range of demanding, longer texts, and recognize implicit meaning. You can express ideas fluently and spontaneously.",
      color: "#8e44ad",
      icon: "🚀",
    },
    C2: {
      level: "C2",
      name: "Proficient",
      description:
        "You can understand with ease virtually everything heard or read. You can express yourself spontaneously, very fluently and precisely.",
      color: "#2c3e50",
      icon: "👑",
    },
  };

  const currentScore = useMemo(() => {
    if (isAdvanced && typeof finalScore === "number") {
      return finalScore;
    }
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
  }, [score, scorePropertyName, finalScore, isAdvanced]);

  const getLevelFromScore = (currentScore) => {
    if (isAdvanced) {
      // Advanced test logic (B2-C2, /60 points)
      if (currentScore >= 54) return "C2";
      if (currentScore >= 45 && currentScore <= 53) return "C1";
      if (currentScore <= 44) return "B2";
      return "B2";
    } else {
      // Basic test logic (A1-B2, /40 points)
      if (currentScore <= 15) return "A1";
      if (currentScore >= 16 && currentScore <= 23) return "A2";
      if (currentScore >= 24 && currentScore <= 30) return "B1";
      if (currentScore >= 31 && currentScore <= 40) return "B2";
      return "A1";
    }
  };

  const currentLevel = getLevelFromScore(currentScore);
  const levelData = LEVEL_DATA[currentLevel];
  const subtitleText = "You have completed the language assessment.";
  const sectionTitle = "Your Final Results";
  const titleText = "Congratulations!";
  const maxScore = isAdvanced ? 60 : 40;
  const scoreText = ` / ${maxScore} correct answers!`;

  return (
    <div className="results-page">
      <div className="test-results-container">
        <header className="results-header">
          <div className="celebration-icon" aria-hidden="true">
            {levelData.icon}
          </div>
          <h1 className="results-title">{titleText}</h1>
          <p className="results-subtitle">{subtitleText}</p>
        </header>

        <section className="score-section" aria-labelledby="level-title">
          {(showScoreCard || isAdvanced) && (
            <>
              <h2 id="score-title" className="section-heading">
                {sectionTitle}
              </h2>
              <div className="score-card">
                <div className="score-display">
                  <span className="score-number">{currentScore}</span>
                  <span className="score-total">{scoreText}</span>
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
