import { useState } from "react";
import "./App.css";
import Session from "./components/Session.js";
import Break from "./components/Break.js";
import Timer from "./components/Timer.js";

function App() {
  const [sessionLength, setSessionLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);

  const onSessionLengthChange = (e) => {
    const value = e.target.getAttribute("value");
    if (value === "increase") {
      if (sessionLength < 3600) {
        setSessionLength((prevState) => prevState + 60);
      }
      if (sessionLength >= 3600) {
        setSessionLength(3600);
      }
    }
    if (value === "decrease") {
      if (sessionLength > 60) {
        setSessionLength((prevState) => prevState - 60);
      }
      if (sessionLength <= 60) {
        setSessionLength(60);
      }
    }
  };

  const onBreakLengthChange = (e) => {
    const value = e.target.getAttribute("value");
    if (value === "increase") {
      if (breakLength < 3600) {
        setBreakLength((prevState) => prevState + 60);
      }
      if (breakLength >= 3600) {
        setBreakLength(3600);
      }
    }
    if (value === "decrease") {
      if (breakLength > 60) {
        setBreakLength((prevState) => prevState - 60);
      }
      if (breakLength <= 60) setBreakLength(60);
    }
  };

  const resetApp = () => {
    setSessionLength(1500);
    setBreakLength(300);
  };

  return (
    <div className="App">
      <Session
        sessionLength={sessionLength}
        onSessionLengthChange={onSessionLengthChange}
      />
      <Break
        breakLength={breakLength}
        onBreakLengthChange={onBreakLengthChange}
      />
      <Timer
        sessionLength={sessionLength}
        breakLength={breakLength}
        resetApp={resetApp}
      />
    </div>
  );
}

export default App;
