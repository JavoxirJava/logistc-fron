// DashboardProductCard.js
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {config, url} from '../../api';
import Dropdown from "./Dropdown";
import '../../product/product.css'
import Pagination, {bootstrap5PaginationPreset} from "react-responsive-pagination";

const Modal = ({isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
            <div className="bg-white p-8 rounded shadow-md w-[500px]">
                <div className='bg-blue-800 flex justify-around items-center relative'>
                    <h1 className='text-2xl text-sky-200'>Phone</h1>
                    <h1 className='text-2xl text-green-300'>Going</h1>
                    <i className="fa-solid fa-xmark absolute right-2 text-2xl text-white" onClick={onClose}></i>
                </div>
                <div className='bg-sky-200  px-20    py-6 flex justify-between'>
                    <div className=' '>
                        <p className='pb-0 mb-0 mt-2'>Name</p>
                        <p className='mt-0 pt-0'>John Doe</p>
                    </div>
                    <div>
                        <p className='pb-0 mb-0 mt-2'>Name</p>
                        <p className='mt-0 pt-0'>John Doe</p>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

const DashboardProductCard = ({className}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setProduct] = useState(null);
    const [totalPage, setTotalPage] = useState(1);
    const [pagination, setPagination] = useState(0);
    const [searchBy, setSearchBy] = useState(null);

    useEffect(() => {
        getProduct(pagination, 4);
    }, []);

    useEffect(() => {
        if ((pagination - 1) * 4 < 0) setPagination(0);
        else getProduct(Math.floor(pagination - 1), 4);
    }, [pagination]);

    function getProduct(page, size) {
        axios.get(`${url}product?page=${page}&size=${size}`, config).then((res) => {
                setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
                setProduct(res.data.body.object);
            }
        ).catch((err) => console.log(err));
    }

    function searchProduct(e) {
        let text = e.target.value;
        if (text === '') getProduct(pagination, 4);
        else axios.get(`${url}product/admin/search?${searchByName()}=${text}`, config).then(res => {
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

    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="mb-5 flex items-center">
                <div className="flex justify-between items-center w-full px-3">
                    <input
                        type="search"
                        placeholder="🔍 Search id Numnber..."
                        onChange={searchProduct}
                        className="lg:w-10/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
                    />
                    <Dropdown setSearchBy={setSearchBy}/>
                </div>
            </div>
            <p className='mb-3'>Current Page: 2</p>
            {data && data.map((item, i) => (
                <div className={`flex mb-3 border border-blue-300 w-full bg-blue-200 ${className}`}>
                    <div className='card-col w-11/12 h-max py-4 ps-2' key={i}>
                        <div className='h-3/6 card-col-row w-full flex'>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>Number</p>
                                <p className='font-bold'>{item ? item.productId : 0}</p>
                            </div>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>Status</p>
                                <p className='font-bold'>{item ? item.status : 'no status'}</p>
                            </div>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>ETD</p>
                                <p className='font-bold'>{item ? item.createdAt.substring(0, 10) : "April 23, 2023"}</p>
                            </div>
                            <div className='w-[25%]'>
                                <p className='opacity-70'>Product</p>
                                <p className='font-bold'>{item ? item.name : "Iphone"}</p>
                            </div>
                        </div>
                        <div className='h-3/6 card-col-row w-full flex'>
                            <div className='w-[65%]'>
                                <p className='opacity-70'>Current Location</p>
                                <p className='font-bold'>{item ? item.address : "No location"}</p>
                            </div>
                            <div className='w-[35%]'>
                                <p className='opacity-70'>Owner</p>
                                <p className='font-bold'>{item ? item.owner : "No owner"}</p>
                            </div>
                        </div>
                    </div>
                    {/*<div className='card-col w-3/12 flex justify-center my-auto h-10 pr-2'>*/}
                    {/*    <button*/}
                    {/*        className="inline-flex justify-center w-40 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"*/}
                    {/*        onClick={openModal}*/}
                    {/*    >*/}
                    {/*        View Detail*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <Modal isOpen={isModalOpen} onClose={closeModal}/>
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
