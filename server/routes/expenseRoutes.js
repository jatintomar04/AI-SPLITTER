const express = require("express")
const protect = require("../middleware/authMiddleware")
const {  updateExpense, deleteExpense, Expense, getExpenses } = require("../controller/ExpenseController")
const router = express.Router()


router.post("/add",protect,Expense )
router.get("/All-expense",protect,getExpenses)
router.put("/update/:id",protect,updateExpense)
router.delete("/delete/:id",protect,deleteExpense)



module.exports = router