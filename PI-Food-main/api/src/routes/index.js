const Router = require("express");
const axios = require("axios");
const { Diet, Recipe, diet_recipes } = require("../db.js");
const TypesOfDiets = require("../diets.json");
const { Op } = require("sequelize");
const res = require("express/lib/response");

const router = Router();
router.use(Router.json());

const fetchByid = async (id) => {
  // let recipe = await axios.get(
  //   "https://api.spoonacular.com/recipes/" +
  //     id +
  //     "/information?includeNutrition=true&apiKey=defde7e3ceea4a208d6f875603852c39"
  // );
  let recipe = await axios.get(
    "https://api.spoonacular.com/recipes/" +
      id +
      "/information?includeNutrition=true&apiKey=887fe1a493804b44bad09cb48bea68f7"
  );
  recipe = {
    id: recipe.data.id,
    name: recipe.data.title,
    score: recipe.data.spoonacularScore,
    summary: recipe.data.summary,
    healthScore: recipe.data.healthScore,
    cookingSteps: recipe.data.analyzedInstructions.length
      ? recipe.data.analyzedInstructions[0].steps.map((current) => current.step)
      : null,
    image: recipe.data.image,
    Diets: recipe.data.diets,
  };
  return recipe;
};
const fetchDataFromApi = async () => {
  try {
    // let result = await axios.get(
    //   "https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=&number=15&apiKey=defde7e3ceea4a208d6f875603852c39"
    // );
    // let result = await axios.get(
    //   "https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=&number=5&apiKey=887fe1a493804b44bad09cb48bea68f7"
    // );

    // let result = await axios.get(
    //   "https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=&number=5&apiKey=dfef60fd7ebc4298bc6e4dfc8950a496"
    // );

    let result = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&offset=&number=5&apiKey=bb800cbc3e3a495da414abd0a7f16b1b"
    );

    const rawdata = await result.data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        score: recipe.spoonacularScore,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        cookingSteps: recipe.analyzedInstructions.length
          ? recipe.analyzedInstructions[0].steps.map((current) => current.step)
          : null,
        image: recipe.image,
        Diets: recipe.diets,
      };
    });
    return rawdata;
  } catch (err) {
    res.status(404).send("Fallo de la API");
  }
};

const fetchDataFromDb = async (id) => {
  let obtained = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //Para que no me devuelva las dietas como un array de objetos
  //hago lo siguiente:
  return obtained.map((el) => {
    let actual = el.toJSON();
    return {
      ...actual,
      Diets: actual.Diets.map((actualDiet) => actualDiet.name),
    };
  });
};

const gatherData = async () => {
  apiData = await fetchDataFromApi();
  dbData = await fetchDataFromDb();
  console.log(
    `${apiData.length} Element/s gathered from the api  \n${dbData.length} Element/s gathered form the data base`
  );
  gatheredData = apiData.concat(dbData);
  return gatheredData;
};

router.get("/types", async (req, res) => {
  let getedDiets = await Diet.findAll();
  return getedDiets.length
    ? res.status(200).send(getedDiets)
    : res.status(404).send("Aun no hay ninguna dieta");
});

router.get("/recipes", async (req, res) => {
  let { name } = req.query;
  let getedRecipes = await gatherData();
  if (name) {
    name = name.toLowerCase();
    getedRecipes = getedRecipes.filter((el) => {
      let temporal = el.name.toLowerCase();
      return temporal.includes(name);
    });
  }
  return getedRecipes.length
    ? res.status(200).send(getedRecipes)
    : res.status(404).send("Aun no hay ninguna receta");
});

router.get("/recipes/:id", async (req, res) => {
  let { id } = req.params;
  let result;
  if (id.includes("db")) {
    result = await Recipe.findOne({
      where: {
        id: id,
      },
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    console.log(result);
    if (result) {
      result = result.toJSON();
      result = { ...result, Diets: result.Diets.map((diet) => diet.name) };
    }
    return result
      ? res.status(200).send(result)
      : res.status(404).send("Elemento no encontrado");
  } else {
    result = await fetchByid(id);
    return result
      ? res.status(200).send(result)
      : res.status(404).send("Elemento no encontrado");
  }
});

router.post("/recipe", async (req, res) => {
  let { diets } = req.body;
  let dbCount = await Recipe.count();
  obj = { ...req.body, id: `db${dbCount + 1}` };
  try {
    const [newRecipe, created] = await Recipe.findOrCreate({
      where: {
        name: req.body.name,
      },
      defaults: {
        ...obj,
      },
    });
    if (created) {
      if (diets.length) {
        let recipeDiets = await Promise.all(
          diets.map(async (current) => {
            return await Diet.findOne({
              where: {
                name: current,
              },
            });
          })
        );
        newRecipe.addDiets(recipeDiets);
      }
      return res.status(200).send({ ...obj, Diets: diets });
    } else res.status(200).send("La receta ya existe");
  } catch (error) {
    res.status(404).send("Intento Fallido");
  }
});

module.exports = router;
