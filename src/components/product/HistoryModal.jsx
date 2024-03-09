import { useTranslation } from "react-i18next";

const ProductModal = ({ isOpen, onClose, historyList }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const allAddressList = historyList.status;
  return (
    <div
      className="fixed top-0 left-0 w-full   h-screen flex items-center justify-center bg-gray-800 
            bg-opacity-75 z-10 sm:px-0 px-3"
    >
      <div className="zoom-modal bg-slate-300 rounded-lg overflow-hidden shadow-md w-full sm:w-[50%]">
        <div className="bg-blue-800 py-5 flex justify-around items-center relative">
          <h1 className="text-2xl text-sky-200">
            {historyList && historyList.productName}
          </h1>
          <h1 className="text-2xl text-green-300">
            {historyList && historyList.currentStatus}
          </h1>
          <i
            className="fa-solid fa-xmark absolute  cursor-pointer sm:right-5 right-3 text-2xl text-white"
            onClick={onClose}
          ></i>
        </div>
        <div className="sm:px-20 px-3 sm:py-6 py-3 flex justify-between items-center flex-wrap">
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("weiw2")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList && historyList.owner}
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("weiw3")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList &&
                historyList.date.slice(0, historyList.date.indexOf(" "))}{" "}
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("totalKub")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList && historyList.totalKub} ({t("sm")}
              <sup>3</sup>)
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("kg")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList && historyList.kg}
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("kub")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList && historyList.kub}
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("productCount")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList && historyList.productCount}
            </p>
          </div>
          <div className="mt-2 w-1/2 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("totalWeight")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList && historyList.totalWeight} ({t("kg")})
            </p>
          </div>
          <div className="mt-2 w-1/2 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("comment")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {historyList && historyList.comment}
            </p>
          </div>
        </div>
        <div className="mt-7 mb-5 ps-16 pr-5">
          <div className="overflow-x-auto flex flex-row scroll-x h-[120px] textga">
            {allAddressList &&
              allAddressList.map((item) => (
                <div className="flex flex-col textga1">
                  <div className="pb-6 pl-0 w-[100px] overflow-x-auto scrollbar textga2">
                    <p className="w-[250px]" title={item}>
                      {item}
                    </p>
                  </div>
                  <div className="h-[4px] w-[120px] flex relative justify-center items-center bg-slate-900">
                    <div className="w-[30px] h-[30px] rounded-full absolute left-0 bg-blue-700"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
