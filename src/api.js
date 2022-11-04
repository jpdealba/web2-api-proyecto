const router = require("express").Router();

const userRoutes = require("./users/routes");
const coinsRoutes = require("./coins/routes");
const transactionsRoutes = require("./transactions/routes");

router.use("/users", userRoutes);
router.use("/transactions", transactionsRoutes);
router.use("/coins", coinsRoutes);

module.exports = router;
