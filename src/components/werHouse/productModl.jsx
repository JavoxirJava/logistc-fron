import { useTranslation } from "react-i18next";


const ProductDModal = ({deleteProduct, isOpen,  onClose }) => {

    const { t } = useTranslation();

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          
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
                  deleteProduct()
                }}
                className="btmn">
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductDModal;  