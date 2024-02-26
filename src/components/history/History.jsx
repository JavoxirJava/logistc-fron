import React, { useEffect, useState } from "react";
import "./history.css";
import HistoryInfo from "./HistoryInfo";
import NavBar from "../navbar/NavBar";
import { byId, config, url } from "../api";
import axios from "axios";
import Pagination, { bootstrap5PaginationPreset } from "react-responsive-pagination";
import { useTranslation } from "react-i18next";


const History = ({ changeLanguage, lang }) => {
    const [history, setHistory] = useState(null);
    const [totalPage, setTotalPage] = useState(2);
    const [pagination, setPagination] = useState(0);

    const { t } = useTranslation();

    useEffect(() => {
        getHistory(pagination, 4);
    }, []);

    useEffect(() => {
        getHistory(pagination, 4);
    }, [lang]);

    useEffect(() => {
        if ((pagination - 1) * 4 < 0) setPagination(0);
        else getHistory(Math.floor(pagination - 1), 4);
    }, [pagination]);


    const getHistory = (page, size) => {
        axios.get(`${url}product/history?page=${page}&size=${size}&lang=${lang}`, config)
            .then((res) => {
                setHistory(res.data.object);
                setTotalPage(res.data.totalPage ? res.data.totalPage - 1 : 2);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const searchHistory = () => {
        const start = byId("startDate");
        const finish = byId("endDate");
        const userId = byId("userId");
        const productId = byId("productId");
        let filter = "";
        if (start !== "") filter += `&start=${start}`;
        if (finish !== "") filter += `&finish=${finish}`;
        if (userId !== "") filter += `&userIdNumber=${userId}`;
        if (productId !== "") filter += `&productIdNumber=${productId}`;
        axios.get(
            `${url}product/admin/history/search?${filter}&lang=${lang}`,
            config).then((res) => {
                setHistory(res.data.body);
            }).catch(() => {
                getHistory();
            });
    };

    return (
        <div className=" background w-full">
            <NavBar changeLang={changeLanguage} history={'border-b-red-600 border-b text-slate-900'} lang={lang} />
            <div className="history-bg  pt-20">
                <div className="w-full flex justify-center items-center flex-wrap mt-5">
                    <div className="flex flex-col">
                        <label
                            htmlFor="startDate"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            {t("history1")}
                        </label>
                        <input
                            id="startDate"
                            onChange={searchHistory}
                            type="date"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder={t("history1")}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="endDate"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            {t("history2")}
                        </label>
                        <input
                            id="endDate"
                            onChange={searchHistory}
                            type="date"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder={t("history2")}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="searchUser"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            {t("history3")}
                        </label>
                        <input
                            onChange={searchHistory}
                            id="userId"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="🔍..."
                        />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="searchId"
                            className="mx-5 text-slate-800 font-semibold tracking-wider"
                        >
                            {t("history4")}
                        </label>
                        <input
                            onChange={searchHistory}
                            id="productId"
                            className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder="🔍 ..."
                        />
                    </div>
                </div>
                <p className='md:ml-0 ml-8 mt-6 ms-3'>{t("cardCurrent")}: {pagination}</p>

                {/* history table */}
                <div className="w-full mb-5 md:px-5 px-2">
                    {history && <HistoryInfo className="mt-6" history={history} />}
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
        </div>
    );
};

export default History;
