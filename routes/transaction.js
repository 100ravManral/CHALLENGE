//setting routes
const express = require("express");
const { TransactionAll, AllTransactionsByMonth, StatisticsByMonth, BarChartData } = require("../controllers/transaction");
const router =express.Router();

router.route("/").get(TransactionAll);
router.route("/transactionByMonth").get(AllTransactionsByMonth);
router.route("/statisticsByMonth").get(StatisticsByMonth);
router.route("/barChartData").get(BarChartData);
module.exports = router;
