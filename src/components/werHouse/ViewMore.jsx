import {useEffect, useState} from "react";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import {config, getFile, url} from "../api";
import ReactPaginate from "react-paginate";
import img from "../empty.png";
import {useTranslation} from "react-i18next";
import OffcanvasProduct from "./OffcanvasProduct";
import {toast} from "react-toastify";
import ProductDModal from "./productModl";
import AddProjectInfoModal from "./AddProjectInfoModal";

const ViewMoreW = ({lang}) => {
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

    let projectId = sessionStorage.getItem("warehouseIdViewMore");


    const handleToggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);
    const openEdit = () => setEditOf(!editOf);
    const openDelete = () => setIsDeleteOpen(true);
    const closeDelete = () => setIsDeleteOpen(false);
    const openPro = () => setProOpen(true);
    const closePro = () => setProOpen(false);
    const showProjectInfoModal = () => setShowModal(!showModal);

    const {t} = useTranslation();

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

    const getProjectInfo = () => {
        axios.get(`${url}product/ware-house?warehouseId=${projectId}&lang=${lang}&page=0&size=5`, config)
            .then((res) => {
                setProjectIdInfo(res.data.body.object);
                setPage(res.data.body.totalPage);
            }).catch((err) => console.log("product/ware-house yulida error!", err));
    };
    const getProject = () => {
        axios
            .get(`${url}project/list?lang=${lang}`, config)
            .then((res) => {
                setProject(res.data.body);
            })
            .catch((err) => console.log("wareHouse/product yulida error!", err));
    };

    const handelPageClick = (event) => {
        const pageNumber = event.selected;
        setCurrentPage(pageNumber);
        axios.get(`${url}product/ware-house?warehouseId=${projectId}&lang=${lang}&page=${pageNumber}&size=5`, config)
            .then((res) => setProjectIdInfo(res.data.body.object))
            .catch((err) => console.log("error page: ", err));
    };

    const styles = {
        loading:
            "animate-pulse hover:cursor-wait my-3 w-full h-7 bg-sky-200 rounded",
    };

    const searchHandler = (e) => {
        let data = e.target.value;
        console.log(!!data);
        if (!!data) {
            axios.get(
                    `${url}wareHouse/product/search?userName=${data}&lang=${lang}`,
                    config
                ).then((res) =>
                    res.data.success === false
                        ? setProjectIdInfo([{comment: "Not found 😊"}])
                        : setProjectIdInfo(res.data.body)
                ).catch(() => setProjectIdInfo(null));
        } else {
            getProjectInfo();
            setProjectIdInfo(null);
        }
    };

    function addProduct() {
        let data = {...product2};
        axios.post(`${url}product?userId=${userId}`, data, config)
            .then(() => {
                toast.success(t("success"));
                getProjectInfo();
                setProductObj2(null);
            }).catch((err) => {
                toast.error(t("error"));
                console.log(err);
            });
    }

    function addtoProduct() {
        let data = [...products.map(p => p.productId)];

        let datas = {
            productIds: data,
            projectId: document.getElementById("projects").value,
            wareHouseId: projectId,
        };
        axios.post(`${url}product/change-warehouse-to-project`, datas, config).then(() => {
            toast.success(t("success"));
            getProjectInfo();
            setProductObj2(null);
            showProjectInfoModal()
        }).catch((err) => {
            toast.error(t("error"));
            console.log(err);
        });
    }

    function editProduct() {
        let data = {...product2};
        axios.put(`${url}product?id=${product.productId}`, data, config)
            .then(() => {
                toast.success(t("success"));
                getProjectInfo();
                setProductObj2(null);
            }).catch((err) => {
            toast.error(t("error"));
            console.log(err);
        });
    }

    function deleteProduct() {
        axios.delete(
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
        else setProducts(products.filter((product) => product.productId !== item.productId));
    }

    return (
        <div className="w-full h-screen background overflow-x-hidden ">
            <NavBar lang={lang}/>
            <div className="mt-32 flex justify-start md:ml-20 ml-0  w-full">
                <input
                    type="search"
                    onChange={searchHandler}
                    placeholder={t("productSearch")}
                    className="lg:w-5/12 w-[100%] md:mx-0 mx-3 px-4 h-10 focus:outline-0 border rounded-md"
                />
            </div>
            <div className="flex w-full justify-center ">
                <div className="flex md:w-[89%] w-full md:flex-row flex-col justify-between mt-5">
                    <div className="flex md:justify-start justify-center gap-5">
                        <button
                            onClick={handleToggleOffcanvas}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8  rounded"
                        >
                            {t("productAdd1")}
                        </button>
                        <button
                            onClick={() => {
                                if (products.length > 0) openPro()
                                else toast.warning('Please add at least one product')
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-8  rounded"
                        >
                            {t("addproject")}
                        </button>
                    </div>
                    <h1 className="md:ml-0 ml-5">
                        <b>{t("werhouse")}</b>
                    </h1>
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
                            <th className="px-6 py-3">{t("productAdd34")}</th>
                            <th className="px-6 py-3">{t("date")}</th>
                            <th className="px-6 py-3">{t("productCount")}</th>
                            <th className="px-6 py-3">{t("totalWeight")}</th>
                            <th className="px-6 py-3">{t("totalKub")}</th>
                            <th className="px-6 py-3">{t("edit")}</th>
                            <th className="px-6 py-3">{t("delete")}</th>
                            <th className="px-6 py-3">{t("selectCh")}</th>
                        </tr>
                        </thead>
                        <tbody className="text-[1rem] text-gray-700 bg-white text-center">
                        {projectIdInfo ? (
                            projectIdInfo.map((item, i) => (
                                <tr key={i} className="border-b transition duration-300 ease-in-out hover:bg-gray-300">
                                    <th className="px-6 py-5">{currentPage * 10 + (i + 1)}</th>
                                    <th className="px-6 py-5 flex justify-center items-center">
                                        <img
                                            src={
                                                item.attachmentId ? getFile + item.attachmentId : img
                                            }
                                            className="w-10 h-10 object-cover rounded-full scale-150"
                                            alt="img"
                                        />
                                    </th>
                                    <td className="px-6 py-5">{item.owner}</td>
                                    <td className="px-6 py-5">{item.productName}</td>
                                    <td className="px-6 py-5">{item.comment}</td>
                                    <td className="px-6 py-5 overflow-x-auto">
                                        {item.date.slice(0, item.date.indexOf(" "))}
                                    </td>
                                    <td className="px-6 py-5">{item.productCount}</td>
                                    <td className="px-6 py-5">{item.totalWeight}</td>
                                    <td className="px-6 py-5">{item.totalKub}</td>
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
                                            onChange={(e) =>
                                                addProductIds(e.target.checked, item)
                                            }
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
                isAdd={true}
                getProduct={getProjectInfo}
                setProduct={setProductObj2}
                product=""
                handleToggleOffcanvas={handleToggleOffcanvas}
                isOffcanvasOpen={isOffcanvasOpen}
                name={t("addProduct")}
                btnName={t("addProduct")}
                onSave={addProduct}
                setUserId={setUserId}
                werHouseId={projectId}
                wareHouse={projectId}
                lang={lang}
            />
            <OffcanvasProduct
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
                                <option selected disabled>{t("select")}</option>

                                {project &&
                                    project.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="flex justify-between mt-7">
                            <button type="button" onClick={closePro} className="btm-close">
                                {t("close")}
                            </button>
                            <button
                                onClick={() => {
                                    closePro();
                                    showProjectInfoModal();
                                }}
                                className="btmn"
                            >
                                {t("add")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*    Modal */}

            {showModal ? (
                <AddProjectInfoModal showProjectInfoModal={showProjectInfoModal} products={products} addToProduct={addtoProduct}/>
            ) : ''}
        </div>
    );
};

export default ViewMoreW;
