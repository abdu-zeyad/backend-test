require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/drinkdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const drinksSchema = new mongoose.Schema({
  strDrink: String,
  strDrinkThumb: String,
});

const Drinks = mongoose.model("drinks", drinksSchema);

// routs
app.get("/all", getAllDataHandler);
app.post("/addtofav", addtofavhandler);
app.get("/getfavdata", addfavorite);
//
//handlers
//
function getAllDataHandler(req, res) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
  axios.get(url).then((results) => {
    res.send(results.data.drinks);
  });
}

function addtofavhandler(req, res) {
  const { strDrink, strDrinkThumb } = req.body;
  console.log(strDrink);
  const newdrink = new Drinks({
    strDrink: strDrink,
    strDrinkThumb: strDrinkThumb,
  });
  newdrink.save();
}
function addfavorite(req, res) {
  Drinks.find({}, (err, data) => {
    res.send(data);
  });
}
//
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`liston on port${PORT}`);
});
