import React from 'react';

function DashboardProductCard({className, number, status, etd, product, currentLocation, owner}) {
    return (
        <div className={`flex mb-3 border border-blue-300 w-full h-[120px] bg-blue-100 ${className}`}>
            <div className='card-col w-11/12 pt-4 ps-2'>
                <div className='h-3/6 card-col-row w-full flex'>
                    <div className='w-[22%]'>
                        <p className='opacity-70'>Number</p>
                        <p className='font-bold'>{number ? number : 0}</p>
                    </div>
                    <div className='w-[20%]'>
                        <p className='opacity-70'>Status</p>
                        <p className='font-bold'>{status ? status : 'no status'}</p>
                    </div>
                    <div className='w-[30%]'>
                        <p className='opacity-70'>ETD</p>
                        <p className='font-bold'>{etd ? etd : "April 23, 2023"}</p>
                    </div>
                    <div className='w-[26%]'>
                        <p className='opacity-70'>Product</p>
                        <p className='font-bold'>{product ? product : "Iphone"}</p>
                    </div>
                </div>
                <div className='h-3/6 card-col-row w-full flex'>
                    <div className='w-[60%]'>
                        <p className='opacity-70'>Current  Location</p>
                        <p className='font-bold'>{currentLocation ? currentLocation : "No location"}</p>
                    </div>
                    <div className='w-[40%]'>
                        <p className='opacity-70'>Owner</p>
                        <p className='font-bold'>{owner ? owner : "No owner"}</p>
                    </div>
                </div>
            </div>
            <div className='card-col w-3/12 flex justify-center my-auto h-10 pr-2'>
                <button
                    className="inline-flex justify-center w-40 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default DashboardProductCard;