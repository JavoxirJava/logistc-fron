import React, { useEffect } from 'react';

const Offcanvas = ({ isOpen, name, children, inputDelete }) => {
    useEffect(() => {
        inputDelete()
    }, [])

    useEffect(() => {
        inputDelete()
    }, [isOpen])
    return (
        <div
            className={` fixed inset-0 overflow-hidden transition-opacity ${isOpen ? 'ease-out duration-300 opacity-100' : 'ease-in duration-200 opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 overflow-hidden z-50">
                <section className="absolute inset-y-0 left-0 max-w-full flex outline-none">
                    <div className="w-screen max-w-lg">
                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto  col1 z-50">
                            <div className="md:px-6 px-3 pt-[10%] flex justify-between ">
                                <h2 className="text-lg font-medium text-gray-900 inline-block">{name}</h2>
                                
                            </div>
                            <div className="mt-6 relative flex-1 md:px-6 sm:px-4 px-2">
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