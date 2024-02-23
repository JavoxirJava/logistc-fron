import React, { useEffect, useState } from "react";
import "./werHouse.css";
import ProductCard from "./ProductCard";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import OffcanvasProduct from "./OffcanvasProduct";
import { config, setConfig, url } from "../api";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import NavBar from "../navbar/NavBar";
import Dropdown from "../Dropdown";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import OffcanvasProject from "./OffcanvasProject";
import { load } from "../../assets";
import Empty from "../Empty";

function Product({ lang, werHouseId, setWerHouseId }) {
  const [coordinates, setCoordinates] = useState([55.75, 37.57]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [editOf, setEditOf] = useState(false);
  const [addWerhouseModal, setaddWerhouseModal] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [product, setProductObj] = useState(null);
  const [productTo, setProductTo] = useState("");
  const [product2, setProductObj2] = useState(null);
  const [products, setProduct] = useState(null);
  const [projects, setProject] = useState(null);
  const [projectos, setProjectos] = useState(null);
  const [totalPage, setTotalPage] = useState(2);
  const [totalPage2, setTotalPage2] = useState(2);
  const [pagination, setPagination] = useState(0);
  const [pagination2, setPagination2] = useState(0);
  const [searchBy, setSearchBy] = useState(null);
  const [searchBy2, setSearch2By] = useState(null);
  const [userId, setUserId] = useState(null);
  const [werhouseId, setWerhouseId] = useState(0);
  const [productIdList, setProductIdList] = useState([]);
  const [className, setClassName] = useState(false);
  const [loadingP, setLoadingP] = useState(false);
  const [drops, setDrops] = useState(false);

  const inputDrop = () => setDrops(false);
  const selectDrop = () => setDrops(true);
  const { t } = useTranslation();

  useEffect(() => {
    setConfig();
    getWerhouse(pagination2, 4);
    getProduct(pagination, 4);
    getProject(pagination, 4);
  }, []);

  useEffect(() => {
    getProduct(pagination, 4);
  }, [projects]);

  useEffect(() => {
    getWerhouse(pagination2, 4);

    getProduct(pagination, 4);
  }, [lang]);

  useEffect(() => {
    if ((pagination - 1) * 4 < 0) setPagination(0);
    else getProduct(Math.floor(pagination - 1), 4);
  }, [pagination]);

  useEffect(() => {
    if ((pagination2 - 1) * 4 < 0) setPagination2(0);
    else getWerhouse(Math.floor(pagination2 - 1), 4);
  }, [pagination2]);

  useEffect(() => {
    searchByName();
  }, [searchBy]);

  useEffect(() => {
    searchByName2();
  }, [searchBy2]);

  const cLasslar = () => {
    document.getElementById("projectos").value !== "select"
      ? setClassName(true)
      : setClassName(false);
  };

  const openEdit = () => setEditOf(!editOf);
  const loadingPP = () => setLoadingP(!loadingP);
  const handleToggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);
  const openProjectCan = () => setaddWerhouseModal(!addWerhouseModal);
  const openEditProjectCan = () => setEditProjectModal(!editProjectModal);

  // const handleClick = (e) => {
  //     const coords = e.get("coords");
  //     setCoordinates(coords);
  //     const apiKey = "1248def2-c2d9-4353-90a7-01b7e5703e21";
  //     const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${coords[1]},${coords[0]}`;

  //     fetch(geocodeUrl)
  //         .then((response) => response.json())
  //         .then((data) => {
  //             const address =
  //                 data.response.GeoObjectCollection.featureMember[0].GeoObject
  //                     .metaDataProperty.GeocoderMetaData.text;
  //             sessionStorage.setItem("address", address);
  //         }).catch((error) => console.error("Xatolik yuz berdi:", error));
  // };

  function setObj() {
    return {
      id: product ? product.productId : 0,
      latitude: coordinates[0],
      longitude: coordinates[1],
      address: sessionStorage.getItem("address"),
    };
  }

  const getWerhouse = (page, size) => {
    axios
      .get(`${url}wareHouse?page=${page}&size=${size}&lang=${lang}`, config)
      .then((res) => {
        setTotalPage2(
          res.data.body.totalPage ? res.data.body.totalPage - 1 : 2
        );
        setProject(res.data.body.object);
      })
      .catch((err) => {
        console.log();
      });
  };

  const getProject = () => {
    axios
      .get(`${url}project?page=0&size=100&lang=${lang}`, config)
      .then((res) => {
        setProjectos(res.data.body.object);
      })
      .catch((err) => {
        console.log();
      });
  };

  function getProduct(page, size) {
    // loadingPP()
    axios
      .get(
        `${url}wareHouse/product?wareHouseId=${
          werHouseId
            ? werHouseId.wareHouseId
            : projects
            ? projects[0].wareHouseId
            : 0
        }&page=${page}&size=${size}&lang=${lang}`,
        config
      )
      .then((res) => {
        // if (res.data.message === 'success') {
        // loadingPP()
        setTotalPage(res.data.totalPage ? res.data.totalPage - 1 : 2);
        setProduct(res.data.object);
        // console.log(res);
        // }
      })
      .catch((err) => {
        // loadingPP()
        console.log(err);
      });
  }

  function addProduct() {
    let data = { ...product2 };
    axios
      .post(`${url}product?userId=${userId}`, data, config)
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getProduct(pagination, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
      });
  }

  function addToProduct() {
    let datacha = [productTo];
    axios
      .post(
        `${url}wareHouse/product?wareHouseId=${
          werHouseId.wareHouseId
        }&projectId=${document.getElementById("projectos").value}`,
        datacha,
        config
      )
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getProduct(pagination, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
      });
  }

  function addWerhouse() {
    let data = { ...product2 };
    axios
      .post(`${url}wareHouse`, data, config)
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getWerhouse(pagination2, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
      });
  }

  function editProduct() {
    let data = { ...product2 };
    axios
      .put(`${url}product?id=${product.id}`, data, config)
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getProduct(pagination, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
      });
  }
  function editProject() {
    let data = { ...product2 };
    axios
      .put(`${url}wareHouse/${product}`, data, config)
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getWerhouse(pagination2, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
      });
  }

  function deleteWerhouse() {
    axios
      .delete(`${url}wareHouse?id=${product}`, config)
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getWerhouse(pagination2, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
      });
  }

  function deleteProduct() {
    axios
      .delete(
        `${url}wareHouse/product?wareHouseId=${werHouseId.wareHouseId}&productId= ${product.id}`,
        config
      )
      .then(() => {
        toast.success(t("success"));
        getProduct(pagination, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
        // console.log(err);
      });
  }

  function searchProduct(e) {
    // loadingPP()
    let text = e.target.value;
    if (text === "") getProduct(pagination, 4);
    else if (text === "all") getProduct(pagination, 4);
    else
      axios
        .get(
          `${url}wareHouse/product/search?wareHouseId=${
            werHouseId.wareHouseId
          }&${searchByName()}=${text}`,
          config
        )
        .then((res) => {
          if (res.data.body) {
            if (res.data.body.length > 4)
              setProduct(
                res.data.body.map((item, i) => {
                  if (i < 4) return item;
                })
              );
            else setProduct(res.data.body);
          } else setProduct([]);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function searchProject(e) {
    let text = e.target.value;
    if (text === "") getWerhouse(pagination, 4);
    else
      axios
        .get(`${url}wareHouse/search?name=${text}&lang=${lang}`, config)
        .then((res) => {
          if (!res.data.body) {
            // eslint-disable-next-line array-callback-return
            setProject([]);
          } else {
            if (res.data.body.length > 4)
              setProject(
                res.data.body.map((item, i) => {
                  if (i < 4) return item;
                })
              );
            else setProject(res.data.body);
          }
        })
        .catch((err) => console.log(err));
  }

  function searchByName() {
    switch (searchBy) {
      case "Product TN code":
        return "productIdNumber";
      case "Product status":
        return "productStatus";
      case "Product name":
        return "productName";
      case "User name":
        return "userName";
      default:
        return "productIdNumber";
    }
  }

  function searchByName2() {
    switch (searchBy2) {
      case "Product status":
        return "productStatus";
      case "Project name":
        return "projectName";
      default:
        return "projectName";
    }
  }

  return (
    <div className="w-full h-screen background overflow-x-hidden">
      <NavBar
        werhouse={"border-b-red-600 border-b text-slate-900"}
        lang={lang}
      />
      <div className="wer-main">
        <div className="flex w-full lg:flex-row align-center justify-center flex-col lg:h-full h-max pt-20">
          {/* project uchun */}
          <div className="lg:w-5/12 w-screen lg:px-3 md:px-10  lg:py-0 sm:py-5 px-1">
            <div className="mt-4 flex flex-wrap justify-between">
              <input
                type="search"
                placeholder={t("productSearch")}
                onChange={searchProject}
                className="lg:w-9/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
              />
              {/* <Dropdown setSearchBy={setSearchBy} /> */}
            </div>
            <div className="mt-4 flex flex-wrap justify-between">
              <button
                onClick={openProjectCan}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded"
              >
                {t("addWer")}
              </button>
              <h1>
                <b>{t("werhouse")}</b>
              </h1>

              <span className="me-5 pt-1.5 float-end">
                {t("cardCurrent")}: {pagination2}
              </span>
              {projects ? (
                projects.map((item, i) => (
                  <ProjectCard
                    setWerHouseId={setWerHouseId}
                    getProduct={getWerhouse}
                    pagination={pagination2}
                    key={i}
                    setProduct={setProduct}
                    loading={loadingPP}
                    className="mt-5"
                    deleteWerhouse={deleteWerhouse}
                    openEdit={openEditProjectCan}
                    projects={item}
                    setProductObj={setProductObj}
                  />
                ))
              ) : (
                <Empty />
              )}
            </div>
            <div className="pagination-style py-8">
              <Pagination
                {...bootstrap5PaginationPreset}
                current={pagination2}
                total={Math.floor(totalPage2 + 1)}
                onPageChange={setPagination2}
              />
            </div>
          </div>

          {/* product uchun */}

          <div className="lg:w-5/12 w-full  lg:px-3 md:px-10 px-3 lg:py-0 py-5">
            <div className="mt-4 flex flex-wrap justify-between">
              {drops ? (
                <select
                  onChange={searchProduct}
                  defaultValue=""
                  id="statuslar"
                  className="py-2 px-2 w-96 bg-white rounded-lg  border border-slate-300
                       focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                     focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
                >
                  <option selected disabled>
                    {t("productAdd60")}
                  </option>
                  <option value="all">{t("all")}</option>
                  <option value="PENDING">{t("status1")}</option>
                  <option value="GOING">{t("status2")}</option>
                  <option value="CANCEL">{t("status3")}</option>
                  <option value="ARRIVED">{t("status4")}</option>
                  <option value="COMPLETED">{t("status5")}</option>
                  <option value="MOVED ">{t("status6")}</option>
                </select>
              ) : (
                <input
                  type="search"
                  placeholder={t("productSearch")}
                  defaultValue=""
                  onChange={searchProduct}
                  className="lg:w-9/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
                />
              )}
              <Dropdown
                pagination={pagination}
                getProduct={getProduct}
                selectDrop={selectDrop}
                inputDrop={inputDrop}
                setSearchBy={setSearchBy}
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-between">
              <button
                onClick={handleToggleOffcanvas}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded"
              >
                {t("addProduct")}
              </button>

              <h1>
                <b>
                  <span className="text-blue-600 text-lg">{`${
                    werHouseId
                      ? werHouseId.name
                      : projects
                      ? projects[0].name
                      : ""
                  } `}</span>
                  {t("project")}
                </b>
              </h1>
              <select
                id="projectos"
                onChange={cLasslar}
                className=" rounded-full p-2 border border-gray-500"
              >
                <option value="select" selected>
                  {t("select")}
                </option>
                {projectos &&
                  projectos.map((item, i) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
              </select>
              <span className="me-5 pt-1.5 float-end">
                {t("cardCurrent")}: {pagination}
              </span>

              {products ? (
                products.map((item, i) => (
                  <ProductCard
                    setProductIdList={setProductIdList}
                    deleteProduct={deleteProduct}
                    key={i}
                    classNames={className}
                    className="mt-5"
                    openEdit={openEdit}
                    product={item}
                    addToProduct={addToProduct}
                    setProductObj={setProductObj}
                    setProductTo={setProductTo}
                    setWerhouseId={setWerhouseId}
                  />
                ))
              ) : (
                <Empty />
              )}
            </div>
            <div className="pagination-style mt-4">
              <Pagination
                {...bootstrap5PaginationPreset}
                current={pagination}
                total={Math.floor(totalPage + 1)}
                onPageChange={setPagination}
              />
            </div>
          </div>
        </div>

        {/* project */}
        <OffcanvasProject
          isAdd={true}
          getProduct={getWerhouse}
          setProduct={setProductObj2}
          product=""
          handleToggleOffcanvas={openProjectCan}
          isOffcanvasOpen={addWerhouseModal}
          name={t("addWer")}
          btnName={t("save")}
          onSave={addWerhouse}
          setUserId={setUserId}
          lang={lang}
        />
        <OffcanvasProject
          isAdd={false}
          getProduct={getWerhouse}
          setProduct={setProductObj2}
          product={product}
          handleToggleOffcanvas={openEditProjectCan}
          isOffcanvasOpen={editProjectModal}
          name={t("editWer")}
          btnName={t("editWer")}
          onSave={editProject}
          setUserId={setUserId}
          lang={lang}
        />

        <OffcanvasProduct
          isAdd={true}
          getProduct={getProduct}
          setProduct={setProductObj2}
          product=""
          handleToggleOffcanvas={handleToggleOffcanvas}
          isOffcanvasOpen={isOffcanvasOpen}
          name={t("addProduct")}
          btnName={t("addProduct")}
          onSave={addProduct}
          setUserId={setUserId}
          werHouseId={werHouseId}
          wareHouse={werhouseId}
          lang={lang}
        />
        <OffcanvasProduct
          isAdd={false}
          getProduct={getProduct}
          setProduct={setProductObj2}
          product={product}
          handleToggleOffcanvas={openEdit}
          isOffcanvasOpen={editOf}
          name={t("editProduct")}
          btnName={t("editProduct")}
          werHouseId={werHouseId}
          onSave={editProduct}
          setUserId={setUserId}
          lang={lang}
        />
      </div>
    </div>
  );
}

export default Product;