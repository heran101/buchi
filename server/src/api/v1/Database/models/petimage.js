"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PetImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PetImage.init(
    {
      imageId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      petId: DataTypes.INTEGER,
      petImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PetImage",
    }
  );
  return PetImage;
};
