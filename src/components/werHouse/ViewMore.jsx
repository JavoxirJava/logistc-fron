import { useEffect, useRef, useState } from "react";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { byId, config, getFile, url } from "../api";
import ReactPaginate from "react-paginate";
import img from "../empty.png";
import { useTranslation } from "react-i18next";
import OffcanvasProduct from "./OffcanvasProduct";
import { toast } from "react-toastify";
import ProductDModal from "./productModl";
import AddProjectInfoModal from "./AddProjectInfoModal";
import ImageViewModal from "../ImageViewModal";

const ViewMoreW = ({ lang }) => {
  const [product2, setProductObj2] = useState(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [projectIdInfo, setProjectIdInfo] = useState(null);
  const [product, setProductObj] = useState(null);
  const [page, setPage] = useState(0);
  const [editOf, setEditOf] = useState(false);
  const [userId, setUserId] = useState(null);
  const [project, setProject] = useState(null);
  const [isModalDelete, setIsDeleteOpen] = useState(false);
  const [ModalPro, setProOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isImageOpenModal, setIsImageOpenModal] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [check, setCheck] = useState(true);
  const checkbox = useRef(false);

  let projectId = sessionStorage.getItem("warehouseIdViewMore");
  let projectName = sessionStorage.getItem("warehouseNameViewMore");

  const handleToggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);
  const openEdit = () => setEditOf(!editOf);
  const openDelete = () => setIsDeleteOpen(true);
  const closeDelete = () => setIsDeleteOpen(false);
  const openPro = () => setProOpen(true);
  const closePro = () => setProOpen(false);
  const showProjectInfoModal = () => setShowModal(!showModal);
  const tozalovchi = () => {
    setProducts([])
    // products.map(product => document.getElementById(`count${product.productId}`).checked = false)

    // e.target.checked = false
    // checkbox.current.checked = false
    // products.map(product => document.getElementById(`count${product.productId}`).checked = false)
  }

  const { t } = useTranslation();

  useEffect(() => {
    getProject();
    getProjectInfo();
  }, []);

  useEffect(() => {
    getProjectInfo();
  }, [projectId]);

  useEffect(() => {
    getProjectInfo();
  }, [lang]);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const getProjectInfo = () => {
    axios.get(
      `${url}product/ware-house?warehouseId=${projectId}&lang=${lang}&page=0&size=10`,
      config
    ).then((res) => {
      if (res.data.message === "List empty") setProjectIdInfo(null);
      else {
        setProjectIdInfo(res.data.body.object);
        setPage(res.data.body.totalPage);
      }
    }).catch((err) => console.log("product/ware-house yulida error!", err));
  };

  const getProject = () => {
    axios.get(`${url}project/all?lang=${lang}`, config)
      .then((res) => {
        setProject(res.data.body);
      }).catch((err) => console.log("wareHouse/product yulida error!", err));
  };

  const handelPageClick = (event) => {
    const pageNumber = event.selected;
    setCurrentPage(pageNumber);
    axios.get(
      `${url}product/ware-house?warehouseId=${projectId}&lang=${lang}&page=${pageNumber}&size=10`,
      config
    ).then((res) => setProjectIdInfo(res.data.body.object))
      .catch((err) => console.log("error page: ", err));
  };

  const styles = {
    loading:
      "animate-pulse hover:cursor-wait my-3 w-full h-7 bg-sky-200 rounded",
  };

  const searchHandler = (e) => {
    let data = e.target.value;
    if (data) {
      axios.get(
        `${url}wareHouse/product/search?userName=${data}&lang=${lang}`,
        config
      ).then((res) =>
        res.data.success === false
          ? setProjectIdInfo([{ comment: "Not found 😊" }])
          : setProjectIdInfo(res.data.body)
      ).catch(() => setProjectIdInfo(null));
    } else {
      getProjectInfo();
      setProjectIdInfo(null);
    }
  };

  function addProducts() {
    setLoading(true);
    let data = { ...product2 };
    axios
      .post(`${url}product?userId=${userId}`, data, config)
      .then(() => {
        setLoading(false);
        toast.success(t("success"));
        getProjectInfo();
        setProductObj2(null);
        handleToggleOffcanvas();
      })
      .catch(() => {
        toast.error(t("error"));
        setLoading(false);
      });
  }

  function addtoProduct() {
    let productCountDtoS = products.map(product => {
      return {
        productId: product.productId,
        count: byId(`count${product.productId}`)
      };
    });

    let addData = {
      projectId: document.getElementById("projects").value,
      wareHouseId: projectId,
      productCountDtoS
    }

    axios.post(`${url}product/change-warehouse-to-project`, addData, config)
      .then(() => {
        tozalovchi();
        toast.success(t("success"));
        getProjectInfo();
        setProductObj2(null);
        showProjectInfoModal();
        document.getElementById("projects").value = 0
        setCheck(false)
        setTimeout(() => {
          setCheck(true)
        }, 200);
      })
      .catch((err) => {
        setCheck(false)
        setTimeout(() => {
          setCheck(true)
        }, 200);
      }).catch((err) => {
        tozalovchi();
        toast.error(t("error"));
        document.getElementById("projects").value = 0
        console.log(err);
      });
  }

  function editProduct() {
    setLoading(true);
    let data = { ...product2 };
    axios.put(`${url}product?id=${product.productId}`, data, config)
      .then(() => {
        toast.success(t("success"));
        setLoading(false);
        getProjectInfo();
        setProductObj2(null);
        openEdit();
      }).catch(() => {
        toast.error(t("error"));
        setLoading(false);
      });
  }

  function deleteProduct() {
    axios
      .delete(
        `${url}product/ware-house?wareHouseId=${projectId}&productId=${product.productId}`,
        config
      ).then(() => {
        getProjectInfo();
        toast.success(t("success"));
      }).catch(() => {
        toast.error(t("error"));
        // console.log(err);
      });
  }

  function addProductIds(checked, item) {
    if (checked) setProducts([...products, item]);
    else setProducts(products.filter((product) => product.productId !== item.productId))
  }

  return (
    <div className="w-full h-screen background overflow-x-hidden ">
      <NavBar lang={lang} />
      <div className="mt-32 flex justify-start px-3.5 md:px-16 w-full">
        <input
          type="search"
          onChange={searchHandler}
          placeholder={t("productNameSearch")}
          className="lg:w-3/12 sm:w-5/12 w-full px-4 h-10 focus:outline-0 border rounded-md"
        />
      </div>
      <div className="flex w-full justify-center ">
        <div className="flex md:w-[89%] w-full md:flex-row flex-col justify-between mt-5 ps-3.5 lg:ps-0">
          <div className="flex md:justify-start gap-5 pr-3">
            <button
              onClick={() => {
                handleToggleOffcanvas();
                topFunction();
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-5 lg:px-8 rounded"
            >
              {t("productAdd1")}
            </button>
            <button
              onClick={() => {
                if (products.length > 0) openPro();
                // else toast.warning('Please add at least one product')
                else toast.warning(t("listWarning"));
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-5 lg:px-8 rounded"
            >
              {t("addproject")}
            </button>
          </div>
          <h1 className="flex justify-start lg:justify-between mt-3 lg:mt-0 items-center">
            <b className="text-blue-500 mr-3">{projectName}</b>
            <b>{t("products")}</b>
          </h1>
          <div className="bg-slate-50 w-48 shadow-md shadow-slate-100 py-2 mt-3 lg:mt-0 rounded-lg flex justify-start lg:justify-between items-center">
            <span className="ms-4 text-black font-semibold">{products.map(p => p).reduce((i, p) => i + (p.kg * p.productCount), 0)} ({t('kg')})</span>
            <span className="mx-4 text-black font-semibold">{products.map(p => p).reduce((i, p) => i + (p.kub * p.productCount), 0)} ({t('sm')}<sup>3</sup>)</span>
          </div>
        </div>
      </div>
      <div className="product-main flex justify-center items-start overflow-hidden w-full">
        <div className="lg:px-0 md:px-10 lg:py-0 sm:py-5 px-3 mt-8 w-screen lg:w-[90%] overflow-x-auto">
          <table className="w-full rounded-2xl overflow-hidden text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">№</th>
                <th className="px-6 py-3">{t("photo")}</th>
                <th className="px-6 py-3">{t("owner")}</th>
                <th className="px-6 py-3">{t("productName")}</th>
                <th className="px-6 py-3">{t("date")}</th>
                <th className="px-6 py-3">{t("productCount")}</th>
                <th className="px-6 py-3">{t("totalWeight")}</th>
                <th className="px-6 py-3">{t("totalKub")}</th>
                <th className="px-6 py-3">{t("productAdd34")}</th>
                <th className="px-6 py-3">{t("edit")}</th>
                <th className="px-6 py-3">{t("delete")}</th>
                <th className="px-6 py-3">{t("selectCh")}</th>
              </tr>
            </thead>
            <tbody className="text-[1rem] text-gray-700 bg-white text-center">
              {projectIdInfo && check ? (
                projectIdInfo.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b transition duration-300 ease-in-out hover:bg-gray-300"
                  >
                    <th className="px-6 py-5">{(currentPage * 10) + (i + 1)}</th>
                    <th className="px-6 py-5 flex justify-center items-center">
                      <img
                        onClick={() => {
                          setImageId(item.attachmentId ? item.attachmentId : toast.warning(t('imgNotFound')));
                          item.attachmentId ? setIsImageOpenModal(true) : setIsImageOpenModal(false)
                        }}
                        src={item.attachmentId ? getFile + item.attachmentId : img}
                        className="w-10 h-10 object-cover rounded-full scale-150 hover:cursor-pointer"
                        alt="img"
                      />
                    </th>
                    <td className="px-6 py-5">{item.owner}</td>
                    <td className="px-6 py-5">{item.name}</td>
                    <td className="px-6 py-5 overflow-x-auto">
                      {item.date.slice(0, item.date.indexOf(" "))}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`${products.length > 0 ? 'hidden' : 'visible'}`}>{item.productCount}</span>
                      <input
                        type="number"
                        defaultValue={item.productCount}
                        id={`count${item.productId}`}
                        onChange={(e) => {
                          setProducts(products.map(product => {
                            if (product.productId === item.productId)
                              product.productCount = e.target.value
                            return product;
                          }));
                        }}
                        // disabled={products.length > 0 ? false : true}
                        className={`${products.length > 0 ? 'visible' : 'hidden'} ms-1.5 w-24 ps-3 py-1 outline-0 bg-slate-100 rounded-lg border border-slate-300 duration-200`}
                        placeholder={t("count")} />
                    </td>
                    <td className="px-6 py-5">
                      {item.totalWeight.toFixed(3)} {t("kg")}
                    </td>
                    <td className="px-6 py-5">
                      {item.totalKub.toFixed(3)} {t("sm")}
                      <sup>3</sup>
                    </td>
                    <td className="px-6 py-5">{item.comment}</td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => {
                          openEdit();
                          setProductObj(item);
                        }}
                        href="#"
                        className="font-medium text-[#16A34A] hover:underline"
                      >
                        {t("edit")}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => {
                          setProductObj(item);
                          openDelete();
                        }}
                        href="#"
                        className="font-medium text-[#c0332e] hover:underline"
                      >
                        {t("delete")}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        onChange={(e) => {
                          addProductIds(e.target.checked, item)
                        }}
                        id={i}
                        type="checkbox"
                        className="w-5 h-5"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-4">
                    <h1 className="text-xl text-black">{t("notfound")}</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-7 ms-1 mb-20 lg:mb-10">
            <ReactPaginate
              className="navigation"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handelPageClick}
              pageRangeDisplayed={5}
              pageCount={page}
              previousLabel="<"
              renderOnZeroPageCount={null}
              nextClassName="nextBtn"
              previousClassName="prevBtn"
            />
          </div>
        </div>
      </div>

      <OffcanvasProduct
        loading={loading}
        isAdd={true}
        getProduct={getProjectInfo}
        setProduct={setProductObj2}
        product=""
        handleToggleOffcanvas={handleToggleOffcanvas}
        isOffcanvasOpen={isOffcanvasOpen}
        name={t("addProduct")}
        btnName={t("addProduct")}
        onSave={addProducts}
        setUserId={setUserId}
        werHouseId={projectId}
        wareHouse={projectId}
        lang={lang}
      />
      <OffcanvasProduct
        loading={loading}
        isAdd={false}
        getProduct={getProjectInfo}
        setProduct={setProductObj2}
        product={product}
        handleToggleOffcanvas={openEdit}
        isOffcanvasOpen={editOf}
        name={t("editProduct")}
        btnName={t("editProduct")}
        werHouseId={projectId}
        onSave={editProduct}
        setUserId={setUserId}
        lang={lang}
      />

      <ProductDModal
        isOpen={isModalDelete}
        deleteProduct={deleteProduct}
        onClose={closeDelete}
        deleteProduc={deleteProduct}
      />

      <ImageViewModal
        setIsImageOpenModal={setIsImageOpenModal}
        isImageOpenModal={isImageOpenModal}
        imageId={imageId}
      />

      <div
        className={`fixed ${ModalPro ? "block" : "hidden"
          } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
      >
        <div className="relative top-20 mx-auto p-5 border md:w-96 w-[200px] shadow-lg rounded-md bg-white">
          <div>
            <div>
              <label htmlFor="projects">{t("select")}</label>
              <select
                id={`projects`}
                className="block w-full  p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
              >
                <option selected disabled value={0}>
                  {t("select")}
                </option>

                {project &&
                  project.map((item, i) => (
                    <option key={i} value={item.projectId}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-between mt-7">
              <button
                type="button"
                onClick={() => {
                  closePro();
                  tozalovchi();
                  getProjectInfo()
                  document.getElementById("projects").value = 0
                }}
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                {t("close")}
              </button>
              <button
                onClick={() => {
                  closePro();
                  showProjectInfoModal();
                }}
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                {t("addd")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*    Modal */}

      {showModal ? (
        <AddProjectInfoModal
          showProjectInfoModal={showProjectInfoModal}
          products={products}
          addToProduct={addtoProduct}
          tozalovchi={tozalovchi}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewMoreW;
