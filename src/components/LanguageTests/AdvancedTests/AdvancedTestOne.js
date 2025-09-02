import React, { useState, useCallback, useMemo } from "react";
import { advancedQuestions } from "../../../questions/advanced-questions-one";
import AdvancedTestTwo from "./AdvancedTestTwo";

export default function AdvancedTestOne() {
  let testScore = localStorage.getItem("testScore");
  testScore = parseInt(testScore, 10);

  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(testScore);
  const [testComplete, setTestComplete] = useState(false);

  // Get current question data
  const currentQuestion = advancedQuestions[indexLanguageTest];
  const { answerOptions, questionNumber, id, question } = currentQuestion;
  const currentQuestionNumber = indexLanguageTest + 1;

  // Calculate progress
  const progress = useMemo(() => {
    return Math.round((currentQuestionNumber / advancedQuestions.length) * 100);
  }, [currentQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    let nextQuestionIndex = id + 1;
    if (nextQuestionIndex < advancedQuestions.length) {
      setIndexLanguageTest(nextQuestionIndex);
    } else {
      setTestComplete(true);
    }
  }, [id]);

  const handleAnswerClickTest = useCallback(
    (isCorrect) => {
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      nextQuestionTest();
    },
    [nextQuestionTest]
  );

  return (
    <div>
      {testComplete ? (
        <AdvancedTestTwo newScore={score} />
      ) : (
        <div className="test-content">
          <header className="question-header">
            <h2 className="language-test-question" id="question-title">
              Advanced Level Assessment - Reading Comprehension
            </h2>
            <p className="test-instructions">
              Choose the word which best fits each space in the text below.
            </p>
          </header>

          {/* Progress Bar */}
          <div
            className="progress-container"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
              aria-label={`${progress}% complete`}
            />
          </div>
          <div className="progress-info">
            <p className="question-counter">
              Question {currentQuestionNumber} of {advancedQuestions.length}
            </p>
          </div>

          {/* Reading Passage */}
          <div className="passage-container">
            <h3 className="passage-title">
              The Tallest Buildings - SKYSCRAPERS
            </h3>
            <p className="passage-text">
              Nowadays, skyscrapers can be found in most major cities of the
              world. A building which was many <span>____</span> high was first
              called a skyscraper in the United States at the end of the 19th
              century, and New York has perhaps the <span>____</span> skyscraper
              of them all, the Empire State Building. The <span>____</span>{" "}
              beneath the streets of New York is rock, <span>____</span> enough
              to take the heaviest load without sinking, and is therefore
              well-suited to bearing the <span>____</span> of tall buildings.
            </p>
          </div>

          {/* Current Question Focus */}
          <div className="current-question-focus">
            <h3 className="question-focus-title">Question {questionNumber}:</h3>
            <p className="question-focus-text">
              {question.replace(/____/g, "______")}
            </p>
          </div>

          <section
            className="answer-section"
            key={currentQuestionNumber}
            aria-labelledby="question-title"
            role="group"
          >
            {answerOptions.map((answerOption, index) => (
              <button
                key={`question-${currentQuestionNumber}-answer-${index}`}
                onClick={() => handleAnswerClickTest(answerOption.isCorrect)}
                className="answer-btn test-btn"
                type="button"
                aria-describedby="question-title"
              >
                <span className="answer-number" aria-hidden="true">
                  {index + 1}.
                </span>
                <span className="answer-text">{answerOption.answerText}</span>
              </button>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
