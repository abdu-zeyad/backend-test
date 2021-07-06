require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`liston on port${PORT}`);
});
