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
  werHouseId,
  setProduct,
  getProduct,
  isAdd,
  setUserId,
}) {
  const [users, setUsers] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    getUsers(setUsers, lang);
  }, []);

  function setData() {
    setProduct({
      idNumber: byId(`idNumber${isAdd}`),
      name: byId(`productName${isAdd}`),
      measureCount: byId(`measureCount${isAdd}`),
      measure: byId(`measure${isAdd}`),
      comment: byId(`comment${isAdd}`),
      price: byId(`price${isAdd}`),
      wareHouseId: `${werHouseId.wareHouseId}`,
    });
    setUserId(byId(`userId${isAdd}`));
  }

  return (
    <Offcanvas
      isOpen={isOffcanvasOpen}
      name={name}
      onClose={handleToggleOffcanvas}
    >
      <div onChange={setData}>
        <label
          htmlFor={`userId${isAdd}`}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {t("productSUser")}
        </label>
        <select
          id={`userId${isAdd}`}
          className="block py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        >
          <option selected disabled>
            {t("productSUser")}
          </option>
          {users &&
            users.map((item, i) => (
              <option
                value={item.userId}
                key={i}
                selected={product && product.userId === item.userId}
              >
                {item.name}
              </option>
            ))}
        </select>
        <label
          htmlFor={`productName${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("productAdd3")}
        </label>
        <input
          id={`productName${isAdd}`}
          placeholder={t("productAdd3")}
          defaultValue={product ? product.productName : ""}
          className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        />
        <label
          htmlFor={`idNumber${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("productAdd7")}
        </label>
        <input
          id={`idNumber${isAdd}`}
          placeholder={t("productAdd7")}
          defaultValue={product ? product.idNumber : ""}
          className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        />
        <label
          htmlFor={`price${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("productAdd76")}
        </label>
        <div className="flex items-center mb-5">
          <input
            type="number"
            id={`price${isAdd}`}
            placeholder={t("productAdd76")}
            defaultValue={product ? product.price : ""}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
                focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
          />
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            disabled
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            UZS
          </button>
        </div>
        <label
          htmlFor={`comment${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("productAdd34")}
        </label>
        <textarea
          id={`comment${isAdd}`}
          placeholder={t("productAdd34")}
          defaultValue={product ? product.comment : ""}
          className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        ></textarea>
        <label
          htmlFor={`measureCount${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("productAdd4")}
        </label>
        <input
          type="number"
          id={`measureCount${isAdd}`}
          placeholder={t("productAdd4")}
          defaultValue={product ? product.measureCount : ""}
          className="py-2 mb-5 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        />
        <label
          htmlFor={`measure${isAdd}`}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {t("productAdd6")}
        </label>
        <select
          id={`measure${isAdd}`}
          className="block py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        >
          <option selected disabled>
            {t("productAdd60")}
          </option>
          <option value="KG" selected={product && product.measure === "KG"}>
            {t("productAdd06")}
          </option>
          <option
            value="PIECE"
            selected={product && product.measure === "PIECE"}
          >
            {t("productAdd060")}
          </option>
          <option value="KUB" selected={product && product.measure === "KUB"}>
            {t("productAdd006")}
          </option>
        </select>
        {/* <label
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
        </select> */}

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
            {name}
          </button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default OffcanvasProduct;
