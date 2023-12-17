import { useSelector } from "react-redux";
import { checkOnlineStatus, getConversationId } from "../../../utils/chat";
import Conversation from "./Conversation";

export default function Conversations({ onlineUsers, typing }) {
    const { conversations } = useSelector(
        (state) => state.chat
    );
    const { user } = useSelector((state) => state.user);
    return (
        <div className="convos scrollbar">
            <ul>
                {
                    conversations && conversations?.map((conversation) => <Conversation convo={conversation} key={conversation._id} />)
                }
            </ul>
        </div>
    );
}