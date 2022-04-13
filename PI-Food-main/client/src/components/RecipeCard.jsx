import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = (props) => {
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
