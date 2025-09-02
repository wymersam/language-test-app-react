import React, { useState, useCallback, useMemo } from "react";
import { questionsTwo } from "../../../questions/language-test-questions-two";
import LanguageTestThree from "./LanguageTestThree";

export default function LanguageTestTwo(scoreOne) {
  const currentScore = scoreOne;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const [score, setScore] = useState(currentScore.scoreOne);
  const [testComplete, setTestComplete] = useState(false);

  const currentQuestion = useMemo(() => {
    return questionsTwo[indexLanguageTest] || {};
  }, [indexLanguageTest]);

  const { question, answerOptions = [], id } = currentQuestion;

  const currentQuestionNumber = indexLanguageTest + 1;

  const cumulativeQuestionNumber = useMemo(() => {
    return 5 + currentQuestionNumber;
  }, [currentQuestionNumber]);

  const progress = useMemo(() => {
    return Math.round((cumulativeQuestionNumber / 40) * 100);
  }, [cumulativeQuestionNumber]);

  const nextQuestionTest = useCallback(() => {
    const nextQuestionIndex = id + 1;
    if (nextQuestionIndex < questionsTwo.length) {
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
        <LanguageTestThree scoreTwo={score} />
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
                  Scotland is the north part of the island of Great Britain. The
                  Atlantic Ocean is on the west and the North Sea on the east.
                  Some people ____ Scotland speak a different language called
                  Gaelic. There are ____ five million people in Scotland, and
                  Edinburgh is ____ most famous city. Scotland has many
                  mountains; the highest one is called 'Ben Nevis'. In the south
                  of Scotland, there are a lot of sheep. A long time ago, there
                  ____ many forests, but now there are only a ____. Scotland is
                  only a small country, but it is quite beautiful.
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
