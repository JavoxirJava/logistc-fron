import {useTranslation} from "react-i18next";
import React from 'react';

function AddProjectInfoModal({showProjectInfoModal, products, addToProduct, tozalovchi}) {
    const {t} = useTranslation();
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {t("allProducts")}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={showProjectInfoModal}
                            >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {products.length > 0 && <table className="table w-96 text-center add-product-table">
                                <tbody>
                                <tr>
                                    <th>{t("productCount")}</th>
                                    <th>{t("kg")}</th>
                                    <th>{t("kub")}</th>
                                </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td>{products.length}</td>
                                    <td>{products.map(p => p).reduce((i, p) => i + (p.kg * p.productCount), 0)} ({t('kg')})</td>
                                    <td>{products.map(p => p).reduce((i, p) => i + (p.kub * p.productCount), 0)} ({t('sm')}<sup>3</sup>)</td>
                                </tr>
                                </tbody>
                            </table>}
                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    showProjectInfoModal()
                                }
                            }
                            >
                                {t("close")}
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    addToProduct()
                                    
                                }}
                            >
                                {t("save")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default AddProjectInfoModal;