import React from 'react';
import './login.css';
import axios from "axios";
import {byId, byIdObj, url} from "../api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

function Login() {
    function login() {
        axios.post(`${url}user/login?phoneNumber=${byId('username')}&password=${byId('password')}`)
            .then(res => {
                sessionStorage.setItem('jwtKey', `Bearer ${res.data.body}`);
                byIdObj('dashboard').click();
            }).catch(() => toast.error('User not found'));
    }

    return (
        <div className='w-full h-screen relative flex justify-center items-center header-div text-white'>
            <div className="w-[450px] h-[470px] rounded-2xl box md:py-10 md:px-12 px-5 py-10 flex flex-col">
                <p className='text-2xl mb-10'>Login</p>
                <p>Phone Number</p>
                <input id='username' className='input w-full rounded-md h-10 pl-3 mb-5 text-black'
                       placeholder='Number'/>
                <p>Password</p>
                <input id='password' type="password" className='input w-full rounded-md h-10 pl-3 text-black'
                       placeholder='Password'/>
                <button className='button text-white w-full rounded-md h-10 mt-10' onClick={login}>Sign in</button>
            </div>
            <Link to='/dashboard' id='dashboard'></Link>
        </div>
    );
}

export default Login;