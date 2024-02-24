import React, { useState } from 'react'
import './Modal.css'
import axios from 'axios';
import { config, url } from '../api';
import { toast } from 'react-toastify';

const Modal = ({getCassier}) => {
    const [showModal, setShowModal] = useState(false);

    const addCasser = () => {
        let addData = {
            projectId: 0,
            userId: 0,
            productId: 0,
            totalKub: 0,
            measure: "string",
            priceOfKub: 0,
            priceForRoad: 0,
            customsClearancePrice: 0,
            cct: 0,
            costChina: 0,
            totalPrice: 0
        }
        axios.post(`${url}cashier/one`, addData, config)
        .then(() => {
            setShowModal(false);
            getCassier();
            toast.success('Successfully saved cassier✅')
        })
        .catch(err => {
            console.log("Caser add qilishda error: ", err);
            console.log(addData);
        })
    }
    return (
        <div>
            <button
                onClick={
                    () => {
                        setShowModal(true);
                    }
                }
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded"
            >
                Add
            </button>
            {showModal ? (
                <div>
                    <div
                        className="zoom-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative md:w-[100%] w-[80vw] my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Add
                                    </h3>
                                    <button className='p-1 ml-auto border-0 text-2xl'
                                        onClick={() => setShowModal(false)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <form className=" mx-auto flex justify-evenly gap-5 mt-5 flex-wrap">
                                    <select id="projectId" className=" p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected disabled>Select Project</option>
                                        <option value="US">United States</option>
                                    </select>
                                    <select id="userId" className="  p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected disabled>Select User</option>
                                        <option value="US">United States</option>
                                    </select>
                                    <select id="productId" className="  p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected disabled>Select Product</option>
                                        <option value="US">United States</option>
                                    </select>
                                    <select id="measure" className=" p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected disabled>Kub And Kg</option>
                                        <option value="Kub">Kub</option>
                                        <option value="Kg">Kg</option>
                                    </select>
                                </form>
                                <form className="mx-auto flex justify-evenly gap-2 my-5 flex-wrap">
                                    <input type="text" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    <input type="text" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    <input type="text" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    <input type="text" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </form>
                                <form className='mx-auto flex justify-evenly gap-2 my-5 flex-wrap'>
                                    <input type="text" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    <input type="text" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}

        </div>
    )
}

export default Modal
