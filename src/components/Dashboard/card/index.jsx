// DashboardProductCard.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { config, url } from "../../api";
import Dropdown from "./Dropdown";
import "../../product/product.css";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
      <div className="bg-white p-8 rounded shadow-md w-[500px]">
        <div className="bg-blue-800 flex justify-around items-center relative">
          <h1 className="text-2xl text-sky-200">Phone</h1>
          <h1 className="text-2xl text-green-300">Going</h1>
          <i
            className="fa-solid fa-xmark absolute right-2 text-2xl text-white"
            onClick={onClose}
          ></i>
        </div>
        <div className="bg-sky-200  px-20    py-6 flex justify-between">
          <div className=" ">
            <p className="pb-0 mb-0 mt-2">Name</p>
            <p className="mt-0 pt-0">John Doe</p>
          </div>
          <div>
            <p className="pb-0 mb-0 mt-2">Name</p>
            <p className="mt-0 pt-0">John Doe</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

const DashboardProductCard = ({ lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setProduct] = useState(null);
  const [wiewData, setWiewData] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    getProduct(pagination, 4);
  }, []);

  useEffect(() => {
    getProduct(pagination, 4);
  }, [lang]);

  const { t } = useTranslation();

  useEffect(() => {
    if ((pagination - 1) * 4 < 0) setPagination(0);
    else getProduct(Math.floor(pagination - 1), 4);
  }, [pagination]);

  function getProduct(page, size) {
    axios.get(`${url}project/page?page=${page}&size=${size}&lang=${lang}`, config)
      .then((res) => {
        setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
        setProduct(res.data.body.object);
      })
      .catch((err) => console.log(err));
  }

  function searchProduct(e) {
    let text = e.target.value;
    if (text === "") getProduct(pagination, 4);
    else axios.get(`${url}project/admin/search?name=${text}&lang=${lang}`, config)
      .then((res) => {
        if (res.data.body) {
          if (res.data.body.length > 4)
            setProduct(
              res.data.body.map((item, i) => {
                if (i < 4) return item;
              })
            );
          else setProduct(res.data.body);
        } else setProduct([]);
      })
      .catch((err) => console.log(err));
  }

  console.log(wiewData);

  return (
    <div className="radius">
      <div className="mb-5 flex items-center">
        <div className="flex justify-between items-center w-full md:px-3 ">
          <input
            type="search"
            placeholder="🔍..."
            defaultValue=""
            onChange={searchProduct}
            className="lg:w-4/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
          />
        </div>
      </div>
      <p className="mb-3">{t("cardCurrent")}: 1</p>
      <div class="relative overflow-x-auto  sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">#</th>
              <th scope="col" class="px-6 py-3">{t('card4')} {t("client2")}</th>
              <th scope="col" class="px-6 py-3">{t("card2")}</th>
              <th scope="col" class="px-6 py-3">{t("transport")}</th>
              <th scope="col" class="px-6 py-3">{t("date")}</th>
              <th scope="col" class="px-6 py-3">{t("totalPrice")}</th>
              <th scope="col" class="px-6 py-3">{t("wiew")}</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, i) => (
                <tr
                  className="bg-white border-b"
                  key={i}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {(pagination - 1) * 4 < 0
                      ? i + 1
                      : (pagination - 1) * 4 + (i + 1)}
                  </th>
                  <td className="px-6 py-4">{item ? item.name : ""}</td>
                  <td className="px-6 py-4">{item ? item.status : ""}</td>
                  <td className="px-6 py-4">{item ? item.transport : ""}</td>
                  <td className="px-6 py-4">
                    {item ? item.date.slice(0, item.date.indexOf(" ")) : ""}
                  </td>
                  <td className="px-6 py-4">{item ? item.transport : ""}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => setWiewData(item)} className="text-blue-700 hover:underline">{t('wiew')}</button>
                  </td>
                </tr>
              ))) : (
              <tr className="bg-white border-b">
                <td colSpan='6' className="px-6 py-4 text-center text-lg">{t('card4')} {t('notfound')}</td>
              </tr>
            )}
          </tbody>
        </table>
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
  );
};

export default DashboardProductCard;
