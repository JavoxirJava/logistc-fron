import React, { useEffect, useState } from "react";
import Offcanvas from "../Offcanvas";
import { byId, getUsers } from "../api";
import { useTranslation } from "react-i18next";
import LoadingBtn from "../loading/Loading";

function OffcanvasProject({
  loading,
  isOffcanvasOpen,
  handleToggleOffcanvas,
  name,
  lang,
  onSave,
  product,
  newWereHouseName,
  setProduct,
  getProduct,
  isAdd,
  setUserId,
}) {
  const [users, setUsers] = useState(null);
  const [input, setInput] = useState(true);
  const [all, setAll] = useState(true);
  const [coordinates, setCoordinates] = useState([55.75, 37.57]);

  const { t } = useTranslation();

  useEffect(() => {
    getUsers(setUsers, lang);
  }, []);

  useEffect(() => {
    if (loading || input == false) {
        setAll(false);
    }
    else {
        setAll(true)
    }
}, [input]);

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
    });
  }

  const inputDelete = () => {
    document.getElementById(`name${isAdd}`).value = newWereHouseName ? newWereHouseName.name :''
}

const inputDelete2 = () => {
    document.getElementById(`name${isAdd}`).value =''
}

const validation = () => {
  if (
    document.getElementById(`name${isAdd}`).value !== ''
    ) {
      setInput(false)
  }
  else {
      setInput(true)
  }
}


  return (
    <Offcanvas
      inputDelete={inputDelete}
      isOpen={isOffcanvasOpen}
      name={name}
      onClose={() => {
        handleToggleOffcanvas()
        // document.getElementById("name").value=''
      }}
      isAdd={isAdd}
      newWereHouseName={newWereHouseName}
    >
      <div className="" onChange={setData}>
        <label
          htmlFor={`name${isAdd}`}
          className="block text-gray-700 text-sm font-bold my-2"
        >
          {t("warehouseName")}
        </label>
        <input
          onChange={validation}
          id={`name${isAdd}`}
          placeholder={t("warehouseName")}
          defaultValue={newWereHouseName ? newWereHouseName.name : ""}
          className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <div className="mt-10 flex justify-between">
          <button
            onClick={() => {
              handleToggleOffcanvas()
              inputDelete()
              setInput(true)
            }}
            className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-gray-500 text-sm font-medium text-white"
          >
            {t("close")}
          </button>
          <button
          disabled={all}
            onClick={async () => {
              await setData();
              await onSave();
              await getProduct(0, 4);
              inputDelete2()
            }}
            className={`${all ? "bg-gray-700 opacity-70 cursor-not-allowed" : "bg-blue-700"} inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 text-sm font-medium text-white`}
          >
            {loading ? <LoadingBtn/> : name}
          </button>
        </div>
      </div>
    </Offcanvas>
  );
}

export default OffcanvasProject;
