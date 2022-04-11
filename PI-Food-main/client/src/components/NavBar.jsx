import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <div className="bar">
      <Link to={"/main"}>
        <button className="barBtn">Home</button>
      </Link>
      <Link to={"/main/recipes"}>
        <button className="barBtn">Recipes</button>
      </Link>
      <Link to={"/main/addRecipe"}>
        <button className="barBtn">Create new recipe</button>
      </Link>
      {/* <Link to={"/createdRecipes"}>
        <button>View my recipes</button>
      </Link> */}
    </div>
  );
}
