const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const { searchUser, sendInvite, acceptInvite, getMYinvite, rejectRequest, exitGroup } = require("../controller/UserController")

router.get("/find/:id",protect,searchUser)
router.post("/invite",protect,sendInvite)
router.put("/invite/:inviteId/accept", acceptInvite)
router.get("/my-invites", protect,getMYinvite)
router.put("/invite/:inviteId/reject", protect,rejectRequest)
router.put("/exit/:id", protect,exitGroup)



module.exports = router