import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { useEffect } from "react";
import { getConversations } from "../features/chatSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        if (user?.token) {
            dispatch(getConversations(user.token));
        }
    }, [user])
    return (
        <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
            <div className="container min-h-screen flex">
                <Sidebar />
            </div>
        </div>
    )
}

export default Home;