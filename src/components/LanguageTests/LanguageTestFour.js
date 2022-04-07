import React, { useState } from "react";
import { questionsFour } from "../../questions/language-test-questions-four";
import LanguageTestFive from "./LanguageTestFive";

export default function LanguageTestFour(scoreThree) {
  const currentScore = scoreThree;
  const [indexLanguageTest, setIndexLanguageTest] = useState(0);
  const { question, answerOptions, questionNumber, id } =
    questionsFour[indexLanguageTest];
  const [score, setScore] = useState(currentScore.scoreThree);
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
    if (nextQuestionTest < questionsFour.length) {
      setIndexLanguageTest(nextQuestionTest);
    } else {
      setTestComplete(true);
    }
  }

  return (
    <>
      {testComplete ? (
        <section>
          <LanguageTestFive scoreFour={score} />
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
              UFOs - do they exist? UFO is short for 'unidentified flying
              object'. UFOs are popularly known as flying saucers, ____ that is
              often the ____ they are reported to be. The ____ 'flying saucers'
              were seen in 1947 by an American pilot, but experts who studied
              his claim decided it had been a trick of the light. Even people
              experienced at watching the sky, ____ as pilots, report seeing
              UFOs. In 1978 a pilot reported a collection of UFOs off the coast
              of New Zealand. A television ____ went up with the pilot and
              filmed the UFOs. Scientists studying this phenomenon later
              discovered that in this case they were simply lights on boats out
              fishing.
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
            <p>Question {questionNumber}/40</p>
          </div>
        </div>
      )}
    </>
  );
}
