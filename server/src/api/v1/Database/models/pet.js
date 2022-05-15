"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pet.init(
    {
      petId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      size: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      good_with_children: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
