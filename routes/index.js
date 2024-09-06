let express = require("express");
let router = express.Router();
let prisma = require("../prisma/prisma");

router.get("/images", async function (req, res, next) {
  try {
    const images = await prisma.picture.findMany();
    console.log(images);
    res.json(images);
  } catch (err) {
    next(err);
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = router;
