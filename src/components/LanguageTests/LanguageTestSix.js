import React, { useState } from "react";
import { questionsSix } from "../../questions/language-test-questions-six";
import TestResults from "../ResultsPages/TestResults";
import OptionToProgress from "../OptionToProgress";

export default function LanguageTestSix(scoreFive) {
  const currentScore = scoreFive;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { question, answerOptions, questionNumber, id } =
    questionsSix[indexLanguageTest];
  const [score, setScore] = useState(currentScore.scoreFive);
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
    if (nextQuestionTest < questionsSix.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete && score < 35 ? (
        <section>
          <TestResults scoreSix={score} />
        </section>
      ) : testComplete && score >= 35 ? (
        <section>
          <OptionToProgress scoreSix={score} />
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
                className="answer-btn test-btn"
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
