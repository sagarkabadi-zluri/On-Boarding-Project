const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenseController");

router.get("/", expensesController.getAllExpenses);
router.get("/:id", expensesController.getExpenseById);
router.post("/", expensesController.createExpense);
router.put("/:id", expensesController.updateExpense);
router.delete("/:id", expensesController.deleteExpense);
router.get('/p/:page', expensesController.getExpensesByPage)
router.get('/dates/:startDate/:endDate', expensesController.getExpensesBetweenDates)

module.exports = router;
