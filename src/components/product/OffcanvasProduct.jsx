import React from 'react';
import Offcanvas from "../Offcanvas";

function OffcanvasProduct({isOffcanvasOpen, handleToggleOffcanvas, name, btnName, onSave}) {
    return (
        <Offcanvas isOpen={isOffcanvasOpen} name={name} onClose={handleToggleOffcanvas}>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold my-2">Name</label>
            <input
                id="name" placeholder="Name"
                className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="measureCount"
                   className="block text-gray-700 text-sm font-bold my-2">MeasureCount</label>
            <input type="number" id="measureCount" placeholder="MeasureCount"
                   className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="transport" className="block text-gray-700 text-sm font-bold mb-2">Transport</label>
            <select id="transport"
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
                <option value="" selected disabled>Select product status</option>
                <option value="CAR">Car</option>
                <option value="AIRPLANE">Airplane</option>
                <option value="TRAIN">Train</option>
            </select>
            <label htmlFor="measure" className="block text-gray-700 text-sm font-bold mb-2">Measure</label>
            <select id="measure"
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
                <option value="" selected disabled>Select product status</option>
                <option value="KG">Kg</option>
                <option value="PIECE">Piece</option>
                <option value="KUB">Kub</option>
            </select>
            <label htmlFor="idNumber" className="block text-gray-700 text-sm font-bold my-2">Id Number</label>
            <input id="idNumber" placeholder="Id Number"
                   className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label htmlFor="productStatus" className="block text-gray-700 text-sm font-bold mb-2">Product status</label>
            <select id="productStatus"
                    className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4">
                <option value="" selected disabled>Select product status</option>
                <option value="PENDING">Pending</option>
                <option value="GOING">Going</option>
                <option value="CANCEL">Cancel</option>
                <option value="ARRIVED">Arrived</option>
                <option value="COMPLETED">Completed</option>
                <option value="MOVED">Moved</option>
            </select>
            <div className='mt-10 flex justify-between'>
                <button onClick={handleToggleOffcanvas}
                        className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-gray-500 text-sm font-medium text-white"
                >Close
                </button>
                <button onClick={onSave}
                    className="inline-flex justify-center w-[45%] rounded-md shadow-sm py-2 bg-blue-700 text-sm font-medium text-white"
                >{btnName}</button>
            </div>

        </Offcanvas>
    );
}

export default OffcanvasProduct;