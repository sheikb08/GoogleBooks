const router = require("express").Router();
const dbRoutes = require("./dbRoutes");
const apiRoutes = require("./apiRoutes");

router.use("/db", dbRoutes);
router.use("/web", apiRoutes);

module.exports =  router;