import { useTranslation } from "react-i18next";


const ProductModal = ({ isOpen, onClose, historyList }) => {
    const { t } = useTranslation();


    if (!isOpen) return null;
    const allAddressList = historyList.allAddress;
    return (
        <div
            className="fixed top-0 left-0 w-full   h-screen flex items-center justify-center bg-gray-800 
            bg-opacity-75 z-10 sm:px-0 px-3">
            <div className="bg-slate-300 rounded shadow-md w-full sm:w-[50%]">
                <div className='bg-blue-800 py-5 flex justify-around items-center relative'>
                    <h1 className='text-2xl text-sky-200'>{historyList && historyList.productName}</h1>
                    <h1 className='text-2xl text-green-300'>{historyList && historyList.status}</h1>
                    <i className="fa-solid fa-xmark absolute  cursor-pointer sm:right-5 right-3 text-2xl text-white" onClick={onClose}></i>
                </div>
                <div className='sm:px-20 px-3 sm:py-6 py-3 flex justify-between items-center flex-wrap'>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>{t("weiw1")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.productIdNumber}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>{t("weiw2")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.owner}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>{t("weiw3")}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>{t("weiw4")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.measureCount + " " + historyList.measure}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>{t("weiw5")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.measureCount}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>{t("weiw6")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.transport}</p>
                    </div>
                    <div className="mt-2 w-full text-center">
                        <p className='pb-0 mb-0 opacity-50'>{t("weiw7")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.address}</p>
                    </div>
                </div>
                <div className="mt-7 mb-5 ps-16 pr-5">
                    {allAddressList && allAddressList.map((item) =>
                        <div className="flex flex-row">
                            <div className="h-[100px] w-[4px] py-4 flex relative justify-center bg-slate-900">
                                <div className=" w-[30px] h-[30px] rounded-full absolute top-0 bg-blue-700"></div>
                            </div>
                            <div className="p-4 ms-10">
                                {item}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductModal;