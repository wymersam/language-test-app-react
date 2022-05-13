import React, { useState } from "react";
import { advancedQuestionsThree } from "../../../questions/advanced-questions-three";
import FinalTestResults from "../../ResultsPages/FinalTestResults";

export default function AdvancedTestThree(newScore) {
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { answerOptions, questionNumber, id, question } =
    advancedQuestionsThree[indexLanguageTest];
  const [score, setScore] = useState(newScore.newScore.newScore);
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
    if (nextQuestionTest < advancedQuestionsThree.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete ? (
        <FinalTestResults finalScore={score} />
      ) : (
        <section className="language-test-container">
          <article className="sub-question-container">
            <h2>
              In this section you must choose the word which best fits each
              space in the text below.
            </h2>
          </article>
          <article className="answer-section" key={questionNumber}>
            <h3 className="language-test-question">{question}</h3>
            {answerOptions.map((answerOption, index) => (
              <button
                id={index}
                key={index}
                onClick={() => handleAnswerClickTest(answerOption.isCorrect)}
                className="answer-btn test-btn"
              >
                {answerOption.answerText}
              </button>
            ))}
            <p>Question {questionNumber}/20</p>
          </article>
        </section>
      )}
    </>
  );
}
