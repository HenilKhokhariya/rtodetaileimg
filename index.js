require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const axios = require("axios");
const cheerio = require("cheerio");
let data = [];
const corsObject = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  methods: "POST,GET,PUT,DELETE",
};
app.use(cors(corsObject));
app.use(express.json());

app.post("/api/data", async (req, res) => {
  try {
    var img = "";
    const vNumber = await req.body.vnumber;
    await axios
      .get(`https://www.carinfo.app/rc-details/${vNumber}`)
      .then(async (res) => {
        let $ = cheerio.load(res.data);

        // $("div .css-yd8sa2").each(function (v, i) {
        //   const Name = $(this).find("div .css-1tay05u p").text();
        //   console.log(Name);
        // });

        $("div .css-11gihrn").each(function (index, el) {
          img = $(this).find("img").attr("src");
        });
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json({ img: img });
  } catch (error) {
    console.log(data);
  }
});

app.listen(port, () => {
  console.log("Server is Start");
});
