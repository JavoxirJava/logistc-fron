import React, { useState } from "react";
import Modal from "./HistoryModal";
import { useTranslation } from "react-i18next";
import Empty from "../Empty";

const HistoryInfo = ({ history, className }) => {
  const [historyList, setHistoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const { t } = useTranslation();

  return (
    <>
      {history ? (
        history.map((item, i) => (
          <div
            key={i}
            className={`w-full ${className} history-info-bg rounded-lg border border-slate-400 lg:px-6 px-2 mt-2
                    lg:py-4 py-2 text-center flex justify-center sm:items-center`}
          >
            <div className="flex flex-col items-center gap-5 xl:flex-row w-full">
            <div className="w-full flex sm:flex-row flex-col">
              <div className="sm:w-6/12 w-full flex justify-between">
                <div className="lg:w-[150px] ">
                  <p className="opacity-70">{t("history6")}</p>
                  <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]">
                    {item.productIdNumber ? item.productIdNumber : 0}
                  </p>
                </div>
                <div className="lg:w-[280px] ">
                  <p className="opacity-70">{t("history7")}</p>
                  <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]">
                    {item.address ? item.address.slice(0, item.address.indexOf(",")) : "No location"}
                  </p>
                </div>
                <div className="lg:w-[150px] ">
                  <p className="opacity-70">{t("history8")}</p>
                  <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]  text-green-500">
                    {item.status ? item.status : "Completed"}
                  </p>
                </div>
              </div>
              <div className="sm:w-6/12 w-full flex justify-between">
                <div className="lg:w-[130px] ">
                  <p className="opacity-70">{t("history9")}</p>
                  <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]">
                    {item.date ? item.date.slice(0, item.date.indexOf(" ")) : "April 23, 2022"}
                  </p>
                </div>
                <div className="lg:w-[130px] ">
                  <p className="opacity-70">{t("history10")}</p>
                  <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]">
                    {item.owner ? item.owner : "No Owner"}
                  </p>
                </div>
                <div className="lg:w-[130px] ">
                  <p className="opacity-70">{t("history11")}</p>
                  <p className="font-bold lg:text-[.9rem] md:text-[.7rem] sm:text-[.5rem] text-[.5rem]">
                    {item.productName ? item.productName : "No Product"}
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:w-[200px]">
              <button
                onClick={() => {
                  setHistoryList(item);
                  openModal();
                }}
                className="sm:py-2 sm:px-6 px-2 py-1 bg-blue-800 border rounded-md
                            text-white font-bold active:scale-95 duration-300 tracking-wide"
              >
                {t("history5")}
              </button>
            </div>
            </div>

          </div>
        ))
      ) : (
        <Empty />
      )}
      {historyList && (
        <Modal
          isOpen={isModalOpen}
          historyList={historyList}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default HistoryInfo;
