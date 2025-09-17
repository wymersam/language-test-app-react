import "./App.css";
import PretestQuestions from "./components/PretestQuestions";

function App() {
  return (
    <main>
      <div className="csh-logo-container">
        <img src="/images/csh_sw.jpg" alt="CSH Logo" className="csh-logo" />
      </div>
      <h1 className="visually-hidden">CSH Language App</h1>
      <PretestQuestions />
    </main>
  );
}

export default App;
