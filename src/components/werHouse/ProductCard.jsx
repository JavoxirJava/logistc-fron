import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductModal from "./productModal";

function ProductCard({
  addToProduct,
  className,
  product,
  openEdit,
  setProductObj,
  deleteProduct,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const { t } = useTranslation();

  console.log(product);

//   const arr = [];

//   const idPush = () => {
//     const iddd = document.getElementById("salom");
//     if (iddd.isChecked) {
//       console.log("true");
//     } else {
//       console.log("false");
//     }
//   };

  return (
    <div
      className={`flex p-3 media-product items-center card-main border border-blue-300 w-full h-max bg-blue-100 ${className} `}
    >
      <div className="card-col w-11/12 pt-2 ps-2 flex md:flex-col flex-col ">
        <div className="card-col-row w-full card-col-row flex sm:flex-row flex-col justify-between  media-product h-max">
          <div className="flex sm:w-[100%] ">
            <div className="sm:w-[50%] w-[100%]">
              <p className="opacity-70">{t("card1")}</p>
              <p className="font-bold">{product ? product.idNumber : 0}</p>
            </div>
            <div className="sm:w-[18%] ps-1">
              <p className="opacity-70">{t("card6")}</p>
              <p className="font-bold">
                {product
                  ? product.measureCount + " " + product.measure
                  : "No location"}
              </p>
            </div>
          </div>
          <div className="flex sm:w-[100%]">
            <div className="sm:w-[50%] w-[100%]">
              <p className="opacity-70">{t("card4")}</p>
              <p className="font-bold">{product ? product.name : "Iphone"}</p>
            </div>
          </div>
        </div>
        <div className="h-max card-col-row w-full flex sm:flex-row flex-col media-product "></div>
      </div>
      <div className="sm:w-2/12 h-max flex flex-col gap-3 sm:justify-center ">
        <button
          onClick={() => {
            openEdit();
            setProductObj(product);
          }}
          className="inline-flex justify-center sm:w-9/12  px-5 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
        >
          {t("edit")}
        </button>
        <button
          onClick={() => {
            setProductObj(product);
            openModal();
          }}
          className="inline-flex justify-center sm:w-9/12 px-5 rounded-md border border-gray-300 shadow-sm py-2 bg-red-700 text-sm font-medium text-white"
        >
          {t("delete")}
        </button>
      </div>
      <button
        onClick={() => {
          setProductObj(product.id)
          addToProduct();
        }}
        className=" justify-center h-10 align-center px-5 rounded-md border border-green-300 shadow-sm  bg-red-700 text-sm font-medium text-white"
      >
        {t("addd")}
      </button>

      <ProductModal
        isOpen={isModalOpen}
        deleteProduct={deleteProduct}
        onClose={closeModal}
      />
    </div>
  );
}

export default ProductCard;
