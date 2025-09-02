import React, { useState, useCallback, useMemo } from "react";
import { questionsFour } from "../../../questions/language-test-questions-four";
import LanguageTestFive from "./LanguageTestFive";

export default function LanguageTestFour(scoreThree) {
  const currentScore = scoreThree;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(currentScore.scoreThree);
  const [testComplete, setTestComplete] = useState(false);

  const currentQuestion = useMemo(() => {
    return questionsFour[indexLanguageTest] || {};
  }, [indexLanguageTest]);

  const { question, answerOptions = [], id } = currentQuestion;

  const currentQuestionNumber = indexLanguageTest + 1;

  const cumulativeQuestionNumber = useMemo(() => {
    return 15 + currentQuestionNumber;
  }, [currentQuestionNumber]);

  const progress = useMemo(() => {
    return Math.round((cumulativeQuestionNumber / 40) * 100);
  }, [cumulativeQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    const nextQuestionIndex = id + 1;
    if (nextQuestionIndex < questionsFour.length) {
      setIndexLanguageTest(nextQuestionIndex);
    } else {
      setTestComplete(true);
    }
  }, [id]);

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
        <LanguageTestFive scoreFour={score} />
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
              Question {cumulativeQuestionNumber} of 40
            </p>
          </div>

          <section className="test-content-section">
            <article className="sub-question-container">
              <hr className="line" />
              <div className="context-text" id="context-passage">
                <p className="sub-question-text">
                  UFOs - do they exist? UFO is short for 'unidentified flying
                  object'. UFOs are popularly known as flying saucers, ____ that
                  is often the ____ they are reported to be. The ____ 'flying
                  saucers' were seen in 1947 by an American pilot, but experts
                  who studied his claim decided it had been a trick of the
                  light. Even people experienced at watching the sky, ____ as
                  pilots, report seeing UFOs. In 1978 a pilot reported a
                  collection of UFOs off the coast of New Zealand. A television
                  ____ went up with the pilot and filmed the UFOs. Scientists
                  studying this phenomenon later discovered that in this case
                  they were simply lights on boats out fishing.
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
