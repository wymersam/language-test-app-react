import React, { useState } from "react";
import LanguageTestFour from "./LanguageTestFour";
import { questionsThree } from "../../questions/language-test-questions-three";

export default function LanguageTestThree(scoreTwo) {
  const currentScore = scoreTwo;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { question, answerOptions, questionNumber, id } =
    questionsThree[indexLanguageTest];
  const [score, setScore] = useState(currentScore.scoreTwo);
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
    if (nextQuestionTest < questionsThree.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete ? (
        <section>
          <LanguageTestFour scoreThree={score} />
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
              Alice Guy Blaché Alice Guy Blaché was the first female film
              director. She first became involved in cinema whilst working for
              the German Film Company in the late 1890s. This was a period of
              great change in the cinema and Alice was the first to use many new
              inventions, ____ sound and color. In 1907 Alice ____ to New York
              where she started her own film company. She was ____ successful,
              but, when Hollywood became the center of the film world, the best
              days of the independent New York film companies were ____. When
              Alice died in 1968, hardly anybody ____ her name.
            </h4>
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
