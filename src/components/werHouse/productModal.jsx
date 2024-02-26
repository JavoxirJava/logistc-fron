import { useTranslation } from "react-i18next";


const ProductModal = ({addToProduct, isOpen,  onClose }) => {

    const { t } = useTranslation();

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border md:w-96 w-full shadow-lg rounded-md bg-white">
          
          <div>
            <div>
              <h1 className="text-bold">{t("delete2")}</h1>
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
                  addToProduct()
                }}
                className="btmn">
                {t("addd")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductModal;  