const cheerio = require("cheerio");
const axios = require("axios");

const Home = async (req, res) => {
  try {
    res.status(200).send("Home");
  } catch (error) {
    res.status(400).send("Not Found");
  }
};
const Data = async (req, res) => {
  try {
    var img = "";
    const vNumber = await req.body.vnumber;
    await axios(`https://www.carinfo.app/rc-details/${vNumber}`)
      .then((result) => {
        const $ = cheerio.load(result.data);

        // $("div .css-yd8sa2").each(function (v, i) {
        //   const Name = $(this).find("div .css-1tay05u p").text();
        //   console.log(Name);
        // });

        $("div .css-11gihrn").each(function (el, i) {
          img = $(this).find("img").attr("src");
        });
        res.status(200).json({ img: img });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(400).send("Not Found");
  }
};
module.exports = { Home, Data };
