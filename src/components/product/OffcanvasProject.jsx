import React, { useEffect, useRef, useState } from "react";
import Offcanvas from "../Offcanvas";
import { byId, config, getUsers, url } from "../api";
import { useTranslation } from "react-i18next";
import axios from "axios";
import LoadingBtn from "../loading/Loading";

function OffcanvasProject({
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
  projectId,
  loading,
}) {
  const [users, setUsers] = useState(null);
  const [input, setInput] = useState(true);
  const [all, setAll] = useState(true);
  const { t } = useTranslation();
  const [imagesI, setImagesI] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getUsers(setUsers, lang);
  }, []);

  useEffect(() => {
    if (loading || input == false) {
      setAll(false);
    } else {
      setAll(true);
    }
  }, [input]);

  const imagesIdIn = () => {
    const data = new FormData();
    data.append("file", document.getElementById(`file${isAdd}`).files[0]);
    axios.post(`${url}attachment/file`, data, config)
      .then(res => setImagesI(res.data.body))
      .catch(() => setImagesI(0))
  }

  function setData() {
    setProduct({
      name: byId(`name${isAdd}`),
      transport: byId(`transport${isAdd}`),
      status: byId(`productStatus${isAdd}`),
      fileId: imagesI ? imagesI : "0",
      projectId: byId(`project${isAdd}`),
      comment: byId(`comment${isAdd}`),
    })
  }

  const validation = () => {
    if (
      document.getElementById(`name${isAdd}`).value !== "" &&
      document.getElementById(`transport${isAdd}`).value !== "0" &&
      document.getElementById(`productStatus${isAdd}`).value !== "0" &&
      document.getElementById(`project${isAdd}`).value !== "" &&
      document.getElementById(`comment${isAdd}`).value !== "" &&
      fileInputRef.current.value != null
    ) {
      setInput(false);
    } else {
      setInput(true);
    }
  };

  const inputDelete = () => {
    document.getElementById(`name${isAdd}`).value = product ? product.name : "";
    document.getElementById(`transport${isAdd}`).value = product
      ? product.transport
      : 0;
    document.getElementById(`productStatus${isAdd}`).value = product
      ? product.status
      : 0;
    document.getElementById(`project${isAdd}`).value = product
      ? product.projectId
      : "";
    document.getElementById(`comment${isAdd}`).value = product
      ? product.comment
      : "";
    // document.getElementById(`file${isAdd}`).file = product ? product.fileId : null
    fileInputRef.current.value = null;
  };

  const inputDelete2 = () => {
    document.getElementById(`name${isAdd}`).value = "";
    document.getElementById(`transport${isAdd}`).value = 0;
    document.getElementById(`productStatus${isAdd}`).value = 0;
    document.getElementById(`project${isAdd}`).value = "";
    document.getElementById(`comment${isAdd}`).value = "";
    fileInputRef.current.value = null;
  };

  return (
    <Offcanvas
      className="pt-20"
      isOpen={isOffcanvasOpen}
      name={name}
      onClose={handleToggleOffcanvas}
      inputDelete={inputDelete}
    >
      <div onChange={setData}>

        {/* Name input  */}
        <label
          htmlFor={`name${isAdd}`}
          className="block text-gray-700 text-sm font-bold "
        >
          {t("productAdd3")}
        </label>
        <input
          onChange={validation}
          id={`name${isAdd}`}
          placeholder={t("productAdd3")}
          defaultValue={product ? product.name : ""}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label
          htmlFor={`file${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2 "
        >
          {t("file")}
        </label>
        <input
        onChange={imagesIdIn}
          ref={fileInputRef}
          id={`file${isAdd}`}
          type="file"
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 bg-slate-50 leading-tight focus:outline-none focus:shadow-outline"
        />
        {/* Transport input  */}
        <label
          htmlFor={`transport${isAdd}`}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {t("productAdd2")}
        </label>
        <select
          onChange={validation}
          id={`transport${isAdd}`}
          className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
        >
          <option selected disabled value="0">
            {t("productAdd5")}
          </option>
          <option value="1">{t("auto")}</option>
          <option value="2">{t("avia")}</option>
          <option value="3">{t("jd")}</option>
        </select>
        <label
          htmlFor={`productStatus${isAdd}`}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {t("projectStatus")}
        </label>
        <select
          onChange={validation}
          id={`productStatus${isAdd}`}
          className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
        >
          <option selected disabled value="0">
            {t("projectStatus")}
          </option>
          <option value="1">{t("1")}</option>
          <option value="2">{t("2")}</option>
          <option value="3">{t("3")}</option>
          <option value="4">{t("4")}</option>
          <option value="5">{t("5")}</option>
          <option value="6">{t("6")}</option>
          <option value="7">{t("7")}</option>
          <option value="8">{t("8")}</option>
          <option value="9">{t("9")}</option>
        </select>
        <label
          htmlFor={`project${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("projectId")}
        </label>
        <input
          onChange={validation}
          id={`project${isAdd}`}
          placeholder={t("projectId")}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label
          htmlFor={`comment${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("comment")}
        </label>
        <textarea
          onChange={validation}
          id={`comment${isAdd}`}
          placeholder={t("comment")}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>

        <div className=" flex justify-between">
          <button
            onClick={() => {
              handleToggleOffcanvas();
              inputDelete();
              setInput(true);
            }}
            className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-gray-500 text-sm font-medium text-white"
          >
            {t("close")}
          </button>
          <button
            disabled={all}
            onClick={() => {
              imagesI ? onSave() : setTimeout(onSave, 5000)
              setData();
              getProduct(0, 4);
              inputDelete2();
            }}
            className={`${
              all ? "bg-gray-600 cursor-not-allowed opacity-70" : "bg-blue-700"
            } inline-flex justify-center w-[45%] rounded-md shadow-sm py-2  text-sm font-medium text-white`}
          >
            {loading ? <LoadingBtn /> : name}
          </button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default OffcanvasProject;
