import React, { useEffect, useState } from "react";
import "./client.css";
import filterImg from "./search-filter.png";
import ProductCard from "./ProductCard";
import LoadingClient from "./loading";
import { byId, byIdObj, config, getManagerProduct, url } from "../api";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
import { useTranslation } from "react-i18next";
import Empty from "../Empty";

const Managers = ({ changeLanguage, lang }) => {
  const [isLoading, setIsloading] = useState(false);
  const [productsClient, setProductClient] = useState(null);
  const [totalPage, setTotalPage] = useState(2);
  const [pagination, setPagination] = useState(0);
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    getManagerProduct(pagination, 4, setProductClient, setTotalPage);
  }, []);

  useEffect(() => {
    getManagerProduct(pagination, 4, setProductClient, setTotalPage, lang);
  }, [lang]);

  const { t } = useTranslation();

  useEffect(() => {
    if ((pagination - 1) * 4 < 0) setPagination(0);
    else
      getManagerProduct(
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
      phoneNumber: `998${byId("phoneNumberC")}`,
      password: byId("passwordC"),
    };
    axios
      .post(`${url}user?ROLE=ROLE_MANAGER`, data, config)
      .then(() => {
        toast.success(t("success"));
        setIsloading(false);
        byIdObj("nameC").value = "";
        byIdObj("idNumberC").value = "";
        byIdObj("phoneNumberC").value = "";
        byIdObj("passwordC").value = "";
        getManagerProduct(pagination, 4, setProductClient, setTotalPage);
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
      getManagerProduct(pagination, 4, setProductClient, setTotalPage);
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
          <div className="flex justify-between items-center">
            <input
              type="search"
              onChange={searchProductClient}
              className="py-2 px-4 w-96 bg-slate-100 rounded-lg border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-200 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
              placeholder={t("productSearch")}
            />
            
          </div>
          {productsClient ? (
            productsClient.map((item, i) => (
              <ProductCard key={i} className="mt-5" product={item} />
            ))
          ) : (
            <Empty />
          )}
          <div className="pagination-style relative mt-4">
            <Pagination
              {...bootstrap5PaginationPreset}
              current={pagination}
              total={Math.floor(totalPage + 1)}
              onPageChange={setPagination}
            />
          </div>
        </div>

        <div className="lg:w-2/6 rounded-md">
          <p className="text-black text-2xl mb-5 font-bold tracking-wider text-center">
            {t("addclient20")}
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
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              >
                +998
              </button>
              <input
                id="phoneNumberC"
                type="number"
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
                focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                placeholder={t("addclient8")}
              />
            </div>
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

            {/* <p htmlFor="passwordC" className="ml-3.5 text-gray-500 mb-5">
              {t("client04")}
            </p> */}

            <div className="flex justify-end items-center w-full mt-8">
              {isLoading ? (
                <LoadingClient />
              ) : (
                <button
                  className={`px-6 py-2 ${
                    role === "ROLE_ADMIN" ? "" : "hidden"
                  } bg-green-500 shadow-lg rounded-lg text-white
                                font-bold text-lg tracking-wider active:scale-95 duration-200`}
                  onClick={addUser}
                >
                  {t("addd")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Managers;
