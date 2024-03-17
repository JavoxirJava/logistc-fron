import React, { useEffect, useState } from "react";
import "./product.css";
import ProductCard from "./ProductCard";
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
import Dropdown2 from "../Dropdown2";
import Empty from "../Empty";
import DownloadModal from "./downloadModal";

function Product({ lang, projectId, setProjectId }) {
  // const [coordinates, setCoordinates] = useState([55.75, 37.57]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [editOf, setEditOf] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [product, setProductObj] = useState(null);
  const [product2, setProductObj2] = useState(null);
  const [products, setProduct] = useState(null);
  const [projects, setProject] = useState(null);
  const [totalPage, setTotalPage] = useState(2);
  const [totalPage2, setTotalPage2] = useState(2);
  const [pagination, setPagination] = useState(0);
  const [pagination2, setPagination2] = useState(0);
  const [searchBy, setSearchBy] = useState(null);
  const [searchBy2, setSearch2By] = useState(null);
  const [userId, setUserId] = useState(null);
  const [drops, setDrops] = useState(false);
  const [dropsP, setDropsP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalDown, setIsModalDown] = useState(false);

  const closeDown = () => setIsModalDown(false);
  const openDown = () => setIsModalDown(true);

  const inputDrop = () => setDrops(false);
  const selectDrop = () => setDrops(true);

  const inputDropP = () => setDropsP(false);
  const selectDropP = () => setDropsP(true);
  const { t } = useTranslation();

  useEffect(() => {
    setConfig();
    getProject(pagination2, 4);
    getProduct(pagination, 4);
  }, []);

  useEffect(() => {
    getProduct(pagination, 4);
  }, [projects]);

  useEffect(() => {
    getProject(pagination2, 4);

    getProduct(pagination, 4);
  }, [lang]);

  useEffect(() => {
    if ((pagination - 1) * 4 < 0) setPagination(0);
    else getProduct(Math.floor(pagination - 1), 4);
  }, [pagination]);

  useEffect(() => {
    if ((pagination2 - 1) * 4 < 0) setPagination2(0);
    else getProject(Math.floor(pagination2 - 1), 4);
    // console.log(pagination2);
  }, [pagination2]);

  useEffect(() => {
    searchByName();
  }, [searchBy]);

  useEffect(() => {
    searchByName2();
  }, [searchBy2]);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setEditOf(false)
      setIsOffcanvasOpen(false)
      setAddProjectModal(false)
      setIsModalDown(false)
    }
  });
  const openEdit = () => setEditOf(!editOf);
  const handleToggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);
  const openProjectCan = () => setAddProjectModal(!addProjectModal);
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

  

  const getProject = (page, size) => {
    axios
      .get(`${url}project/page?page=${page}&size=${size}&lang=${lang}`, config)
      .then((res) => {
        setTotalPage2(
          res.data.body.totalPage ? res.data.body.totalPage - 1 : 1
        );
        setProject(res.data.body.object);
      })
      .catch((err) => {
        console.log();
      });
  };

  function getProduct(page, size) {
    axios
      .get(
        `${url}product?page=${page}&size=${size}&lang=${lang}&projectId=${projectId.id ? projectId.id : 0
        }`,
        config
      )
      .then((res) => {
        // if (res.data.message === 'success') {
        setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
        setProduct(res.data.body.object);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addProduct() {
    let data = { ...product2 };
    let projectIdIn = sessionStorage.getItem("projectIdIn");
    axios
      .post(
        `${url}product?userId=${userId}&projectId=${projectIdIn}`,
        data,
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

  function addProject() {
    setLoading(true)
    let data = { ...product2 };
    axios
      .post(`${url}project`, data, config)
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getProject(pagination2, 4);
        setLoading(false)
        openProjectCan()
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
        setLoading(false)
      });
  }

  function editProduct() {
    let data = { ...product2 };
    axios
      .put(
        `${url}product?projectId=${sessionStorage.getItem("projectIdIn")}`,
        data,
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

  function editProject() {
    let data = { ...product2 };
    axios
      .put(`${url}project?id=${projectId.id}`, data, config)
      .then(() => {
        toast.success(t("success"));
        setProductObj2(null);
        getProject(pagination, 4);
        openEditProjectCan()
      })
      .catch((err) => {
        toast.error(t("error"));
        console.log(err);
      });
  }
 

  function searchProduct(e) {
    let text = e.target.value;
    if (text === "") getProduct(pagination, 4);
    else if (text === "all") getProduct(pagination, 4);
    else
      axios
        .get(
          `${url}product/admin/search?${searchByName()}=${text}&lang=${lang}`,
          config
        )
        .then((res) => {
          if (res.data.body) {
            // eslint-disable-next-line array-callback-return
            if (res.data.body.length > 4)
              setProject(
                res.data.body.map((item, i) => {
                  if (i < 4) return item;
                })
              );
            else setProduct(res.data.body);
          } else setProduct([]);
        })
        .catch((err) => console.log(err));
  }

  function searchProject(e) {
    let text = e.target.value;
    if (text === "") getProject(pagination2, 4);
    else
      axios
        .get(
          `${url}project/admin/search?name=${text}&lang=${lang}`,
          config
        )
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
        return "status";
      case "Project name":
        return "name";
      default:
        return "status";
    }
  }

  return (
    <div className="w-full h-screen background overflow-x-hidden">
      <NavBar
        product={"border-b-red-600 border-b text-slate-900"}
        lang={lang}
      />
      <div className="product-main">
        <div className="flex lg:flex-row align-center justify-center flex-col lg:h-full h-max pt-20">
          {/* project uchun */}
          <div className=" lg:px-3 md:px-10 lg:py-0 sm:py-5 px-1 w-screen lg:w-10/12">
            <div className="mt-4 flex flex-wrap  gap-3 lg:gap-20">
              {drops ? (
                <select
                  onChange={searchProject}
                  defaultValue=""
                  id="statuslar"
                  className="py-2 px-2 lg:w-4/12 bg-white rounded-lg  border border-slate-300
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
                  placeholder={t("projectNameSearch")}
                  defaultValue=""
                  onChange={searchProject}
                  className="lg:w-4/12 w-5/12 ml-2 md:ml-0 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
                />
              )}
            </div>
            <div className="flex flex-row md:justify-start md:gap-0 gap-5 justify-center my-5">
              <button
                onClick={openProjectCan}
                className="bg-green-600 duration-200 hover:bg-green-700 text-white font-bold  md:text-lg text-sm py-1.5 px-8 border md:w-2/12 w-[40%] rounded"
              >
                {t("addd")}
              </button>
              <button onClick={openDown} disabled={!projects} className="md:ms-3 ms-0 duration-200 md:text-lg text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border md:w-2/12 w-[40%] rounded">
                {t('download')}
              </button>
            </div>
            <div className="flex w-full justify-around sm:justify-between items-center">
              <span className="hidden sm:block"></span>
              {/* <h1>
                  <b>{t("produkt")}</b>
                </h1> */}

              <span className="me-5 pt-1.5 float-end">
                {t("cardCurrent")}: {pagination2}
              </span>
            </div>
            <div className="relative overflow-x-auto  sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      №
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("client2")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("card2")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("transport")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("date")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productCount")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("totalWeight")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("totalKub")}
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Total Price
                    </th> */}
                    <th colSpan='4' scope="col" className="px-6 py-3 text-center">
                      {t("action")}
                    </th>
                    {/* <th scope="col" className="px-6 py-3 text-center">
                      {t("download")}
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {projects ? (
                    projects.map((item, i) => (
                      <ProjectCard
                        setProjectId={setProjectId}
                        getProduct={getProject}
                        pagination={pagination2}
                        i={i}
                        className="mt-5"
                        openEdit={openEditProjectCan}
                        projects={item}
                        product={product}
                        setProduct={setProduct}
                        setProject={setProject}
                        setProductObj={setProductObj}
                      />
                    ))
                  ) : (
                    <Empty />
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

          <DownloadModal isOpen={isModalDown} projects={projects} closeDown={closeDown} />
        </div>

        {/* project */}
        <OffcanvasProject
        loading={loading}
          isAdd={true}
          getProduct={getProject}
          setProduct={setProductObj2}
          product={null}
          handleToggleOffcanvas={openProjectCan}
          isOffcanvasOpen={addProjectModal}
          name={t("add")}
          btnName={t("add")}
          onSave={addProject}
          setUserId={setUserId}
          lang={lang}
        />
        <OffcanvasProject
        loading={loading}
        isAdd={false}
          getProduct={getProject}
          setProduct={setProductObj2}
          product={product}
          handleToggleOffcanvas={openEditProjectCan}
          isOffcanvasOpen={editProjectModal}
          name={t("editProject")}
          btnName={t("editProject")}
          onSave={editProject}
          setUserId={setUserId}
          projectId={projectId}
          lang={lang}
        />

        <OffcanvasProduct
          isAdd={true}
          getProduct={getProduct}
          setProduct={setProductObj2}
          handleToggleOffcanvas={handleToggleOffcanvas}
          isOffcanvasOpen={isOffcanvasOpen}
          name={t("addProduct")}
          btnName="Save"
          onSave={addProduct}
          setUserId={setUserId}
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
          btnName="Edit"
          onSave={editProduct}
          setUserId={setUserId}
          lang={lang}
        />
      </div>
    </div>
  );
}

export default Product;
