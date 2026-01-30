import "./App.css";
import PretestQuestions from "./components/PretestQuestions";

function App() {
  return (
    <main>
      <div className="csh-logo-container">
        <img
          src="/images/csh_sw.avif"
          alt="CSH Logo"
          className="csh-logo"
          loading="eager"
          decoding="async"
          width="200"
          height="100"
        />
      </div>
      <h1 className="visually-hidden">CSH Language App</h1>
      <PretestQuestions />
    </main>
  );
}

export default App;
