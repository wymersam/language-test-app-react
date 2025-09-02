import React, { useState, useCallback, useMemo } from "react";
import LanguageTestFour from "./LanguageTestFour";
import { questionsThree } from "../../../questions/language-test-questions-three";

export default function LanguageTestThree(scoreTwo) {
  const currentScore = scoreTwo;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(currentScore.scoreTwo);
  const [testComplete, setTestComplete] = useState(false);

  // Memoize current question data to prevent unnecessary recalculations
  const currentQuestion = useMemo(() => {
    return questionsThree[indexLanguageTest] || {};
  }, [indexLanguageTest]);

  const { question, answerOptions = [], id } = currentQuestion;

  // Calculate current question number based on array index (1-based)
  const currentQuestionNumber = indexLanguageTest + 1;

  // Calculate progress percentage
  const progress = useMemo(() => {
    return Math.round((currentQuestionNumber / questionsThree.length) * 100);
  }, [currentQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    const nextQuestionIndex = id + 1;
    if (nextQuestionIndex < questionsThree.length) {
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
      {testComplete ? (
        <LanguageTestFour scoreThree={score} />
      ) : (
        <div className="test-content">
          <header className="question-header">
            <h2 className="section-title">
              In this section you must choose the word which best fits each
              space in the text below.
            </h2>
          </header>

          {/* Progress Bar */}
          <div
            className="progress-container"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <div className="progress-info">
            <p className="question-counter">
              Question {currentQuestionNumber} of {questionsThree.length}
            </p>
          </div>

          <section className="test-content-section">
            <article className="sub-question-container">
              <hr className="line" />
              <div className="context-text" id="context-passage">
                <p className="sub-question-text">
                  Alice Guy Blaché Alice Guy Blaché was the first female film
                  director. She first became involved in cinema whilst working
                  for the German Film Company in the late 1890s. This was a
                  period of great change in the cinema and Alice was the first
                  to use many new inventions, ____ sound and color. In 1907
                  Alice ____ to New York where she started her own film company.
                  She was ____ successful, but, when Hollywood became the center
                  of the film world, the best days of the independent New York
                  film companies were ____. When Alice died in 1968, hardly
                  anybody ____ her name.
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
                  aria-describedby="context-passage current-question"
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
