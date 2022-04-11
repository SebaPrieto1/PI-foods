const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("Recipe", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cookingSteps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      default:
        "https://cdn.imgbin.com/15/13/15/imgbin-pizza-take-out-vegetarian-cuisine-calzone-ingredient-pizza-uPLAxd2gv4WzbQ4TmwUDxPQzP.jpg",
      allowNull: true,
    },
  });
};
