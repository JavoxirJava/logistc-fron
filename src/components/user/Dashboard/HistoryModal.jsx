import { useTranslation } from "react-i18next";

const UserModal = ({ isOpen, onClose, cardInfo }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;
  const allAddressList = cardInfo.allAddress;
  return (
    <div
      className="fixed pt-20 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 
            bg-opacity-75 z-10"
    >
      <div className="bg-slate-300 rounded shadow-md w-full md:w-1/2">
        <div className="bg-blue-800 py-5 flex justify-around items-center relative">
          <h1 className="text-2xl text-sky-200">
            {cardInfo && cardInfo.productName}
          </h1>
          <h1 className="text-2xl text-green-300">
            {cardInfo && cardInfo.status}
          </h1>
          <i
            className="fa-solid fa-xmark absolute cursor-pointer right-5 text-2xl text-white"
            onClick={onClose}
          ></i>
        </div>
        <div className="px-20 py-6 flex justify-between items-center gap-10 flex-wrap">
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("owner")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {cardInfo && cardInfo.owner}
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("comment")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {cardInfo && cardInfo.comment}
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">{t("weiw3")}</p>
            <p className="mt-0 pt-0 font-semibold">
              {cardInfo && cardInfo.date.slice(0, cardInfo.date.indexOf(" "))}{" "}
            </p>
          </div>

          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">kub</p>
            <p className="mt-0 pt-0 font-semibold">
              {cardInfo && cardInfo.kub}
            </p>
          </div>
          <div className="mt-2 w-1/3 text-center">
            <p className="pb-0 mb-0 opacity-50">kg</p>
            <p className="mt-0 pt-0 font-semibold">
              {cardInfo && cardInfo.kg}
            </p>
          </div>
         
         
        </div>
        <div className="mt-7 mb-5 ps-16 pr-5">
          <div className="overflow-x-auto flex flex-row scroll-x h-[120px] ">
            {allAddressList &&
              allAddressList.map((item) => (
                <div className="flex flex-col">
                  <div className="pb-6 pl-0">
                    {item.slice(0, item.indexOf(","))}
                  </div>
                  <div className="h-[4px] w-[100px] flex relative justify-center items-center bg-slate-900">
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

export default UserModal;
