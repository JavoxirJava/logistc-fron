import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductModal from "./HistoryModal";
import ProjectModal from "./projectModal";
import { Link } from "react-router-dom";
import DownloadModal from "./downloadModal";
import axios from "axios";
import { url, config } from "../api";
import LoadingBtn from "../loading/Loading";
import { toast } from "react-toastify";

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
  const [projectList, setProjectList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenStatus, setIsModalOpenStatus] = useState(false);
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

  const downloadWereHouse = (id) => {
    setIsLoading(true)
    if (id === null) {
      toast.error(t('notFoundFile'))
      setIsLoading(false)
    } else {
      axios.get(`${url}attachment/getFile/${id}`, { ...config, responseType: 'blob' })
        .then((res) => {
          const contentType = res.headers['content-type'];
          const blob = new Blob([res.data], { type: contentType });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'logistic';
          document.body.appendChild(a);
          a.click()
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false))
    }
  }

  const editPorjectStatus = () => {
    let status = document.getElementById('productStatusEdit').value,
      id = projectList.id
    axios.put(`${url}project/status?status=${status}&projectId=${id}`, '', config)
      .then(() => {
        setIsModalOpenStatus(false)
        toast.success(t('projectStatusEd'))
        document.getElementById('productStatusEdit').value= ''
      }).catch(() => {
        document.getElementById('productStatusEdit').value= ''
        toast.warning(t('projectStatusEdErr'))
      })
  }

  return (
    <>
      {projects ? <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={i}
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {(pagination - 1) * 4 < 0 ? i + 1 : (pagination - 1) * 4 + (i + 1)}
        </th>
        <td className="px-6 py-4">{projects ? projects.name : ''}</td>
        <td className="px-6 py-4">{projects ? projects.status : ''}</td>
        <td className="px-6 py-4">{projects ? projects.transport : ''}</td>
        <td className="px-6 py-4">{projects ? projects.date.slice(0, projects.date.indexOf(" ")) : ''}</td>

        <td className="px-6 py-4">
          <a
            onClick={() => {
              setProductObj(projects)
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
          <Link
            onClick={() => {
              sessionStorage.setItem("projectIdViewMore", projects.id);
              sessionStorage.setItem("projectNameViewMore", projects.name);
            }}
            to="/view more"
            className="font-medium text-blue-600 hover:underline"
          >
            {t("more")}
          </Link>
        </td>
        <td className="px-6 py-4">
          <Link
            onClick={() => {
              setIsModalOpenStatus(true)
              setProjectList(projects)
            }}
            className="font-medium text-green-600 hover:underline"
          >
            {t("statuss")} {t("edit")}
          </Link>
        </td>
        <td className="px-6 py-4">
          <Link
            onClick={() => {
              downloadWereHouse(projects.fileId);
              // setProjectList()
            }}
            className="font-medium text-blue-600 hover:underline"
          >
            {isLoading ? <LoadingBtn className={`bg-red-500`} /> : `${t("download")} ${t('file')}`}
          </Link>
        </td>
      </tr> : ""}

      {isModalOpenStatus && (
        <div className="fixed flex justify-center items-start inset-0 w-full">
          <div className="zoom-modal w-6/12 bg-white mt-36 px-8 py-4 rounded-lg">
            <div className="mb-4 text-lg font-bold text-black border-b pb-1">
              {t('projectStatusEdit')}
            </div>
            <label
              htmlFor={`productStatusEdit`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {t("projectStatus")}
            </label>
            <select
              id={`productStatusEdit`}
              className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
            >
              <option selected disabled value='0'>
                {t("projectStatus")}
              </option>
              <option value="1">
                {t("1")}
              </option>
              <option value="2">
                {t("2")}
              </option>
              <option
                value="3"
              >
                {t("3")}
              </option>
              <option
                value="4"
              >
                {t("4")}
              </option>
              <option
                value="5"
              >
                {t("5")}
              </option>
              <option
                value="6"
              >
                {t("6")}
              </option>
              <option
                value="7"
              >
                {t("7")}
              </option>
              <option
                value="8"
              >
                {t("8")}
              </option>
            </select>
            <div className="flex justify-end items-center mt-10">
              <button onClick={() => setIsModalOpenStatus(false)} className="bg-red-600 px-5 py-2 rounded-md text-white font-medium ms-2">{t('close')}</button>
              <button onClick={editPorjectStatus} className="bg-green-600 px-5 py-2 rounded-md text-white font-medium ms-2">{t('save')}</button>
            </div>
          </div>
        </div>
      )}

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
