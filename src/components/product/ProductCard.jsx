import React from 'react';

function ProductCard({className, product, openEdit, setProductObj}) {
    return (
        <div className={`flex card-main border border-blue-300 w-full lg:h-[110px] h-max bg-blue-100 ${className}`}>
            <div className='card-col w-11/12 pt-2 ps-2'>
                <div className='h-8/12 card-col-row w-full flex'>
                    <div className='w-[22%]'>
                        <p className='opacity-70'>Number</p>
                        <p className='font-bold'>{product ? product.productId : 0}</p>
                    </div>
                    <div className='w-[20%]'>
                        <p className='opacity-70'>Status</p>
                        <p className='font-bold'>{product ? product.status : 'no status'}</p>
                    </div>
                    <div className='w-[30%]'>
                        <p className='opacity-70'>ETD</p>
                        <p className='font-bold'>{product ? product.createdAt.substring(0, 10) : "April 23, 2023"}</p>
                    </div>
                    <div className='w-[26%]'>
                        <p className='opacity-70'>Product</p>
                        <p className='font-bold'>{product ? product.name : "Iphone"}</p>
                    </div>
                </div>
                <div className='h-3/6 card-col-row w-full flex'>
                    <div className='w-[74%]'>
                        <p className='opacity-70'>Current  Location</p>
                        <p className='font-bold'>{product ? product.address : "No location"}</p>
                    </div>
                    <div className='w-[26%]'>
                        <p className='opacity-70'>Owner</p>
                        <p className='font-bold'>{product ? product.owner : "No owner"}</p>
                    </div>
                </div>
            </div>
            <div className='card-col w-3/12 flex justify-center my-auto h-10'>
                <button onClick={() => {
                    openEdit();
                    setProductObj(product);
                }}
                    className="inline-flex justify-center w-8/12 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >Edit</button>
            </div>
        </div>
    );
}

export default ProductCard;