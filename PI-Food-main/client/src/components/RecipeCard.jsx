import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = (props) => {
  return (
    <Link className="link-underline" to={"/main/recipe/" + props.id}>
      <div className="card">
        <img className="img" src={props.image} alt="404 Not found"></img>

        <div className="tagContainer">
          {props.diets?.map((diet) => {
            return (
              <span className="tag">
                {diet[0].toUpperCase() + diet.slice(1)}
              </span>
            );
          })}
        </div>
        <p className="cardTitle">{props.name}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
