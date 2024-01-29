import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import ProductModal from './HistoryModal';
import ProjectModal from './projectModal';


function ProjectCard({ className, deleteWerhouse, projects, openEdit, setProductObj, setWerHouseId, getProduct, pagination }) {


    const [historyList, setHistoryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const { t } = useTranslation();

    useEffect(() => {
        getProduct(pagination, 4)
    }, [setWerHouseId])

    return (
        <div
            onClick={async () => {
                // await setWerHouseId(projects)
                await setWerHouseId(projects)
                getProduct(pagination, 4)
                sessionStorage.setItem('setWerhouse', projects.wareHouseId)
            }}
            className={`flex media-product sm:px-3 px-2 sm:py-7 py-4 card-main border border-blue-300 hover:cursor-pointer hover:shadow-md duration-200 w-full h-max bg-blue-100 ${className} overflow-hidden`}>
            <div className='card-col w-full '>
                <div className='h-8/12 card-col-row w-full flex xl:flex-row sm:flew-row flex-col lg:gap-x-20  media-product h-max'>
                    <div className='xl:w-[22%] w-full flex lg:gap-x-5 justify-between h-max'>
                        <div className='w-50'>
                            <h1 className='font-bold text-lg'>{projects ? projects.name : 0}</h1>
                        </div>
                        
                    </div>
                    {/* <div className='sm:w-[30%] lg:ms-3'>
                        <p className='opacity-70'>{t("card3")}</p>
                        <p className='font-bold'>{projects ? projects.date.substring(0, 10) : "April 23, 2023"}</p>
                    </div> */}
                    
                </div>
            </div>
            <div className='sm:w-2/12 h-max flex  gap-3 justify-center my-auto media-product-button sm:me-10'>
                <button onClick={() => {
                    openEdit();
                    setProductObj(projects.wareHouseId);
                }}
                    className="inline-flex justify-center sm:w-9/12 px-5 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >{t("edit")}</button>
                 <button onClick={() => {
                    openModal();
                    setProductObj(projects.wareHouseId);
                }}
                    className="inline-flex justify-center sm:w-9/12 px-5 rounded-md border border-gray-300 shadow-sm py-2 bg-red-700 text-sm font-medium text-white"
                >{t("delete")}</button>
                
            </div>
            <ProjectModal isOpen={isModalOpen} deleteWerhouse={deleteWerhouse} onClose={closeModal} />

        </div>
    );
}

export default ProjectCard;