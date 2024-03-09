import NavBar from "../navbar/NavBar";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { byIdObj, config, url } from "../api";
import ReactPaginate from "react-paginate";
import DownloadModal from "./downloadModal";
import { toast } from "react-toastify";
import CashierNavBar from "../user/navbar/NavBarCashier";

const Cassir = ({ changeLanguage, lang, cashierUrl }) => {
    const [cassier, setCasseir] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const [projectIdIn, setProjectIdIn] = useState(null);
    const [nextModal, setNextModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [productId, setProductId] = useState(null);
    const [productobj, setProductObj] = useState(null);
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalDown, setIsModalDown] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getCassier();
        getProject();
        cashierNotFound()
    }, [lang]);

    useEffect(() => {
        cashierNotFound();
    }, [])

    const cashierNotFound = () => {
        const role = sessionStorage.getItem('role')
        if (cashierUrl === 'ROLE_CASHIER') return cashierUrl
        if (cashierUrl === '') cashierUrl = role
    }

    const openModal = () => setNextModal(true)
    const closeModal = () => setNextModal(false)
    const closeDown = () => setIsModalDown(false);
    const openDown = () => setIsModalDown(true);

    // get caser
    const getCassier = () => {
        axios.get(`${url}cashier/all?lang=${lang}`, config)
            .then((res) => {
                setCasseir(res.data.body.object);
                setPage(res.data.body.totalPage)
            }).catch(() => console.log(`cashier/all?lang=${lang}: error`))
    };

    // get project
    const getProject = () => {
        axios
            .get(`${url}project/list?lang=${lang}`, config)
            .then((res) => setProjectId(res.data.body))
            .catch(() => console.log(`project/list?lang=${lang}: error`));
    };

    // get user
    const getUser = (id) => {
        axios
            .get(`${url}user/project?projectId=${id}&lang=${lang}`, config)
            .then((res) => setUserId(res.data.body))
            .catch(() => console.log(`user/project?projectId=${id}&lang=${lang}: error`));
    };

    // get product id
    const getProduct = (id) => {
        axios
            .get(`${url}product/list?userId=${id}&projectId=${projectIdIn}&lang=${lang}`, config)
            .then((res) => setProductId(res.data.body))
            .catch(() => console.log(`product/list?userId=${id}&projectId=${projectIdIn}&lang=${lang}: error`));
    };

    const handelPageClick = (event) => {
        const pageNumber = event.selected;
        setCurrentPage(pageNumber);
        axios.get(`${url}cashier/all?page=${pageNumber}&size=10&lang=${lang}`, config)
            .then((res) => setCasseir(res.data.body.object))
            .catch((err) => console.log("error page: ", err));
    };

    const cashierActive = (id) => {
        axios.post(`${url}cashier/active?cashierId=${id}`, '', config)
            .then(() => {
                getCassier()
            })
            .catch(() => { })
    }

    const searchHandler = () => {
        byIdObj('projectIdFilter').value = t("selectProject")
        let addData = {
            startCashier: byIdObj('startCashier').value ? byIdObj('startCashier').value : null,
            endCashier: byIdObj('endCashier').value ? byIdObj('endCashier').value : null
        }
        if (addData.startCashier === null && addData.endCashier === null) {
            axios.get(`${url}cashier/search?lang=${lang}`, config)
                .then(res => {
                    if (res.data.success === true) setCasseir(res.data.body)
                    else if (res.data.success === false) setCasseir(null)
                })
                .catch(() => console.log('Error'))
        }
        if (addData.startCashier !== null && addData.endCashier !== null) {
            axios.get(`${url}cashier/search?start=${addData.startCashier}&finish=${addData.endCashier}&lang=${lang}`, config)
                .then(res => {
                    if (res.data.success === true) setCasseir(res.data.body)
                    else if (res.data.success === false) setCasseir(null)
                })
                .catch(() => console.log('Error'))
        }
        if (addData.startCashier === null) {
            axios.get(`${url}cashier/search?finish=${addData.endCashier}&lang=${lang}`, config)
                .then(res => {
                    if (res.data.success === true) setCasseir(res.data.body)
                    else if (res.data.success === false) setCasseir(null)
                })
                .catch(() => console.log('Error'))
        }
        if (addData.endCashier === null) {
            axios.get(`${url}cashier/search?start=${addData.startCashier}&lang=${lang}`, config)
                .then(res => {
                    if (res.data.success === true) setCasseir(res.data.body)
                    else if (res.data.success === false) setCasseir(null)
                })
                .catch(() => console.log('Error'))
        }
    }

    const selectFilterHandler = id => {
        byIdObj('startCashier').value = ''
        byIdObj('endCashier').value = ''
        axios.get(`${url}cashier/search?lang=${lang}&projectId=${id}`, config)
            .then(res => {
                if (res.data.success === true) setCasseir(res.data.body)
                else if (res.data.success === false) setCasseir(null)
            }).catch(() => { })
    }

    return (
        <div className="min-h-screen">
            {cashierUrl === 'ROLE_CASHIER'
                ? <CashierNavBar lang={lang} dashboard={'border-b-red-600 border-b text-slate-900'} />
                : <NavBar
                    changeLang={changeLanguage}
                    cassier={"border-b-red-600 border-b text-slate-900"}
                    lang={lang}
                />
            }
            <div className="background min-h-screen pt-20 px-10 md:px-0">
                <div className="md:w-[80vw] w-full mx-auto mt-[1.5rem]">
                    <div className="flex flex-wrap justify-between items-end xl:flex-nowrap">
                        <div className="flex justify-start items-center">
                            <Modal
                                projectId={projectId}
                                setProjectIdIn={setProjectIdIn}
                                userId={userId}
                                productId={productId}
                                getCassier={getCassier}
                                getUser={getUser}
                                getProduct={getProduct}
                            />
                            <button onClick={openDown} className="ms-3 duration-200 bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded">{t('download')}</button>
                        </div>
                        <DownloadModal isOpen={isModalDown} closeDown={closeDown} />
                        <div className="flex justify-start flex-wrap sm:flex-nowrap xl:justify-end w-full mt-7 xl:mt-0">
                            <div className="flex flex-col w-full xl:w-48 mt-3 sm:mt-0 sm:mr-2">
                                <label htmlFor="projectIdFilter">{t("selectProject")}</label>
                                <select
                                    id="projectIdFilter"
                                    onChange={e => selectFilterHandler(e.target.value)}
                                    className="px-5 py-2.5 duration-300 text-sm text-gray-900 outline-0 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                    <option selected disabled>{t("selectProject")}</option>
                                    {projectId && projectId.map((item) => (
                                        <option value={item.projectId} key={item.projectId}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col w-full xl:w-48 mt-3 sm:mt-0 sm:mr-2">
                                <label htmlFor="startCashier">{t('start')}</label>
                                <input
                                    id="startCashier"
                                    onChange={searchHandler}
                                    type="date"
                                    placeholder={t("productSearch")}
                                    className="outline-none px-5 py-1.5 border-slate-100 border-2 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full xl:w-48 mt-3 sm:mt-0">
                                <label htmlFor="endCashier">{t('end')}</label>
                                <input
                                    id="endCashier"
                                    onChange={searchHandler}
                                    type="date"
                                    placeholder={t("productSearch")}
                                    className="outline-none px-5 py-1.5 border-slate-100 border-2 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th className="px-6 py-3">#</th>
                                    <th className="px-6 py-3">{t("userName")}</th>
                                    <th className="px-6 py-3">{t("projectName")}</th>
                                    <th className="px-6 py-3">{t("productName")}</th>
                                    <th className="px-6 py-3">{t("date")}</th>
                                    <th className="px-6 py-3">{t("price")}</th>
                                    <th className="px-6 py-3">{t("action")}</th>
                                    <th className="px-6 py-3">{t("calculated")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cassier ? (
                                    cassier.map((item, i) => (
                                        <tr key={i} className="bg-white ">
                                            <td className="px-6 py-3">
                                                {(currentPage * 10) + (i + 1)}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.username}
                                            </td>
                                            <td className="px-6 py-4">{item.projectName}</td>
                                            <td className="px-6 py-4">{item.productName}</td>
                                            <td className="px-6 py-4">{item.createdAt}</td>
                                            <td className="px-6 py-4">{item.totalPrice}</td>
                                            <td className="px-6 py-4">
                                                <a
                                                    onClick={() => {
                                                        openModal();
                                                        setProductObj(item);
                                                    }}
                                                    href="#"
                                                    className="font-medium text-[#2e46c0] hover:underline">
                                                    {t("wiew")}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <input onChange={() => {
                                                    cashierActive(item.id)
                                                }} checked={item.active} type="checkbox" className="w-5 h-5" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="odd:bg-white even:bg-gray-50 border-b ">
                                        <td colSpan="8" className="px-4 py-4">
                                            <h1 className="text-center text-xl text-black">{t("notfound")}</h1>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 pb-10 lg:mb-10">
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
            {nextModal && (
                <div className="zoom-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative md:w-[100%] w-[80vw] my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
                            <div className="flex items-center justify-between border-b pb-2 rounded-t">
                                <h3 className="text-2xl font-semibold">
                                    {t("wiew")}
                                </h3>
                                <button
                                    className="p-1 ml-auto border-0 text-4xl hover:scale-110 duration-200"
                                    onClick={closeModal}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("productName")}:</p>
                                <p className="font-bold">
                                    {productobj && productobj.productName}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("userName")}:</p>
                                <p className="font-bold">
                                    {productobj && productobj.username}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("projectName")}:</p>
                                <p className="font-bold">
                                    {productobj && productobj.projectName}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("date")}:</p>
                                <p className="font-bold">{productobj && productobj.createdAt}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("measure")}:</p>
                                <p className="font-bold">{productobj && productobj.totalKub} {productobj && productobj.measure}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("price")} {productobj && productobj.measure}:</p>
                                <p className="font-bold">{productobj && productobj.priceOfKub} $</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("cct")}:</p>
                                <p className="font-bold">{productobj && productobj.cct} $</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("summaChina")}:</p>
                                <p className="font-bold">{productobj && productobj.costChina} $</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("summaRastamojka")}:</p>
                                <p className="font-bold">{productobj && productobj.customsClearancePrice} $</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("priceForRoad")}:</p>
                                <p className="font-bold">{productobj && productobj.priceForRoad} $</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium">
                                <p>{t("totalPrice")}:</p>
                                <p className="font-bold">
                                    {productobj && productobj.totalPrice} $
                                </p>
                            </div>

                            <div className="flex md:justify-end justify-center  mt-4">
                                <button
                                    onClick={closeModal}
                                    className="py-2 px-8 mr-3 bg-red-500 rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-red-200 duration-300"
                                >
                                    Close
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cassir;
