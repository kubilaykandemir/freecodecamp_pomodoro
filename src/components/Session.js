import React from "react";

const Session = (props) => {
  const sessionLength = props.sessionLength / 60;
  const onSessionLengthChange = props.onSessionLengthChange;

  return (
    <div>
      <h2 id="session-label">Session Length</h2>
      <button
        id="session-increment"
        value={"increase"}
        onClick={(e) => onSessionLengthChange(e)}
      >
        Increase
      </button>
      <div id="session-length">{sessionLength}</div>
      <button
        id="session-decrement"
        value={"decrease"}
        onClick={(e) => onSessionLengthChange(e)}
      >
        Decrease
      </button>
    </div>
  );
};

export default Session;
