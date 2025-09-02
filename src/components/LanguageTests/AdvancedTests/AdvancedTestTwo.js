import React, { useState, useCallback, useMemo } from "react";
import { advancedQuestionsTwo } from "../../../questions/advanced-questions-two";
import AdvancedTestThree from "./AdvancedTestThree";

export default function AdvancedTestTwo({ newScore }) {
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(newScore);
  const [testComplete, setTestComplete] = useState(false);

  const currentQuestion = advancedQuestionsTwo[indexLanguageTest];
  const { answerOptions, questionNumber, id, question } = currentQuestion;
  const currentQuestionNumber = indexLanguageTest + 1;

  const cumulativeQuestionNumber = useMemo(() => {
    return 45 + currentQuestionNumber; // Starts at question 46
  }, [currentQuestionNumber]);

  const progress = useMemo(() => {
    return Math.round((cumulativeQuestionNumber / 60) * 100);
  }, [cumulativeQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    let nextQuestionIndex = id + 1;
    if (nextQuestionIndex < advancedQuestionsTwo.length) {
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
        <AdvancedTestThree newScore={score} />
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
              Question {cumulativeQuestionNumber} of 60
            </p>
          </div>

          <div className="passage-container">
            <h3 className="passage-title">SCRABBLE</h3>
            <p className="passage-text">
              Scrabble is the world's most popular word game. For its origins,
              we have to go back to the 1930s in the USA, when Alfred Butts, an
              architect, found himself out of <span>____</span>. He decided that
              there was a <span>____</span> for a board game based on words and{" "}
              <span>____</span> to design one. Eventually he made a{" "}
              <span>____</span> from it, in spite of the fact that his original{" "}
              <span>____</span> was only three cents a game.
            </p>
          </div>

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
