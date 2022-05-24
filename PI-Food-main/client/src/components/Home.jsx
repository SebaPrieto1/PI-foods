//Buscar que hace todo lo siguiente:
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../redux/actions";
import RecipeCard from "./RecipeCard";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const showedCards = 9;
  const [filter, setFilter] = useState({
    diets: [],
    order: "10to1", //AtoZ, ZtoA, 10to1, 1to10
    nameFilter: "",
  });
  const [pageCounter, setPageCounter] = useState(1);
  const [recetasRender, setRecetasRender] = useState([]);
  const [pages, setPages] = useState([]);
  const loadedRecipes = useSelector((state) => state.recipes);
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setRecetasRender(loadedRecipes);
    // eslint-disable-next-line
  }, [loadedRecipes]);
  useEffect(() => {
    setRecetasRender(applyFilters(loadedRecipes));
    setPageCounter(1);
    // eslint-disable-next-line
  }, [filter]);
  useEffect(() => {
    let pagTot = Math.ceil(recetasRender.length / showedCards);
    let desechable = [];
    for (let i = 0; i < pagTot; i++) {
      desechable.push("");
    }
    setPages(desechable);
    let btnDec = document.getElementById("btnDec");
    let btnInc = document.getElementById("btnInc");
    if (recetasRender.length < showedCards) {
      btnInc.disabled = true;
      btnDec.disabled = true;
      return;
    } else if (pageCounter == 1) {
      btnDec.disabled = true;
      btnInc.disabled = false;
    } else if (pageCounter >= recetasRender.length / showedCards) {
      btnDec.disabled = false;
      btnInc.disabled = true;
    } else {
      btnDec.disabled = false;
      btnInc.disabled = false;
    }
    // eslint-disable-next-line
  }, [pageCounter, recetasRender]);

  function IncrementIndexHandler(e) {
    setPageCounter(pageCounter + 1);
  }
  function DrecrementIndexHandler(e) {
    setPageCounter(pageCounter - 1);
  }

  function changeHandler(e) {
    setFilter({ ...filter, nameFilter: e.target.value });
  }
  function orderHandler(e) {
    setFilter({
      ...filter,
      order: e.target.value,
    });
  }

  function Order(toOrder) {
    let arr = [...toOrder];
    switch (filter.order) {
      case "AtoZ":
        return arr.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      case "ZtoA":
        return arr.sort((a, b) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        );
      case "1to10":
        return arr.sort((a, b) => a.score - b.score);
      case "10to1":
        return arr.sort((a, b) => b.score - a.score);
      default:
        return toOrder;
    }
  }

  function filterByDiets(arr, diets) {
    if (!diets.length) return arr;
    let newDiets = [...diets];
    let diet = newDiets.pop();
    let newArr = arr.filter((el) => el.Diets.includes(diet));
    return filterByDiets(newArr, newDiets);
  }

  function applyFilters(arr) {
    arr = filterByDiets(arr, filter.diets);
    arr = Order(arr);
    return arr.filter((recipe) =>
      recipe.name.toLowerCase().includes(filter.nameFilter.toLowerCase())
    );
  }

  function dietHandler(e) {
    if (filter.diets.includes(e.target.name)) {
      setFilter({
        ...filter,
        diets: filter.diets.filter((el) => el !== e.target.name),
      });
    } else
      setFilter({
        ...filter,
        diets: [...filter.diets, e.target.name],
      });
  }

  return (
    <div className="wrapper">
      <div className="filterWrap">
        <h5>Filter by</h5>
        <label>Filtrar por nombre</label>
        <input
          type="text"
          onChange={changeHandler}
          value={filter.nameFilter}
        ></input>
        <br></br>
        <label>Filtrar por dietas</label>
        <br></br>
        <label>
          <input name="vegan" type="checkbox" onChange={dietHandler}></input>
          Vegan
        </label>
        <br></br>
        <label>
          <input
            name="gluten free"
            type="checkbox"
            onChange={dietHandler}
          ></input>
          Gluten free
        </label>
        <br></br>
        <label>
          <input
            name="lacto ovo vegetarian"
            type="checkbox"
            onChange={dietHandler}
          ></input>
          Lacto ovo vegetarian
        </label>
        <br></br>
        <label>
          <input
            name="dairy free"
            type="checkbox"
            onChange={dietHandler}
          ></input>
          Dairy free
        </label>
        <br></br>
        <label>
          <input name="whole 30" type="checkbox" onChange={dietHandler}></input>
          Whole 30
        </label>
        <br></br>
        <label>
          <input name="primal" type="checkbox" onChange={dietHandler}></input>
          Primal
        </label>
        <br></br>
        <label>
          <input
            name="fodmap friendly"
            type="checkbox"
            onChange={dietHandler}
          ></input>
          Fodmap friendly
        </label>
        <br></br>
        <label>
          <input
            name="paleolithic"
            type="checkbox"
            onChange={dietHandler}
          ></input>
          Paleolithic
        </label>
        <br></br>
        <label>
          <input
            name="ketogenic"
            type="checkbox"
            onChange={dietHandler}
          ></input>
          Ketogenic
        </label>
        <br></br>
        <label>
          <input
            name="pescatarian"
            type="checkbox"
            onChange={dietHandler}
          ></input>
          Pescatarian
        </label>
        <br></br>
        <div>
          <label>Total results {recetasRender.length}</label>
          <br></br>
          <select
            name="type1"
            className="type_input"
            onChange={orderHandler}
            defaultValue="10to1"
          >
            <option value="AtoZ" className="type_option">
              A to Z
            </option>
            <option value="ZtoA" className="type_option">
              Z to A
            </option>
          </select>
        </div>
      </div>
      <div className="mainVertical">
        <h1 className="topIndex">Recipes</h1>
        <div className="recipesContainer">
          {recetasRender.length ? (
            recetasRender?.map((recipe, index) => {
              if (
                index < pageCounter * showedCards &&
                index >= (pageCounter - 1) * showedCards
              )
                return (
                  <RecipeCard
                    key={index}
                    id={recipe.id}
                    image={recipe.image}
                    name={recipe.name}
                    score={recipe.score}
                    diets={recipe.Diets}
                    summary={recipe.summary}
                  ></RecipeCard>
                );
              return;
            })
          ) : (
            <h2>No recipes found</h2>
          )}
        </div>
        <div className="botIndex">
          <div className="downbtns">
            {pages.map((e, i) => {
              return pageCounter > i ? (
                <button
                  key={"bot" + i}
                  name={i + 1}
                  hidden={
                    pageCounter === i + 1 || pageCounter > i + 4 ? true : false
                  }
                  onClick={(e) => {
                    setPageCounter(Number(e.target.name));
                  }}
                >
                  {i + 1}
                </button>
              ) : (
                <></>
              );
            })}
          </div>
          <div className="upAndDown">
            <button
              className="btn"
              id="btnDec"
              onClick={DrecrementIndexHandler}
            >
              -
            </button>
            <h6>{pageCounter}</h6>
            <button className="btn" id="btnInc" onClick={IncrementIndexHandler}>
              +
            </button>
          </div>
          <div className="topbtns">
            {pages.map((e, i) => {
              return pageCounter <= i ? (
                <button
                  key={"top" + i}
                  name={i + 1}
                  hidden={
                    pageCounter === i + 1 || i + 1 > pageCounter + 3
                      ? true
                      : false
                  }
                  onClick={(e) => {
                    setPageCounter(Number(e.target.name));
                  }}
                >
                  {i + 1}
                </button>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
