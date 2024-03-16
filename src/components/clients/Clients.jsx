import React, { useEffect, useState } from "react";
import "./client.css";
import ProductCard from "./ProductCard";
import LoadingClient from "./loading";
import {
  byId,
  byIdObj,
  config,
  getCasherProduct,
  getClientProduct,
  getManagerProduct,
  url,
} from "../api";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
import { useTranslation } from "react-i18next";
import Empty from "../Empty";
import ManagerCard from "./managerCard";
import CasherCard from "./casherCard";

const Clients = ({ changeLanguage, lang }) => {
  const { t } = useTranslation();
  const [isLoading, setIsloading] = useState(false);
  const [productsClient, setProductClient] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [totalManager, setTotalManager] = useState(null);
  const [totalCasher, setTotalCasher] = useState(null);
  const [errorInput, setErrorInput] = useState(null);
  const [pagination, setPagination] = useState(0);
  const [paginationM, setPaginationM] = useState(0);
  const [paginationC, setPaginationC] = useState(0);
  const [pagen, setPage] = useState(0);
  const [userBtn, setUserBtn] = useState(false)
  const [cashierBtn, setCashierBtn] = useState(false)
  const [managerBtn, setManagerBtn] = useState(false)

  const getUse = () => setPage(0);
  const getManag = () => setPage(1);
  const getCash = () => setPage(2);

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    if (pagen == 1)
      getManagerProduct(
        paginationM,
        4,
        setProductClient,
        setTotalManager,
        lang
      );
    else if (pagen == 2)
      getCasherProduct(paginationC, 4, setProductClient, setTotalCasher, lang);
    else getClientProduct(pagination, 4, setProductClient, setTotalPage, lang);
  }, []);

  useEffect(() => {
    if (pagen == 1)
      getManagerProduct(
        paginationM,
        4,
        setProductClient,
        setTotalManager,
        lang
      );
    else if (pagen == 2)
      getCasherProduct(paginationC, 4, setProductClient, setTotalCasher, lang);
    else getClientProduct(pagination, 4, setProductClient, setTotalPage, lang);
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

  useEffect(() => {
    if ((paginationC - 1) * 4 < 0) setPaginationC(0);
    else
      getCasherProduct(
        Math.floor(paginationC - 1),
        4,
        setProductClient,
        setTotalCasher,
        lang
      );
  }, [paginationC]);

  function addUser() {
    setIsloading(true);
    const data = {
      name: byId("nameC"),
      idNumber: byId("idNumberC"),
      phoneNumber: `998${byId("phoneNumberC")}`,
      password: byId("passwordC"),
    };
    axios
      .post(
        `${url}user?ROLE=${byId("user") != 0 ? byId("user") : "ROLE_USER"}`,
        data,
        config
      )
      .then(() => {
        toast.success(t("success"));
        setIsloading(false);
        byIdObj("nameC").value = "";
        byIdObj("idNumberC").value = "";
        byIdObj("phoneNumberC").value = "";
        byIdObj("passwordC").value = "";
        pagen == 1
          ? getManagerProduct(
            paginationM,
            4,
            setProductClient,
            setTotalManager,
            lang
          )
          : pagen == 2
            ? getCasherProduct(
              paginationC,
              4,
              setProductClient,
              setTotalCasher,
              lang
            )
            : getClientProduct(pagination, 4, setProductClient, setTotalPage, lang);
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
      pagen == 1
        ? getManagerProduct(
          paginationM,
          4,
          setProductClient,
          setTotalManager,
          lang
        )
        : pagen == 2
          ? getCasherProduct(
            paginationC,
            4,
            setProductClient,
            setTotalCasher,
            lang
          )
          : getClientProduct(pagination, 4, setProductClient, setTotalPage, lang);
    else
      axios
        .get(`${url}user/search?idNumber=${text}&lang=${lang}`, config)
        .then((res) => {

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

  const activeBtnClass = text => {
    text === 'activeUser' ? setUserBtn(true) : setUserBtn(false)
    text === 'activeCasher' ? setCashierBtn(true) : setCashierBtn(false)
    text === 'activeManager' ? setManagerBtn(true) : setManagerBtn(false)
  }

  return (
    <>
      <NavBar
        client={"border-b-red-600 border-b text-slate-900"}
        changeLang={changeLanguage}
        lang={lang}
      />
      <div className="clients-bg background b flex lg:flex-row flex-col pt-20">
        <div className="lg:w-1/2 md:w-4/5 w-full lg:pl-10 md:px-0 px-2 ">
          <div className="flex gap-4 flex-col md:flex-row   justify-between items-center">
            <input
              type={t("history3")}
              onChange={searchProductClient}
              className="py-2 px-4 w-100 bg-slate-100 rounded-lg border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-200 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
              placeholder={t("productSearchIdnumber")}
            />
            <div className="flex md:flex-row flex-col gap-5">
              <button
                className={`px-6 py-2 ${role === "ROLE_ADMIN" ? "" : "hidden"} 
                ${userBtn ? 'bg-green-700 border border-white shadow-white' : 'bg-green-500'}
                shadow-md rounded-lg text-white font-bold text-lg tracking-wider active:scale-95 duration-200`}
                onClick={() => {
                  setProductClient(null)
                  getClientProduct(
                    Math.floor(pagination),
                    4,
                    setProductClient,
                    setTotalPage,
                    lang
                  );
                  getUse();
                  activeBtnClass('activeUser');
                }}
              >
                {t("client10")}
              </button>
              <button
                className={`px-6 py-2  ${role === "ROLE_ADMIN" ? "" : "hidden"} 
                ${cashierBtn ? 'bg-green-700 border border-white shadow-white' : 'bg-green-500'} 
                shadow-md rounded-lg text-white font-bold text-lg tracking-wider active:scale-95 duration-200`}
                onClick={() => {
                  setProductClient(null)
                  getCasherProduct(
                    Math.floor(paginationC),
                    4,
                    setProductClient,
                    setTotalCasher,
                    lang
                  );
                  getCash();
                  activeBtnClass('activeCasher');
                }}
              >
                {t("cassier")}
              </button>
              <button
                className={`px-6 py-2 ${role === "ROLE_ADMIN" ? "" : "hidden"} 
                ${managerBtn ? 'bg-green-700 border border-white shadow-white' : 'bg-green-500'}
                shadow-md rounded-lg text-white font-bold text-lg tracking-wider active:scale-95 duration-200`}
                onClick={() => {
                  setProductClient(null)
                  getManagerProduct(
                    Math.floor(paginationM),
                    4,
                    setProductClient,
                    setTotalManager,
                    lang
                  );
                  getManag();
                  activeBtnClass('activeManager');
                }}
              >
                {t("client11")}
              </button>
            </div>
          </div>
          {productsClient ? (
            productsClient.map((item, i) =>
              pagen == 1 ? (
                <ManagerCard key={i} className="mt-5" product={item} />
              ) : pagen == 2 ? (
                <CasherCard key={i} className="mt-5" product={item} />
              ) : (
                <ProductCard key={i} className="mt-5" product={item} />
              )
            )
          ) : (
            <Empty />
          )}
          <div className="pagination-style relative mt-4">
            {pagen == 1 ? (
              <Pagination
                {...bootstrap5PaginationPreset}
                current={paginationM}
                total={Math.floor(totalManager + 1)}
                onPageChange={setPaginationM}
              />
            ) : pagen == 2 ? (
              <Pagination
                {...bootstrap5PaginationPreset}
                current={paginationC}
                total={Math.floor(totalCasher + 1)}
                onPageChange={setPaginationC}
              />
            ) : (
              <Pagination
                {...bootstrap5PaginationPreset}
                current={pagination}
                total={Math.floor(totalPage + 1)}
                onPageChange={setPagination}
              />
            )}
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
              onChange={e => {
                let value = e.target.value
                if (!/^[a-zA-Z0-9]*$/.test(value)) {
                  setErrorInput('Only numbers and letters are allowed!')
                  document.getElementById('idNumberC').value = ''
                } else setErrorInput(null)
              }}
              id="idNumberC"
              className={`${errorInput ? 'border-red-500 focus:border-red-500 placeholder:text-red-500 focus:placeholder:text-red-500 mb-0' : 'mb-5'} py-2 px-4 w-full bg-white rounded-lg border border-slate-300
              focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
              focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium`}
              placeholder={t("addclient6")}
            />
            {errorInput && <p className="text-red-500 text-sm mb-3.5 ml-3 p-0">{errorInput}</p>}

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
              <div className={` ${role === "ROLE_ADMIN" ? "" : "hidden"}`}>
                <label htmlFor="passwordC" className="ml-3.5">
                  {t("client9")}
                </label>

                <select
                  id="user"
                  className="py-2 mb-5 px-4 w-full bg-white rounded-lg  border border-slate-300
                  focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                >
                  <option selected disabled value='0'>
                    {t("client9")}
                  </option>
                  <option value="ROLE_USER">{t("client10")}</option>
                  <option value="ROLE_MANAGER">{t("client11")}</option>
                  <option value="ROLE_CASHIER">{t("cassier")}</option>
                </select>
              </div>
            </div>

            {/* <p htmlFor="passwordC" className="ml-3.5 text-gray-500 mb-5">
              {t("client04")}
            </p> */}

            <div className="flex justify-end items-center w-full mt-8">
              {isLoading ? (
                <LoadingClient />
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
