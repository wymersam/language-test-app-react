import React, { useMemo } from "react";
import ContactUs from "../ContactUs";

export default function FinalTestResults({ finalScore }) {
  // Complete level data for advanced levels
  const LEVEL_DATA = {
    B2: {
      level: "B2",
      name: "Upper-intermediate",
      description:
        "You can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in your field of specialization.",
      color: "#27ae60",
      icon: "🎯",
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

  const getLevelFromAdvancedScore = (score) => {
    if (score >= 54) return "C2";
    if (score >= 45 && score <= 53) return "C1";
    if (score <= 44) return "B2";
    return "B2";
  };

  const currentLevel = useMemo(() => {
    return getLevelFromAdvancedScore(finalScore);
  }, [finalScore]);

  const levelData = LEVEL_DATA[currentLevel];

  return (
    <div className="results-page">
      <div className="test-results-container">
        <header className="results-header">
          <div className="celebration-icon" aria-hidden="true">
            {levelData.icon}
          </div>
        </header>

        <section className="score-section" aria-labelledby="level-title">
          <h2 id="score-title" className="section-heading">
            Your Final Results
          </h2>

          <div className="score-card">
            <div className="score-display">
              <span className="score-number">{finalScore}</span>
              <span className="score-total"> / 60 total correct answers!</span>
            </div>
          </div>

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
