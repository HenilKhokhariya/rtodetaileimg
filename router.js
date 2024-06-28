const controler = require("./controler");
const express = require("express");

const router = express.Router();

router.route("/").get(controler.Home);
router.route("/data").post(controler.Data);

module.exports = router;
