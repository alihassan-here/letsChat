import React from 'react'
import Login from '../components/auth/Login'

const login = () => {
    return (
        <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
            {/*Container*/}
            <div className="flex w-[1600px] mx-auto h-full">
                {/*Login form */}
                <Login />
            </div>
        </div>
    )
}

export default login