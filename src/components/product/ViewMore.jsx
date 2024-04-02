import { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { config, getFile, url } from "../api";
import ReactPaginate from "react-paginate";
import img from "../empty.png";
import { useTranslation } from "react-i18next";
import ProductModal from "./HistoryModal";
import ImageViewModal from "../ImageViewModal";
import { toast } from "react-toastify";
const ViewMore = ({ lang }) => {
  const [projectIdInfo, setProjectIdInfo] = useState(null);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [historyList, setHistoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOpenModal, setIsImageOpenModal] = useState(false);
  const [imageId, setImageId] = useState(null);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  let projectId = sessionStorage.getItem("projectIdViewMore");
  let projectName = sessionStorage.getItem("projectNameViewMore");
  const { t } = useTranslation();
  useEffect(() => {
    getProjectInfo();
  }, [projectId]);

  useEffect(() => {
    getProjectInfo();
  }, [lang]);
  const getProjectInfo = () => {
    axios
      .get(
        `${url}product/project?projectId=${projectId}&lang=${lang}&page=0&size=10`,
        config
      )
      .then((res) => {
        setProjectIdInfo(res.data.body.object);
        setPage(res.data.body.totalPage);
      })
      .catch((err) => console.log("product/project yulida error!", err));
  };

  const handelPageClick = (event) => {
    const pageNumber = event.selected;
    setCurrentPage(pageNumber);
    axios
      .get(
        `${url}product/project?projectId=${projectId}&lang=${lang}&page=${pageNumber}&size=10`,
        config
      )
      .then((res) => setProjectIdInfo(res.data.body.object))
      .catch((err) => console.log("error page: ", err));
  };

  const styles = {
    loading:
      "animate-pulse hover:cursor-wait my-3 w-full h-7 bg-sky-200 rounded",
  };

  const searchHandler = (e) => {
    let data = e.target.value;
    if (!!data) {
      axios
        .get(
          `${url}project/product/search?productName=${data}&lang=${lang}&projectId=${projectId}`,
          config
        )
        .then((res) =>
          res.data.success === false
            ? setProjectIdInfo(null)
            : setProjectIdInfo(res.data.body)
        )
        .catch(() => setProjectIdInfo(null));
    } else {
      getProjectInfo();
      setProjectIdInfo(null);
    }
  };

  return (
    <div className="w-full h-screen background overflow-x-hidden">
      <NavBar lang={lang} />
      <div className="mt-32 flex flex-col md:flex-row justify-start md:gap-60 gap-14 md:ml-[4.7em] ml-5 w-full">
        <input
          type="search"
          onChange={searchHandler}
          placeholder={t("productNameSearch")}
          className="w-9/12 md:w-3/12 px-4 h-10 focus:outline-0 border rounded-md"
        />
        <h1 className="font-normal text-2xl md:text-xl">
          <b className="text-blue-500">{projectName}</b> {"  "}
          <b>{t("products")}</b>
        </h1>
      </div>
      <div className="product-main flex justify-center items-start overflow-hidden w-full">
        <div className="lg:px-0 md:px-10 lg:py-0 sm:py-5 px-3 mt-8 w-screen lg:w-[90%] ">
          <table className="w-full rounded-2xl overflow-hidden text-gray-500 overflow-x-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">№</th>
                <th className="px-6 py-3">{t("photo")}</th>
                <th className="px-6 py-3">{t("owner")}</th>
                <th className="px-6 py-3">{t("productName")}</th>
                <th className="px-6 py-3">{t("date")}</th>
                <th className="px-6 py-3">{t("productCount")}</th>
                <th className="px-6 py-3">{t("totalWeight")}</th>
                <th className="px-6 py-3">{t("totalKub")}</th>
                <th className="px-6 py-3">{t("productAdd34")}</th>
                <th className="px-6 py-3">{t("wiew")}</th>
              </tr>
            </thead>
            <tbody className="text-[1rem] text-gray-700 bg-white text-center">
              {projectIdInfo ? (
                projectIdInfo.map((item, i) => (
                  <tr className="border-b transition duration-300 ease-in-out ">
                    <th className="px-6 py-5">{(currentPage * 10) + (i + 1)}</th>
                    <th className="px-6 py-5 flex justify-center items-center">
                      <img
                        onClick={() => {
                          setImageId(item.attachmentId ? item.attachmentId : toast.warning(t('imgNotFound')));
                          item.attachmentId ? setIsImageOpenModal(true) : setIsImageOpenModal(false)
                        }}
                        src={
                          item.attachmentId ? getFile + item.attachmentId : img
                        }
                        className="w-10 h-10 object-cover rounded-full scale-150 hover:cursor-pointer"
                        alt="img"
                      />
                    </th>
                    <td className="px-6 py-5">{item.owner}</td>
                    <td className="px-6 py-5">{item.name}</td>
                    <td className="px-6 py-5">{item.date}</td>
                    <td className="px-6 py-5">{item.productCount}</td>
                    <td className="px-6 py-5">{item.totalWeight.toFixed(3)} {t('kg')}</td>
                    <td className="px-6 py-5">{item.totalKub.toFixed(3)} {t('sm')}<sup>3</sup></td>
                    <td className="px-6 py-5">{item.comment}</td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => {
                          openModal();
                          setHistoryList(item);
                        }}
                        href="#"
                        className="font-medium text-[#16A34A] hover:underline"
                      >
                        {t("wiew")}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-4 py-3">
                    <h1 className="text-xl text-black">{t("notfound")}</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-7 ms-1 mb-20 lg:mb-10">
            <ReactPaginate
              className="navigation"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handelPageClick}
              pageRangeDisplayed={5}
              pageCount={page}
              previousLabel="<"
              renderOnZeroPageCount={null}
              nextClassName="nextBtn"
              previousClassName="prevBtn"
            />
          </div>
        </div>
      </div>
      {historyList && (
        <ProductModal
          isOpen={isModalOpen}
          historyList={historyList}
          onClose={closeModal}
        />
      )}
      <ImageViewModal
        imageId={imageId}
        isImageOpenModal={isImageOpenModal}
        setIsImageOpenModal={setIsImageOpenModal}
      />
    </div>
  );
};

export default ViewMore;
