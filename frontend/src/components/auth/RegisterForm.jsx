import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Container */}
            <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
                {/*Heading*/}
                <div className="text-center dark:text-dark_text_1">
                    <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
                    <p className="mt-2 text-sm">Sign up</p>
                </div>
                {/* Form */}
                <form className="mt-6 space-y-6"></form>
            </div>
        </div>
    )
}

export default RegisterForm;