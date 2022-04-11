const actions = require("../actions/index");

const initialState = {
  recipes: [],
  recipe: {},
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_RECIPES:
      return { ...state, recipes: action.payload };
    case actions.GET_RECIPE:
      return { ...state, recipe: action.payload };
    case actions.CREATE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case actions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case actions.GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
