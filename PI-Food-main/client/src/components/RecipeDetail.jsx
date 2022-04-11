import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../redux/actions";
import Step from "./step";
import "./RecipeDetail.css";
const RecipeDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const recipe = useSelector((state) => state.recipe);
  React.useEffect(() => {
    dispatch(getRecipeById(id));
  }, []);
  function logRecipe() {
    console.log(recipe);
  }
  return (
    <div>
      <h2 className="createTitle">{recipe.name}</h2>
      <div className="detCont">
        <img className="detImg" src={recipe.image}></img>
        <div className="detScores">
          <h4>{`Dish score: ${recipe.score}`}</h4>
          <h4>{`Health score: ${recipe.healthScore}`}</h4>
        </div>
        <div>
          {recipe.Diets?.map((diet) => {
            return <span className="tag">{diet} </span>;
          })}
        </div>
        <br></br>
        <div
          className="txtContainer"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></div>
        <br></br>
        <div>
          {recipe.cookingSteps?.map((step, index) => {
            return <Step key={index} index={index} data={step}></Step>;
          })}
        </div>
        <div>
          <button onClick={logRecipe}></button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
