const express = require("express");
const router = express.Router();
const {getAllProducts, getAllProductsStatic, getSingleProduct} = require("../controllers/productsController")


router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);
router.route("/singleproduct").get(getSingleProduct);

module.exports = router
