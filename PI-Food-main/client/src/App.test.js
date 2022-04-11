import { render, screen } from "@testing-library/react";
import App from "./App";
import * as data from "./data.json";
import CreateRecipe from "./components/CreateRecipe";
import RecipeCard from "./components/RecipeCard";
import NavBar from "./components/NavBar";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/PI Henry Foods/i);
  expect(linkElement).toBeInTheDocument();
});

configure({ adapter: new Adapter() });
describe("<App />", () => {
  let store;
  const routes = ["/main", "/main/recipes", "/main/addRecipe"];
  const mockStore = configureStore([thunk]);
  const state = {
    recipes: data.recipes1,
    recipe: data.recipes1[0],
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  it('El componente "Cards" se debería renderizar solamente en la ruta "/main/recipes"', () => {
    const app = mount(componentToUse(routes[1]));
    expect(app.find(RecipeCard)).toHaveLength(1);
    expect(app.find(NavBar)).toHaveLength(1);
  });

  it('El componente "CreateRecipe" se debería renderizar solamente en la ruta "/main/addRecipe"', () => {
    const app = mount(componentToUse(routes[2]));
    expect(app.find(CreateRecipe)).toHaveLength(1);
    expect(app.find(Houses)).toHaveLength(0);
    expect(app.find(NavBar)).toHaveLength(1);
  });
});

/* eslint-disable import/no-extraneous-dependencies */
