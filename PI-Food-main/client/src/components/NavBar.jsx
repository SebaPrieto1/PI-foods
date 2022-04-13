import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <div className="bar">
      <NavLink className={"unselected"} to={"/main"}>
        Home
      </NavLink>
      <NavLink
        className={"unselected"}
        activeClassName="selected"
        to={"/main/recipes"}
      >
        Recipes
      </NavLink>
      <NavLink
        className={"unselected"}
        activeClassName="selected"
        to={"/main/addRecipe"}
      >
        Create Recipe
      </NavLink>
    </div>
  );
}
