const { default: mongoose } = require("mongoose");


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER"
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("GROUP", groupSchema);