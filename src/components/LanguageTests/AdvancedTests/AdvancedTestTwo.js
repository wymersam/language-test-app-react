import React, { useState } from "react";
import { advancedQuestionsTwo } from "../../../questions/advanced-questions-two";
import AdvancedTestThree from "./AdvancedTestThree";

export default function AdvancedTestTwo(newScore) {
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { answerOptions, questionNumber, id, question } =
    advancedQuestionsTwo[indexLanguageTest];
  const [score, setScore] = useState(newScore.newScore);
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
    if (nextQuestionTest < advancedQuestionsTwo.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete ? (
        <AdvancedTestThree newScore={newScore} />
      ) : (
        <div className="language-test-container">
          <section className="sub-question-container">
            <h2>
              In this section you must choose the word which best fits each
              space in the text below.
            </h2>
            <hr className="line"></hr>
            <h4 className="sub-question-text">
              SCRABBLE Scrabble is the world's most popular word game. For its
              origins, we have to go back to the 1930s in the USA, when Alfred
              Butts, an architect, found himself out of ____. He decided that
              there was a ____ for a board game based on words and ____ to
              design one. Eventually he made a ____ from it, in spite of the
              fact that his original ____ was only three cents a game.
            </h4>
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
            <p>Question {questionNumber}/20</p>
          </div>
        </div>
      )}
    </>
  );
}
