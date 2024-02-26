import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductModal from "./HistoryModal";
import ProjectModal from "./projectModal";
import { Link } from "react-router-dom";
import DownloadModal from "./downloadModal";
import axios from "axios";
import { url, config } from "../api";
import LoadingBtn from "../loading/Loading";

function ProjectCard({
  setProduct,
  i,
  className,
  projects,
  openEdit,
  setProductObj,
  setProjectId,
  getProduct,
  pagination,
}) {
  const [historyList, setHistoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  });
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const { t } = useTranslation();

  useEffect(() => {
    getWerhouse();
  }, [setProjectId]);

  function getWerhouse() {
    if ((pagination - 1) * 4 < 0) getProduct(0, 4);
    else getProduct(Math.floor(pagination - 1), 4);
  }

  const downloadWereHouse = () => {
    setIsLoading(true)
    let addData = {}
    // axios.post(`${url}`, addData, { ...config, responseType: 'blob' })
    //   .then((res) => {
    //     const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'logistic.xlsx';
    //     document.body.appendChild(a);
    //     a.click()
    //     setIsLoading(false);
    //   })
    //   .catch(() => setIsLoading(false))
  }

  return (
    <>
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={i}
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {(pagination - 1) * 4 < 0 ? i + 1 : (pagination - 1) * 4 + (i + 1)}
        </th>
        <td className="px-6 py-4">{projects.name}</td>
        <td className="px-6 py-4">{projects.status}</td>
        <td className="px-6 py-4">{projects.transport}</td>
        <td className="px-6 py-4">{projects.date.slice(0, projects.date.indexOf(" "))}</td>
        {/* <td className="px-6 py-4">
                    $2999
                </td> */}
        <td className="px-6 py-4">
          <a
            onClick={() => {
              openEdit();
              setProjectId(projects);
            }}
            href="#"
            className="font-medium text-[#16A34A] hover:underline"
          >
            {t("edit")}
          </a>
        </td>
        <td className="px-6 py-4">
          <a
            onClick={() => {
              setHistoryList(projects);
              openModal();
            }}
            href="#"
            className="font-medium text-yellow-300 hover:underline"
          >
            {t("wiew")}
          </a>
        </td>
        <td className="px-6 py-4">
          <Link
            onClick={() => {
              sessionStorage.setItem("projectIdViewMore", projects.id);
            }}
            to="/view more"
            className="font-medium text-blue-600 hover:underline"
          >
            {t("more")}
          </Link>
        </td>
        <td className="px-6 py-4">
          <Link
            onClick={downloadWereHouse}
            className="font-medium text-blue-600 hover:underline"
          >
            {isLoading ? <LoadingBtn className={`bg-red-500`} /> : `${t("Download")} ${t('file')}`}
          </Link>
        </td>
      </tr>

    
      {historyList && (
        <ProjectModal
          isOpen={isModalOpen}
          projectList={historyList}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default ProjectCard;
