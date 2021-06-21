import React, { useState, useEffect } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

const Timer = (props) => {
  const sessionLength = props.sessionLength;
  const breakLength = props.breakLength;
  const resetApp = props.resetApp;
  // const [countdown, setCountdown] = useState(sessionLength);
  const [{ countdown, isSession }, setCounterState] = useState({
    countdown: sessionLength,
    isSession: true,
  });
  const [intervalId, setIntervalId] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  // const [isSession, setIsSession] = useState(true);

  momentDurationFormatSetup(moment);

  const audio = document.getElementById("beep");

  useEffect(() => {
    if (isSession) {
      return setCounterState((prevState) => {
        return {
          ...prevState,
          countdown: sessionLength,
        };
      });
    }

    if (!isSession) {
      return setCounterState((prevState) => {
        return {
          ...prevState,
          countdown: breakLength,
        };
      });
    }
  }, [sessionLength, breakLength, isSession]);

  const handleStartStop = () => {
    if (!isStarted) {
      let id = setInterval(
        () =>
          setCounterState((prevState) => {
            const newTimeLeft = prevState.countdown - 1;
            if (newTimeLeft >= 0) {
              return {
                ...prevState,
                countdown: newTimeLeft,
              };
            }
            if (newTimeLeft < 0) {
              audio.play();
              if (prevState.isSession === true)
                return {
                  isSession: !prevState.isSession,
                  countdown: breakLength,
                };
              if (prevState.isSession === false) {
                return {
                  isSession: !prevState.isSession,
                  countdown: sessionLength,
                };
              }
            }
          }),
        1000
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
    setCounterState({
      isSession: true,
      countdown: sessionLength,
    });
    setIsStarted(false);
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
