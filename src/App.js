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
      setSessionLength((prevState) => {
        if (prevState < 3600) {
          return prevState + 60;
        }
        if (prevState >= 3600) {
          return 3600;
        }
      });
    }
    if (value === "decrease") {
      setSessionLength((prevState) => {
        if (prevState > 60) {
          return prevState - 60;
        }
        if (prevState <= 60) {
          return 60;
        }
      });
    }
  };

  const onBreakLengthChange = (e) => {
    const value = e.target.getAttribute("value");
    if (value === "increase") {
      setBreakLength((prevState) => {
        if (prevState < 3600) {
          return prevState + 60;
        }
        if (prevState >= 3600) {
          return 3600;
        }
      });
    }
    if (value === "decrease") {
      setBreakLength((prevState) => {
        if (prevState > 60) {
          return prevState - 60;
        }
        if (prevState <= 60) {
          return 60;
        }
      });
    }
  };

  const resetApp = () => {
    setBreakLength(300);
    setSessionLength(1500);
  };

  return (
    <div className="App">
      <freeCodeCampTest />
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
