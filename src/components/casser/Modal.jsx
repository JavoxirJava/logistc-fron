import React, { useState } from 'react'
import './Modal.css'

const Modal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <button
                onClick={
                    () => {
                        setShowModal(true);
                    }
                }
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded"
            >
                Add
            </button>
            {showModal ? (
                <div>
                    <div
                        className="zoom-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative md:w-[100%] w-[80vw] my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Add
                                    </h3>
                                    <button className='p-1 ml-auto border-0 text-2xl'
                                        onClick={() => setShowModal(false)}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}

        </div>
    )
}

export default Modal
