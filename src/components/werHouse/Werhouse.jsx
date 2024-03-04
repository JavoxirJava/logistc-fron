import React, { useEffect, useState } from "react";
import "./werHouse.css";
import OffcanvasProduct from "./OffcanvasProduct";
import { config, setConfig, url } from "../api";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";
import NavBar from "../navbar/NavBar";
import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard";
import OffcanvasProject from "./OffcanvasProject";
import Empty from "../Empty";
import DownloadModal from "./downloadModal";

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
  const [newWereHouseName, setNewWereHouseName] = useState(null);
  const [werhouseId, setWerhouseId] = useState(0);
  const [productIdList, setProductIdList] = useState([]);
  const [className, setClassName] = useState(false);
  const [loadingP, setLoadingP] = useState(false);
  const [drops, setDrops] = useState(false);
  const [loading, setLoading] = useState(false);


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
        // bundan objectni olib tashlash kk xozirgi xolatda backend page qaaytarmayabdi
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
        `${url}product/ware-house?wareHouseId=${werHouseId
          ? werHouseId.wareHouseId
          : 0
        }&page=${page}&size=${size}&lang=${lang}`,
        config
      )
      .then((res) => {
        // if (res.data.message === 'success') {
        // loadingPP()
        setTotalPage(res.data.totalPage ? res.data.totalPage - 1 : 2);
        setProduct(res.data.object);
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
        `${url}wareHouse/product?wareHouseId=${werHouseId.wareHouseId
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
    setLoading(true)
    let data = { ...product2 };
    if (data.name !== undefined) {
      axios.post(`${url}wareHouse`, data, config)
        .then(() => {
          setLoading(false);
          toast.success(t("success"));
          setProductObj2(null);
          getWerhouse(pagination2, 4);
          openProjectCan()
        }).catch((err) => {
          toast.error(t("error"));
          setLoading(false)
        });
    } else {
      toast.error(t("requiredWareHouseCanvas"));
      setLoading(false);
    }
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
    setLoading(true)
    let data = { ...product2 };
    axios
      .put(`${url}wareHouse/${product}`, data, config)
      .then(() => {
        toast.success(t("success"));
        setLoading(false)
        setProductObj2(null);
        getWerhouse(pagination2, 4);
        openEditProjectCan()
      })
      .catch((err) => {
        toast.error(t("error"));
        setLoading(false)
      });
  }

  function deleteWerhouse() {
    setLoading(true)
    axios
      .delete(`${url}wareHouse?id=${product}`, config)
      .then(() => {
        setLoading(false)
        toast.success(t("success"));
        setProductObj2(null);
        getWerhouse(pagination2, 4);
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
        setLoading(false)
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
          `${url}wareHouse/product/search?wareHouseId=${werHouseId.wareHouseId
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
          <div className="lg:w-10/12 w-screen lg:px-3 md:px-10 lg:py-0 sm:py-5 px-1">
            <div className="mt-4 flex flex-wrap justify-between">
              <input
                type="search"
                placeholder={t("wereHouseNameSearch")}
                onChange={searchProject}
                className="lg:w-4/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
              />
              {/* <Dropdown setSearchBy={setSearchBy} /> */}
            </div>
            <div className="flex justify-between my-5">
              <button
                onClick={openProjectCan}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8  rounded"
              >
                {t("addWer")}
              </button>
              <h1>
                <b>{t("werhouse")}</b>

              </h1>

              {/* <span className="me-5 pt-1.5 float-end">
                {t("cardCurrent")}: {pagination2}
              </span> */}
              {/* <button
                onClick={openDown}

                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-8  rounded"
              >
                {t("download")}
              </button> */}
              <span></span>
            </div>
            <div className="mt-4 flex flex-wrap justify-between overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      №
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("client2")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("totalKub")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productCount")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("totalWeight")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("edit")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("delete")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("more")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("download")}
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {projects ? (
                    projects.map((item, i) => (
                      <ProjectCard
                        setWerHouseId={setWerHouseId}
                        getProduct={getWerhouse}
                        pagination={pagination2}
                        i={i}
                        setProduct={setProduct}
                        loading={loadingPP}
                        className="mt-5"
                        deleteWerhouse={deleteWerhouse}
                        openEdit={openEditProjectCan}
                        projects={item}
                        setProductObj={setProductObj}
                        setNewWereHouseName={setNewWereHouseName}
                      />
                    ))
                  ) : (
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <Empty />
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  )}
                </tbody>
              </table>
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

        </div>

        {/* project */}
        <OffcanvasProject
          isAdd={true}
          loading={loading}
          getProduct={getWerhouse}
          setProduct={setProductObj2}
          product=""
          newWereHouseName=''
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
          loading={loading}
          getProduct={getWerhouse}
          setProduct={setProductObj2}
          product={product}
          newWereHouseName={newWereHouseName}
          handleToggleOffcanvas={openEditProjectCan}
          isOffcanvasOpen={editProjectModal}
          name={t("editWer")}
          btnName={t("editWer")}
          onSave={editProject}
          setUserId={setUserId}
          lang={lang}
        />
      </div>
    </div>
  );
}

export default Product;
