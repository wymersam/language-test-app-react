import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import emailjs from "@emailjs/browser";
import { MyContext } from "../MyContext";

export default function ContactUs({ level }) {
  const { course, media } = useContext(MyContext);
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    hasError: false,
    errorMessage: "",
  });

  const courseRecommendation = useMemo(() => {
    const baseUrl =
      "https://www.carl-schurz-haus.de/nc/sprachkurse/erwachsene.html";
    const levelMap = {
      A1: 71,
      A2: 65,
      B1: 66,
      B2: 67,
      C1: 69,
      C2: 70,
    };

    const katid = levelMap[level];
    return katid
      ? `${baseUrl}?kathaupt=1&katid=${katid}&katvaterid=64&katname=${level}`
      : null;
  }, [level]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (formState.hasError) {
        setFormState((prev) => ({
          ...prev,
          hasError: false,
          errorMessage: "",
        }));
      }
    },
    [formState.hasError]
  );

  const validateForm = useCallback(() => {
    const { name, email } = formData;

    if (!name.trim())
      return { isValid: false, message: "Please enter your name" };
    if (!email.trim())
      return { isValid: false, message: "Please enter your email" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }

    return { isValid: true };
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validation = validateForm();
      if (!validation.isValid) {
        setFormState((prev) => ({
          ...prev,
          hasError: true,
          errorMessage: validation.message,
        }));
        return;
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: true,
        hasError: false,
      }));

      try {
        await emailjs.sendForm(
          "service_nzczfuh",
          "template_utaehz6",
          form.current,
          "user_O0EicnClTqFEK6Kl07ODl"
        );

        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
        }));
        setFormData({ name: "", email: "" });
      } catch (error) {
        console.error("Email sending failed:", error);
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          hasError: true,
          errorMessage: "Failed to send email. Please try again.",
        }));
      }
    },
    [validateForm]
  );

  const { isSubmitting, isSubmitted, hasError, errorMessage } = formState;
  const { name, email } = formData;

  return (
    <div className="contact-us-container">
      {!isSubmitted ? (
        <section className="contact-page">
          <div className="contact-form-wrapper">
            <header className="contact-header">
              <p className="contact-subtitle">
                Please provide your details to receive personalized course
                recommendations for your {level} level.
              </p>
            </header>

            <form
              ref={form}
              onSubmit={handleSubmit}
              className="contact-form"
              noValidate
            >
              {hasError && (
                <div
                  className="form-error-message"
                  role="alert"
                  aria-live="polite"
                >
                  <span className="error-icon" aria-hidden="true">
                    ⚠️
                  </span>
                  {errorMessage}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleInputChange("name")}
                  className={`form-input ${hasError ? "form-input-error" : ""}`}
                  placeholder="Enter your full name"
                  required
                  aria-describedby={hasError ? "form-error" : undefined}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required-asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange("email")}
                  className={`form-input ${hasError ? "form-input-error" : ""}`}
                  placeholder="Enter your email address"
                  required
                  aria-describedby={hasError ? "form-error" : undefined}
                />
              </div>

              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="courses" value={course || ""} />
              <input type="hidden" name="media" value={media || ""} />
              <input type="hidden" name="level" value={level || ""} />

              <button
                type="submit"
                className="submit-btn test-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="btn-icon" aria-hidden="true">
                      📧
                    </span>
                    Get My Course Recommendations
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      ) : (
        <section className="success-section">
          <div className="success-container">
            <h3 className="success-title">Thank You!</h3>
            <p className="success-message">
              Your assessment results have been submitted successfully.
            </p>

            {courseRecommendation && (
              <div className="course-recommendations">
                <h4 className="recommendations-title">
                  Your {level} Level Course Recommendations
                </h4>
                <a
                  href={courseRecommendation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recommendations-link"
                  aria-label={`View ${level} level course recommendations (opens in new tab)`}
                >
                  View {level} Course Recommendations
                  <span className="external-icon" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
