import React, { useState, useCallback, useMemo } from "react";
import LanguageTestTwo from "./LanguageTestTwo";
import { languageTestQuestionsOne } from "../../../questions/language-test-questions-one";

export default function LanguageTestOne() {
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(0);
  const [testComplete, setTestComplete] = useState(false);

  const currentQuestion = useMemo(() => {
    return languageTestQuestionsOne[indexLanguageTest] || {};
  }, [indexLanguageTest]);

  const { image, answerOptions = [], id } = currentQuestion;

  const currentQuestionNumber = indexLanguageTest + 1;

  const cumulativeQuestionNumber = useMemo(() => {
    return currentQuestionNumber;
  }, [currentQuestionNumber]);

  const progress = useMemo(() => {
    return Math.round((cumulativeQuestionNumber / 40) * 100);
  }, [cumulativeQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    const nextQuestionIndex = id + 1;
    if (nextQuestionIndex < languageTestQuestionsOne.length) {
      setIndexLanguageTest(nextQuestionIndex);
    } else {
      setTestComplete(true);
    }
  }, [id]);

  const handleAnswerClickTest = useCallback(
    (isCorrect) => {
      console.log(isCorrect);
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
        nextQuestionTest();
      } else {
        nextQuestionTest();
      }
    },
    [nextQuestionTest]
  );
  return (
    <div className="language-test-container">
      {testComplete ? (
        <LanguageTestTwo scoreOne={score} />
      ) : (
        <div className="test-content">
          <header className="question-header">
            <h2 className="language-test-question" id="question-title">
              Where can you see this notice?
            </h2>
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
              Question {cumulativeQuestionNumber} of 40
            </p>
          </div>

          <div className="image-container">
            <img
              className="test-image"
              src={image}
              alt={`Test question ${currentQuestionNumber} notice`}
              width="500"
              height="150"
              loading="lazy"
              onError={(e) => {
                e.target.alt = "Content could not be loaded";
                e.target.style.border = "2px dashed #ccc";
              }}
            />
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
