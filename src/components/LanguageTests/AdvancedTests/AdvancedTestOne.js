import React, { useState } from "react";
import { advancedQuestions } from "../../../questions/advanced-questions-one";
import AdvancedTestTwo from "./AdvancedTestTwo";

export default function AdvancedTestOne() {
  let testScore = localStorage.getItem("testScore");
  testScore = parseInt(testScore, 10);

  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { answerOptions, questionNumber, id, question } =
    advancedQuestions[indexLanguageTest];
  const [score, setScore] = useState(testScore);
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
    if (nextQuestionTest < advancedQuestions.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete ? (
        <AdvancedTestTwo newScore={score} />
      ) : (
        <section className="language-test-container">
          <article className="sub-question-container">
            <h2>
              In this section you must choose the word which best fits each
              space in the text below.
            </h2>
            <hr className="line"></hr>
            <h4 className="sub-question-text">
              The tallest buildings - SKYSCRAPERS Nowadays, skyscrapers can be
              found in most major cities of the world. A building which was many
              ____ high was first called a skyscraper in the United States at
              the end of the 19th century, and New York has perhaps the ____
              skyscraper of them all, the Empires State Building. The ____
              beneath the streets of New York is rock, ____ enough to take the
              heaviest load without sinking, and is therefore well-suited to
              bearing the ____ of tall buildings.
            </h4>
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
