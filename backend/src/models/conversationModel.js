import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const conversationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Conversations name is required."],
            trim: true,
        },
        picture: {
            type: String,
            default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
        },
        isGroup: {
            type: Boolean,
            required: true,
            default: false,
        },
        users: [
            {
                type: ObjectId,
                ref: "UserModel",
            },
        ],
        latestMessage: {
            type: ObjectId,
            ref: "MessageModel",
        },
        admin: {
            type: ObjectId,
            ref: "UserModel",
        },
    },
    {
        collection: "conversations",
        timestamps: true,
    }
);

const ConversationModel =
    mongoose.models.ConversationModel ||
    mongoose.model("ConversationModel", conversationSchema);

export default ConversationModel;