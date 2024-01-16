import React, {useEffect, useState} from "react";
import "./client.css";
import filterImg from "./search-filter.png";
import ProductCard from "./ProductCard";
import LoadingClient from "./loading";
import {byId, byIdObj, config, getClientProduct, url} from "../api";
import Pagination, {
    bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import axios from "axios";
import {toast} from "react-toastify";
import NavBar from "../navbar/NavBar";

const Clients = () => {
    const [isLoading, setIsloading] = useState(false);
    const [productsClient, setProductClient] = useState(null);
    const [totalPage, setTotalPage] = useState(2);
    const [pagination, setPagination] = useState(0);

    useEffect(() => {
        getClientProduct(pagination, 4, setProductClient, setTotalPage);
    }, []);

    useEffect(() => {
        if ((pagination - 1) * 4 < 0) setPagination(0);
        else getClientProduct(
            Math.floor(pagination - 1),
            4,
            setProductClient,
            setTotalPage
        );
    }, [pagination]);

    function addUser() {
        setIsloading(true);
        const data = {
            name: byId("nameC"),
            idNumber: byId("idNumberC"),
            phoneNumber: byId("phoneNumberC"),
            password: byId("passwordC"),
        };
        axios.post(`${url}user?ROLE=ROLE_USER`, data, config).then(() => {
            toast.success("successfully saved User");
            setIsloading(false)
            byIdObj("nameC").value = "";
            byIdObj("idNumberC").value = "";
            byIdObj("phoneNumberC").value = "";
            byIdObj("passwordC").value = "";
        }).catch((err) => {
            if (!isLoading) toast.error("user not save");
            console.log(err);
        });
    }

    function searchProductClient(e) {
        setTimeout(() => {
            let text = e.target.value;
            if (text === '') getClientProduct(pagination, 4, setProductClient, setTotalPage);
            else axios.get(`${url}user/search?idNumber=${text}`, config).then(res => {
                if (!res.data.body) {
                    if (res.data.body.object.length > 4) setProductClient(res.data.body.object.map((item, i) => {
                        if (i < 4) return item;
                    }))
                } else setProductClient(null);
            }).catch(err => {
                if (err.response.status === 404) setProductClient(null);
                console.log(err);
            });
        }, 500);
    }

    return (
        <>
            <NavBar/>
            <div className="clients-bg flex lg:flex-row flex-col">
                <div className="lg:w-2/5 md:w-4/5 w-full lg:pl-10 md:px-0 px-2">
                    <div className="flex justify-between items-center">
                        <input onChange={searchProductClient}
                               className="py-2 px-4 w-96 bg-slate-100 rounded-lg border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-200 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                               placeholder="🔍  Search Id Number..."
                        />
                        <img
                            src={filterImg}
                            className="w-10 ml-3 cursor-pointer"
                            alt="filter"
                        />
                    </div>
                    {productsClient && productsClient.map((item, i) => (
                        <ProductCard key={i} className="mt-5" product={item}/>
                    ))}
                    <div className="pagination-style relative mt-4">
                        <Pagination
                            {...bootstrap5PaginationPreset}
                            current={pagination}
                            total={Math.floor(totalPage + 1)}
                            onPageChange={setPagination}
                        />
                    </div>
                </div>


                <div className="lg:w-2/6 ">
                    <p className="text-black text-2xl mb-5 font-bold tracking-wider text-center">
                        New Client
                    </p>
                    <div className="add-bg lg:px-3 px-10 py-6 w-full">
                        <label htmlFor="nameC" className="ml-3.5">
                            User name
                        </label>
                        <input id="nameC" className="py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                               placeholder="Enter name" />

                        <label htmlFor="idNumberC" className="ml-3.5">
                            User id Number
                        </label>
                        <input
                            id="idNumberC"
                            className="py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="Enter id number"
                        />

                        <label htmlFor="phoneNumberC" className="ml-3.5">
                            User phone number
                        </label>
                        <input
                            id="phoneNumberC"
                            className="py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="Enter phone number"
                        />

                        <label htmlFor="passwordC" className="ml-3.5">
                            User password
                        </label>
                        <input
                            id="passwordC"
                            className="py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="Enter password"
                        />

                        <div className="flex justify-end items-center w-full mt-8">
                            {isLoading ? (
                                <LoadingClient/>
                            ) : (
                                <button
                                    className="px-6 py-2 bg-green-500 shadow-lg rounded-lg text-white
                                font-bold text-lg tracking-wider active:scale-95 duration-200"
                                    onClick={addUser}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Clients;
