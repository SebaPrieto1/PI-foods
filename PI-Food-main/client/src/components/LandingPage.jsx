import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>PI Henry Foods</h1>
      <Link to="/main/recipes">
        <button>Start!</button>
      </Link>
    </div>
  );
}
