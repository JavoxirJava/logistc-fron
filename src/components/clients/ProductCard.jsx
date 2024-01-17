import React, { useState } from "react";
import { byId, config, getClientProduct, url } from "../api";
import axios from "axios";
import { toast } from "react-toastify";

function ProductCard({ className, product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState([]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const editUser = () => {
    setIsLoading(true)
    const data = {
        name: byId("nameCl"),
        idNumber: byId("idNumberCl"),
        phoneNumber: byId("phoneNumberCl"),
        password: byId("passwordCl"),
    };
    axios.put(`${url}user/${userId.userId}`, data, config)
        .then(() => {
            setIsLoading(false)
            closeModal()
            toast.success("Cleint succesfully edit!")
        })
        .catch(() => {
            setIsLoading(false)
            toast.error("Something went wrong while editing client?")
        })
  }



  return (
    <div
      className={`flex card-main border border-blue-300 w-full px-2 py-2 bg-blue-100 ${className}`}
    >
      <div className="card-col w-11/12">
        <div className="h-12 card-col-row w-full flex">
          <div className="w-[20%]">
            <p className="opacity-70">Number</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.idNumber : 0}
            </p>
          </div>
          <div className="w-[30%]">
            <p className="opacity-70">Name</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.name : "First Name"}
            </p>
          </div>
          <div className="w-[30%]">
            <p className="opacity-70">Phone Number</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.phoneNumber : "No number"}
            </p>
          </div>
          <div className="w-[25%]">
            <p className="opacity-70">Password</p>
            <p className="font-bold text-[.9rem]">
              {product ? product.password : "No password"}
            </p>
          </div>
        </div>
        <div className="h-3/6 card-col-row w-full flex">
          <div className="w-[25%]">
            <p className="opacity-70">All Product</p>
            <p className="font-bold text-[.9rem] text-orange-500">
              {product ? product.allProduct : 0}
            </p>
          </div>
          <div className="w-[25%]">
            <p className="opacity-70">Completed</p>
            <p className="font-bold text-[.9rem] text-green-500">
              {product ? product.completed : 0}
            </p>
          </div>
          <div className="w-[35%]">
            <p className="opacity-70">Pending</p>
            <p className="font-bold text-[.9rem] text-purple-600">
              {product ? product.pending : 0}
            </p>
          </div>
          <div className="w-[25%]">
            <p className="opacity-70">Cancel Porduct</p>
            <p className="font-bold text-[.9rem] text-purple-600">
              {product ? product.cancel : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="card-col w-3/12 flex justify-center my-auto h-10">
        <button
          onClick={() => {
            openModal()
            setUserId(product)
          }}
          className="inline-flex justify-center rounded-md active:scale-95 duration-200 border border-gray-300 shadow-lg py-2 px-5 bg-blue-700 text-sm font-medium text-white"
        >
          Edit
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative modal-bg top-20 mx-auto p-8  w-1/3 shadow-lg rounded-md ">
            <h2 className="text-2xl leading-6 font-semibold text-white text-center mb-4">
              Edit client
            </h2>
            <div>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  // onKeyDown={checkKeyPress}
                  id="nameCl"
                  disabled={isLoading ? true : false}
                  defaultValue={userId.name}
                  className={`w-full ${
                    isLoading ? "cursor-not-allowed" : ""
                  } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Id Number
                </label>
                <input
                  // onKeyDown={checkKeyPress}
                  id="idNumberCl"
                  defaultValue={userId.idNumber}
                  disabled={isLoading ? true : false}
                  className={`w-full ${
                    isLoading ? "cursor-not-allowed" : ""
                  } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumberCl"
                  defaultValue={userId.phoneNumber}
                  disabled={isLoading ? true : false}
                  className={`w-full ${
                    isLoading ? "cursor-not-allowed" : ""
                  } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="passwordCl"
                  defaultValue={userId.password}
                    disabled={isLoading ? true : false}
                    type={showPassword ? "text" : "password"}
                    className={`w-full ${
                      isLoading ? "cursor-not-allowed" : ""
                    } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 focus:bg-gray-300 duration-500`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                    />
                  </button>
                </div>

                
              </div>

              <div className="flex justify-between mt-7">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btm-close"
                >
                  Close
                </button>
                <button className="btmn"
                onClick={editUser}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
