// DashboardProductCard.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { config, getFile, url } from "../../../api";
import Dropdown from "./Dropdown";
import "../../../product/product.css";
import img from "../../../empty.png";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import { toast } from "react-toastify";
import ImageViewModal from "../../../ImageViewModal";

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
        <div className="bg-sky-200 px-20 py-6 flex justify-between">
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

const DashboardProductCard = ({ className, lang }) => {
  const [modal, setModal] = useState(false);
  const [modalin, setModalin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setProduct] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [searchBy, setSearchBy] = useState(null);
  const [drops, setDrops] = useState(false);
  const [isImageOpenModal, setIsImageOpenModal] = useState(false);
  const [imageId, setImageId] = useState(false);

  const inputDrop = () => setDrops(false);
  const selectDrop = () => setDrops(true);

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


  const openModal = () => {setModal(true)}
  const closeModal = () => {setModal(false)}

  function getProduct(page, size) {
    axios
      .get(
        `${url}product/user/products?page=${page}&size=${size}&lang=${lang}`,
        config
      )
      .then((res) => {
        setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
        setProduct(res.data.body.object);
      })
      .catch((err) => console.log(err));
  }

  function getInfo(id) {
    axios
      .get(`${url}cashier/user?productId=${id}&lang=${lang}`, config)
      .then((res) => {
        setModalin(res.data.body);
      })
      .catch((err) => console.log(err));
  }

  function searchProduct(e) {
    let text = e.target.value;
    if (text === "") getProduct(pagination, 4);
    else if (text === "all") getProduct(pagination, 4);
    else
      axios
        .get(`${url}product/user/search?name=${text}&lang=${lang}`, config)
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

  function searchByName() {
    switch (searchBy) {
      case "Project name":
        return "name";
      case "Project status":
        return "status";
      default:
        return "name";
    }
  }


  return (
    <div className="radius">
      <div className="mb-5 flex items-center">
        <div className="flex justify-between items-center w-full md:px-3 ">
          {drops ? (
            <select
              onChange={searchProduct}
              defaultValue=""
              id="statuslar"
              className="py-2 px-2 w-96 bg-white rounded-lg  border border-slate-300
                       focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                     focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
            >
              <option selected disabled>
                {t("productAdd60")}
              </option>
              <option value="all">{t("all")}</option>
              <option value="PENDING">{t("status1")}</option>
              <option value="GOING">{t("status2")}</option>
              <option value="CANCEL">{t("status3")}</option>
              <option value="ARRIVED">{t("status4")}</option>
              <option value="COMPLETED">{t("status5")}</option>
              <option value="MOVED ">{t("status6")}</option>
            </select>
          ) : (
            <input
              type="search"
              placeholder={t("productNameSearch")}
              defaultValue=""
              onChange={searchProduct}
              className="lg:w-4/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
            />
          )}
        </div>
      </div>
      <p className="mb-3">{t("cardCurrent")}: 1</p>
      <div class="relative overflow-x-auto  sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                №
              </th>
              <th scope="col" class="px-6 py-3">
                {t("photo")}
              </th>

              <th scope="col" class="px-6 py-3">
                {t("productName")}
              </th>
              <th scope="col" class="px-6 py-3">
                {t("comment")}
              </th>
              <th scope="col" class="px-6 py-3">
                {t("date")}
              </th>

              <th scope="col" class="px-6 py-3">
                {/* Total Weight */}
                {t("totalWeight")}
              </th>
              <th scope="col" class="px-6 py-3">
                {t("totalKub")}
              </th>
              <th scope="col" class="px-6 py-3">
                {t("statuss")}
              </th>
              <th scope="col" class="px-6 py-3">
                {t("wiew")}
              </th>
              {/* <th scope="col" class="px-6 py-3">
                {t("wiew")}
              </th> */}
              {/* <th scope="col" class="px-6 py-3">
                      Total Price
                    </th> */}

              {/* <th scope="col" class="px-6 py-3 text-center">
                      {t("download")}
                    </th> */}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, i) => (
                <tr className="bg-white border-b" key={i}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {(pagination - 1) * 4 < 0
                      ? i + 1
                      : (pagination - 1) * 4 + (i + 1)}
                  </th>
                  <th className="px-6 py-5 flex justify-center items-center">
                    <img
                      onClick={() => {
                        setImageId(
                          item.attachmentId
                            ? item.attachmentId
                            : toast.warning(t("imgNotFound"))
                        );
                        item.attachmentId
                          ? setIsImageOpenModal(true)
                          : setIsImageOpenModal(false);
                      }}
                      src={
                        item.attachmentId ? getFile + item.attachmentId : img
                      }
                      className="w-10 h-10 object-cover hover:cursor-pointer rounded-full scale-150"
                      alt="img"
                    />
                  </th>
                  <td className="px-6 py-4">{item ? item.name : ""}</td>
                  <td className="px-6 py-4">{item ? item.comment : ""}</td>
                  <td className="px-6 py-4">{item ? item.date : ""}</td>
                  <td className="px-6 py-4">
                    {item ? item.totalWeight : ""} {t("kg")}
                  </td>
                  <td className="px-6 py-4">
                    {item ? item.totalKub : ""} {t("sm")}
                    <sup>3</sup>
                  </td>
                  <td className="px-6 py-4">
                    {item.status ? item.status : t("noStatus")}{" "}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => {
                        getInfo(item.id)
                        openModal()
                      }}
                      href="#"
                      className="font-medium text-[#16A34A] hover:underline"
                    >
                      {t("wiew")}
                    </a>
                  </td>

                  {/* <td className="px-6 py-4">
                      <a href="#" className="text-yellow-500 font-bold">
                      {t("wiew")}
                      </a>
                  </td> */}
                </tr>
              ))}
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
      <ImageViewModal
        setIsImageOpenModal={setIsImageOpenModal}
        isImageOpenModal={isImageOpenModal}
        imageId={imageId}
      />

      {modal && (
        <div className="zoom-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative md:w-[100%] w-[80vw] my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
              <div className="flex items-center justify-between border-b pb-2 rounded-t">
                <h3 className="text-2xl font-semibold">{t("wiew")}</h3>
                <button
                  className="p-1 ml-auto border-0 text-4xl hover:scale-110 duration-200"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("productName")}:</p>
                <p className="font-bold">
                  {modalin && modalin.productName}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("userName")}:</p>
                <p className="font-bold">{modalin && modalin.username}</p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("projectName")}:</p>
                <p className="font-bold">
                  {modalin && modalin.projectName}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("date")}:</p>
                <p className="font-bold">
                  {modalin && modalin.createdAt}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("measure")}:</p>
                <p className="font-bold">
                  {modalin && modalin.totalKub}{" "}
                  {modalin && modalin.measure}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("cct")}:</p>
                <p className="font-bold">{modalin && modalin.cct} $</p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("price")}:</p>
                <p className="font-bold">
                  {modalin && modalin.priceOfKub} $
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("totalPrice")}:</p>
                <p className="font-bold">
                  {modalin && modalin.totalPrice} $
                </p>
              </div>

              <div className="flex md:justify-end justify-center  mt-4">
                <button
                  onClick={closeModal}
                  className="py-2 px-8 mr-3 bg-red-500 rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-red-200 duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProductCard;
