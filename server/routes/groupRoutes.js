const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createGroup, getGroupExpenses, getGroups, removeGroup } = require("../controller/groupController");

router.post("/create", protect, createGroup);
router.get("/all/expense/:id", protect, getGroupExpenses);
router.get("/all", protect, getGroups);
router.delete("/remove/:groupId", protect, removeGroup);





module.exports = router;