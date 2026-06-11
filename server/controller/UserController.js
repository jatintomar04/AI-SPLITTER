const User = require("../models/authModel")
const Invite = require("../models/InviteModel")
const Group = require("../models/groupModel")
const Notification = require("../models/notificationModel")
const { response } = require("express")
const { onlineUsers, getIO } = require("../socket/socket")

const searchUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(200).json({
                message: "Please Enter UserId"
            })
        }
        const user = await User.find({
            _id: { $ne: req.user._id },
            user_id: {
                $regex: id,
                $options: "i",
            },
        }).select("-password");

       

        if (!user) {
            return res.status(400).json({
                message: "User Not Found!"
            })
        }
        return res.status(200).json({
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

const sendInvite = async (req, res) => {
    try {
        const { groupId, user_id } = req.body;

        if (!groupId || !user_id) {
            return res.status(400).json({
                message: "groupId and user_id are required",
            });
        }
        const user = await User.findOne({
            user_id: user_id.toLowerCase()
        });

        const existingInvite = await Invite.findOne({
            group: groupId,
            user: user._id,
            status: "pending"
        });

        if (existingInvite) {
            return res.status(400).json({
                message: "Invite already sent to this user"
            });
        }


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const invite = await Invite.create({
            group: groupId,
            user: user._id
        });
        // Create Notification
        await Notification.create({
            receiver: user._id,
            title: "Group Invitation",
            message: "You have received a new group invitation.",
            type: "GROUP_INVITE",
            referenceId: invite._id
        });
        // real time notification 
        const socketId = onlineUsers[user._id.toString()];

        if (socketId) {
            getIO().to(socketId).emit("notification", {
                title: "Group Invitation",
                message: "You have received a new group invitation.",
                type: "GROUP_INVITE",
            });
        }

        return res.status(201).json({
            message: "Invite sent",
            invite
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const acceptInvite = async (req, res) => {
    try {

        const { inviteId } = req.params;
        if (!inviteId) {
            return response.status(400).json({
                message: "Request id is Required"
            })
        }

        const invite = await Invite.findById(inviteId);

        if (!invite) {
            return res.status(404).json({
                message: "Invite not found"
            });
        }

        // update status
        invite.status = "accepted";
        await invite.save();

        // find group
        const group = await Group.findById(invite.group);

        // add user to group
        if (!group.members.includes(invite.user)) {
            group.members.push(invite.user);
        }

        await group.save();

        return res.status(200).json({
            message: "User joined group successfully",
            group
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const rejectRequest = async (req, res) => {
    try {
        const { inviteId } = req.params;


        const findRequest = await Invite.findById(inviteId)

        if (!findRequest) {
            return res.status(404).json({
                message: "Invite Not Found!"
            })
        }

        findRequest.status = "rejected";
        await findRequest.save();

        return res.status(200).json({
            message: "Request rejected",
        });



    } catch (error) {
        return
        res.status(500).json({
            message: error.message,
        })
    }
}

const getMYinvite = async (req, res) => {
    try {
        const userId = req.user._id

        if (!userId) {
            return res.status(400).json({
                message: "User Id Requir)ed"
            })
        }

        const invites = await Invite.find({ user: userId, status: "pending" })
            .populate("group", "name")
            .populate("user", "name user_id");
        return res.status(200).json({
            success: true,
            invites
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = { searchUser, rejectRequest, sendInvite, acceptInvite, getMYinvite }