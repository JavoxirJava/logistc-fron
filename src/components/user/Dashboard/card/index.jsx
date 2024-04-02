// DashboardProductCard.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { config, getFile, url } from "../../../api";
import "../../../product/product.css";
import img from "../../../empty.png";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ImageViewModal from "../../../ImageViewModal";

const DashboardProductCard = ({ lang }) => {
  const [modal, setModal] = useState(false);
  const [modalin, setModalin] = useState(null);
  const [data, setProduct] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [isImageOpenModal, setIsImageOpenModal] = useState(false);
  const [imageId, setImageId] = useState(false);

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


  const openModal = () => { setModal(true) }
  const closeModal = () => { setModal(false) }

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
    axios.get(`${url}cashier/user?productId=${id}&lang=${lang}`, config)
      .then((res) => {
        if (res.data.body.active === true) {
          setModalin(res.data.body)
          openModal()
        }
        else {
          setModalin(null)
          toast.warning(t("kasserHisob"))
        }
      })
      .catch((err) => console.log(err));
  }

  function searchProduct(e) {
    let text = e.target.value;
    if (!text) getProduct(pagination, 4);
    else axios.get(`${url}product/user/search?productName=${text}&lang=${lang}`, config)
      .then((res) => {
        if (res.data.success === true) setProduct(res.data.body);
        else if (res.data.success === false) setProduct(null);
      })
      .catch((err) => {
        console.log(err)
        setProduct(null)
      });
  }


  return (
    <div className="radius">
      <div className="mb-5 flex items-center">
        <div className="flex justify-between items-center w-full md:px-3 ">
          <input
            type="search"
            placeholder={t("productNameSearch")}
            onChange={searchProduct}
            className="lg:w-4/12 px-3 h-10 focus:outline-0 border sm:mt-0 mt-2"
          />
        </div>
      </div>
      <p className="mb-3">{t("cardCurrent")}: 1</p>
      <div className="relative overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">№</th>
              <th scope="col" className="px-6 py-3">{t("photo")}</th>
              <th scope="col" className="px-6 py-3">{t("productName")}</th>
              <th scope="col" className="px-6 py-3">{t("totalWeight")}</th>
              <th scope="col" className="px-6 py-3">{t("totalKub")}</th>
              <th scope="col" className="px-6 py-3">{t("statuss")}</th>
              <th scope="col" className="px-6 py-3">{t("date")}</th>
              <th scope="col" className="px-6 py-3">{t("comment")}</th>
              <th scope="col" className="px-6 py-3">{t("wiew")}</th>
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
                  <td className="px-6 py-4">
                    {item ? item.totalWeight.toFixed(3) : ""} {t("kg")}
                  </td>
                  <td className="px-6 py-4">
                    {item ? item.totalKub.toFixed(3) : ""} {t("sm")}
                    <sup>3</sup>
                  </td>
                  <td className="px-6 py-4">
                    {item.status ? item.status : t("noStatus")}{" "}
                  </td>
                  <td className="px-6 py-4">{item ? item.date : ""}</td>
                  <td className="px-6 py-4">{item ? item.comment : ""}</td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => getInfo(item.id)}
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
          <div className="relative md:w-[100%] w-[80vw] mx-auto max-w-3xl">
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
                <p className="font-bold">{modalin && modalin.totalKub} {modalin && modalin.measure}</p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("price")} {modalin && modalin.measure}:</p>
                <p className="font-bold">{modalin && modalin.priceOfKub} $</p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("cct")}:</p>
                <p className="font-bold">{modalin && modalin.cct} $</p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("summaChina")}:</p>
                <p className="font-bold">{modalin && modalin.costChina} $</p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("summaRastamojka")}:</p>
                <p className="font-bold">{modalin && modalin.customsClearancePrice} $</p>
              </div>
              <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                <p>{t("priceForRoad")}:</p>
                <p className="font-bold">{modalin && modalin.priceForRoad} $</p>
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
