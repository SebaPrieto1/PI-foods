import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../redux/actions";
import Step from "./step";
import "./RecipeDetail.css";

const RecipeDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const recipe = useSelector((state) => state.recipe);
  const loading = useSelector((state) => state.loading);
  React.useEffect(() => {
    dispatch(getRecipeById(id));
    // eslint-disable-next-line
  }, []);
  function logRecipe() {
    console.log(recipe);
  }
  return (
    <div>
      {loading === "found" ? (
        <div>
          <h2 className="createTitle">{recipe.name}</h2>
          <div className="detCont">
            <img
              className="detImg"
              src={recipe.image}
              alt="URL Not Found"
            ></img>
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
            {recipe.summary ? (
              <div>
                <h2 className="txtContainer">Summary</h2>
                <div
                  className="txtContainer"
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                ></div>
              </div>
            ) : (
              <h4>No summary</h4>
            )}
            <br></br>
            {recipe.cookingSteps ? (
              <div>
                <h2 className="txtContainer">Cooking Steps</h2>
                <br></br>
                <div className="stepContainer">
                  {recipe.cookingSteps?.map((step, index) => {
                    return <Step key={index} index={index} data={step}></Step>;
                  })}
                </div>
              </div>
            ) : (
              <h4>No cooking steps</h4>
            )}
            <div>
              <button onClick={logRecipe}></button>
            </div>
          </div>
        </div>
      ) : loading === "loading" ? (
        <h1> loading </h1>
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default RecipeDetail;
