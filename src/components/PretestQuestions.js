import React, { useState } from "react";
import { MyContext } from "../MyContext";
import { pretestQuestions } from "../questions/pretest-questions";
import LanguageTestOne from "./LanguageTests/LanguageTestOne";

export default function PretestQuestions() {
  const [index, setIndex] = useState(0);
  const { questionTextGerman, questionTextEnglish, answerOptions } =
    pretestQuestions[index];
  const [classOptions, setClassOptions] = useState([]);
  const [courseMedia, setCourseMedia] = useState([]);
  const [formComplete, setFormComplete] = useState(false);
  const [style, setStyle] = useState("answer-btn");

  function handleAnswerClick(e, answerClass) {
    let current = e.target;
    current.classList.toggle("pretest-answer-btn-clicked");
    handleAnswer(answerClass);
  }

  function handleAnswer(answerClass) {
    if (pretestQuestions[index].id === 2) {
      handleCourseMedia(answerClass);
    } else {
      handleAnswerClass(answerClass);
    }
  }

  function handleCourseMedia(answerClass) {
    if (courseMedia.includes(answerClass)) {
      const newCourseMedia = courseMedia.filter((t) => t !== answerClass);
      setCourseMedia(newCourseMedia);
    } else setCourseMedia([...courseMedia, answerClass]);
  }

  function handleAnswerClass(answerClass) {
    if (classOptions.includes(answerClass)) {
      const newAnswerClass = classOptions.filter((t) => t !== answerClass);
      setClassOptions(newAnswerClass);
    } else setClassOptions([...classOptions, answerClass]);
  }

  function nextQuestion() {
    let nextQuestion = index + 1;
    if (nextQuestion < pretestQuestions.length) {
      setIndex(nextQuestion);
      setStyle("");
      setStyle("pretest-answer-btn-refresh");
    } else {
      setFormComplete(true);
    }
  }
  //localStorage.clear(); clear local storage at end of session

  return (
    <MyContext.Provider value={{ course: classOptions, media: courseMedia }}>
      <div className="pretest-container">
        {formComplete ? (
          <LanguageTestOne />
        ) : (
          <section>
            <section className="pretest-questions-container">
              <h1 className="visually-hidden">Pretest Questions</h1>
              <h2 className="pretest-question-text-german">
                {questionTextGerman}
              </h2>
              <hr></hr>
              <h2 className="pretest-question-text-english">
                {questionTextEnglish}
              </h2>
            </section>
            <section className="pretest-answer-section">
              {answerOptions.map((answerOption, index) => (
                <button
                  id="answer-btn"
                  className={style}
                  key={index}
                  onClick={(e) =>
                    handleAnswerClick(e, answerOption.answerClass)
                  }
                >
                  {answerOption.answerText}
                </button>
              ))}
              <button onClick={() => nextQuestion()} className="next-btn">
                Next
              </button>
            </section>
          </section>
        )}
      </div>
    </MyContext.Provider>
  );
}
