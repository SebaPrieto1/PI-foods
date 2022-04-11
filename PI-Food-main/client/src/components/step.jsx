import React from "react";

const Step = (props) => {
  return (
    <div>
      <h5>{`[${props.index}] ${props.data}`}</h5>
    </div>
  );
};

export default Step;
