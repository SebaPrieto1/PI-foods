import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDiets, setRecipe } from "../redux/actions";
import validate from "./validate";
import "./CreateRecipe.css";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const [datos, setDatos] = React.useState({
    name: "",
    summary: "",
    score: "10",
    healthScore: "",
    cookingSteps: [""],
    diets: [],
    image: "",
  });

  const [error, setError] = React.useState({
    name: "Recipes must have a name",
    summary: "Recipes must have a summary",
    score: "Only numbers between 1 and 100",
    healthScore: "Only numbers between 1 and 100",
    image: "",
  });
  const [disabled, setDisabled] = React.useState(true);

  useEffect(() => {
    dispatch(getDiets());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (
      error.name ||
      error.summary ||
      error.healthScore ||
      error.score ||
      error.image
    )
      setDisabled(true);
    else setDisabled(false);
  }, [error]);
  const diets = useSelector((state) => state.diets);

  function submit(e) {
    e.preventDefault();
    dispatch(setRecipe(datos));
    uncheckAll();
    //window.location.reload();
  }
  function uncheckAll() {
    const cboxs = [...document.querySelectorAll("input[type=checkbox]")];
    cboxs.map((cbox) => (cbox.checked = false));
    setDatos({
      name: "",
      summary: "",
      score: "0 ",
      healthScore: "",
      cookingSteps: [""],
      diets: [],
      image: "",
    });
  }

  function changeHandler(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setError(validate({ ...datos, [e.target.name]: e.target.value }));
  }
  function dietHandler(e) {
    const currentDiets = [...datos.diets];
    currentDiets.includes(e.target.name)
      ? setDatos({
          ...datos,
          diets: currentDiets.filter((el) => el !== e.target.name),
        })
      : setDatos({ ...datos, diets: [...currentDiets, e.target.name] });
  }

  function stepHandler(e) {
    const steps = [...datos.cookingSteps];
    steps[e.target.id] = e.target.value;
    setDatos({ ...datos, cookingSteps: steps });
  }
  function removeStep(e) {
    e.preventDefault();
    const steps = datos.cookingSteps.filter(
      (el, index) => index !== Number(e.target.name)
    );
    setDatos({ ...datos, cookingSteps: steps });
  }
  function addStep(e) {
    e.preventDefault();
    setDatos({ ...datos, cookingSteps: [...datos.cookingSteps, ""] });
  }

  return (
    <div>
      <h1 className="createTitle">Create your own</h1>
      <form className="formContainer" onSubmit={submit}>
        <div className="optionContainer">
          <label className="generalText">Title: </label>
          <input
            className="input_Create"
            name="name"
            onChange={changeHandler}
            value={datos.name}
          ></input>
          <span className="err">{error.name}</span>
        </div>
        <br></br>
        <div className="optionContainer">
          <label className="generalText">Summary: </label>
          <input
            className="input_Create"
            name="summary"
            onChange={changeHandler}
            value={datos.summary}
          ></input>
          <span className="err">{error.summary}</span>
        </div>
        <br></br>
        {/* <div className="optionContainer">
          <label className="generalText">Dish score: </label>
          <input
            className="input_Create"
            name="score"
            onChange={changeHandler}
            value={datos.score}
          ></input>
          <span className="err">{error.score}</span>
        </div> */}
        <br></br>
        <div className="optionContainer">
          <label className="generalText">Health score: </label>
          <input
            className="input_Create"
            name="healthScore"
            onChange={changeHandler}
            value={datos.healthScore}
          ></input>
          <span className="err">{error.healthScore}</span>
        </div>
        <br></br>
        <div className="optionContainer">
          <label className="generalText">Image: </label>
          <input
            className="input_Create"
            name="image"
            onChange={changeHandler}
            value={datos.image}
          ></input>
          <span className="err">{error.image}</span>
        </div>
        <br></br>
        <label className="generalText">Steps: </label>
        {datos.cookingSteps.map((element, index) => {
          return (
            <div key={index}>
              <label className="generalText">{index + 1}) </label>
              <input
                className="input_Create"
                id={index}
                onChange={stepHandler}
                value={element}
              ></input>
              <button
                class="stepBtn stepLeft"
                name={index}
                onClick={removeStep}
              >
                Remove
              </button>
            </div>
          );
        })}
        <button
          className="stepBtn"
          disabled={datos.cookingSteps.length >= 5 ? true : false}
          onClick={addStep}
        >
          Add step
        </button>
        <br></br>
        <label className="generalText">Diets: </label>
        <div className="tgCont">
          {diets.map((element, index) => {
            return (
              <div className="tg" key={index}>
                <input
                  id={index + element.name}
                  name={element.name}
                  type="checkbox"
                  onChange={dietHandler}
                ></input>
                <label className="diet-label" htmlFor={index + element.name}>
                  {element.name.slice(0, 1).toUpperCase() +
                    element.name.slice(1)}
                </label>
              </div>
            );
          })}
        </div>
        <button className="barBtn" disabled={disabled} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
