import React, { useState, useCallback, useMemo } from "react";
import { MyContext } from "../MyContext";
import { pretestQuestions } from "../questions/pretest-questions";
import LanguageTestOne from "./LanguageTests/BasicTests/LanguageTestOne";

export default function PretestQuestions() {
  const [index, setIndex] = useState(0);
  const [classOptions, setClassOptions] = useState([]);
  const [courseMedia, setCourseMedia] = useState([]);
  const [formComplete, setFormComplete] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  // Get current question data
  const currentQuestion = pretestQuestions[index];
  const { questionTextGerman, questionTextEnglish, answerOptions } =
    currentQuestion;
  const currentQuestionNumber = index + 1;

  // Calculate progress
  const progress = useMemo(() => {
    return Math.round((currentQuestionNumber / pretestQuestions.length) * 100);
  }, [currentQuestionNumber]);

  // Check if current question allows multiple selections
  const isMultipleChoice = useMemo(() => {
    return currentQuestion.id === 1 || currentQuestion.id === 2;
  }, [currentQuestion.id]);

  const handleCourseMedia = useCallback((answerClass) => {
    setCourseMedia((prev) => {
      if (prev.includes(answerClass)) {
        return prev.filter((item) => item !== answerClass);
      } else {
        return [...prev, answerClass];
      }
    });
  }, []);

  const handleAnswerClass = useCallback((answerClass) => {
    setClassOptions((prev) => {
      if (prev.includes(answerClass)) {
        return prev.filter((item) => item !== answerClass);
      } else {
        return [...prev, answerClass];
      }
    });
  }, []);

  const handleAnswerClick = useCallback(
    (answerClass, answerText) => {
      if (currentQuestion.id === 2) {
        handleCourseMedia(answerClass);
      } else {
        handleAnswerClass(answerClass);
      }

      // Update selected options for visual feedback
      setSelectedOptions((prev) => {
        const newSelected = new Set(prev);
        if (newSelected.has(answerClass)) {
          newSelected.delete(answerClass);
        } else {
          if (!isMultipleChoice) {
            newSelected.clear();
          }
          newSelected.add(answerClass);
        }
        return newSelected;
      });
    },
    [currentQuestion.id, isMultipleChoice, handleCourseMedia, handleAnswerClass]
  );

  const nextQuestion = useCallback(() => {
    const nextQuestionIndex = index + 1;
    if (nextQuestionIndex < pretestQuestions.length) {
      setIndex(nextQuestionIndex);
      setSelectedOptions(new Set());
    } else {
      setFormComplete(true);
    }
  }, [index]);

  // Check if user can proceed (has made at least one selection)
  const canProceed = useMemo(() => {
    return selectedOptions.size > 0;
  }, [selectedOptions]);

  return (
    <MyContext.Provider value={{ course: classOptions, media: courseMedia }}>
      <div className="pretest-container">
        {formComplete ? (
          <LanguageTestOne />
        ) : (
          <div className="pretest-content">
            {/* Progress Bar */}
            <div
              className="progress-container"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
                aria-label={`${progress}% complete`}
              />
            </div>
            <div className="progress-info">
              <p className="question-counter">
                Question {currentQuestionNumber} of {pretestQuestions.length}
              </p>
            </div>

            <section className="pretest-questions-container">
              <div className="question-content">
                <h2 className="pretest-question-text-german">
                  {questionTextGerman}
                </h2>
                <h3 className="pretest-question-text-english">
                  {questionTextEnglish}
                </h3>
              </div>
            </section>

            <section className="pretest-answer-section">
              <div className="answer-grid">
                {answerOptions.map((answerOption, optionIndex) => {
                  const isSelected = selectedOptions.has(
                    answerOption.answerClass
                  );
                  return (
                    <button
                      key={`option-${optionIndex}`}
                      className={`pretest-answer-btn ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleAnswerClick(
                          answerOption.answerClass,
                          answerOption.answerText
                        )
                      }
                      type="button"
                      aria-pressed={isSelected}
                    >
                      <span className="option-text">
                        {answerOption.answerText}
                      </span>
                      {isSelected && (
                        <span
                          className="selection-indicator"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="navigation-section">
                <button
                  onClick={nextQuestion}
                  className={`next-btn test-btn ${
                    !canProceed ? "disabled" : ""
                  }`}
                  disabled={!canProceed}
                  type="button"
                >
                  <span className="btn-text">
                    {currentQuestionNumber === pretestQuestions.length
                      ? "Start Test"
                      : "Next Question"}
                  </span>
                  <span className="btn-icon" aria-hidden="true">
                    →
                  </span>
                </button>
                {!canProceed && (
                  <p className="selection-hint">
                    Please make at least one selection to continue
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </MyContext.Provider>
  );
}
