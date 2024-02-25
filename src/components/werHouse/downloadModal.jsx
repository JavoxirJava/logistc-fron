import { useTranslation } from "react-i18next";


const DownloadModal = ({ isOpen, deleteWerhouse,  onClose }) => {

    const { t } = useTranslation();

    if (!isOpen) return null;
    return (
        <div className="fixed sm:px-0 px-5 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border sm:w-96 w-full shadow-lg rounded-md bg-white">
          
          <div>
            <div>
              {t("delete2")}
            </div>
           
            
            <div className="flex justify-between mt-7">
              <button
                type="button"
                onClick={onClose}
                className="btm-close"
              >
                {t("close")}
              </button>
              <button 
                onClick={() => {
                  onClose()
                }}
                className="btmn ">
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DownloadModal;