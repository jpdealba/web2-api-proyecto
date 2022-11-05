const router = require("express").Router();

const userRoutes = require("./users/routes");
const coinsRoutes = require("./coins/routes");
const transactionsRoutes = require("./transactions/routes");
const balanceRoutes = require("./balance/routes");

router.use("/users", userRoutes);
router.use("/transactions", transactionsRoutes);
router.use("/coins", coinsRoutes);
router.use("/balance", balanceRoutes);

module.exports = router;
