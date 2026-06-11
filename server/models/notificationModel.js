const { default: mongoose } = require("mongoose");

        const notificationSchema = new mongoose.Schema(
            {
                receiver: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                title: String,
                message: String,
                type: String,
                isRead: {
                    type: Boolean,
                    default: false,
                },
            },
            { timestamps: true }
        );

        module.exports = mongoose.model("Notification", notificationSchema)
    
