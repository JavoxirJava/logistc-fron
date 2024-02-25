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
    // const [coordinates, setCoordinates] = useState([55.75, 37.57]);
    // const [adres, setAdress] = useState([55.75, 37.57]);

    const {t} = useTranslation();

    useEffect(() => {
        getUsers(setUsers, lang);
    }, []);

    // const handleClick = (e) => {
    //   const coords = e.get("coords");
    //   setCoordinates(coords);
    //   const apiKey = "1248def2-c2d9-4353-90a7-01b7e5703e21";
    //   const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${coords[1]},${coords[0]}`;

    //   fetch(geocodeUrl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const address =
    //         data.response.GeoObjectCollection.featureMember[0].GeoObject
    //           .metaDataProperty.GeocoderMetaData.text;
    //           setAdress(address)
    //       sessionStorage.setItem("address", address);
    //     })
    //     .catch((error) => console.error("Xatolik yuz berdi:", error));
    // };

    function setData() {
        const img = new FormData();
        img.append('file', document.getElementById(`file${isAdd}`).files[0]);
        if (img.get('file') !== 'undefined') axios.post(url + "attachment/image", img, config)
            .then(res => {
                setProduct({
                    name: byId(`name${isAdd}`),
                    transport: byId(`transport${isAdd}`),
                    status: byId(`productStatus${isAdd}`),
                    fileId: res.data.body,
                    projectId: byId(`project${isAdd}`),
                    comment: byId(`comment${isAdd}`),
                    // latitude: coordinates[0],
                    // longitude: coordinates[1],
                    // address: adres
                });
            }).catch(() => console.log("img ketmadi"))
        else setProduct({
            name: byId(`name${isAdd}`),
            transport: byId(`transport${isAdd}`),
            status: byId(`productStatus${isAdd}`),
            fileId: 0,
            projectId: byId(`project${isAdd}`),
            comment: byId(`comment${isAdd}`)
        });
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
                    defaultValue={projectId ? projectId.name : ""}
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
                    <option selected disabled>
                        {t("productAdd5")}
                    </option>
                    <option
                        value="1"
                        //  selected={product && product.transport === "CAR"}
                    >
                        {/* {t("productAdd05")} */}АВТО
                    </option>
                    <option
                        value="2"
                        // selected={product && product.transport === "AIRPLANE"}
                    >
                        {/* {t("productAdd050")} */}АВИА
                    </option>
                    <option
                        value="3"
                        // selected={product && product.transport === "TRAIN"}
                    >
                        {/* {t("productAdd005")} */}ЖД
                    </option>
                </select>
                <label
                    htmlFor={`productStatus${isAdd}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    {t("productAdd8")}
                </label>
                <select
                    id={`productStatus${isAdd}`}
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
                >
                    <option selected disabled>
                        {t("status")}
                    </option>
                    <option
                        value="1"
                        // selected={product && product.status === "PENDING"}
                    >
                        {/* {t("status1")} */}Падгатовка
                    </option>
                    <option
                        value="2"
                        // selected={product && product.status === "GOING"}
                    >
                        {/* {t("status2")} */}Загрузка
                    </option>
                    <option
                        value="3"
                        // selected={product && product.status === "CANCEL"}
                    >
                        {/* {t("status3")} */}Отправка
                    </option>
                    <option
                        value="4"
                        // selected={product && product.status === "ARRIVED"}
                    >
                        {/* {t("status4")} */}В пути в Китай
                    </option>
                    <option
                        value="5"
                        // selected={product && product.status === "COMPLETED"}
                    >
                        {/* {t("status5")} */}В гроница в Китай
                    </option>
                    <option
                        value="6"
                        // selected={product && product.status === "MOVED"}
                    >
                        {/* {t("status6")} */}В пути в транзитном зоне
                    </option>
                    <option
                        value="7"
                        // selected={product && product.status === "MOVED"}
                    >
                        {/* {t("status6")} */}В граница узб
                    </option>
                    <option
                        value="8"
                        // selected={product && product.status === "MOVED"}
                    >
                        {/* {t("status6")} */}В процесс разтаможка
                    </option>
                </select>
                <label
                    htmlFor={`project${isAdd}`}
                    className="block text-gray-700 text-sm font-bold my-2"
                >
                    {/* {t("productAdd3")} */}Project ID
                </label>
                <input
                    id={`project${isAdd}`}
                    placeholder={`Project ID`}
                    defaultValue={projectId ? projectId.projectId : ""}
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
                    defaultValue={projectId ? projectId.comment : ""}
                    placeholder="Comment"
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
                {/* <div>
          <YMaps>
            <Map
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
              width="100%"
              height="300px"
              onClick={handleClick}
            >
              <Placemark geometry={coordinates} />
            </Map>
          </YMaps>
        </div> */}
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

export default OffcanvasProject;
