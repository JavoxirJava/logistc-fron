import React, {useEffect, useState} from "react";
import "./history.css";
import HistoryInfo from "./HistoryInfo";
import NavBar from "../navbar/NavBar";
import {byId, config, url} from "../api";
import axios from "axios";
import Pagination, {bootstrap5PaginationPreset} from "react-responsive-pagination";

const History = () => {
    const [history, setHistory] = useState(null);
    const [totalPage, setTotalPage] = useState(2);
    const [pagination, setPagination] = useState(0);

    useEffect(() => {
        getHistory(pagination, 4);
    }, []);

    useEffect(() => {
        if ((pagination - 1) * 4 < 0) setPagination(0);
        else getHistory(Math.floor(pagination - 1), 4);
    }, [pagination]);


    const getHistory = (page, size) => {
        axios.get(`${url}product?page=${page}&size=${size}`, config)
            .then((res) => {
                setHistory(res.data.body.object);
                setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
            })
            .catch(() => {
                console.log("history kelmadi");
            });
    };

    const searchHistory = () => {
        const start = byId("startDate");
        const finish = byId("endDate");
        const userId = byId("userId");
        const productId = byId("productId");
        axios.get(
            `${url}product/admin/history/search/search?start=${start}&finish=${finish}&userIdNumber=${userId}&productIdNumber=${productId}`,
            config).then((res) => {
            setHistory(res.data.body);
        }).catch(() => {
            getHistory();
        });
    };

    return (
        <>
            <NavBar/>
            <div className="history-bg">
                <div className="w-full flex justify-center items-center flex-wrap mt-5">
                    <div className="flex flex-col">
                        <label
                            htmlFor="startDate"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            Start date
                        </label>
                        <input
                            id="startDate"
                            onChange={searchHistory}
                            type="date"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="Start date"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="endDate"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            End date
                        </label>
                        <input
                            id="endDate"
                            onChange={searchHistory}
                            type="date"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="End date"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="searchUser"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            Search User id
                        </label>
                        <input
                            onChange={searchHistory}
                            id="userId"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="🔍  Search User id..."
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="searchId"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            Search Id Number
                        </label>
                        <input
                            onChange={searchHistory}
                            id="productId"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="🔍  Search Id Number..."
                        />
                    </div>
                    <p className='mt-6 ms-3'>Current page: {pagination}</p>
                </div>

                {/* history table */}
                <div className="history-container mb-5">
                    {history && <HistoryInfo className="mt-6" history={history}/>}
                </div>
                <div className="pagination-style mt-4">
                    <Pagination
                        {...bootstrap5PaginationPreset}
                        current={pagination}
                        total={Math.floor(totalPage + 1)}
                        onPageChange={setPagination}
                    />
                </div>
            </div>
        </>
    );
};

export default History;
