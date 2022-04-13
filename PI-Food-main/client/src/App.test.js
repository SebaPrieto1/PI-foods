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
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Link } from "react-router-dom";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/PI Henry Foods/i);
//   expect(linkElement).toBeInTheDocument();
// });

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let nav;
  // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces. <3
  beforeEach(() => {
    nav = shallow(<NavBar />);
  });

  it('Debería renderizar dos <Link to="" />. El primero que vaya a "/", y el segundo a "/house/create"', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/"', () => {
    // El orden en el que se declaran los Links es importante!
    expect(nav.find(Link).at(0).prop("to")).toEqual("/main");
    expect(nav.find(Link).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Recipes" y que cambie la ruta hacia "/main/recipes"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/main/recipes");
    expect(nav.find(Link).at(1).text()).toEqual("Recipes");
  });
});

/* eslint-disable import/no-extraneous-dependencies */
