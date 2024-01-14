import React from 'react';
import './login.css';

function Login() {
    return (
        <div className='w-full h-screen relative flex justify-center items-center header-div text-white'>
            <div className="w-[450px] h-[470px] rounded-2xl box md:py-10 md:px-12 px-5 py-10 flex flex-col">
                <p className='text-2xl mb-10'>Login</p>
                <p>Phone Number</p>
                <input type="text" className='input w-full rounded-md h-10 pl-3 mb-5' placeholder='Number'/>
                <p>Password</p>
                <input type="text" className='input w-full rounded-md h-10 pl-3' placeholder='Password'/>
                <button className='button text-white w-full rounded-md h-10 mt-10'>Sign in</button>
            </div>
        </div>
    );
}

export default Login;