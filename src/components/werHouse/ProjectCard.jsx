import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductModal from "./HistoryModal";
import ProjectModal from "./projectModal";
import { Link } from "react-router-dom";

function ProjectCard({
  setProduct,
  i,
  loading,
  className,
  deleteWerhouse,
  projects,
  openEdit,
  setProductObj,
  setWerHouseId,
  getProduct,
  pagination,
}) {
  const [historyList, setHistoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const { t } = useTranslation();

  console.log(projects);

  useEffect(() => {
    getWerhouse();
  }, [setWerHouseId]);

  function getWerhouse() {
    if ((pagination - 1) * 4 < 0) getProduct(0, 4);
    else getProduct(Math.floor(pagination - 1), 4);
  }

  return (
    <>
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={i}
      >
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {i + 1}
        </th>
        <td class="px-6 py-4">{projects.name}</td>

        {/* <td class="px-6 py-4">
                    $2999
                </td> */}
        <td class="px-6 py-4">
          <a
            onClick={() => {
              openEdit();
              setProductObj(projects.wareHouseId);
            }}
            href="#"
            class="font-medium text-[#16A34A] hover:underline"
          >
            {t("edit")}
          </a>
        </td>
        <td class="px-6 py-4">
          <ax
            onClick={() => {
              openModal();
              setProductObj(projects.wareHouseId);
            }}
            href="#"
            class="font-medium text-yellow-300 hover:underline"
          >
            {t("wiew")}
          </ax>
        </td>
        <td class="px-6 py-4">
          <Link
            onClick={() => {
              sessionStorage.setItem("projectIdViewMore", projects.id);
            }}
            to="/view more"
            class="font-medium text-blue-600 hover:underline"
          >
            {t("more")}
          </Link>
        </td>
      </tr>
    </>
    //    {/* <div className='card-col w-full '>
    //         <div className='h-8/12 card-col-row w-full flex xl:flex-row sm:flew-row flex-col lg:gap-x-20  media-product h-max'>
    //             <div className='xl:w-[22%] w-full flex lg:gap-x-5 justify-between h-max'>
    //                 <div className='w-50'>
    //                     <h1 className='font-bold text-lg'>{projects ? projects.name : 0}</h1>
    //                 </div>

    //             </div>

    //         </div>
    //     </div> */}
    // {/* <div className='sm:w-2/12 h-max flex  gap-3 justify-center my-auto media-product-button sm:me-10'>
    //     <button onClick={() => {
    //         openEdit();
    //         setProductObj(projects.wareHouseId);
    //     }}
    //         className="inline-flex justify-center sm:w-9/12 px-5 rounded-md border border-gray-300 shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
    //     >{t("edit")}</button>
    //      <button onClick={() => {
    //         openModal();
    //         setProductObj(projects.wareHouseId);
    //     }}
    //         className="inline-flex justify-center sm:w-9/12 px-5 rounded-md border border-gray-300 shadow-sm py-2 bg-red-700 text-sm font-medium text-white"
    //     >{t("delete")}</button>

    // </div> */}
    // {/* <ProjectModal isOpen={isModalOpen} deleteWerhouse={deleteWerhouse} onClose={closeModal} /> */}
  );
}

export default ProjectCard;
