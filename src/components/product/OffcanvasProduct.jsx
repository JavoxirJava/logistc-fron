import React from 'react';
import Offcanvas from "../Offcanvas";
import {byId} from "../api";

function OffcanvasProduct({isOffcanvasOpen, handleToggleOffcanvas, name, btnName, onSave, product, setProduct}) {

    function setData() {
        setProduct({
            id: product ? product.id : 0,
            idNumber: byId("idNumber"),
            name: byId("name"),
            measureCount: byId("measureCount"),
            transport: byId("transport"),
            measure: byId("measure"),
            productStatus: byId("productStatus"),
            address: sessionStorage.getItem("address"),
        });
    }

    console.log(product)
    return (
        <Offcanvas isOpen={isOffcanvasOpen} name={name} onClose={handleToggleOffcanvas}>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold my-2">Name</label>
            <input
                id="name" placeholder="Name" defaultValue={product ? product.name : ''}
                className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="measureCount"
                   className="block text-gray-700 text-sm font-bold my-2">MeasureCount</label>
            <input type="number" id="measureCount" placeholder="MeasureCount"
                   defaultValue={product ? product.measureCount : 0}
                   className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="transport" className="block text-gray-700 text-sm font-bold mb-2">Transport</label>
            <select id="transport"
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
                <option value="" selected disabled>Select product status</option>
                <option value="CAR" selected={product && product.transport === "CAR"}>Car</option>
                <option value="AIRPLANE" selected={product && product.transport === "AIRPLANE"}>Airplane</option>
                <option value="TRAIN" selected={product && product.transport === "TRAIN"}>Train</option>
            </select>
            <label htmlFor="measure" className="block text-gray-700 text-sm font-bold mb-2">Measure</label>
            <select id="measure"
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
                <option value="" selected disabled>Select product status</option>
                <option value="KG" selected={product && product.measure === "KG"}>Kg</option>
                <option value="PIECE" selected={product && product.measure === "PIECE"}>Piece</option>
                <option value="KUB" selected={product && product.measure === "KUB"}>Kub</option>
            </select>
            <label htmlFor="idNumber" className="block text-gray-700 text-sm font-bold my-2">Id Number</label>
            <input id="idNumber" placeholder="Id Number" defaultValue={product ? product.idNumber : ''}
                   className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="productStatus" className="block text-gray-700 text-sm font-bold mb-2">Product status</label>
            <select id="productStatus"
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
                <option value="" selected disabled>Select product status</option>
                <option value="PENDING" selected={product && product.productStatus === "PENDING"}>Pending</option>
                <option value="GOING" selected={product && product.productStatus === "GOING"}>Going</option>
                <option value="CANCEL" selected={product && product.productStatus === "CANCEL"}>Cancel</option>
                <option value="ARRIVED" selected={product && product.productStatus === "ARRIVED"}>Arrived</option>
                <option value="COMPLETED" selected={product && product.productStatus === "COMPLETED"}>Completed</option>
                <option value="MOVED" selected={product && product.productStatus === "MOVED"}>Moved</option>
            </select>
            <div className='mt-10 flex justify-between'>
                <button onClick={handleToggleOffcanvas}
                        className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-gray-500 text-sm font-medium text-white"
                >Close
                </button>
                <button onClick={() => {
                    onSave();
                    setData();
                }} className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >{btnName}</button>
            </div>

        </Offcanvas>
    );
}

export default OffcanvasProduct;