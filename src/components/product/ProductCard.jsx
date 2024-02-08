import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import ProductModal from './HistoryModal';


function ProductCard({ className, product, openEdit, setProductObj, projectId }) {

    const [historyList, setHistoryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const { t } = useTranslation();

    return (
        <div
            className={`flex p-3 media-product card-main border border-blue-300 w-full h-max rounded-lg bg-blue-100 ${className} `}>
            <div className='card-col w-11/12 pt-2 ps-2 flex md:flex-col flex-col '>
                <div className='card-col-row w-full card-col-row flex sm:flex-row flex-col justify-between  media-product h-max'>
                    <div className='flex sm:w-[100%] '>
                        <div className='sm:w-[50%] w-[100%]'>
                            <p className='opacity-70'>{t("card1")}</p>
                            <p className='font-bold'>{product ? product.productId : 0}</p>
                        </div>
                        <div className='sm:w-[50%] w-[100%]'>
                            <p className='opacity-70'>{t("card2")}</p>
                            <p className='font-bold'>{product ? product.status : 'no status'}</p>
                        </div>
                    </div>
                    <div className='flex sm:w-[100%] '>
                        <div className='sm:w-[50%] w-[100%]'>
                            <p className='opacity-70'>{t("productAdd76")}</p>
                            <p className='font-bold'>{product ? `${product.price} uzs` : 0}</p>
                        </div>
                       
                    </div>
                    <div className='flex sm:w-[100%]'>
                        <div className='sm:w-[50%] w-[100%]'>
                            <p className='opacity-70'>{t("card3")}</p>
                            <p className='font-bold'>{product ? product.date.slice(0, product.date.indexOf(" ")) : ""}</p>
                        </div>
                        <div className='sm:w-[50%] w-[100%]'>
                            <p className='opacity-70'>{t("card4")}</p>
                            <p className='font-bold'>{product ? product.productName : ""}</p>
                        </div>
                    </div>
                </div>
                <div className='h-max card-col-row w-full flex sm:flex-row flex-col media-product '>
                    <div className='sm:w-[64%] w-[110%]'>
                        <p className='opacity-70'>{t("card5")}</p>
                        <p className='font-bold'>{product ? product.address.slice(0, product.address.indexOf(",")) : "No location"}</p>
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
            <div className='sm:w-2/12 flex items-center gap-3 sm:justify-center '>
               
                <button onClick={() => {
                    setHistoryList(product);
                    openModal();
                }}
                    className="inline-flex justify-center sm:w-9/12 px-5 rounded-md border border-gray-300 shadow-sm py-2 bg-yellow-400 text-sm font-medium text-white"
                >{t("history5")}</button>
            </div>
            {historyList && <ProductModal isOpen={isModalOpen} historyList={historyList} onClose={closeModal} />}

        </div>
    );
}

export default ProductCard;