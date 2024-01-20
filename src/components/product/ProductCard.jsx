import React, { useState } from 'react';
import { useTranslation } from "react-i18next";


function ProductCard({className, product, openEdit, setProductObj}) {
    
    const { t } = useTranslation();


    return (
        <div className={`flex media-product card-main border border-blue-300 w-full lg:h-[110px] h-max bg-blue-100 ${className} overflow-hidden`}>
            <div className='card-col w-11/12 pt-2 ps-2'>
                <div className='h-8/12 card-col-row w-full flex media-product'>
                    <div className='sm:w-[22%]'>
                        <p className='opacity-70'>{t("card1")}</p>
                        <p className='font-bold'>{product ? product.productId : 0}</p>
                    </div>
                    <div className='sm:w-[20%]'>
                        <p className='opacity-70'>{t("card2")}</p>
                        <p className='font-bold'>{product ? product.status : 'no status'}</p>
                    </div>
                    <div className='sm:w-[30%]'>
                        <p className='opacity-70'>{t("card3")}</p>
                        <p className='font-bold'>{product ? product.createdAt.substring(0, 10) : "April 23, 2023"}</p>
                    </div>
                    <div className='sm:w-[26%]'>
                        <p className='opacity-70'>{t("card4")}</p>
                        <p className='font-bold'>{product ? product.name : "Iphone"}</p>
                    </div>
                </div>
                <div className='h-3/6 card-col-row w-full flex media-product'>
                    <div className='sm:w-[64%]'>
                        <p className='opacity-70'>{t("card5")}</p>
                        <p className='font-bold'>{product ? product.address : "No location"}</p>
                    </div>
                    <div className='sm:w-[18%] ps-1'>
                        <p className='opacity-70'>{t("card6")}</p>
                        <p className='font-bold'>{product ? product.measureCount + " " + product.measure : "No location"}</p>
                    </div>
                    <div className='sm:w-[18%] ps-1'>
                        <p className='opacity-70'>{t("card7")}</p>
                        <p className='font-bold'>{product ? product.owner : "No owner"}</p>
                    </div>
                </div>
            </div>
            <div className='card-col w-2/12 flex justify-center my-auto h-10 media-product-button'>
                <button onClick={() => {
                    openEdit();
                    setProductObj(product);
                }} className="inline-flex justify-center sm:w-9/12 w-[200px] rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >{t("edit")}</button>
            </div>
        </div>
    );
}

export default ProductCard;