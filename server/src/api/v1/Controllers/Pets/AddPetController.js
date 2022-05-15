const Pet = require("../../Database/models/pet.js");
const AddPetController = (req, res) => {
  const { petName, petType, petSize, petgender, good } = req.body;
  console.log("petId", Pet);
  Pet.create({
    name: petName,
    type: petType,
    size: petSize,
    gender: petgender,
    good_with_children: good,
  }).then((pet) => {
    if (pet) {
      return res.status(200).send({
        success: true,
        message: "added successfully",
      });
    } else {
      res.status(400).send("Error in inserting new record");
    }
  });
};

module.exports = AddPetController;
