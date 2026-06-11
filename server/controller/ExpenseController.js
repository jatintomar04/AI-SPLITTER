const Expenses = require("../models/expenseModel")
const USER = require("../models/authModel")
const Group = require("../models/groupModel")
const { getIO } = require("../socket/socket");

const Expense = async (req, res) => {

    try {

        const { title, amount, type, groupId } = req.body;

        const paidBy = req.user._id;
        const user = req.user.name;

        // VALIDATION
        if (!title || !amount || !type) {
            return res.status(400).json({
                message: "Please fill all details"
            });
        }

        // VALID AMOUNT
        const numAmount = Number(amount);

        if (!Number.isFinite(numAmount)) {
            return res.status(400).json({
                message: "Please enter valid amount"
            });
        }

        // BASE OBJECT
        let expenseData = {
            title,
            amount: numAmount,
            type,
            paidBy,
            user
        };

        // SELF EXPENSE
        if (type === "self") {

            expenseData.group = null;
        }

        // GROUP EXPENSE
        if (type === "group") {

            if (!groupId) {
                return res.status(400).json({
                    message: "Group ID required"
                });
            }

            const group = await Group.findById(groupId);

            if (!group) {
                return res.status(404).json({
                    message: "Group not found"
                });
            }

            // IMPORTANT
            expenseData.group = groupId;
        }

        // CREATE
        const expense = await Expenses.create(expenseData);
        // realtime emit
        getIO().emit("dataUpdated", {
            type: "expense",
            action: "created",
            data: expense,
            
        });

        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expense
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
};

const getExpenses = async (req, res) => {
    try {
        const userId = req.user._id;
        const { type = "all" } = req.query;

        // User ke saare groups nikaalo
        const groups = await Group.find({
            members: userId,
        }).select("_id");

        const groupIds = groups.map((group) => group._id);

        let filter = {};

        // SELF EXPENSES
        if (type === "self") {
            filter = {
                paidBy: userId,
                type: "self",
            };
        }

        // GROUP EXPENSES (group ke sab members ke expenses)
        else if (type === "group") {
            filter = {
                type: "group",
                group: { $in: groupIds },
            };
        }

        // ALL EXPENSES
        else {
            filter = {
                $or: [
                    {
                        paidBy: userId,
                        type: "self",
                    },
                    {
                        type: "group",
                        group: { $in: groupIds },
                    },
                ],
            };
        }

        const expenses = await Expenses.find(filter)
            .populate("group", "name")
            .populate("paidBy", "name user_id")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: expenses.length,
            expenses,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount,type } = req.body

        const updatedExpense = await Expenses.findByIdAndUpdate(id, req.body, { returnDocument: "after" })

        if (!updatedExpense) {
            return res.status(404).json({
                message: "Expanse not found"
            })
        }

        getIO().emit("dataUpdated", {
            type: "expense",
            action: "updated",
            data: updatedExpense,
        });


        return res.status(200).json({
            message: "Expense update sucessfully",
            updatedExpense
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params
        const deletedExpense = await Expenses.findByIdAndDelete(id)

        if (!deletedExpense) {
            return res.status(404).json({
                message: "Expense not found!"
            })
        }
        getIO().emit("dataUpdated", {
            type: "expense",
            action: "deleted",
            data: id,
        });
        return res.status(200).json({
            message: "Expense deleted sucessfully",
            expenseId: id,

        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,

        })
    }
}

module.exports = { Expense, getExpenses, updateExpense, deleteExpense }