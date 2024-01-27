import React, { useEffect, useState } from "react";
import Offcanvas from "../Offcanvas";
import { byId, getUsers } from "../api";
import { useTranslation } from "react-i18next";
import { Map, Placemark, YMaps } from "react-yandex-maps";

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
}) {
  const [users, setUsers] = useState(null);
  const [coordinates, setCoordinates] = useState([55.75, 37.57]);

  const { t } = useTranslation();

  useEffect(() => {
    getUsers(setUsers, lang);
  }, []);

  const handleClick = (e) => {
    const coords = e.get("coords");
    setCoordinates(coords);
    const apiKey = "1248def2-c2d9-4353-90a7-01b7e5703e21";
    const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${coords[1]},${coords[0]}`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        const address =
          data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.text;
        sessionStorage.setItem("address", address);
      })
      .catch((error) => console.error("Xatolik yuz berdi:", error));
  };

  function setData() {
    setProduct({
      name: byId(`name${isAdd}`),
      transport: byId(`transport${isAdd}`),
      status: byId(`productStatus${isAdd}`),
      latitude: coordinates[0],
      longitude: coordinates[1],
      address: sessionStorage.getItem("address")
    });
  }

  return (
    <Offcanvas
      isOpen={isOffcanvasOpen}
      name={name}
      onClose={handleToggleOffcanvas}
    >
      <div onChange={setData}>
        <label
          htmlFor={`name${isAdd}`}
          className="block
           text-gray-700 text-sm font-bold my-2"
        >
          {t("productAdd3")}
        </label>
        <input
          id={`name${isAdd}`}
          placeholder={t("productAdd3")}
          defaultValue={product ? product.name : ""}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
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
          <option value="CAR" selected={product && product.transport === "CAR"}>
            {t("productAdd05")}
          </option>
          <option
            value="AIRPLANE"
            selected={product && product.transport === "AIRPLANE"}
          >
            {t("productAdd050")}
          </option>
          <option
            value="TRAIN"
            selected={product && product.transport === "TRAIN"}
          >
            {t("productAdd005")}
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
            value="PENDING"
            selected={product && product.status === "PENDING"}
          >
            {t("status1")}
          </option>
          <option
            value="GOING"
            selected={product && product.status === "GOING"}
          >
            {t("status2")}
          </option>
          <option
            value="CANCEL"
            selected={product && product.status === "CANCEL"}
          >
            {t("status3")}
          </option>
          <option
            value="ARRIVED"
            selected={product && product.status === "ARRIVED"}
          >
            {t("status4")}
          </option>
          <option
            value="COMPLETED"
            selected={product && product.status === "COMPLETED"}
          >
            {t("status5")}
          </option>
          <option
            value="MOVED"
            selected={product && product.status === "MOVED"}
          >
            {t("status6")}
          </option>
        </select>
        <div>
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
        </div>
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
            {t("add")}
          </button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default OffcanvasProject;
