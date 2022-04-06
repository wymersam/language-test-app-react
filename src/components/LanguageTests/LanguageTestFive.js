import React, { useState } from "react";
import { questionsFive } from "../../questions/language-test-questions-five";
import LanguageTestSix from "./LanguageTestSix";

export default function LanguageTestFive(scoreFour) {
  const currentScore = scoreFour;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { question, answerOptions, questionNumber, id } =
    questionsFive[indexLanguageTest];
  const [score, setScore] = useState(currentScore.scoreFour);
  const [testComplete, setTestComplete] = useState(false);

  function handleAnswerClickTest(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
      nextQuestionTest();
    } else {
      nextQuestionTest();
    }
  }

  function nextQuestionTest() {
    let nextQuestionTest = id + 1;
    if (nextQuestionTest < questionsFive.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete ? (
        <section>
          <LanguageTestSix scoreFive={score} />
        </section>
      ) : (
        <div className="language-test-container">
          <section className="sub-question-container">
            <h2>
              In this section you must choose the word which best fits each
              space in the text below.
            </h2>
          </section>

          <h3 className="language-test-question">{question}</h3>
          <div className="answer-section" key={questionNumber}>
            {answerOptions.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClickTest(answerOption.isCorrect)}
                className="answer-btn"
              >
                {answerOption.answerText}
              </button>
            ))}
            <p>Question {questionNumber}/40</p>
          </div>
        </div>
      )}
    </>
  );
}
