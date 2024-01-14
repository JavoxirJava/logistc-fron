import React from 'react'

const HistoryInfo = ({ className, idNumber, address, status, etd, owner, product, detailId }) => {
    return (
        <div
            className={`w-full ${className} history-info-bg border rounded-md border-slate-400 px-6 
            py-4 text-center flex justify-center items-center`}>
            <div className='w-[185px]'>
                <p className='opacity-70'>Number</p>
                <p className='font-bold text-[.9rem]'>{idNumber ? idNumber : 0}</p>
            </div>
            <div className='w-[185px]'>
                <p className='opacity-70'>Current Location</p>
                <p className='font-bold text-[.9rem]'>{address ? address : 'No location'}</p>
            </div>
            <div className='w-[185px]'>
                <p className='opacity-70'>Status</p>
                <p className='font-bold text-[.9rem] text-green-500'>{status ? status : 'Completed'}</p>
            </div>
            <div className='w-[185px]'>
                <p className='opacity-70'>ETD</p>
                <p className='font-bold text-[.9rem]'>{etd ? etd : 'April 23, 2022'}</p>
            </div>
            <div className='w-[185px]'>
                <p className='opacity-70'>Owner</p>
                <p className='font-bold text-[.9rem]'>{owner ? owner : 'No Owner'}</p>
            </div>
            <div className='w-[185px]'>
                <p className='opacity-70'>Product</p>
                <p className='font-bold text-[.9rem]'>{product ? product : 'No Product'}</p>
            </div>
            <div className='w-[190px]'>
                <button className='py-2 px-6 bg-blue-800 border border-red-500 rounded-md 
                text-white font-bold active:scale-95 duration-300 tracking-wide'>view details</button>
            </div>
        </div>
    )
}

export default HistoryInfo