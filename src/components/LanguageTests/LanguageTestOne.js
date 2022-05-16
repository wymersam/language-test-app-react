import React, { useState } from "react";
import LanguageTestTwo from "./LanguageTestTwo";
import { languageTestQuestionsOne } from "../../questions/language-test-questions-one";

export default function LanguageTestOne() {
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { image, answerOptions, questionNumber, id } =
    languageTestQuestionsOne[indexLanguageTest];
  const [score, setScore] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  // const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  function handleAnswerClickTest(isCorrect) {
    console.log(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
      nextQuestionTest();
    } else {
      nextQuestionTest();
    }
  }

  function nextQuestionTest() {
    let nextQuestionTest = id + 1;
    if (nextQuestionTest < languageTestQuestionsOne.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }
  return (
    <>
      {testComplete ? (
        <LanguageTestTwo scoreOne={score} />
      ) : (
        <>
          <h3 className="language-test-question">
            Where can you see this notice?
          </h3>
          <img
            className="test-image"
            src={image}
            alt="test"
            width="500em"
            height="150em"
          />
          <section className="answer-section" key={questionNumber}>
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
          </section>
        </>
      )}
    </>
  );
}
