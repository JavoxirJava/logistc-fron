import React from 'react';
import './client.css';
import filterImg from './search-filter.png';

const Clients = () => {
    return (
        <div className='clients-bg'>
            <div className='w-1/3'>
                <div className='flex justify-end items-center'>
                    <input
                        className='py-2 px-4 w-80 bg-slate-100 rounded-lg border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-200
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium'
                        placeholder='🔍  Search Id Number...' />
                    <img src={filterImg} className='w-10 ml-3 cursor-pointer' alt="filter" />
                </div>
            </div>
            <div className='w-2/6 add-bg px-3 py-5'>
                <div className=''>
                    sfdsg
                </div>
            </div>
        </div>
    )
}

export default Clients