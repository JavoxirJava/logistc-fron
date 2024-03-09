import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { config, url } from '../api';
import { useTranslation } from "react-i18next";
import LoadingBtn from '../loading/Loading';

const Modal = ({ getCassier, getUser, getProduct, projectId, setProjectIdIn, userId, productId }) => {
    const [showModal, setShowModal] = useState(false);
    const [nextModal, setNextModal] = useState(false);
    const [productKub, setProductKub] = useState(null)
    const [productKg, setProductKg] = useState(null)
    const [projectIdVal, setProjectIdVal] = useState(0)
    const [userIdVal, setUserIdVal] = useState(0)
    const [productIdVal, setProductIdVal] = useState(0)
    const [dataVAlue, setDataVAlue] = useState(0)
    const [kubAndKgVAlue, setKubANdKgVAlue] = useState(0)
    const [priceForRoad, setPriceForRoad] = useState(0)
    const [customsClearancePrice, setCustomsClearancePrice] = useState(0)
    const [cct, setCct] = useState(0)
    const [costChina, setCostChina] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [meassureVal, setMeassureVal] = useState(null)
    const [projectFilterName, setProjectFilterName] = useState('None')
    const [userFilterName, setUserFilterName] = useState('None')
    const [productFilterName, setProductFilterName] = useState('None')
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation();

    useEffect(() => {
        let data = Number(priceForRoad) + Number(customsClearancePrice) + Number(cct) + Number(costChina)
        setTotalPrice(data)
    }, [priceForRoad, customsClearancePrice, cct, costChina])

    const addCasser = () => {
        setIsLoading(true)
        let addData = {
            projectId: Number(projectIdVal),
            userId: Number(userIdVal),
            productId: Number(productIdVal),
            measure: meassureVal,
            priceOfKub: Number(dataVAlue),
            totalKub: Number(kubAndKgVAlue),
            priceForRoad: Number(priceForRoad),
            customsClearancePrice: Number(customsClearancePrice),
            cct: Number(cct),
            costChina: Number(costChina),
            totalPrice: Number(totalPrice)
        }
        axios.post(`${url}cashier/one`, addData, config)
            .then(res => {
                if (res.data.success === true) toast.success(t('cashierSuccessfullySaved'))
                if (res.data.success === false) toast.warning(t("listWarning"))
                setNextModal(false);
                getCassier();
                setTotalPrice(0)
                setKubANdKgVAlue(0)
                setProductKg(0)
                setProductKub(0)
                setPriceForRoad(0)
                setCustomsClearancePrice(0)
                setCct(0)
                setCostChina(0)
                setIsLoading(false)
            })
            .catch(err => {
                console.log("Error adding information: ", err);
                setIsLoading(false)
            })
    }

    const trueFalseCashierModal = () => {
        function isObjectValid(obj) {
            for (let key in obj) {
                if (!obj[key]) {
                    return false; // Agar inputlardan birortasi bulsa xam (undefined, null, false, 0, NaN, ''), false qaytariladi
                }
            }
            return true; // xammasi 100% tuldirilsa true qaytaradi
        }

        let result = isObjectValid({
            projectId: Number(projectIdVal),
            userId: Number(userIdVal),
            productId: Number(productIdVal),
            measure: meassureVal,
            priceOfKub: Number(dataVAlue),
            totalKub: Number(kubAndKgVAlue),
            priceForRoad: Number(priceForRoad),
            customsClearancePrice: Number(customsClearancePrice),
            cct: Number(cct),
            costChina: Number(costChina),
            totalPrice: Number(totalPrice)
        })
        
        if (result === true) {
            setNextModal(true)
            setShowModal(false)
        } else toast.warning(t('cashierWarningNextBtn'))
    }

    const idFunc = (item) => {
        setProductKub(productId.find(i => i.id == item))
        setProductKg(productId.find(i => i.id == item))
    }

    const projectNameFunc = pjN => setProjectFilterName(projectId && projectId.find(n => n.projectId == pjN))
    const productNameFunc = pdN => setProductFilterName(productId && productId.find(n => n.id == pdN))
    const userNameFunc = uN => setUserFilterName(userId && userId.find(n => n.id == uN))


    useEffect(() => {
        selectKubAndKg()
    }, [dataVAlue])

    const selectKubAndKg = () => {
        if (meassureVal == 'kub') setKubANdKgVAlue(Number(productKub.totalKub) * dataVAlue)
        if (meassureVal == 'kg') setKubANdKgVAlue(Number(productKg.totalWight) * dataVAlue)
    }

    return (
        <div>
            <button
                onClick={() => {
                    setShowModal(true)
                }}
                className="duration-300 bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded"
            >{t('addd')}</button>
            {showModal && (
                <div
                    className="zoom-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative md:w-[100%] w-[80vw] my-6 mx-auto max-w-3xl">
                        <div
                            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
                            <div className="flex items-center justify-between border-b pb-2 rounded-t">
                                <h3 className="text-2xl font-semibold">{t('cassierData')}</h3>
                                <button
                                    className='p-1 ml-auto border-0 text-4xl hover:scale-110 duration-200'
                                    onClick={() => setShowModal(false)}>×
                                </button>
                            </div>
                            <form className="flex md:justify-evenly mt-5 flex-wrap">
                                <select
                                    id="projectId"
                                    onChange={e => {
                                        getUser(e.target.value)
                                        setProjectIdVal(e.target.value)
                                        projectNameFunc(e.target.value)
                                        setProjectIdIn(e.target.value)
                                    }}
                                    disabled={!projectId}
                                    className=" p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                    <option selected disabled>{t("select")}</option>
                                    {projectId && projectId.map((item) => (
                                        <option value={item.projectId} key={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <select
                                    id="userId"
                                    onChange={e => {
                                        getProduct(e.target.value)
                                        setUserIdVal(e.target.value)
                                        userNameFunc(e.target.value)
                                    }}
                                    disabled={!userId}
                                    className="  p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                    <option selected disabled>{t("productSUser")}</option>
                                    {userId && userId.map((item) => (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <select
                                    id="productId"
                                    disabled={!productId}
                                    onChange={e => {
                                        idFunc(e.target.value)
                                        setProductIdVal(e.target.value)
                                        productNameFunc(e.target.value)
                                    }}
                                    className="p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                    <option selected disabled>{t("selectP")}</option>
                                    {productId && productId.map(item => (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <select
                                    id="measure"
                                    disabled={!productId}
                                    onChange={e => setMeassureVal(e.target.value)}
                                    className=" p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                    <option selected disabled>{t("kubkg")}</option>
                                    <option value="kub">{t("kub")}</option>
                                    <option value="kg">{t("kg")}</option>
                                </select>
                            </form>
                            <form className="mx-auto flex justify-evenly flex-wrap">
                                <div className='flex flex-col w-[49%] mt-4'>
                                    <label className='text-[0.885rem]' htmlFor='priceOfKub'>{t("pricekubkg")}</label>
                                    <input
                                        onChange={e => setDataVAlue(e.target.value)}
                                        id='priceOfKub'
                                        type="number"
                                        disabled={!meassureVal}
                                        placeholder={t("enterPrice")}
                                        className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 p-2.5 " />
                                </div>
                                <div className='flex flex-col w-[49%] mt-4'>
                                    <label htmlFor='totalKub'>{t("priceresult")}</label>
                                    <input
                                        id='totalKub'
                                        disabled
                                        value={kubAndKgVAlue}
                                        placeholder={t("priceresult")}
                                        className="bg-gray-200 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </div>
                                <div className='flex flex-col w-[49%] mt-4'>
                                    <label htmlFor='priceForRoad'>{t("priceForRoad")}</label>
                                    <input
                                        id='priceForRoad'
                                        onChange={e => setPriceForRoad(e.target.value)}
                                        type='number'
                                        placeholder={t("enterPrice")}
                                        className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </div>
                                <div className='flex flex-col w-[49%] mt-4'>
                                    <label htmlFor='customsClearancePrice'>{t("summaRastamojka")}</label>
                                    <input
                                        id='customsClearancePrice'
                                        onChange={e => setCustomsClearancePrice(e.target.value)}
                                        type='number'
                                        placeholder={t("enterPrice")}
                                        className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </div>
                                <div className='flex flex-col w-[49%] mt-4'>
                                    <label htmlFor='cct'>{t("summaCct")}</label>
                                    <input
                                        id='cct'
                                        onChange={e => setCct(e.target.value)}
                                        type='number'
                                        placeholder={`${t("enter")} ${t("summaCct")}`}
                                        className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </div>
                                <div className='flex flex-col w-[49%] mt-4'>
                                    <label htmlFor='costChina'>{t("summaChina")}</label>
                                    <input
                                        id='costChina'
                                        onChange={e => setCostChina(e.target.value)}
                                        type='number'
                                        placeholder={`${t("enter")} ${t("summaChina")}`}
                                        className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </div>
                                <div className='flex flex-col w-full mt-4'>
                                    <label htmlFor='totalPrice'>{t("totalPrice")}</label>
                                    <input
                                        id='totalPrice'
                                        value={totalPrice}
                                        disabled
                                        placeholder={t("totalPrice")}
                                        className="bg-gray-200 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </div>
                            </form>
                            <div className='flex md:justify-end justify-center  mt-4'>
                                <button
                                    onClick={() => {
                                        setTotalPrice(0)
                                        setKubANdKgVAlue(0)
                                        setShowModal(false)
                                    }}
                                    className='py-2 px-8 mr-3 bg-red-500 rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-red-200 duration-300'>
                                    {t('close')}
                                </button>
                                <button
                                    onClick={trueFalseCashierModal}
                                    className='py-2 px-8 bg-[#16A34A] rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-green-200 duration-300'>
                                    {t("next")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {nextModal && (
                <div
                    className="zoom-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative md:w-[100%] w-[80vw] my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
                            <div className="flex items-center justify-between border-b pb-2 rounded-t">
                                <h3 className="text-2xl font-semibold">{t("cassierDatanextModal")}</h3>
                                <button
                                    className='p-1 ml-auto border-0 text-4xl hover:scale-110 duration-200'
                                    onClick={() => setNextModal(false)}>×</button>
                            </div>
                            {/* next modal body */}
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t('projectName')}:</p>
                                <p className='font-bold'>{projectFilterName && projectFilterName.name}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t("userName")}:</p>
                                <p className='font-bold'>{userFilterName && userFilterName.name}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t('productName')}:</p>
                                <p className='font-bold'>{productFilterName && productFilterName.name}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t("measure")}:</p>
                                <p className='font-bold'>{meassureVal && meassureVal}</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t("PriceOF")} {meassureVal}:</p>
                                <p className='font-bold'>{dataVAlue && dataVAlue} $</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t("resultPriceOf")} {meassureVal}:</p>
                                <p className='font-bold'>{kubAndKgVAlue && kubAndKgVAlue} $</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t("priceForRoad")}:</p>
                                <p className='font-bold'>{priceForRoad && priceForRoad} $</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t('summaRastamojka')}:</p>
                                <p className='font-bold'>{customsClearancePrice && customsClearancePrice} $</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t("summaCct")}:</p>
                                <p className='font-bold'>{cct && cct} $</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t("summaChina")}:</p>
                                <p className='font-bold'>{costChina && costChina} $</p>
                            </div>
                            <div className='flex justify-between items-center mt-3 border-b-2 border-dotted pb-1 text-[1.1rem] font-medium'>
                                <p>{t('totalpriceand')}:</p>
                                <p className='font-bold'>{totalPrice && totalPrice} $</p>
                            </div>
                            <div className='flex md:justify-end justify-center  mt-4'>
                                <button
                                    onClick={() => {
                                        setTotalPrice(0)
                                        setKubANdKgVAlue(0)
                                        setNextModal(false)
                                    }}
                                    className='py-2 px-8 mr-3 bg-red-500 rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-red-200 duration-300'>
                                    {t('close')}
                                </button>
                                <button
                                    onClick={addCasser}
                                    disabled={isLoading}
                                    className={`${isLoading ? 'cursor-not-allowed opacity-60' : ''} py-2 px-8 bg-[#16A34A] rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-green-200 duration-300`}>
                                    {isLoading ? <LoadingBtn /> : t('save')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal
