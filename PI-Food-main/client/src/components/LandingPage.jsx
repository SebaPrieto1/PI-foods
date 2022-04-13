import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./CreateRecipe.css";

export default function LandingPage() {
  return (
    <div className="soyLanding">
      <h1 className="createTitle">PI Henry Foods</h1>
      <Link to="/main/recipes">
        <button className="startButton">Start!</button>
      </Link>
    </div>
  );
}
