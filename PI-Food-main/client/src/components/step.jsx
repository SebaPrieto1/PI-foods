import React from "react";
import "./RecipeDetail.css";
const Step = (props) => {
  return (
    <div>
      <h6 className="strech">{`${props.index + 1}) ${props.data}`}</h6>
    </div>
  );
};

export default Step;
