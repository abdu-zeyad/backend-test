require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

// routs
app.get("/all", getAllDataHandler);

//
//handlers
//
function getAllDataHandler(req, res) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
  axios.get(url).then((results) => {
    res.send(results.data.drinks);
  });
}

//
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`liston on port${PORT}`);
});
