import React from 'react';

function ProductCard({ className, idNumber, fullName, phoneNumber, password, allProduct, comProduct, penProduct, cenProduct }) {
    return (
        <div className={`flex card-main border border-blue-300 w-full h-[160px] bg-blue-100 ${className}`}>
            <div className='card-col w-11/12 pt-4 ps-2'>
                <div className='h-3/6 card-col-row w-full flex'>
                    <div className='w-[20%]'>
                        <p className='opacity-70'>Number</p>
                        <p className='font-bold text-[.9rem]'>{idNumber ? idNumber : 0}</p>
                    </div>
                    <div className='w-[30%]'>
                        <p className='opacity-70'>Name</p>
                        <p className='font-bold text-[.9rem]'>{fullName ? fullName : 'First Name'}</p>
                    </div>
                    <div className='w-[30%]'>
                        <p className='opacity-70'>Phone Number</p>
                        <p className='font-bold text-[.9rem]'>{phoneNumber ? phoneNumber : "No number"}</p>
                    </div>
                    <div className='w-[25%]'>
                        <p className='opacity-70'>Password</p>
                        <p className='font-bold text-[.9rem]'>{password ? password : "No password"}</p>
                    </div>
                </div>
                <div className='h-3/6 card-col-row w-full flex'>
                    <div className='w-[25%]'>
                        <p className='opacity-70'>All Product</p>
                        <p className='font-bold text-[.9rem] text-orange-500'>{allProduct ? allProduct : 0}</p>
                    </div>
                    <div className='w-[25%]'>
                        <p className='opacity-70'>Completed Porduct</p>
                        <p className='font-bold text-[.9rem] text-green-500'>{comProduct ? comProduct : 0}</p>
                    </div>
                    <div className='w-[35%]'>
                        <p className='opacity-70'>Pending Porduct</p>
                        <p className='font-bold text-[.9rem] text-purple-600'>{penProduct ? penProduct : 0}</p>
                    </div>
                    <div className='w-[25%]'>
                        <p className='opacity-70'>Cancel Porduct</p>
                        <p className='font-bold text-[.9rem] text-purple-600'>{cenProduct ? cenProduct : 0}</p>
                    </div>
                </div>
            </div>
            <div className='card-col w-3/12 flex justify-center my-auto h-10'>
                <button
                    className="inline-flex justify-center rounded-md active:scale-95 duration-200 border border-gray-300 shadow-lg py-2 px-5 bg-blue-700 text-sm font-medium text-white"
                >Edit</button>
            </div>
        </div>
    );
}

export default ProductCard;