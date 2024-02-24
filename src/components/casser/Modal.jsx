import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios';
import { byIdObj, config, url } from '../api';
import { toast } from 'react-toastify';

const Modal = ({ getCassier, getUser, getProduct, projectId, userId, productId }) => {
    const [showModal, setShowModal] = useState(false);
    const [productKub, setProductKub] = useState(null)
    const [productKg, setProductKg] = useState(null)
    const [kubAndKgVAlue, setKubANdKgVAlue] = useState(0)
    const [dataVAlue, setDataVAlue] = useState(0)
    const [meassureVal, setMeassureVal] = useState(null)

    const addCasser = () => {
        let addData = {
            projectId: byIdObj('projectId').value,
            userId: byIdObj('userId').value,
            productId: byIdObj('productId').value,
            measure: byIdObj('measure').value,
            priceOfKub: dataVAlue,
            totalKub: kubAndKgVAlue,
            priceForRoad: 0,
            customsClearancePrice: 0,
            cct: 0,
            costChina: 0,
            totalPrice: 0
        }
        axios.post(`${url}cashier/one`, addData, config)
            .then(() => {
                setShowModal(false);
                getCassier();
                toast.success('Successfully saved cassier✅')

            })
            .catch(err => {
                console.log("Caser add qilishda error: ", err);
                console.log(addData);
            })
    }

    const idFunc = (item) => {
        setProductKub(productId.map(i => i.id === item ? i.totalKub : null))
        setProductKg(productId.map(i => i.id === item ? i.totalWeight : null))
    }

    const selectKubAndKg = () => {
        if (meassureVal == 'Куб') setKubANdKgVAlue(productKub * dataVAlue)
        if (meassureVal == 'Кг') setKubANdKgVAlue(productKg * dataVAlue)
    }

    useEffect(() => {
        selectKubAndKg()
    }, [dataVAlue])

    return (
        <div>
            <button
                onClick={() => { setShowModal(true) }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded"
            >Add</button>
            {showModal ? (
                <div>
                    <div
                        className="zoom-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative md:w-[100%] w-[80vw] my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
                                {/*header*/}
                                <div className="flex items-center justify-between border-b pb-2 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Add
                                    </h3>
                                    <button
                                        className='p-1 ml-auto border-0 text-4xl hover:scale-110 duration-200'
                                        onClick={() => setShowModal(false)}>×</button>
                                </div>
                                <form className="flex md:justify-evenly mt-5 flex-wrap">
                                    <select
                                        id="projectId"
                                        onChange={e => getUser(e.target.value)}
                                        className=" p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                        <option selected disabled>Select Project</option>
                                        {projectId && projectId.map((item) => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        id="userId"
                                        onChange={e => getProduct(e.target.value)}
                                        disabled={userId ? false : true}
                                        className="  p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                        <option selected disabled>Select User</option>
                                        {userId && userId.map((item) => (
                                            <option value={item.id} key={item.id}>{item.user}</option>
                                        ))}
                                    </select>
                                    <select
                                        id="productId"
                                        disabled={productId ? false : true}
                                        onChange={e => idFunc(e.target.value)}
                                        className="p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                        <option selected disabled>Select Product</option>
                                        {productId && productId.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        id="measure"
                                        onChange={e => setMeassureVal(e.target.value)}
                                        className=" p-2 md:w-[23%] w-full mx-1 md:mt-4 mt-2 duration-300 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                                        <option selected disabled>Kub And Kg</option>
                                        <option value="Куб">Kub</option>
                                        <option value="Кг">Kg</option>
                                    </select>
                                </form>
                                <form className="mx-auto flex justify-evenly flex-wrap">
                                    <div className='flex flex-col w-[49%] mt-4'>
                                        <label htmlFor='priceOfKub'>Price of Kub or Kg</label>
                                        <input
                                            onChange={e => setDataVAlue(e.target.value)}
                                            id='priceOfKub'
                                            type="number"
                                            placeholder='Enter price'
                                            className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    </div>
                                    <div className='flex flex-col w-[49%] mt-4'>
                                        <label htmlFor='totalKub'>Result Price</label>
                                        <input
                                            id='totalKub'
                                            disabled
                                            value={kubAndKgVAlue}
                                            placeholder='Result price'
                                            className="bg-gray-200 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    </div>
                                    <div className='flex flex-col w-[49%] mt-4'>
                                        <label htmlFor='priceForRoad'>Price For Road</label>
                                        <input
                                            id='priceForRoad'
                                            type='number'
                                            placeholder='Enter Price'
                                            className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    </div>
                                    <div className='flex flex-col w-[49%] mt-4'>
                                        <label htmlFor='customsClearancePrice'>Customs  Price</label>
                                        <input
                                            id='customsClearancePrice'
                                            type='number'
                                            placeholder='Enter Price'
                                            className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    </div>
                                    <div className='flex flex-col w-[49%] mt-4'>
                                        <label htmlFor='cct'>Cct</label>
                                        <input
                                            id='cct'
                                            type='number'
                                            placeholder='Enter cct'
                                            className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    </div>
                                    <div className='flex flex-col w-[49%] mt-4'>
                                        <label htmlFor='costChina'>Cost China</label>
                                        <input
                                            id='costChina'
                                            type='number'
                                            placeholder='Enter Cost China'
                                            className="bg-gray-50 duration-300 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    </div>
                                    <div className='flex flex-col w-full mt-4'>
                                        <label htmlFor='totalPrice'>Total Price</label>
                                        <input
                                            id='totalPrice'
                                            disabled
                                            placeholder='Total Price'
                                            className="bg-gray-200 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 " />
                                    </div>
                                </form>
                                <div className='flex md:justify-end justify-center  mt-4'>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className='py-2 px-8 mr-3 bg-red-500 rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-red-200 duration-300'>
                                        Close
                                    </button>
                                    <button
                                        className='py-2 px-8 bg-[#16A34A] rounded-md text-white active:scale-95 hover:shadow-lg hover:shadow-green-200 duration-300'>
                                        Save
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
