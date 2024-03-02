import { getFile } from "./api";

const ImageViewModal = ({ imageId, isImageOpenModal, setIsImageOpenModal }) => {
    if (!isImageOpenModal) return null;
    return (
        <div className="fixed inset-0 bg-slate-600 bg-opacity-70 h-screen w-full z-50">
            <div className='w-full flex justify-end fixed top-10 right-10'>
                <i onClick={() => setIsImageOpenModal(false)} className="fa-solid fa-square-xmark fa-flip-both fa-2xl text-white hover:text-slate-900 duration-200 cursor-pointer"></i>
            </div>
            <div onClick={() => setIsImageOpenModal(false)} className='w-full h-full flex justify-center items-center'>
                <div className="zoom-modal w-[75%] h-[75%] overflow-hidden">
                    <img className='w-full h-full object-contain' src={getFile + imageId} alt="dietailsImg" />
                </div>
            </div>
        </div>
    )
}

export default ImageViewModal