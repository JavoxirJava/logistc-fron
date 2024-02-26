import React, {useEffect, useState} from "react";
import Offcanvas from "../Offcanvas";
import {byId, byIdObj, config, getUsers, url} from "../api";
import {useTranslation} from "react-i18next";
import axios from "axios";

function OffcanvasProduct({
                              isOffcanvasOpen, handleToggleOffcanvas, name, lang, onSave, product,
                              werHouseId, setProduct, getProduct, isAdd, setUserId
                          }) {
    const [users, setUsers] = useState(null);
    const [kubSum, setKubSum] = useState(0);
    const [totalKgSum, setTotalKgSum] = useState(0);
    const [totalKubSum, setTotalKubSum] = useState(0);
    const {t} = useTranslation();

    useEffect(() => {
        getUsers(setUsers, lang);
    }, []);

    async function setData() {
        const data = new FormData();
        data.append('file', byIdObj(`productFile${isAdd}`).files[0]);
        await axios.post(`${url}attachment/image`, data, config)
            .then(res => {
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
                    attachmentId: (res.data.body ? res.data.body : 0)
                })
            }).catch(err => console.log(err));
        setUserId(byId(`userId${isAdd}`));
    }

    const cubeHandlerVolume = () => {
        let dataX = document.getElementById(`idNumberX${isAdd}`).value,
            dataY = document.getElementById(`idNumberY${isAdd}`).value,
            dataZ = document.getElementById(`idNumberZ${isAdd}`).value
        setKubSum(dataX * dataY * dataZ)
    }

    const totalKgHandlar = () => {
        let dataNumber = document.getElementById(`numberOfSeats${isAdd}`).value,
            dataWeight = document.getElementById(`productWeight${isAdd}`).value
        setTotalKgSum(dataNumber * dataWeight)
        setTotalKubSum(dataNumber * kubSum)
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
                    className="block text-gray-700 text-sm font-bold"
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
                                selected={product && product.userId === item.userId}>
                                {item.name}
                            </option>
                        ))}
                </select>
                <label
                    htmlFor={`productName${isAdd}`}
                    className="block text-gray-700 text-sm font-bold mt-3"
                >
                    {t("productName")}
                </label>
                <input
                    id={`productName${isAdd}`}
                    placeholder={t("productName")}
                    defaultValue={product ? product.productName : ""}
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
                            {t("productAdd7")}
                        </label>
                        <input
                            type="number"
                            onChange={cubeHandlerVolume}
                            id={`idNumberX${isAdd}`}
                            placeholder={t("productAdd7")}
                            defaultValue={product ? product.idNumber : ""}
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
                            {t("productAdd7y")}
                        </label>
                        <input
                            type="number"
                            onChange={cubeHandlerVolume}
                            id={`idNumberY${isAdd}`}
                            placeholder={t("productAdd7y")}
                            defaultValue={product ? product.idNumber : ""}
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
                            {t("productAdd7z")}
                        </label>
                        <input
                            type="number"
                            onChange={cubeHandlerVolume}
                            id={`idNumberZ${isAdd}`}
                            placeholder={t("productAdd7z")}
                            defaultValue={product ? product.idNumber : ""}
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
                            onChange={totalKgHandlar}
                            id={`productWeight${isAdd}`}
                            placeholder={t("productAddKg")}
                            defaultValue={product ? product.idNumber + t('productAddKg') : ""}
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
                    {t("productAdd76")}
                </label>
                <input
                    type="number"
                    onChange={totalKgHandlar}
                    id={`numberOfSeats${isAdd}`}
                    placeholder={t("productAdd76")}
                    defaultValue={product ? product.price : ""}
                    className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
                focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                />
                <label
                    htmlFor={`productKgDisabled${isAdd}`}
                    className="block text-gray-700 text-sm font-bold mt-3"
                >
                    {t("productAdd06")}
                </label>
                <input
                    id={`productKgDisabled${isAdd}`}
                    placeholder={t("productAdd06")}
                    disabled
                    value={`${totalKgSum} Kg`}
                    // defaultValue={product ? product.idNumber + " " + t('productAdd06') : 0 + " " + "Kg"}
                    className="py-2 px-4 w-full bg-gray-200 rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                />
                <label
                    htmlFor={`productKubDisabled${isAdd}`}
                    className="block text-gray-700 text-sm font-bold mt-3"
                >
                    {t("productAdd06Kub")}
                </label>
                <input
                    id={`productKubDisabled${isAdd}`}
                    placeholder={t("productAdd006")}
                    disabled
                    value={`${totalKubSum} ${t('productAdd006')}`}
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
                    id={`comment${isAdd}`}
                    placeholder={t("productAdd34")}
                    defaultValue={product ? product.comment : ""}
                    className="py-2 px-4 w-full bg-white rounded-lg border border-slate-300
          focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
          focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                ></textarea>
                <label
                    htmlFor={`productFile${isAdd}`}
                    className="block text-gray-700 text-sm font-bold mt-3"
                >
                    {t("productAdd34foto")}
                </label>
                <input
                    id={`productFile${isAdd}`}
                    className="py-2 px-4 w-full bg-gray-200 rounded-lg border border-slate-300
        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                    type="file"/>
              
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
                    >{name}</button>
                </div>
            </div>
        </Offcanvas>
    );
}

export default OffcanvasProduct;
