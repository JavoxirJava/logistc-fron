import React, {useEffect, useState} from "react";
import Offcanvas from "../Offcanvas";
import {byId, config, getUsers, url} from "../api";
import {useTranslation} from "react-i18next";
import axios from "axios";

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
                          }) {
    const [users, setUsers] = useState(null);
    const {t} = useTranslation();
    useEffect(() => {
        getUsers(setUsers, lang);
    }, []);
    function setData() {
        const img = new FormData();
        img.append('file', document.getElementById(`file${isAdd}`).files[0]);
        if (img.get('file') !== 'undefined') axios.post(url + "attachment/image", img, config)
            .then(res => {
        console.log(res.data.body);
                setProduct({
                    name: byId(`name${isAdd}`),
                    transport: byId(`transport${isAdd}`),
                    status: byId(`productStatus${isAdd}`),
                    fileId: res.data.body,
                    projectId: byId(`project${isAdd}`),
                    comment: byId(`comment${isAdd}`)
                });
            }).catch(() => console.log("img ketmadi"))
        else setProduct({
            name: byId(`name${isAdd}`),
            transport: byId(`transport${isAdd}`),
            status: byId(`productStatus${isAdd}`),
            fileId: null,
            projectId: byId(`project${isAdd}`),
            comment: byId(`comment${isAdd}`)
        });
    }

    console.log(product);

    const inputDelete = () => {
        document.getElementById(`name${isAdd}`).value = product ? product.name :''
        document.getElementById(`transport${isAdd}`).value = product ? product.transport :0
        document.getElementById(`productStatus${isAdd}`).value = product ? product.status :0
        document.getElementById(`project${isAdd}`).value = product ? product.projectId :''
        document.getElementById(`comment${isAdd}`).value = product ? product.comment :''
    }

    const inputDelete2 = () => {
        document.getElementById(`name${isAdd}`).value = ''
        document.getElementById(`transport${isAdd}`).value = 0
        document.getElementById(`productStatus${isAdd}`).value = 0
        document.getElementById(`project${isAdd}`).value = ''
        document.getElementById(`comment${isAdd}`).value = ''
    }

    return (
        <Offcanvas
            className="pt-20"
            isOpen={isOffcanvasOpen}
            name={name}
            onClose={handleToggleOffcanvas}
        >
            <div onChange={setData}>
                {/* Name input  */}
                <label
                    htmlFor={`name${isAdd}`}
                    className="block text-gray-700 text-sm font-bold my-2"
                >
                    {t("productAdd3")}  
                </label>
                <input
                    id={`name${isAdd}`}
                    placeholder={t("productAdd3")}
                    className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {/* Transport input  */}
                <label
                    htmlFor={`transport${isAdd}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    {t("productAdd2")}
                </label>
                <select
                    id={`transport${isAdd}`}
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
                >
                    <option selected disabled value='0'>
                        {t("productAdd5")}
                    </option>
                    <option
                        value="1"
                    >
                        {t("auto")}
                    </option>
                    <option
                        value="2"
                    >
                        {t("avia")}
                    </option>
                    <option
                        value="3"
                    >
                        {t("JD")}
                    </option>
                </select>
                <label
                    htmlFor={`productStatus${isAdd}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    {t("projectStatus")}
                </label>
                <select
                    id={`productStatus${isAdd}`}
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
                >
                    <option selected disabled value='0'>
                        {t("projectStatus")}
                    </option>
                    <option
                        value="1"
                    >
                        {t("1")}
                    </option>
                    <option
                        value="2"
                    >
                        {t("2")}
                    </option>
                    <option
                        value="3"
                    >
                        {t("3")}
                    </option>
                    <option
                        value="4"
                    >
                        {t("4")}
                    </option>
                    <option
                        value="5"
                    >
                        {t("5")}
                    </option>
                    <option
                        value="6"
                    >
                        {t("6")}
                    </option>
                    <option
                        value="7"
                    >
                        {t("7")}
                    </option>
                    <option
                        value="8"
                    >
                        {t("8")}
                    </option>
                </select>
                <label
                    htmlFor={`project${isAdd}`}
                    className="block text-gray-700 text-sm font-bold my-2"
                >
                    {t("projectId")}
                </label>
                <input
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
                    id={`comment${isAdd}`}
                    placeholder={t("comment")}
                    className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
                <label
                    htmlFor={`file${isAdd}`}
                    className="block text-gray-700 text-sm font-bold my-2 "
                >
                    {t("file")}
                </label>
                <input
                    id={`file${isAdd}`}
                    type="file"
                    className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 bg-slate-50 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="mt-10 flex justify-between">
                    <button
                        onClick={() =>{ 
                            handleToggleOffcanvas()
                            inputDelete()
                        }}
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
                            inputDelete2()
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

export default OffcanvasProject;
