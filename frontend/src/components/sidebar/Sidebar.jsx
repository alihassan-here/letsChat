import React, { useState } from 'react'
import { SidebarHeader } from './header';
import { Notifications } from './notifications';
import { Search } from './search';
import Conversations from './conversations/Conversations';

const Sidebar = () => {
    const [searchResults, setSearchResults] = useState([]);
    return (
        <div className='flex0030 max-w-[30%] h-full select-none'>
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notifications */}
            <Notifications />
            {/* Search */}
            <Search searchLength={searchResults.length} />
            {/* Conversations */}
            <Conversations />
        </div>
    )
}

export default Sidebar;