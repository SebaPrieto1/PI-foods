import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

export const getRecipes = (name) => (dispatch) => {
  if (name) {
    return fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_RECIPES, payload: data }));
  } else {
    return fetch(`http://localhost:3001/recipes`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_RECIPES, payload: data }));
  }
};

export const getRecipeById = (id) => (dispatch) => {
  return fetch(`http://localhost:3001/recipes/${id}`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_RECIPE, payload: data }));
};

export const getDiets = () => (dispatch) => {
  return fetch(`http://localhost:3001/types`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_DIETS, payload: data }));
};

export const setRecipe = (recipe) => (dispatch) => {
  if (!recipe.image)
    recipe.image =
      "https://legleporcelain.com/wp-content/uploads/2021/07/BJ-117.png";
  axios
    .post("http://localhost:3001/recipe", recipe)
    .then((data) => {
      if (data.data === "La receta ya existe") {
        alert("La receta ya existe");
        return;
      } else {
        alert("Receta creada correctamente");
        dispatch({ type: CREATE_RECIPE, payload: data.data });
      }
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

export const deleteRecipe = function (id) {
  return { type: DELETE_RECIPE, payload: id };
};
