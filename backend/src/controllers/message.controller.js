import logger from "../configs/logger.config.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import { createMessage, populateMessage } from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
    try {
        const user_id = req.user.userId;
        const { message, convo_id, files } = req.body;
        if (!message || (!message && !files)) {
            logger.error(`Please provide a conversation id and message body`);
            return res.sendStatus(400);
        }
        const messageData = {
            sender: user_id,
            message,
            conversation: convo_id,
            files: files || []
        };
        let newMessage = await createMessage(messageData);
        let populatedMessage = await populateMessage(newMessage._id);
        await updateLatestMessage(convo_id, newMessage);
        res.json(populatedMessage);
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
}