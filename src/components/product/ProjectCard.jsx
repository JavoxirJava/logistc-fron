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

  const openSelectHandler = () => setIsModalOpenStatus(!isModalOpenStatus)

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  });

  // console.log(projects.status);
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
        getProduct(pagination, 4)
        document.getElementById('productStatusEdit').value = 0
      }).catch(() => {
        document.getElementById('productStatusEdit').value = 0
        toast.warning(t('projectStatusEdErr'))
      })
  }
  return (
    <>
      {projects ? <tr
        className="bg-white border-b "
        key={i}
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {(pagination - 1) * 4 < 0 ? i + 1 : (pagination - 1) * 4 + (i + 1)}
        </th>
        <td className="px-6 py-4">{projects ? projects.name : ''}</td>
        <td
          className="px-6 py-4 hover:cursor-pointer hover:underline hover:text-blue-500"
          onClick={() => {
            // openSelectHandler()
            setProjectList(projects)
          }}>
          <select
            onChange={editPorjectStatus}
            id={`productStatusEdit`}
            className="text-black w-40 p-1 cursor-pointer border rounded-md focus:outline-0"
          >
            <option selected disabled value='0'>
              {projects.status}
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
            <option
              value="9"
            >
              {t("9")}
            </option>
          </select>
        </td>
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
              downloadWereHouse(projects.fileId);
              // setProjectList()
            }}
            className="font-medium text-blue-600 hover:underline"
          >
            {isLoading ? <LoadingBtn className={`bg-red-500`} /> : `${t("download")} ${t('file')}`}
          </Link>
        </td>
      </tr> : ""}
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
