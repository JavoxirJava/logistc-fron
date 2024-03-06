import React, { useEffect, useRef, useState } from "react";
import Offcanvas from "../Offcanvas";
import { byId, byIdObj, config, getUsers, url } from "../api";
import { useTranslation } from "react-i18next";
import axios from "axios";
import LoadingBtn from "../loading/Loading";
import Select from "react-select";

function OffcanvasProduct({
  loading,
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
  const [kubSum, setKubSum] = useState(0);
  const [totalKgSum, setTotalKgSum] = useState(0);
  const [totalKubSum, setTotalKubSum] = useState(0);
  const [input, setInput] = useState(true);
  const [all, setAll] = useState(true);
  const [selectV, setSelectValue] = useState(null);
  const [imagesI, setImagesI] = useState(null);

  const selectValue = useRef(null);
  const { t } = useTranslation();

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

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const imagesIdIn = () => {
    const data = new FormData();
    data.append("file", document.getElementById(`productFile${isAdd}`).files[0]);
    axios.post(`${url}attachment/image`, data, config)
      .then(res => setImagesI(res.data.body))
      .catch(() => setImagesI(null))
  }

  function setData() {
    setProduct({
      name: byId(`productName${isAdd}`),
      comment: byId(`comment${isAdd}`),
      wareHouseId: werHouseId,
      x: byId(`idNumberX${isAdd}`),
      y: byId(`idNumberY${isAdd}`),
      z: byId(`idNumberZ${isAdd}`),
      kg: byId(`productWeight${isAdd}`),
      kub: kubSum,
      count: byId(`numberOfSeats${isAdd}`),
      totalWeight: totalKgSum,
      totalKub: totalKubSum,
      attachmentId: imagesI,
    });
    setUserId(selectV);
  }

  const cubeHandlerVolume = () => {
    let dataX = document.getElementById(`idNumberX${isAdd}`).value,
      dataY = document.getElementById(`idNumberY${isAdd}`).value,
      dataZ = document.getElementById(`idNumberZ${isAdd}`).value;
    setKubSum(dataX * dataY * dataZ);
  };

  const totalKgHandlar = () => {
    let dataNumber = document.getElementById(`numberOfSeats${isAdd}`).value,
      dataWeight = document.getElementById(`productWeight${isAdd}`).value;
    setTotalKgSum(dataNumber * dataWeight);
    setTotalKubSum(dataNumber * kubSum);
  };
  const inputDelete = () => {
    document.getElementById(`productName${isAdd}`).value = product
      ? product.productName
      : "";
    document.getElementById(`comment${isAdd}`).value = product
      ? product.comment
      : "";
    document.getElementById(`idNumberX${isAdd}`).value = product
      ? product.x
      : "";
    document.getElementById(`idNumberY${isAdd}`).value = product
      ? product.y
      : "";
    document.getElementById(`idNumberZ${isAdd}`).value = product
      ? product.z
      : "";
    document.getElementById(`productWeight${isAdd}`).value = product
      ? product.totalWeight
      : "";
    document.getElementById(`numberOfSeats${isAdd}`).value = product
      ? product.productCount
      : "";
    // document.getElementById(`userId${isAdd}`).value = null;
    document.getElementById(`productFile${isAdd}`).value = null;

    setKubSum(product ? product.kub : 0);
    setTotalKgSum(product ? product.totalWeight : 0);
    setTotalKubSum(product ? product.totalKub : 0);
  };

  const inputDelete2 = () => {
    document.getElementById(`productName${isAdd}`).value = "";
    document.getElementById(`comment${isAdd}`).value = "";
    document.getElementById(`idNumberX${isAdd}`).value = "";
    document.getElementById(`idNumberY${isAdd}`).value = "";
    document.getElementById(`idNumberZ${isAdd}`).value = "";
    document.getElementById(`productWeight${isAdd}`).value = "";
    document.getElementById(`numberOfSeats${isAdd}`).value = "";
    document.getElementById(`productFile${isAdd}`).value = null;
    // document.getElementById(`userId${isAdd}`).value = null;
    setSelectValue(null)
    setKubSum(0);
    setTotalKgSum(0);
    setTotalKubSum(0);
  };

  const validation = () => {
    if (
      document.getElementById(`productName${isAdd}`).value !== "" &&
      document.getElementById(`comment${isAdd}`).value !== "" &&
      document.getElementById(`idNumberX${isAdd}`).value !== "" &&
      document.getElementById(`idNumberY${isAdd}`).value !== "" &&
      document.getElementById(`idNumberZ${isAdd}`).value !== "" &&
      document.getElementById(`productWeight${isAdd}`).value !== "" &&
      document.getElementById(`numberOfSeats${isAdd}`).value !== ""
      // document.getElementById(`userId${isAdd}`).value !== null
    ) {
      setInput(false);
    } else {
      setInput(true);
    }
  };

  const options =
    users ?
      users.map((item) => {
        return { value: item.userId, label: item.name };
      })
      : []

  const handleChange = (event) => setSelectValue(event.value);

  return (
    <Offcanvas
      inputDelete={inputDelete}
      isOpen={isOffcanvasOpen}
      name={name}
      onClose={handleToggleOffcanvas}
    >
      <div onChange={setData}>
        <label
          htmlFor={`userId${isAdd}`}
          className="block text-gray-700 text-sm font-bold"
        >
          {t("productSUser")}
        </label>
        <Select
          onChange={handleChange}
          id={`userId${isAdd}`}
          options={options}
        />
        {/* <select>
          {users && users.map(user => (
            <option value="">{user.name}</option>
          ))}
        </select> */}

        <label
          htmlFor={`productFile${isAdd}`}
          className="block text-gray-700 text-sm font-bold mt-3"
        >
          {t("productPhoto")}
        </label>
        <input
          onChange={() => {
            validation()
            imagesIdIn()
          }}
          id={`productFile${isAdd}`}
          className="py-2 px-4 w-full bg-gray-200 rounded-lg border border-slate-300
        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
          type="file"
        />
        <label
          htmlFor={`productName${isAdd}`}
          className="block text-gray-700 text-sm font-bold mt-3"
        >
          {t("productName")}
        </label>
        <input
          ref={selectValue}
          onChange={validation}
          id={`productName${isAdd}`}
          placeholder={t("productName")}
          className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        />
        <div className="w-full flex justify-between items-center my-2">
          <div className="w-1/3 px-1">
            <label
              htmlFor={`idNumberX${isAdd}`}
              className="block text-gray-700 text-sm font-bold mt-3"
            >
              {t("productAdd7x")} ({t("sm")})
            </label>
            <input
              type="number"
              onChange={() => {
                cubeHandlerVolume();
                validation();
              }}
              id={`idNumberX${isAdd}`}
              placeholder={t("productAdd7x")}
              className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
            />
          </div>
          <div className="w-1/3 px-1">
            <label
              htmlFor={`idNumberY${isAdd}`}
              className="block text-gray-700 text-sm font-bold mt-3"
            >
              {t("productAdd7y")} ({t("sm")})
            </label>
            <input
              type="number"
              onChange={() => {
                cubeHandlerVolume();
                validation();
              }}
              id={`idNumberY${isAdd}`}
              placeholder={t("productAdd7y")}
              className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
            />
          </div>
          <div className="w-1/3 px-1">
            <label
              htmlFor={`idNumberZ${isAdd}`}
              className="block text-gray-700 text-sm font-bold mt-3"
            >
              {t("productAdd7z")} ({t("sm")})
            </label>
            <input
              type="number"
              onChange={() => {
                cubeHandlerVolume();
                validation();
              }}
              id={`idNumberZ${isAdd}`}
              placeholder={t("productAdd7z")}
              className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center my-2">
          <div className="w-1/2 px-1">
            <label
              htmlFor={`productWeight${isAdd}`}
              className="block text-gray-700 text-sm font-bold mt-3"
            >
              {t("productAddKg")}
            </label>
            <input
              onChange={() => {
                totalKgHandlar();
                validation();
              }}
              type="number"
              id={`productWeight${isAdd}`}
              placeholder={t("productAddKg")}
              className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
            />
          </div>
          <div className="w-1/2 px-1">
            <label
              htmlFor={`productKub${isAdd}`}
              className="block text-gray-700 text-sm font-bold mt-3"
            >
              {t("productAddKub")}
            </label>
            <input
              id={`productKub${isAdd}`}
              placeholder={0 + " " + t("productAddKub")}
              disabled
              value={`${kubSum} (sm)`}
              // defaultValue={product ? product.idNumber + " " + t('productAddKub') : 0 + " " + t('(sm)')}
              className="py-2 px-4 w-full bg-gray-200 rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
            />
          </div>
        </div>
        <label
          htmlFor={`numberOfSeats${isAdd}`}
          className="block text-gray-700 text-sm font-bold mt-3"
        >
          {t("numberOfSeats")}
        </label>
        <input
          type="number"
          onChange={() => {
            totalKgHandlar();
            validation();
          }}
          id={`numberOfSeats${isAdd}`}
          placeholder={t("numberOfSeats")}
          className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
                focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        />
        <label
          htmlFor={`productKgDisabled${isAdd}`}
          className="block text-gray-700 text-sm font-bold mt-3"
        >
          {t("totalWeight")}
        </label>
        <input
          id={`productKgDisabled${isAdd}`}
          placeholder={t("totalWeight")}
          disabled
          value={`${totalKgSum} Kg`}
          // defaultValue={product ? product.idNumber + " " + t('totalWeight') : 0 + " " + "Kg"}
          className="py-2 px-4 w-full bg-gray-200 rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        />
        <label
          htmlFor={`productKubDisabled${isAdd}`}
          className="block text-gray-700 text-sm font-bold mt-3"
        >
          {t("totalKub")}
        </label>
        <input
          id={`productKubDisabled${isAdd}`}
          placeholder={t("productAdd006")}
          disabled
          value={`${totalKubSum} ${t("productAdd006")}`}
          // defaultValue={product ? product.idNumber + " " + t('productAdd006') : 0 + " " + t('productAdd006')}
          className="py-2 px-4 w-full bg-gray-200 rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        />
        <label
          htmlFor={`comment${isAdd}`}
          className="block text-gray-700 text-sm font-bold mt-3"
        >
          {t("productAdd34")}
        </label>
        <textarea
          onChange={validation}
          id={`comment${isAdd}`}
          placeholder={t("productAdd34")}
          className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
        ></textarea>

        <div className="mt-10 flex justify-between">
          <button
            onClick={() => {
              handleToggleOffcanvas();
              inputDelete();
              topFunction();
              setInput(true)
            }}
            className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-gray-500 text-sm font-medium text-white"
          >
            {t("close")}
          </button>
          <button
            disabled={all}
            onClick={() => {
              // onSave();
              imagesI ? onSave() : setTimeout(onSave, 5000)
              setData();
              getProduct(0, 4);
              inputDelete2();
              topFunction();
            }}
            className={`${all ? "bg-gray-700 cursor-not-allowed opacity-70" : "bg-blue-700"
              } inline-flex justify-center w-[45%] rounded-md shadow-sm py-2  text-sm font-medium text-white`}
          >
            {loading ? <LoadingBtn /> : name}
          </button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default OffcanvasProduct;
