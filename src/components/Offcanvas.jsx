import React from 'react';

const Offcanvas = ({isOpen, onClose, name, children}) => {
    return (
        <div
            className={`fixed inset-0 overflow-hidden transition-opacity ${isOpen ? 'ease-out duration-300 opacity-100' : 'ease-in duration-200 opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-opacity-75 transition-opacity"
                    onClick={onClose}></div>

                <section className="absolute inset-y-0 left-0 max-w-full flex outline-none">
                    <div className="w-screen max-w-lg">
                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto w-[105%] col1">
                            <div className="px-4 sm:px-6 pt-[10%]">
                                <h2 className="text-lg font-medium text-gray-900 inline-block">{name}</h2>
                                <button type="button" onClick={onClose}
                                        className="float-end bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Offcanvas;
