import React from 'react'

const HistoryInfo = ({ className, idNumber, address, status, etd, owner, product, detailId }) => {
    return (
        <div
            className={`w-full ${className} history-info-bg border rounded-md border-slate-400 md:px-6 px-2  mb-44
            lg:py-4 py-2  flex md:justify-center justify-between items-center w-full`}>
            <div className='xl:w-[184px] lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px] '>
                <p className='opacity-70 lg:text-[1rem] bold md:text-[.9rem] bold sm:text-[.8rem] text-[.7rem]'>Number</p>
                <p className='font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]'>{idNumber ? idNumber : 0}</p>
            </div>
            <div className='xl:w-[184px] lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px] '>
                <p className='opacity-70 lg:text-[1rem] bold md:text-[.9rem] bold sm:text-[.8rem] text-[.7rem]'>Current Location</p>
                <p className='font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]'>{address ? address : 'No location'}</p>
            </div>
            <div className='xl:w-[184px] lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px] '>
                <p className='opacity-70 lg:text-[1rem] bold md:text-[.9rem] bold sm:text-[.8rem] text-[.7rem]'>Status</p>
                <p className='font-bold lg:text-[.9rem] bold md:text-[.7rem] bold sm:text-[.5rem] text-[.5rem] text-green-500'>{status ? status : 'Completed'}</p>
            </div>
            <div className='xl:w-[184px] lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px] '>
                <p className='opacity-70 lg:text-[1rem] bold md:text-[.9rem] bold sm:text-[.8rem] text-[.7rem]'>ETD</p>
                <p className='font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]'>{etd ? etd : 'April 23, 2022'}</p>
            </div>
            <div className='xl:w-[184px] lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px] '>
                <p className='opacity-70 lg:text-[1rem] bold md:text-[.9rem] bold sm:text-[.8rem] text-[.7rem]'>Owner</p>
                <p className='font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]'>{owner ? owner : 'No Owner'}</p>
            </div>
            <div className='xl:w-[184px] lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px] '>
                <p className='opacity-70 lg:text-[1rem] bold md:text-[.9rem] bold sm:text-[.8rem] text-[.7rem]'>Product</p>
                <p className='font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]'>{product ? product : 'No Product'}</p>
            </div>
            <div className='xl:w-[184px] lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px]  ml-2'>
                <button className='lg:py-2 md:py-2 md:px-4 py-1 px-2 lg:px-6 bg-blue-800 border border-red-500 rounded-md 
                text-white font-bold active:scale-95 duration-300 tracking-wide lg:text-[.9rem] text-[.7rem] '>view details</button>
            </div>
        </div>
    )
}

export default HistoryInfo