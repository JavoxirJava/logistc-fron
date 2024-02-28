import { useTranslation } from "react-i18next";
const ProjectModal = ({ isOpen, onClose, projectList }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;
    const allAddressList = projectList.allAddress;
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 
            bg-opacity-75 z-10 sm:p-0 px-3 ">
            <div className="bg-slate-300 rounded-lg overflow-hidden shadow-md sm:w-1/2">
                <div className='bg-blue-800 py-5 flex justify-around  items-center relative rounded-t'>
                    <h1 className='text-2xl text-sky-200'>{projectList && projectList.name}</h1>
                    <h1 className='text-2xl text-green-300'>{projectList && projectList.status}</h1>
                    <i className="fa-solid fa-xmark absolute cursor-pointer right-5 text-2xl text-white" onClick={onClose}></i>
                </div>
                <div className='sm:px-20 px-3 py-6 flex justify-between items-center flex-wrap'> 
                    <div className="mt-2 w-full text-center">
                        <p className='pb-0 mb-0 text-black'>{t("weiw6")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{projectList && projectList.transport}</p>
                    </div>
                    
                    <div className="mt-2 w-full text-center">
                        <p className='pb-0 mb-0 text-black'>{t("weiw7")}</p>
                        <p className='mt-0 pt-0 font-semibold'>{projectList && projectList.status}</p>
                    </div>
                </div>
                <div className="mt-7 mb-5 ps-16 pr-5">
                    {allAddressList && allAddressList.map((item) =>
                        <div className="flex flex-row">
                            <div className="h-[100px] w-[4px] py-4 flex relative justify-center bg-slate-900">
                                <div className=" w-[30px] h-[30px] rounded-full absolute top-4 bg-blue-700"></div>
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
export default ProjectModal;