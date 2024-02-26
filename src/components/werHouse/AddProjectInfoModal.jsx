import React from 'react';

function AddProjectInfoModal({showProjectInfoModal, products, addToProduct}) {
    console.log(products)
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                All Products
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={showProjectInfoModal}
                            >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <table className="table w-96 text-center add-product-table">
                                <tbody>
                                <tr>
                                    <th>Product count</th>
                                    <th>Kg</th>
                                    <th>Kub</th>
                                </tr>
                                </tbody>
                                <tbody>
                                <tr>
                                    <td>{products.length}</td>
                                    <td>{products.map(p => p.totalWeight).reduce((a, b) => a + b)}</td>
                                    <td>{products.map(p => p.totalKub).reduce((a, b) => a + b)}</td>
                                </tr>
                                </tbody>
                            </table>
                            {/*<p><span className="pe-4">Product count:</span>*/}
                            {/*    {products.length}</p>*/}
                            {/*<p>*/}
                            {/*<span className="pe-4">Kub:</span>*/}
                            {/*    {products.map(p => p.totalKub).reduce((a, b) => a + b)}*/}
                            {/*</p>*/}
                            {/*<p>*/}
                            {/*    <span className="pe-4">Kg:</span>*/}
                            {/*    {products.map(p => p.totalWeight).reduce((a, b) => a + b)}*/}
                            {/*</p>*/}
                        </div>
                        {/*footer*/}
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={showProjectInfoModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={addToProduct}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default AddProjectInfoModal;