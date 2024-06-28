const express = require("express");
const router = require("./router");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT | 5000;
app.use(express.json());
app.use("/api", router);
app.listen(PORT, (res) => {
  console.log("Server is running on port " + PORT);
});
