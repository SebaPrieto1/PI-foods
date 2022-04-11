import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "../reducer/index";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) //Este termino es para no escribir choclasos
);

export default store;
