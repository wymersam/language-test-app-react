import React, { useState, useCallback, useMemo } from "react";
import { questionsSix } from "../../../questions/language-test-questions-six";
import TestResults from "../../ResultsPages/TestResults";
import OptionToProgress from "../../OptionToProgress";

export default function LanguageTestSix(scoreFive) {
  const currentScore = scoreFive;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(currentScore.scoreFive);
  const [testComplete, setTestComplete] = useState(false);

  // Memoize current question data to prevent unnecessary recalculations
  const currentQuestion = useMemo(() => {
    return questionsSix[indexLanguageTest] || {};
  }, [indexLanguageTest]);

  const { question, answerOptions = [], id } = currentQuestion;

  // Calculate current question number based on array index (1-based)
  const currentQuestionNumber = indexLanguageTest + 1;

  // Calculate progress percentage
  const progress = useMemo(() => {
    return Math.round((currentQuestionNumber / questionsSix.length) * 100);
  }, [currentQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    const nextQuestionIndex = id + 1;
    if (nextQuestionIndex < questionsSix.length) {
      setIndexLanguageTest(nextQuestionIndex);
    } else {
      setTestComplete(true);
    }
  }, [id]);

  // Optimize event handlers with useCallback
  const handleAnswerClickTest = useCallback(
    (isCorrect) => {
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
    <div className="">
      {testComplete && score < 35 ? (
        <TestResults
          score={{ scoreSix: score }}
          scorePropertyName="scoreSix"
          showScoreCard={true}
        />
      ) : testComplete && score >= 35 ? (
        <OptionToProgress scoreSix={score} />
      ) : (
        <div className="test-content">
          <header className="question-header">
            <h2 className="section-title">
              In this section you must choose the word which best fits each
              space in the text below.
            </h2>
          </header>
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
              Question {currentQuestionNumber} of {questionsSix.length}
            </p>
          </div>

          <section className="test-content-section">
            <article className="sub-question-container">
              <div className="instructions-text">
                <p className="instruction-note">
                  Choose the best word or phrase to complete each sentence.
                </p>
              </div>
            </article>

            <article
              className="answer-section"
              key={currentQuestionNumber}
              aria-labelledby="current-question"
              role="group"
            >
              <h3 className="language-test-question" id="current-question">
                {question}
              </h3>
              {answerOptions.map((answerOption, index) => (
                <button
                  key={`question-${currentQuestionNumber}-answer-${index}`}
                  onClick={() => handleAnswerClickTest(answerOption.isCorrect)}
                  className="answer-btn test-btn"
                  type="button"
                  aria-describedby="current-question"
                >
                  <span className="answer-number" aria-hidden="true">
                    {index + 1}.
                  </span>
                  <span className="answer-text">{answerOption.answerText}</span>
                </button>
              ))}
            </article>
          </section>
        </div>
      )}
    </div>
  );
}
