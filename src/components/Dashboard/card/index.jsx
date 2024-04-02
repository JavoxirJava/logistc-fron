// DashboardProductCard.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { config, getFile, url } from "../../api";
import "../../product/product.css";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ImageViewModal from "../../ImageViewModal";
import img from '../../empty.png'

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
  const [data, setProduct] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [isImageOpenModal, setIsImageOpenModal] = useState(false);
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getProduct();
  }, [lang]);

  const { t } = useTranslation();

  // useEffect(() => {
  //   if ((pagination - 1) * 4 < 0) setPagination(0);
  //   else getProduct(Math.floor(pagination - 1), 4);
  // }, [pagination]);

  function getProduct() {
    axios.get(`${url}product?lang=${lang}`, config)
      .then((res) => {
        // setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
        setTotalPage(res.data.body.totalPage);
        setProduct(res.data.body.object);
      })
      .catch((err) => console.log(err));
  }

  function searchProduct(e) {
    let text = e.target.value;
    if (text === "") getProduct();
    else axios.get(`${url}product/admin/search?lang=${lang}&projectName=${text}`, config)
      .then((res) => {
        if (res.data.success === true) setProduct(res.data.body);
        else if (res.data.success === false) setProduct(null);
      })
      .catch((err) => console.log(err));
  }

  const handelPageClick = (event) => {
    const pageNumber = event.selected;
    setCurrentPage(pageNumber);
    axios.get(`${url}product?page=${pageNumber}&size=10&lang=${lang}`, config)
      .then((res) => setProduct(res.data.body.object))
      .catch((err) => console.log("error page: ", err));
  };

  return (
    <div className="radius">
      <div className="mb-5 flex items-center">
        <div className="flex justify-between items-center w-full md:px-3 ">
          <input
            type="search"
            placeholder={t('productNameSearch')}
            onChange={searchProduct}
            className="lg:w-4/12 px-3 h-10 focus:outline-0 border sm:mt-0 mt-2"
          />
        </div>
      </div>
      <p className="mb-3">{t("cardCurrent")}: {currentPage + 1}</p>
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="bg-slate-200">
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">{t('photo')}</th>
              <th scope="col" className="px-6 py-3">{t('card4')} {t("client2")}</th>
              <th scope="col" className="px-6 py-3">{t("totalKub")}</th>
              <th scope="col" className="px-6 py-3">{t("totalWeight")}</th>
              <th scope="col" className="px-6 py-3">{t("date")}</th>
              <th scope="col" className="px-6 py-3">{t("comment")}</th>
              <th scope="col" className="px-6 py-3">{t("statuss")}</th>
              {/* <th scope="col" className="px-6 py-3">{t("productAdd7x")}</th>
              <th scope="col" className="px-6 py-3">{t("productAdd7y")}</th>
              <th scope="col" className="px-6 py-3">{t("productAdd7z")}</th> */}
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, i) => (
                <tr
                  className="bg-white border-b"
                  key={i}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >{(currentPage * 10) + (i + 1)}</th>
                  <td className="px-6 py-4">
                    <img
                      onClick={() => {
                        setImageId(item.attachmentId ? item.attachmentId : toast.warning(t('imgNotFound')));
                        item.attachmentId ? setIsImageOpenModal(true) : setIsImageOpenModal(false)
                      }}
                      src={item.attachmentId ? getFile + item.attachmentId : img}
                      alt="img"
                      className="w-10 h-10 object-cover rounded-full scale-125 hover:cursor-pointer" />
                  </td>
                  <td className="px-6 py-4">{item ? item.name : ""}</td>
                  <td className="px-6 py-4">{item ? item.totalKub.toFixed(3) : ""} {item ? <span>{t('sm')} <sup>3</sup></span> : ''}</td>
                  <td className="px-6 py-4">{item ? item.totalWeight.toFixed(3) : ""} {item ? <span>{t('kg')}</span> : ''}</td>
                  <td className="px-6 py-4">
                    {item ? item.date.slice(0, item.date.indexOf(" ")) : ""}
                  </td>
                  <td className="px-6 py-4">{item ? item.comment : ""}</td>
                  <td className="px-6 py-4">{item.status ? item.status : t('noStatus')}</td>
                  {/* <td className="px-6 py-4">{item.y}</td>
                  <td className="px-6 py-4">{item.z}</td> */}
                </tr>
              ))) : (
              <tr className="bg-white border-b">
                <td colSpan='10' className="px-6 py-4 text-center text-lg">{t('card4')} {t('notfound')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <ReactPaginate
          className="navigation"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handelPageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="<"
          renderOnZeroPageCount={null}
          nextClassName="nextBtn"
          previousClassName="prevBtn"
        />
      </div>
      <ImageViewModal
        setIsImageOpenModal={setIsImageOpenModal}
        isImageOpenModal={isImageOpenModal}
        imageId={imageId}
      />
    </div>
  );
};

export default DashboardProductCard;
