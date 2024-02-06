import React, { useState } from "react";
import { byId, config, getClientProduct, url } from "../api";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function ProductCard({ className, product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState([]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {t} = useTranslation()

  const editUser = () => {
    setIsLoading(true)
    const data = {
        name: byId("nameCl"),
        idNumber: byId("idNumberCl"),
        phoneNumber: byId("phoneNumberCl"),
        password: byId("passwordCl"),
    };
    axios.put(`${url}user/${userId.userId}`, data, config)
        .then(() => {
            setIsLoading(false)
            closeModal()
            toast.success(t('success'))
        })
        .catch(() => {
            setIsLoading(false)
            toast.error(t("error"))
        })
  }



  return (
    <div
      className={`flex rounded-lg card-main border border-blue-300 w-full px-2 py-2 bg-blue-100 ${className}`}
    >
      <div className="card-col w-11/12">
        <div className="h-12 card-col-row w-full flex media-product">
          <div className="w-[20%]">
            <p className="opacity-70">{t("client1")}</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.idNumber : 0}
            </p>
          </div>
          <div className="w-[30%]">
            <p className="opacity-70">{t("client2")}</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.name : "First Name"}
            </p>
          </div>
          <div className="w-[30%]">
            <p className="opacity-70">{t("client3")}</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.phoneNumber : "No number"}
            </p>
          </div>
          <div className="w-[25%]">
            <p className="opacity-70">{t("client4")}</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.password : "No password"}
            </p>
          </div>
        </div>
        {/* <div className="h-3/6 card-col-row w-full flex media-product">
          <div className="w-[25%]">
            <p className="opacity-70">{t("client5")}</p>
            <p className="font-bold text-[.9rem] text-orange-500">
              {product ? product.allProduct : 0}
            </p>
          </div>
          <div className="w-[25%]">
            <p className="opacity-70">{t("client6")}</p>
            <p className="font-bold text-[.9rem] text-green-500">
              {product ? product.completed : 0}
            </p>
          </div>
          <div className="w-[35%]">
            <p className="opacity-70">{t("client7")}</p>
            <p className="font-bold text-[.9rem] text-purple-600">
              {product ? product.pending : 0}
            </p>
          </div>
          <div className="w-[25%]">
            <p className="opacity-70">{t("client8")}</p>
            <p className="font-bold text-[.9rem] text-purple-600">
              {product ? product.cancel : 0}
            </p>
          </div>
        </div> */}
      </div>
      <div className="card-col w-3/12 flex justify-center my-auto h-10">
        <button
          onClick={() => {
            openModal()
            setUserId(product)
          }}
          className="inline-flex justify-center rounded-md active:scale-95 duration-200 border border-gray-300 shadow-lg py-2 px-5 bg-blue-700 text-sm font-medium text-white"
        >
          {t("edit")}
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-transparent overflow-y-auto h-full w-full lg:px-0 md:px-40 sm:px-10 px-2">
          <div className="relative bg-slate-200 top-20 mx-auto md:p-8 p-3  lg:w-1/3 shadow-lg rounded-md ">
            <h2 className="text-2xl leading-6 font-semibold text-black text-center mb-4">
            {t("edit")}
            </h2>
            <div>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                   {t("addclient3")}
                </label>
                <input
                  // onKeyDown={checkKeyPress}
                  id="nameCl"
                  disabled={isLoading ? true : false}
                  defaultValue={userId.name}
                  className={`w-full ${
                    isLoading ? "cursor-not-allowed" : ""
                  } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                  placeholder={t("addclient4")}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                   {t("addclient5")}
                </label>
                <input
                  // onKeyDown={checkKeyPress}
                  id="idNumberCl"
                  defaultValue={userId.idNumber}
                  disabled={isLoading ? true : false}
                  className={`w-full ${
                    isLoading ? "cursor-not-allowed" : ""
                  } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                  placeholder={t("addclient6")}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                   {t("addclient7")}
                </label>
                <input
                  id="phoneNumberCl"
                  defaultValue={userId.phoneNumber}
                  disabled={isLoading ? true : false}
                  className={`w-full ${
                    isLoading ? "cursor-not-allowed" : ""
                  } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                  placeholder= {t("addclient8")}
                />
              </div>

              <div className="mb-3">
                <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                   {t("addclient9")}
                </label>
                  <input
                    id="passwordCl"
                  defaultValue={userId.password}
                    disabled={isLoading ? true : false}
                    type={showPassword ? "text" : "password"}
                    className={`w-full ${
                      isLoading ? "cursor-not-allowed" : ""
                    } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                    placeholder= {t("addclient10")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                    />
                  </button>
                </div>

                
              </div>

              <div className="flex justify-between mt-7">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btm-close"
                >
                   {t("close")}
                </button>
                <button className="btmn"
                onClick={editUser}>{t("edit")}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
