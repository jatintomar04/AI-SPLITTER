const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const { searchUser, sendInvite, acceptInvite, getMYinvite, rejectRequest } = require("../controller/UserController")

router.get("/find/:id",protect,searchUser)
router.post("/invite",protect,sendInvite)
router.put("/invite/:inviteId/accept", acceptInvite)
router.get("/my-invites", protect,getMYinvite)
router.put("/invite/:inviteId/reject", protect,rejectRequest)


module.exports = router