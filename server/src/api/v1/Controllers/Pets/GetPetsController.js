const pet = require("../../Database/models/pet");
const GetPetsController = async (req, res) => {
  pet
    .findAll({
      raw: true,
      nest: true,
      order: [["createdAt", "DESC"]],
    })
    .then(async (data) => {
      if (data) {
        return res.status(200).send({
          success: true,
          petData: data,
        });
      } else {
        return res.status(200).send({
          success: false,
          petData: [],
        });
      }
    });
};
