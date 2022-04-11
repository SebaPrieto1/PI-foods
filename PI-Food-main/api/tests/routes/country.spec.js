/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  id: "db1",
  name: "Plato vacio",
  summary: "empty",
  score: "100",
  healthScore: "1",
  Diets: ["vegan"],
  cookingSteps: ["Nada"],
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", () => {
    it("should get 200", () => agent.get("/recipes").expect(200));

    it("should get 200", () => agent.get("/recipes/db1").expect(200));

    it("should get 404", () => agent.get("/recipes/db10").expect(404));
  });
});
