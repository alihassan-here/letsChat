import React from 'react'
import { SidebarHeader } from './header';
import { Notifications } from './notifications';

const Sidebar = () => {
    return (
        <div className='flex0030 max-w-[30%] h-full select-none'>
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notifications */}
            <Notifications />
        </div>
    )
}

export default Sidebar;