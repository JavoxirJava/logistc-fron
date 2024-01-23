import React, { useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";
import ProductModal from './HistoryModal';
import ProjectModal from './projectModal';


function ProjectCard({className, projects, openEdit, setProductObj, setProjectId, getProduct, pagination}) {

    
    const [historyList, setHistoryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    console.log();
    const {t} = useTranslation();

    useEffect(() => {
        getProduct(pagination, 4)
    }, [setProjectId])

    return (
        <div
        onClick={async() => {
            await setProjectId(projects)
            getProduct(pagination, 4)
        }}
            className={`flex media-product p-8 card-main border border-blue-300 w-full h-max bg-blue-100 ${className} overflow-hidden`}>
            <div className='card-col w-11/12 pt-2 ps-2'>
                <div className='h-8/12 card-col-row w-full flex media-product'>
                    <div className='sm:w-[22%]'>
                        <p className='opacity-70'>{t("productAdd3")}</p>
                       <p className='font-bold'>{projects ? projects.name : 0}</p>
                    </div>
                    <div className='sm:w-[20%]'>
                        <p className='opacity-70'>{t("card2")}</p>
                        <p className='font-bold'>{projects ? projects.status : 'no status'}</p>
                    </div>
                    {/* <div className='sm:w-[30%] lg:ms-3'>
                        <p className='opacity-70'>{t("card3")}</p>
                        <p className='font-bold'>{projects ? projects.date.substring(0, 10) : "April 23, 2023"}</p>
                    </div> */}
                    <div className='sm:w-[64%]'>
                        <p className='opacity-70'>{t("card5")}</p>
                        <p className='font-bold'>{projects ? projects.address : "No location"}</p>
                    </div>
                </div>
                
            </div>
            <div className='card-col w-2/12 flex flex-col gap-3 justify-center my-auto h-10 media-product-button'>
                <button onClick={() => {
                    openEdit();
                    setProductObj(projects);
                }}
                        className="inline-flex justify-center sm:w-9/12 w-[200px] rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >{t("edit")}</button>
                  <button onClick={() => {
                    setHistoryList(projects);
                    openModal();
                }}
                        className="inline-flex justify-center sm:w-9/12 w-[200px] rounded-md border border-gray-300 shadow-sm py-2 bg-yellow-400 text-sm font-medium text-white"
                >{t("history5")}</button>
            </div>
            {historyList && <ProjectModal isOpen={isModalOpen} projectList={historyList} onClose={closeModal} />}

        </div>
    );
}

export default ProjectCard;