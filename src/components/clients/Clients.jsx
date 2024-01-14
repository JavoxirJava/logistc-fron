import React, { useState } from 'react';
import './client.css';
import filterImg from './search-filter.png';
import ProductCard from './ProductCard';
import LoadingClient from './loading';

const Clients = () => {
    const [isLoading, setIsloading] = useState(false);

    return (
        <div className='clients-bg'>
            <div className='w-2/5'>
                <div className='flex justify-end items-center'>
                    <input
                        className='py-2 px-4 w-80 bg-slate-100 rounded-lg border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-200 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium'
                        placeholder='🔍  Search Id Number...' />
                    <img src={filterImg} className='w-10 ml-3 cursor-pointer' alt="filter" />
                </div>
                <ProductCard className='mt-5' />
            </div>
            <div className='w-2/6'>
                <p className='text-black text-2xl mb-5 font-bold tracking-wider text-center'>New Client</p>
                <div className='add-bg px-3 py-6 w-full'>
                    <label htmlFor="nameC" className='ml-3.5'>User name</label>
                    <input
                        id='nameC'
                        className='py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium'
                        placeholder='Enter name' />

                    <label htmlFor="idNumberC" className='ml-3.5'>User id Number</label>
                    <input
                        id='idNumberC'
                        className='py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium'
                        placeholder='Enter id number' />

                    <label htmlFor="phoneNumberC" className='ml-3.5'>User phone number</label>
                    <input
                        id='phoneNumberC'
                        className='py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium'
                        placeholder='Enter phone number' />

                    <label htmlFor="passwordC" className='ml-3.5'>User password</label>
                    <input
                        id='passwordC'
                        className='py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium'
                        placeholder='Enter password' />

                    <div className='flex justify-end items-center w-full mt-8'>
                        {isLoading ? <LoadingClient /> :
                            <button
                                className='px-6 py-2 bg-green-500 shadow-lg rounded-lg text-white 
                                font-bold text-lg tracking-wider active:scale-95 duration-200'>Save</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clients