const express = require("express")
const { chatBot, groupChatBot } = require("../controller/aiController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/chat",protect,chatBot)
router.post("/chat/group",protect,groupChatBot)





module.exports = router