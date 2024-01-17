import line from "../../assets/line.png"

const Modal = ({ isOpen, onClose, historyList }) => {
    if (!isOpen) return null;

    const allAddressList = historyList.allAddress;
    console.log(allAddressList);
    console.log('aaa');

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 
            bg-opacity-75 z-10">
            <div className="bg-slate-300 rounded shadow-md w-1/2">
                <div className='bg-blue-800 py-5 flex justify-around items-center relative'>
                    <h1 className='text-2xl text-sky-200'>{historyList && historyList.name}</h1>
                    <h1 className='text-2xl text-green-300'>{historyList && historyList.status}</h1>
                    <i className="fa-solid fa-xmark absolute right-2 text-2xl text-white" onClick={onClose}></i>
                </div>
                <div className='px-20 py-6 flex justify-between items-center flex-wrap'>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>Id Number</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.productIdNumber}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>Ower</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.owner}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>Created</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.createdAt}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>Measure</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.measure}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>Measure Count</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.measureCount}</p>
                    </div>
                    <div className="mt-2 w-1/3 text-center">
                        <p className='pb-0 mb-0 opacity-50'>Transport</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.transport}</p>
                    </div>
                    <div className="mt-2 w-full text-center">
                        <p className='pb-0 mb-0 opacity-50'>Address</p>
                        <p className='mt-0 pt-0 font-semibold'>{historyList && historyList.address}</p>
                    </div>
                </div>
                <div className="mt-7 ps-5">
                    <div className="w-full flex justify-start items-center">
                        <div className="h-44 flex justify-center flex-col items-center ">
                            <div className="flex -mt-3">
                                <div className="flex  flex-col  ml-2">
                                    <i class="fa-solid fa-circle text-2xl text-blue-800 z-10"></i>
                                </div>
                                <p className="ml-2">salom</p>
                            </div>
                            <div className="flex -mt-3 items-end">
                                <div className="flex justify-center flex-col items-center">
                                    <img src={line} alt="" className="-mb-3 -z-0" />
                                    <i class="fa-solid fa-circle text-2xl text-blue-800 z-10"></i>
                                </div>
                                <p className="mb-1">salom</p>
                            </div>
                            <div className="flex -mt-3 items-end">
                                <div className="flex justify-center flex-col items-center">
                                    <img src={line} alt="" className="-mb-3 -z-0" />
                                    <i class="fa-solid fa-circle text-2xl text-blue-800 z-10"></i>
                                </div>
                                <p className="mb-1">salom</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;