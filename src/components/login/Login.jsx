import React, { useState } from 'react';
import './login.css';
import axios from "axios";
import { byId, byIdObj, url } from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    function login() {
        axios.post(`${url}user/login?phoneNumber=${byId('username')}&password=${byId('password')}`)
            .then(res => {
                sessionStorage.setItem('jwtKey', `Bearer ${res.data.body}`);
                byIdObj('dashboard').click();
            }).catch(() => toast.error('User not found'));
    }
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className='w-full h-screen relative flex justify-center items-center header-div text-white'>
            <div className="w-[450px] h-[470px] rounded-2xl box md:py-10 md:px-12 px-5 py-10 flex flex-col">
                <p className='text-2xl mb-10'>Login</p>
                <p>Phone Number</p>
                <input id='username' className='w-full border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 duration-500'
                    placeholder='Number' />
                <p>Password</p>
                
                <div className="relative">
                    <input
                        // onKeyDown={checkKeyPress}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 duration-500"
                        placeholder="Enter password"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} />
                    </button>
                </div>
                <button className='button text-white p-3 w-full rounded-md  mt-10' onClick={login}>Sign in</button>
            </div>
            <Link to='/dashboard' id='dashboard'></Link>
        </div>
    );
}

export default Login;