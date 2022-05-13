import React, { useState } from "react";
import { questionsTwo } from "../../questions/language-test-questions-two";
import LanguageTestThree from "./LanguageTestThree";

export default function LanguageTestTwo(scoreOne) {
  const currentScore = scoreOne;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { question, answerOptions, questionNumber, id } =
    questionsTwo[indexLanguageTest];
  const [score, setScore] = useState(currentScore.scoreOne);
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
    if (nextQuestionTest < questionsTwo.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete ? (
        <section>
          <LanguageTestThree scoreTwo={score} />
        </section>
      ) : (
        <div className="language-test-container">
          <section className="sub-question-container">
            <h2>
              In this section you must choose the word which best fits each
              space in the text below.
            </h2>
            <hr className="line"></hr>
            <h4 className="sub-question-text">
              Scotland is the north part of the island of Great Britain. The
              Atlantic Ocean is on the west and the North Sea on the east. Some
              people ____ Scotland speak a different language called Gaelic.
              There are ____ five million people in Scotland, and Edinburgh is
              ____ most famous city. Scotland has many mountains; the highest
              one is called 'Ben Nevis'. In the south of Scotland, there are a
              lot of sheep. A long time ago, there ____ many forests, but now
              there are only a ____. Scotland is only a small country, but it is
              quite beautiful.
            </h4>
          </section>

          <h3 className="language-test-question">{question}</h3>
          <div className="answer-section" key={questionNumber}>
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
            <p>Question {questionNumber}/40</p>
          </div>
        </div>
      )}
    </>
  );
}
