import React, { useState, useEffect } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

const Timer = (props) => {
  const sessionLength = props.sessionLength;
  const breakLength = props.breakLength;
  const resetApp = props.resetApp;
  const [countdown, setCountdown] = useState(sessionLength);
  const [intervalId, setIntervalId] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isSession, setIsSession] = useState(true);

  momentDurationFormatSetup(moment);

  const audio = document.getElementById("beep");

  useEffect(() => {
    if (isSession) {
      return setCountdown(sessionLength);
    }
    if (!isSession) {
      return setCountdown(breakLength);
    }
  }, [sessionLength, breakLength, isSession]);

  const handleStartStop = () => {
    if (!isStarted) {
      let id = setInterval(
        () =>
          setCountdown((prevTimeLeft) => {
            const newTimeLeft = prevTimeLeft - 1;
            if (newTimeLeft > 0) {
              return newTimeLeft;
            }
            if (newTimeLeft === 0) {
              return newTimeLeft;
            }
            if (newTimeLeft < 0) {
              audio.play();
              if (isSession) {
                setIsSession(false);
                return breakLength;
              }
              if (!isSession) {
                setIsSession(true);
                return sessionLength;
              }
            }
          }),
        100
      );
      setIntervalId(id);
      setIsStarted(true);
    }
    if (isStarted) {
      clearInterval(intervalId);
      setIsStarted(false);
    }
  };
  const onReset = () => {
    clearInterval(intervalId);
    audio.pause();
    audio.currentTime = 0;
    resetApp();
    setIsSession(true);
    setIsStarted(false);
    setCountdown(sessionLength);
  };

  const formattedCountdown = moment
    .duration(countdown, "second")
    .format("mm:ss", { trim: false });

  return (
    <div>
      <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
      <div id="time-left">{formattedCountdown}</div>
      <button id="start_stop" onClick={handleStartStop}>
        {isStarted ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={onReset}>
        Reset
      </button>
      <audio
        id="beep"
        preload={true}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
};

export default Timer;
