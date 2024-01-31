// DashboardProductCard.js
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {config, url} from '../../../api';
import Dropdown from "./Dropdown";
import '../../../product/product.css'
import Pagination, {bootstrap5PaginationPreset} from "react-responsive-pagination";
import { useTranslation } from 'react-i18next';
import UserModal from '../HistoryModal';

const DashboardProductCard = ({className, lang}) => {

    const [data, setProduct] = useState(null);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState(0);
    const [searchBy, setSearchBy] = useState(null);
    const [cardInfo, setCardInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    useEffect(() => {
        getProduct(pagination, 4);
    }, []);

    const {t} = useTranslation()

    useEffect(() => {
        if ((pagination - 1) * 4 < 0) setPagination(0);
        else getProduct(Math.floor(pagination - 1), 4);
    }, [pagination]);

    function getProduct(page, size) {
        axios.get(`${url}product/user?page=${page}&size=${size}&lang=${lang}`, config).then((res) => {
                setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
                setProduct(res.data.body.object);
            }
        ).catch((err) => console.log(err));
    }

    function searchProduct(e) {
        let text = e.target.value;
        if (text === '') getProduct(pagination, 4);
        else axios.get(`${url}product/user/search?${searchByName()}=${text}&lang=${lang}`, config).then(res => {
            if (res.data.body) {
                if (res.data.body.length > 4) setProduct(res.data.body.map((item, i) => {
                    if (i < 4) return item;
                }))
                else setProduct(res.data.body);
            } else setProduct([]);
        }).catch(err => console.log(err));
    }

    function searchByName() {
        switch (searchBy) {
            case "Product id number":
                return "productIdNumber";
            case "Product status":
                return "productStatus";
            case "User id number":
                return "userIdNumber";
            case "User id":
                return "userId";
            default:
                return "productIdNumber";
        }
    }


    return (
        <div>
            <div className="mb-5 flex items-center">
                <div className="flex justify-between items-center w-full px-3">
                    <input
                        type="search"
                        placeholder="🔍..."
                        onChange={searchProduct}
                        className="lg:w-10/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
                    />
                    <Dropdown setSearchBy={setSearchBy}/>
                </div>
            </div>
            <p className='mb-3'>{t("cardCurrent")}: {pagination === 0 ? 1 : pagination}</p>
            {data && data.map((item, i) => (
                <div className={`flex mb-3 border border-blue-300 w-full bg-blue-200 ${className}`}>
                    <div className='card-col w-11/12 h-max py-4 ps-2' key={i}>
                        <div className='h-3/6 card-col-row w-full flex'>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>{t("card1")}</p>
                                <p className='font-bold'>{item ? item.productId : 0}</p>
                            </div>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>{t("card2")}</p>
                                <p className='font-bold'>{item ? item.status : 'no status'}</p>
                            </div>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>{t("card3")}</p>
                                <p className='font-bold'>{item ? item.date.substring(0, 10) : "April 23, 2023"}</p>
                            </div>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>{t("card4")}</p>
                                <p className='font-bold'>{item ? item.productName : "Iphone"}</p>
                            </div>
                        </div>
                        <div className='h-3/6 card-col-row w-full flex'>
                            <div className='w-[65%]'>
                                <p className='opacity-70'>{t("card5")}</p>
                                <p className='font-bold'>{item ? item.address : "No location"}</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className='card-col w-3/12 flex justify-center my-auto h-10 pr-2'>
                        <button
                            className="inline-flex justify-center w-40 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                            onClick={() => {
                                setCardInfo(item);
                                openModal();
                            }}
                        >
                            {t("history5")}
                        </button>
                    </div>
                    <UserModal isOpen={isModalOpen} onClose={closeModal} cardInfo={cardInfo}/>
                </div>
            ))}
            <div className="pagination-style mt-4">
                <Pagination
                    {...bootstrap5PaginationPreset}
                    current={pagination}
                    total={Math.floor(totalPage + 1)}
                    onPageChange={setPagination}
                />
            </div>
        </div>
    );
};

export default DashboardProductCard;
