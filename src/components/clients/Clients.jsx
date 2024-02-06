import React, {useEffect, useState} from "react";
import "./client.css";
import ProductCard from "./ProductCard";
import LoadingClient from "./loading";
import {byId, byIdObj, config, getClientProduct, getManagerProduct, url,} from "../api";
import Pagination, {bootstrap5PaginationPreset,} from "react-responsive-pagination";
import axios from "axios";
import {toast} from "react-toastify";
import NavBar from "../navbar/NavBar";
import {useTranslation} from "react-i18next";
import Empty from "../Empty";

const Clients = ({changeLanguage, lang}) => {
    const {t} = useTranslation();
    const [isLoading, setIsloading] = useState(false);
    const [productsClient, setProductClient] = useState(null);
    const [totalPage, setTotalPage] = useState(2);
    const [totalManager, setTotalManager] = useState(2);
    const [pagination, setPagination] = useState(0);
    const [paginationM, setPaginationM] = useState(0);
    const [pagen, setPage] = useState(false);

    const getUse = () => setPage(false);
    const getManag= () => setPage(true);

    const role = sessionStorage.getItem("role");

    useEffect(() => {
        getClientProduct(pagination, 4, setProductClient, setTotalPage);
    }, []);

    useEffect(() => {
        getClientProduct(pagination, 4, setProductClient, setTotalPage, lang);
    }, [lang]);

    useEffect(() => {
        getManagerProduct(paginationM, 4, setProductClient, setTotalManager, lang);
    }, [lang]);

    useEffect(() => {
        if ((pagination - 1) * 4 < 0) setPagination(0);
        else
            getClientProduct(
                Math.floor(pagination - 1),
                4,
                setProductClient,
                setTotalPage,
                lang
            );
    }, [pagination]);

    useEffect(() => {
        if ((paginationM - 1) * 4 < 0) setPaginationM(0);
        else
            getManagerProduct(
                Math.floor(paginationM - 1),
                4,
                setProductClient,
                setTotalManager,
                lang
            );
    }, [paginationM]);

    function addUser() {
        setIsloading(true);
        const data = {
            name: byId("nameC"),
            idNumber: byId("idNumberC"),
            phoneNumber: `998${byId("phoneNumberC")}`,
            password: byId("passwordC"),
        };
        axios
            .post(`${url}user?ROLE=${byId("user")}`, data, config)
            .then(() => {
                toast.success(t("success"));
                setIsloading(false);
                byIdObj("nameC").value = "";
                byIdObj("idNumberC").value = "";
                byIdObj("phoneNumberC").value = "";
                byIdObj("passwordC").value = "";
                getClientProduct(pagination, 4, setProductClient, setTotalPage);
            })
            .catch((err) => {
                toast.error(t("error"));
                setIsloading(false);
                console.log(err);
            });
    }

    function searchProductClient(e) {
        let text = e.target.value;
        if (text === "")
            getClientProduct(pagination, 4, setProductClient, setTotalPage);
        else
            axios
                .get(`${url}user/search?idNumber=${text}&lang=${lang}`, config)
                .then((res) => {
                    // if (!res.data.body) {
                    //   if (res.data.body.object.length > 4)
                    //     setProductClient(
                    //       res.data.body.object.map((item, i) => {
                    //         if (i < 4) return item;
                    //       })
                    //     );
                    // } else setProductClient(null);
                    console.log(res.data.body);

                    if (res.data.body) {
                        setProductClient(res.data.body);
                    } else setProductClient(null);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 404)
                        setProductClient(null);
                    console.log(err);
                });
    }

    return (
        <>
            <NavBar
                client={"border-b-red-600 border-b text-slate-900"}
                changeLang={changeLanguage}
                lang={lang}
            />
            <div className="clients-bg background b flex lg:flex-row flex-col pt-20">
                <div className="lg:w-2/5 md:w-4/5 w-full lg:pl-10 md:px-0 px-2 ">
                    <div className="flex gap-4 justify-between items-center">
                        <input
                            type="search"
                            onChange={searchProductClient}
                            className="py-2 px-4 w-96 bg-slate-100 rounded-lg border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-200 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder={t("productSearch")}
                        />
                        <button
                            className={`px-6 py-2 ${
                                role === "ROLE_ADMIN" ? "" : "hidden"
                            } bg-green-500 shadow-lg rounded-lg text-white
                                font-bold text-lg tracking-wider active:scale-95 duration-200`}
                            onClick={() => {
                                getClientProduct(
                                    Math.floor(pagination),
                                    4,
                                    setProductClient,
                                    setTotalPage,
                                    lang
                                );
                                getUse();
                            }}
                        >
                            {t("client10")}
                        </button>
                        <button
                            className={`px-6 py-2 ${
                                role === "ROLE_ADMIN" ? "" : "hidden"
                            } bg-green-500 shadow-lg rounded-lg text-white
                                font-bold text-lg tracking-wider active:scale-95 duration-200`}
                            onClick={() => {
                                getManagerProduct(
                                    Math.floor(paginationM),
                                    4,
                                    setProductClient,
                                    setTotalManager,
                                    lang
                                );
                                getManag();
                            }}
                        >
                            {t("client11")}
                        </button>
                    </div>
                    {productsClient ? (
                        productsClient.map((item, i) => (
                            <ProductCard key={i} className="mt-5" product={item}/>
                        ))
                    ) : (
                        <Empty/>
                    )}
                    <div className="pagination-style relative mt-4">
                        {pagen ? <Pagination
                                {...bootstrap5PaginationPreset}
                                current={paginationM}
                                total={Math.floor(totalManager + 1)}
                                onPageChange={setPaginationM}
                            />
                            : <Pagination
                                {...bootstrap5PaginationPreset}
                                current={pagination}
                                total={Math.floor(totalPage + 1)}
                                onPageChange={setPagination}
                            />
                        }
                    </div>
                </div>

                <div className="lg:w-2/6 rounded-md">
                    <p className="text-black text-2xl mb-5 font-bold tracking-wider text-center">
                        {t("addclient2")}
                    </p>
                    <div className="add-bg rounded-lg lg:px-3 px-10 py-6 w-full">
                        <label htmlFor="nameC" className="ml-3.5">
                            {t("addclient3")}
                        </label>
                        <input
                            id="nameC"
                            className="py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder={t("addclient4")}
                        />

                        <label htmlFor="idNumberC" className="ml-3.5">
                            {t("addclient5")}
                        </label>
                        <input
                            id="idNumberC"
                            className="py-2 px-4 w-full bg-white rounded-lg mb-5 border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                            placeholder={t("addclient6")}
                        />

                        <label htmlFor="phoneNumberC" className="ml-3.5">
                            {t("addclient7")}
                        </label>
                        <div className="flex items-center mb-5">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                disabled
                                style={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                            >
                                +998
                            </button>
                            <input
                                id="phoneNumberC"
                                type="number"
                                style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                                className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
                focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                                placeholder={t("addclient8")}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-5">
                            <div>
                                <label htmlFor="passwordC" className="ml-3.5">
                                    {t("addclient9")}
                                </label>

                                <input
                                    id="passwordC"
                                    className="py-2 mb-5 px-4 w-full bg-white rounded-lg  border border-slate-300
              focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
              focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                                    placeholder={t("addclient10")}
                                />
                            </div>
                            <div>
                                <label htmlFor="passwordC" className="ml-3.5">
                                    {t("client9")}
                                </label>

                                <select
                                    id="user"
                                    className="py-2 mb-5 px-4 w-full bg-white rounded-lg  border border-slate-300
                  focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                                >
                                    <option selected disabled>
                                        {t("client9")}
                                    </option>
                                    <option value="ROLE_USER">{t("client10")}</option>
                                    <option value="ROLE_MANAGER">{t("client11")}</option>
                                </select>
                            </div>
                        </div>

                        {/* <p htmlFor="passwordC" className="ml-3.5 text-gray-500 mb-5">
              {t("client04")}
            </p> */}

                        <div className="flex justify-end items-center w-full mt-8">
                            {isLoading ? (
                                <LoadingClient/>
                            ) : (
                                <button
                                    className="px-6 py-2 bg-green-500 shadow-lg rounded-lg text-white
                                font-bold text-lg tracking-wider active:scale-95 duration-200"
                                    onClick={addUser}
                                >
                                    {t("addClients")}
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
