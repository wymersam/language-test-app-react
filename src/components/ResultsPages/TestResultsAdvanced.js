import React from "react";
import ContactUs from "../ContactUs";

export default function TestResultsAdvanced() {
  return (
    <>
      <section className="test-results-container">
        <h2>Congratulations! You achieved level B2!</h2>
        <ContactUs level={"B2"} />
      </section>
    </>
  );
}
