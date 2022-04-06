import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MyContext } from "../MyContext";

export default function ContactUs(level) {
  const grade = level.level;
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formClass, setFormClass] = useState("");
  const [textClass, setTextClass] = useState("hide-text");
  const [formErrorTextClass, setFormErrorTextClass] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setTextClass("show-text");
    setName("");
    setEmail("");
    setFormClass("hide-text");

    emailjs
      .sendForm(
        "service_ogax6ve",
        "template_utaehz6",
        form.current,
        "user_O0EicnClTqFEK6Kl07ODl"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  function formError(e) {
    e.preventDefault();
    setFormErrorTextClass("form-error-text");
    setName("Please add name");
    setEmail("Please add email");
    setTimeout(() => {
      setName("");
      setEmail("");
      setFormErrorTextClass("");
    }, 1000);
  }

  return (
    <MyContext.Consumer>
      {({ course, media }) => {
        return (
          <>
            <div className="contact-page">
              <form
                ref={form}
                onSubmit={name && email ? sendEmail : formError}
                className="form-format"
              >
                <div className={formClass}>
                  <h3 className="complete-test-text">
                    To complete the test, please submit your name and email.
                  </h3>
                  <div>
                    <label>Name: </label>
                    <div className="form-section"></div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      className={formErrorTextClass}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <label>Email: </label>
                  <div className="form-section ">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className={formErrorTextClass}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-section visually-hidden">
                    <label>Course Recommendations: </label>
                    <input
                      type="text"
                      name="courses"
                      id="courses"
                      value={course}
                      readOnly
                    />
                  </div>

                  <div className="form-section visually-hidden">
                    <label>Media: </label>
                    <input
                      type="text"
                      name="media"
                      id="media"
                      value={media}
                      readOnly
                    />
                  </div>

                  <button
                    className="submit-btn"
                    type="submit"
                    value="Submit"
                    readOnly
                  >
                    Submit
                  </button>
                </div>
              </form>
              <p className={`contact-page-thanks-text ${textClass}`}>
                Thanks! You have successfully submitted your results. Please
                follow the link below to see your course recommendations:
              </p>
            </div>
            {grade === "A1" ? (
              <div className="link-wrapper">
                <a
                  href={`https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html?kathaupt=1&katid=71&katvaterid=64&katname=A1`}
                  target="_blank"
                  rel="noreferrer"
                  className={`recommendations-link {textClass}`}
                >
                  <p className={textClass}>{grade} course recommendations</p>
                </a>
              </div>
            ) : grade === "A2" ? (
              <div className="link-wrapper">
                <a
                  href={`https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html?kathaupt=1&katid=65&katvaterid=64&katname=A2`}
                  target="_blank"
                  rel="noreferrer"
                  className={`recommendations-link {textClass}`}
                >
                  <p class={textClass}>{grade} course recommendations</p>
                </a>
              </div>
            ) : grade === "B1" ? (
              <div className="link-wrapper">
                <a
                  href={`https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html?kathaupt=1&katid=66&katvaterid=64&katname=B1`}
                  target="_blank"
                  rel="noreferrer"
                  className={`recommendations-link {textClass}`}
                >
                  <p className={textClass}>{grade} course recommendations</p>
                </a>
              </div>
            ) : grade === "B2" ? (
              <div className="link-wrapper">
                <a
                  href={`https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html?kathaupt=1&katid=67&katvaterid=64&katname=B2`}
                  target="_blank"
                  rel="noreferrer"
                  className={`recommendations-link {textClass}`}
                >
                  <p className={textClass}>{grade} course recommendations</p>
                </a>
              </div>
            ) : grade === "C1" ? (
              <div className="link-wrapper">
                <a
                  href={`https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html?kathaupt=1&katid=69&katvaterid=64&katname=C1`}
                  target="_blank"
                  rel="noreferrer"
                  className={`recommendations-link {textClass}`}
                >
                  <p className={textClass}>{grade} course recommendations</p>
                </a>
              </div>
            ) : (
              grade ===
              "C2"(
                <div className="link-wrapper">
                  <a
                    href={`https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html?kathaupt=1&katid=70&katvaterid=64&katname=C2`}
                    target="_blank"
                    rel="noreferrer"
                    className={`recommendations-link {textClass}`}
                  >
                    <p className={textClass}>{grade} course recommendations</p>
                  </a>
                </div>
              )
            )}
          </>
        );
      }}
    </MyContext.Consumer>
  );
}
