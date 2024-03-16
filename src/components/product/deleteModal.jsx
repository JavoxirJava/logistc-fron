import { useTranslation } from "react-i18next";


const DeleteModal = ({ isOpen, deleteProject,  onClose, getProject }) => {

    const { t } = useTranslation();

    if (!isOpen) return null;
    return (
        <div className="fixed sm:px-0 px-5 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="zoom-modal relative top-20 mx-auto p-5 border sm:w-96 w-full shadow-lg rounded-md bg-white">
          
          <div>
            <div><h1 className="font-bold text-lg text-center">

              {t("delete2")}
            </h1>
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
                  deleteProject()
                  onClose()
                  getProject()
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

export default DeleteModal;