const actions = require("../actions/index");

const initialState = {
  recipes: [],
  recipe: {},
  diets: [],
  loading: "loading", //loading, notFound, found,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_RECIPES:
      return { ...state, recipes: action.payload };
    case actions.GET_RECIPE:
      return { ...state, recipe: action.payload };
    case actions.CREATE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case actions.GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case actions.SET_LOAD:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
