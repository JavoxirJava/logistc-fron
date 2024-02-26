import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductModal from "./HistoryModal";
import ProjectModal from "./projectModal";
import { Link } from "react-router-dom";
import DownloadModal from "./downloadModal";

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
  const [isModalDown, setIsModalDown] = useState(false);
  const [wereHouseId, setWerHouseIdIn] = useState(null)

  const closeDown = () => setIsModalDown(false);
  const openDown = () => setIsModalDown(true);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const { t } = useTranslation();
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
         {(pagination - 1) * 4 < 0 ? i + 1 : (pagination - 1) * 4 + (i + 1)}
        </th>
        <td class="px-6 py-4">{projects.name}</td>
        <td class="px-6 py-4">{projects.totalKub}</td>
        <td class="px-6 py-4">{projects.productCount}</td>
        <td class="px-6 py-4">{projects.totalWeight}</td>
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
          <a
            onClick={() => {
              openModal();
              setProductObj(projects.wareHouseId);
            }}
            href="#"
            class="font-medium text-[#c0332e] hover:underline"
          >
            {t("delete")}
          </a>
        </td>
        <td class="px-6 py-4">
          <Link
            onClick={() => {
              sessionStorage.setItem("warehouseIdViewMore", projects.wareHouseId);
            }}
            to="/view_more"
            class="font-medium text-blue-600 hover:underline"
          >
            {t("more")}
          </Link>
        </td>
        <td class="px-6 py-4">
          <Link
            onClick={() => {
              openDown();
              setWerHouseIdIn(projects.wareHouseId)
            }}
            class="font-medium text-blue-600 hover:underline"
          >
            {t("Download")}
          </Link>
        </td>
      </tr>
      <DownloadModal wereHouseId={wereHouseId} isOpen={isModalDown} closeDown={closeDown} />
      <ProjectModal isOpen={isModalOpen} deleteWerhouse={deleteWerhouse} onClose={closeModal} />
    </>
  );
}

export default ProjectCard;
