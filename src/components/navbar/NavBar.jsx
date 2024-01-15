import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../api";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [me, setMe] = useState(null);

  const openGetMe = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(!isModalOpen);

  const logout = () => {
    document.getElementById("logout").click();
    sessionStorage.clear();
  };

  useEffect(() => {
    getMe(setMe);
  }, []);

  return (
    <div>
      <Link to="/" id="logout"></Link>
      <nav className="bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="#"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Team
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Projects
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Calendar
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    onClick={openGetMe}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="img"
                    />
                  </button>
                </div>

                <div
                  className={`${
                    isOpen ? "inline" : "hidden"
                  } absolute w-80 bg-slate-400 -right-14 top-12 
                                    rounded-3xl shadow-lg overflow-hidden z-20`}
                >
                  <div className="bg-slate-200 p-8 flex justify-center items-center">
                    <img
                      className="rounded-full w-24 h-24"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="img"
                    />
                  </div>
                  {me && (
                    <div className="bg-gradient-to-tl from-sky-500 to-sky-800 px-8 py-6">
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">name</p>
                        <p className="mt-0 pt-0">{me.name}</p>
                      </div>
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">Id number</p>
                        <p className="mt-0 pt-0">
                          {me.idNumber ? me.idNumber : "none"}
                        </p>
                      </div>
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">
                          Phone number
                        </p>
                        <p className="mt-0 pt-0">{me.phoneNumber}</p>
                      </div>
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">password</p>
                        <p className="mt-0 pt-0">******</p>
                      </div>
                      <div className="flex justify-between items-center mt-3 font-bold text-white">
                        <button
                          className="bg-yellow-500 px-5 py-1.5 rounded-lg
                                                shadow-lg active:scale-95 duration-200"
                          onClick={() => {
                            openModal();
                            openGetMe();
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 px-5 py-1.5 rounded-lg
                                                shadow-lg active:scale-95 duration-200"
                          onClick={() => {
                            logout();
                            openGetMe();
                          }}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* <div className={` w-[500px] ${isModalOpen ? ' fixed z-50    ' : 'hidden'}
                        rounded-3xl shadow-lg overflow-hidden z-20`}>
                        <div className='bg-slate-200 p-8 flex justify-center items-center'>
                            <img
                                className='rounded-full w-24 h-24'
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="img"
                            />
                        </div>
                        <div className='bg-gradient-to-tl from-sky-500 to-sky-800 px-8 py-6'>
                            <div className=' font-bold text-black text-[1.1rem]'>
                                <p className='opacity-50 pb-0 mb-0 mt-2'>name</p>
                                <input
                                    type="text"
                                    className="px-3 py-2 border-gray-600 border-2 rounded-xl"
                                    value="some thing"
                                />
                            </div>
                            <div className=' font-bold text-black text-[1.1rem]'>
                                <p className='opacity-50 pb-0 mb-0 mt-2'>id number</p>
                                <input
                                    type="text"
                                    className=" px-3 py-2 border-gray-600 border-2 rounded-xl"
                                    value=""
                                />
                            </div>
                            <div className=' font-bold text-black text-[1.1rem]'>
                                <p className='opacity-50 pb-0 mb-0 mt-2'>phone number</p>
                                <input
                                    type="text"
                                    className="px-3 py-2 border-gray-600 border-2 rounded-xl"
                                    value=""
                                />
                            </div>
                            <div className=' font-bold text-black text-[1.1rem]'>
                                <p className='opacity-50 pb-0 mb-0 mt-2'>password</p>
                                <input
                                    type="password"
                                    className="px-3 py-2 border-gray-600 border-2 rounded-xl"
                                    value=""
                                />
                            </div>
                            <div className='flex justify-between items-center mt-3 font-bold text-white'>
                                <button
                                    className='bg-yellow-500 px-5 py-1.5 rounded-lg shadow-lg'
                                    onClick={() => {
                                        openModal();
                                        openGetMe();
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className='bg-red-600 px-5 py-1.5 rounded-lg shadow-lg'
                                    onClick={() => {
                                        openModal()
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    className='bg-blue-600 px-5 py-1.5 rounded-lg shadow-lg'
                                    onClick={() => {
                                        logout()
                                    }}
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div> */}

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex">
                  <button
                    onClick={() => {
                      openModal();
                    }}
                    className="text-gray-400 m-2 me-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                
                <div className="">
                  {/* <div className="grid mb-4 grid-cols-2"> */}
                    <div className="bg-slate-200 p-8 flex justify-center items-center">
                      <img
                        className="rounded-full w-24 h-24"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="img"
                      />
                    </div>
                    <div className="bg-gradient-to-tl from-sky-500 to-sky-800 px-8 py-6">
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">name</p>
                        <input
                          type="text"
                          className="px-3 py-2 border-gray-600 border-2 rounded-xl"
                          value="some thing"
                        />
                      </div>
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">id number</p>
                        <input
                          type="text"
                          className=" px-3 py-2 border-gray-600 border-2 rounded-xl"
                          value=""
                        />
                      </div>
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">
                          phone number
                        </p>
                        <input
                          type="text"
                          className="px-3 py-2 border-gray-600 border-2 rounded-xl"
                          value=""
                        />
                      </div>
                      <div className=" font-bold text-black text-[1.1rem]">
                        <p className="opacity-50 pb-0 mb-0 mt-2">password</p>
                        <input
                          type="password"
                          className="px-3 py-2 border-gray-600 border-2 rounded-xl"
                          value=""
                        />
                      </div>
                      <div className="flex justify-between items-center mt-3 font-bold text-white">
                        <button
                          className="bg-yellow-500 px-5 py-1.5 rounded-lg shadow-lg"
                          onClick={() => {
                            openModal();
                            openGetMe();
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 px-5 py-1.5 rounded-lg shadow-lg"
                          onClick={logout}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
