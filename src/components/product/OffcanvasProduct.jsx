import React, { useEffect, useState } from "react";
import Offcanvas from "../Offcanvas";
import { byId, getUsers } from "../api";
import { useTranslation } from "react-i18next";

function OffcanvasProduct({
  isOffcanvasOpen,
  handleToggleOffcanvas,
  name,
  lang,
  onSave,
  product,
  setProduct,
  getProduct,
  isAdd,
  setUserId,
}) {
  const [users, setUsers] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    getUsers(setUsers, lang, );
  }, []);


  function setData() {
    setProduct({
      id: product ? product.productId : 0,
      idNumber: byId(`idNumber${isAdd}`),
      name: byId(`productName${isAdd}`),
      measureCount: byId(`measureCount${isAdd}`),
      measure: byId(`measure${isAdd}`),
      wareHouseId: byId(`wareHouseId${isAdd}`),
    });
    setUserId(byId(`userId${isAdd}`));
  }
  const inputDelete = () => {

  }

  return (
    <Offcanvas
      isOpen={isOffcanvasOpen}
      name={name}
      onClose={handleToggleOffcanvas}
      inputDelete={inputDelete}>
      <div onChange={setData}>
        <label
          htmlFor={`userId${isAdd}`}
          className="block text-gray-700 text-sm font-bold mb-2">
          {t("productAdd2")}
        </label>
        <select
          id={`userId${isAdd}`}
          className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
          <option selected disabled>{t("productSUser")}</option>
          {users &&
            users.map((item, i) => (
              <option
                value={item.userId}
                key={i}
                selected={product && product.userId === item.userId}>
                {item.name}
              </option>
            ))}
        </select>
        <label
          htmlFor={`productName${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2">
          {t("productAdd3")}
        </label>
        <input
          id={`productName${isAdd}`}
          placeholder={t("productAdd3")}
          defaultValue={product ? product.productName : ""}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <label
          htmlFor={`idNumber${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2">
          {t("productAdd7")}
        </label>
        <input
          id={`idNumber${isAdd}`}
          placeholder={t("productAdd7")}
          defaultValue={product ? product.idNumber : ""}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <label
          htmlFor={`measureCount${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2">
          {t("productAdd4")}
        </label>
        <input
          type="number"
          id={`measureCount${isAdd}`}
          placeholder={t("productAdd4")}
          defaultValue={product ? product.measureCount : ""}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <label
          htmlFor={`measure${isAdd}`}
          className="block text-gray-700 text-sm font-bold mb-2">
          {t("productAdd6")}
        </label>
        <select
          id={`measure${isAdd}`}
          className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
          <option selected disabled>{t("productAdd60")}</option>
          <option value="KG" selected={product && product.measure === "KG"}>{t("productAdd06")}</option>
          <option value="PIECE" selected={product && product.measure === "PIECE"}>{t("productAdd060")}</option>
          <option value="KUB" selected={product && product.measure === "KUB"}>{t("productAdd006")}</option>
        </select>
        <label
          htmlFor={`wareHouseId${isAdd}`}
          className="block text-gray-700 text-sm font-bold mb-2">
          {t("werhouse")}
        </label>
        <select
          id={`wareHouseId${isAdd}`}
          className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
          <option selected disabled>{t("productAdd60")}</option>
          <option value="KG" selected={product && product.measure === "KG"}>{t("productAdd06")}</option>
          <option value="PIECE" selected={product && product.measure === "PIECE"}>{t("productAdd060")}</option>
          <option value="KUB" selected={product && product.measure === "KUB"}>{t("productAdd006")}</option>
        </select>

        <div className="mt-10 flex justify-between">
          <button
            onClick={handleToggleOffcanvas}
            className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-gray-500 text-sm font-medium text-white"
          >
            {t("close")}
          </button>
          <button
            onClick={async () => {
              await setData();
              await onSave();
              await getProduct(0, 4);
              handleToggleOffcanvas();
            }}
            className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
          >
            {t("addProduct")}
          </button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default OffcanvasProduct;
