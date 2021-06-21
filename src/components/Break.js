import React from "react";

const Break = (props) => {
  const breakLength = props.breakLength / 60;
  const onBreakLengthChange = props.onBreakLengthChange;

  return (
    <div>
      <h2 id="break-label">Break Length</h2>
      <button
        id="break-increment"
        value={"increase"}
        onClick={(e) => onBreakLengthChange(e)}
      >
        Increase
      </button>
      <div id="break-length">{breakLength}</div>
      <button
        id="break-decrement"
        value={"decrease"}
        onClick={(e) => onBreakLengthChange(e)}
      >
        Decrease
      </button>
    </div>
  );
};

export default Break;
