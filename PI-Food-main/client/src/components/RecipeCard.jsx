import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = (props) => {
  function toUpper(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if ((i = 0)) result += str[i].toUpperCase();
      else result += str[i];
    }
    return result;
  }
  return (
    <div className="card">
      <Link to={"/main/recipe/" + props.id}>
        <img className="img" src={props.image} alt="404 Not found"></img>
      </Link>
      <div className="tagContainer">
        {props.diets?.map((diet) => {
          return <span className="tag">{diet}</span>;
        })}
      </div>
      <p className="cardTitle">{props.name}</p>
    </div>
  );
};

export default RecipeCard;
