require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const axios = require("axios");
const cheerio = require("cheerio");
let data = [];
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
app.post("/data", async (req, res) => {
  try {
    var img = "";
    const vNumber = await req.body.vnumber;

    const URL = `https://www.dicegameeos.com/games/angry_birds_friends.html`;
    // const URL = `https://www.carinfo.app/rc-details/${vNumber}`;
    // const respons = await axios.get(URL);
    // let $ = await cheerio.load(respons.data);

    // // $("div .css-yd8sa2").each(function (v, i) {
    // //   const Name = $(this).find("div .css-1tay05u p").text();
    // //   console.log(Name);
    // // });

    // $("div .css-11gihrn").each(function (index, el) {
    //   img = $(this).find("img").attr("src");
    // });
    await axios.get(URL).then(async (res) => {
      let $ = cheerio.load(res.data);
      //Icon And AppName
      $("div .Rbox").each(function (index, el) {
        let img = $(this).find("div .thumb img").attr("data-src");

        let appname = $(this).find("div .info div h4").text();

        let category = $(this).find("div ul li span").text();

        let reating = $(this).find("div .con ul li p").text().substring(0, 1);

        let Age = $(this).find("div .con ul li span").text();

        data.push({
          img: img,
          appname: appname.substring(1),
          category: category.split("\n")[1],
          reating: reating,
          Age: Age.split(" ")[2].substring(1),
        });
      });
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server is Start");
});
