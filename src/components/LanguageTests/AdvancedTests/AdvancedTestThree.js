import React, { useState, useCallback, useMemo } from "react";
import { advancedQuestionsThree } from "../../../questions/advanced-questions-three";
import TestResults from "../../ResultsPages/TestResults";

export default function AdvancedTestThree({ newScore }) {
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(newScore);
  const [testComplete, setTestComplete] = useState(false);

  // Get current question data
  const currentQuestion = advancedQuestionsThree[indexLanguageTest];
  const { answerOptions, questionNumber, id, question } = currentQuestion;
  const currentQuestionNumber = indexLanguageTest + 1;

  // Calculate progress
  const progress = useMemo(() => {
    return Math.round(
      (currentQuestionNumber / advancedQuestionsThree.length) * 100
    );
  }, [currentQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    let nextQuestionIndex = id + 1;
    if (nextQuestionIndex < advancedQuestionsThree.length) {
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
        <TestResults finalScore={score} isAdvanced={true} />
      ) : (
        <div className="test-content">
          <header className="question-header">
            <h2 className="language-test-question" id="question-title">
              Advanced Level Assessment - Grammar & Vocabulary
            </h2>
            <p className="test-instructions">
              Choose the word which best completes each sentence.
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
              Question {currentQuestionNumber} of{" "}
              {advancedQuestionsThree.length}
            </p>
          </div>

          {/* Question Section */}
          <div className="current-question-focus">
            <h3 className="question-focus-title">Question {questionNumber}:</h3>
            <p className="question-focus-text">{question}</p>
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
