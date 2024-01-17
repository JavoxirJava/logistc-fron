import React, { useState } from "react";
import Modal from "./HistoryModal";

const HistoryInfo = ({ history, className }) => {
    const [historyList, setHistoryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <>
            {history.length && history.map((item, i) => (
                <div
                    key={i}
                    className={`w-full ${className} history-info-bg border rounded-md border-slate-400 lg:px-6 px-2 mt-2
                    lg:py-4 py-2 text-center flex justify-center sm:items-center`}
                >
                    <div className="lg:w-[150px] md:w-[100px] sm:w-[80px] w-[50px]">
                        <p className="opacity-70">Number</p>
                        <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]" >
                            {item.productIdNumber ? item.productIdNumber : 0}
                        </p>
                    </div>
                    <div className="lg:w-[300px] md:w-[170px] sm:w-[130px] w-[100px]">
                        <p className="opacity-70">Current Location</p>
                        <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]" >
                            {item.address ? item.address : "No location"}
                        </p>
                    </div>
                    <div className="lg:w-[150px] md:w-[100px] sm:w-800px] w-[50px]">
                        <p className="opacity-70">Status</p>
                        <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]  text-green-500">
                            {item.status ? item.status : "Completed"}
                        </p>
                    </div>
                    <div className="lg:w-[150px] md:w-[120px] sm:w-[100px] w-[50px]">
                        <p className="opacity-70">ETD</p>
                        <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]" >
                            {item.createdAt ? item.createdAt.substring(0, 10) : "April 23, 2022"}
                        </p>
                    </div>
                    <div className="lg:w-[150px] md:w-[120px] sm:w-[100px] w-[50px]">
                        <p className="opacity-70">Owner</p>
                        <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]" >
                            {item.owner ? item.owner : "No Owner"}
                        </p>
                    </div>
                    <div className="lg:w-[150px] md:w-[120px] sm:w-[100px] w-[50px]">
                        <p className="opacity-70">Product</p>
                        <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]" >
                            {item.name ? item.name : "No Product"}
                        </p>
                    </div>
                    <div className="w-[250px]">
                        <button
                            onClick={() => {
                                setHistoryList(item);
                                openModal();
                            }}
                            className="py-2 px-6 bg-blue-800 border border-red-500 rounded-md
                            text-white font-bold active:scale-95 duration-300 tracking-wide"
                        >
                            view details
                        </button>
                    </div>
                </div>
            ))}
            {historyList && <Modal isOpen={isModalOpen} historyList={historyList} onClose={closeModal} />}
        </>
    );
};

export default HistoryInfo;
