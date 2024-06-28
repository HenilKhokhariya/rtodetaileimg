require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const axios = require("axios");
const cheerio = require("cheerio");

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
app.post("/data", async (req, res) => {
  try {
    var img = "";
    const vNumber = await req.body.vnumber;

    const URL = `https://www.carinfo.app/rc-details/${vNumber}`;
    const respons = await axios.get(URL);
    let $ = await cheerio.load(respons.data);

    // $("div .css-yd8sa2").each(function (v, i) {
    //   const Name = $(this).find("div .css-1tay05u p").text();
    //   console.log(Name);
    // });

    $("div .css-11gihrn").each(function (index, el) {
      img = $(this).find("img").attr("src");
    });

    res.status(200).json({ img: img });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server is Start");
});
