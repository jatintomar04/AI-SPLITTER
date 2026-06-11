const  mongoose = require("mongoose");


const inviteSchema = new mongoose.Schema({

    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GROUP",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("INVITE", inviteSchema);