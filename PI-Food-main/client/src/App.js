import "./App.css";
//Hay que envolverla en el router
import { BrowserRouter, Route, Switch } from "react-router-dom"; //Investigar esto
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeDetail from "./components/RecipeDetail";
import NavBar from "./components/NavBar";
import CreateRecipe from "./components/CreateRecipe";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path={"/main/:any"} component={NavBar}></Route>
        <Switch>
          <Route exact path={"/main"} component={LandingPage}></Route>
          <Route
            exact
            path={"/main/addRecipe"}
            component={CreateRecipe}
          ></Route>
          <Route exact path={"/main/recipes"} component={Home}></Route>
          <Route
            exact
            path={"/main/recipe/:id"}
            component={RecipeDetail}
          ></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
