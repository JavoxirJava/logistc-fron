import React from 'react';
import './login.css';
import TopSvg from "./TopSvg";

function Login() {
    return (
        <div className='login-main'>
            <div className='elements'>
                <TopSvg/>
            </div>
            <div className="box">
                <p>Your login</p>
                <h1>Login</h1>

            </div>
        </div>
    );
}

export default Login;