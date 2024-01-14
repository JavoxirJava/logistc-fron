import React from 'react';

function ProductCard({className}) {
    return (
        <div className={`flex card-main border border-blue-300 w-full h-[120px] bg-blue-100 ${className}`}>
            <div className='card-col w-8/12 p-2'>
                <div className='h-3/6 card-col-row'>
                    <div className='w-[25%]'>
                        <p className='opacity-70'>Number</p>
                        <p className='font-bold'>cf</p>
                    </div>
                </div>
            </div>
            <div className='card-col w-4/12 flex justify-center my-auto h-10'>
                <button
                    className="inline-flex justify-center w-8/12 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default ProductCard;