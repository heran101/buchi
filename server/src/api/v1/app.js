const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const AddPetController = require("./Controllers/Pets/AddPetController");

const app = express();
app.use(cors());

const port = process.env.PORT || 2300;

app.use(express.json());
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.get("/", (req, res) =>
  res.send("Welcome to the database connecting server")
);
// app.post("/pets", get);
app.post("/addPet", AddPetController);
