import { useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
// import { CreateGroup } from "./createGroup";
export default function SidebarHeader() {
    const { user } = useSelector((state) => state.user);

    return (
        <>
            {/*Sidebar header*/}
            <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
                {/* container */}
                <div className="w-full flex items-center justify-between">
                    {/*user image*/}
                    <button className="btn active: bg-dark_hover_1">
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </button>
                    {/*user icons*/}
                    <ul className="flex items-center gap-x-2 5">
                        <li>
                            <button className="btn active: bg-dark_hover_1">
                                <CommunityIcon className="dark:fill-dark_svg_1" />
                            </button>
                        </li>
                        <li>
                            <button className="btn active: bg-dark_hover_1">
                                <StoryIcon className="dark:fill-dark_svg_1" />
                            </button>
                        </li>
                        <li>
                            <button className="btn active: bg-dark_hover_1">
                                <ChatIcon className="dark:fill-dark_svg_1" />
                            </button>
                        </li>
                        <li>
                            <button className="btn active: bg-dark_hover_1">
                                <DotsIcon className="dark:fill-dark_svg_1" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/*Create Group*/}
            {/* {showCreateGroup && (
                <CreateGroup setShowCreateGroup={setShowCreateGroup} />
            )} */}
        </>
    );
}