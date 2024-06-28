const express = require("express");
const router = require("./router");
const cors = require("cors");
require("dotenv").config();
const corsObject = {
  origin: "https://rtodetaileimg.onrender.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  methods: "POST,GET,PUT,DELETE",
};
const app = express();
const PORT = process.env.PORT | 5000;
app.use(express.json());
app.use(cors(corsObject));
app.use("/api", router);
app.listen(PORT, (res) => {
  console.log("Server is running on port " + PORT);
});
