import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { byId, config, getMe, url } from "../api";
import { admin, logo } from "../../assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./style.css";
import DropdownA from "./NavDrop";

function NavBar({
  dashboard,
  product,
  client,
  history,
  cassier,
  werhouse,
  lang,
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenm, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ismodalClose, setIsModalClose] = useState(true);
  const [me, setMe] = useState(null);
  const [meId, setMeId] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setIsOpen(false);
      setIsModalOpen(false);
    }
  });

  const openGetMe = () => setIsOpen(!isOpenm);
  const openMenu = () => setIsOpenMenu(!isOpenMenu);
  const openModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalClose(!isModalOpen);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { t } = useTranslation();

  const logout = () => {
    document.getElementById("logout").click();
    sessionStorage.clear();
    localStorage.clear();
  };

  const editUser = async () => {
    await axios
      .put(
        `${url}user/admin?name=a&phoneNumber=a&password=a`,
        {
          id: meId.id,
          name: byId("name"),
          idNumber: byId("idNumber"),
          phoneNumber: byId("phoneNumber"),
          password: byId("password"),
        },
        config
      )
      .then(() => {
        toast.success(t("success"));
      })
      .catch(() => {
        toast.error(t("error"));
      });
    await axios
      .post(
        `${url}user/login?phoneNumber=${byId("phoneNumber")}&password=${byId(
          "password"
        )}`
      )
      .then((res) => {
        sessionStorage.setItem("jwtKey", `Bearer ${res.data.body}`);
        sessionStorage.setItem("role", res.data.message);
        openModal();
        getMe(setMe, lang);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getMe(setMe, lang);
  }, []);

  useEffect(() => {
    getMe(setMe, lang);
  }, [lang]);

  const onUser = () => document.getElementById("user").click();
  const onManager = () => document.getElementById("manager").click();

  return (
    <div className="">
      <Link to="/" id="logout"></Link>
      <nav className="bg-white fixed w-full z-20 ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="relative inset-y-0 left-0 flex items-center lg:hidden">
              <button
                type="button"
                onClick={openMenu}
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

              <div
                className={`${isOpenMenu ? "inline" : "hidden  "
                  } absolute lg:w-80 w-52 bg-slate-400 top-12 
                                    rounded-3xl shadow-lg overflow-hidden z-20`}
              >
                <div className="bg-slate-200 p-5 flex justify-center items-center relative">
                  <i
                    className="fa-solid fa-xmark absolute top-5 right-5 text-2xl cursor-pointer"
                    onClick={openMenu}
                  ></i>
                  <ul class="list-none me-3">
                    <li className="my-2" onClick={openMenu}>
                      <Link
                        to="/dashboard"
                        className="text-gray-500 text-md hover:text-black hover:underline hover:underline-offset-4 rounded-md font-medium"
                        aria-current="page"
                      >
                        {t("dashboard")}
                      </Link>
                    </li>
                    <li onClick={openMenu}>
                      <Link
                        to="/project"
                        className="text-gray-500 text-md hover:text-black hover:underline hover:underline-offset-4 rounded-md font-medium"
                        aria-current="page"
                      >
                        {t("produkt")}
                      </Link>
                    </li>
                    <li onClick={openMenu} className="mt-2">
                      <Link
                        to="/warehouse"
                        className="text-gray-500 text-md hover:text-black hover:underline hover:underline-offset-4 rounded-md font-medium"
                        aria-current="page"
                      >
                        {t("werhouse")}
                      </Link>
                    </li>
                    <li className="my-2" onClick={openMenu}>
                      {" "}
                      <Link
                        to="/users"
                        className="text-gray-500 text-md hover:text-black hover:underline hover:underline-offset-4 rounded-md font-medium"
                        aria-current="page"
                      >
                        {t("users")}
                      </Link>
                    </li>
                    <li onClick={openMenu}>
                      {" "}
                      <Link
                        to="/cassier"
                        className="text-gray-500 text-md hover:text-black hover:underline hover:underline-offset-4 rounded-md font-medium"
                        aria-current="page"
                      >
                        {t("cassier")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to='/dashboard'>
                  <img
                    className="h-10 w-auto hidden lg:inline"
                    src={logo}
                    alt="Your Company"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 lg:block">
                <div className="flex space-x-4">
                  <Link
                    to="/dashboard"
                    className={`${dashboard} text-gray-500 hover:text-slate-900 mx-5 px-2 py-2 text-sm font-medium duration-300`}
                  // aria-current="page"
                  >
                    {t("dashboard")}
                  </Link>
                  <Link
                    to="/project"
                    className={`${product} text-gray-500 hover:text-slate-900 mx-5 px-2 py-2 text-sm font-medium duration-300`}
                  // aria-current="page"
                  >
                    {t("produkt")}
                  </Link>
                  <Link
                    to="/warehouse"
                    className={`${werhouse} text-gray-500 hover:text-slate-900 mx-5 px-2 py-2 text-sm font-medium duration-300`}
                  // aria-current="page"
                  >
                    {t("werhouse")}
                  </Link>
                  <Link
                    to="/users"
                    className={`${client} text-gray-500 hover:text-slate-900 mx-5 px-2 py-2 text-sm font-medium duration-300`}
                  // aria-current="page"
                  >
                    {t("users")}
                  </Link>
                  {/* <DropdownA/> */}
                  <Link
                    to="/cassier"
                    className={`${cassier} text-gray-500 hover:text-slate-900 mx-5 px-2 py-2 text-sm font-medium duration-300`}
                  // aria-current="page"
                  >
                    {t("cassier")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <h2 className="relative rounded-full  p-1 text-gray-700 ">
                {me ? me.name : ""}
              </h2>

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
                      src={admin}
                      alt="img"
                    />
                  </button>
                </div>

                <div
                  className={`${isOpenm ? "inline" : "hidden"
                    } absolute lg:w-80 w-72 media-nav bg-slate-400 lg:-right-8 right-1 top-12 
                                    rounded-3xl shadow-lg overflow-hidden z-20`}
                >
                  <div className="bg-slate-200 sm:p-8 p-3 flex justify-center items-center relative">
                    <img
                      className="rounded-full w-24 h-24"
                      src={admin}
                      alt="img"
                    />
                    <i
                      className="fa-solid fa-xmark absolute top-5 right-5 text-2xl cursor-pointer"
                      onClick={openGetMe}
                    ></i>
                  </div>
                  <div className="bg-slate-200 sm:px-8 px-2 py-6">
                    {me ? (
                      <>
                        <div className=" font-bold text-black text-[1.1rem]">
                          <p className="opacity-50 pb-0 mb-0 mt-2">
                            {t("addclient3")}
                          </p>
                          <p className="mt-0 pt-0 text-black">{me.name}</p>
                        </div>
                        <div className=" font-bold text-black text-[1.1rem]">
                          <p className="opacity-50 pb-0 mb-0 mt-2">
                            {t("addclient5")}
                          </p>
                          <p className="mt-0 pt-0 text-black">
                            {me.idNumber ? me.idNumber : "none"}
                          </p>
                        </div>
                        <div className=" font-bold text-black text-[1.1rem]">
                          <p className="opacity-50 pb-0 mb-0 mt-2">
                            {t("addclient7")}
                          </p>
                          <p className="mt-0 pt-0 text-black">
                            {me.phoneNumber}
                          </p>
                        </div>
                        <div className=" font-bold text-black password text-[1.1rem]">
                          <p className="opacity-50 pb-0 mb-0 mt-2">
                            {t("addclient9")}
                          </p>

                          <p className="mt-0 pt-0 nuqta text-black">......</p>
                          <p className="mt-0 pt-0 parol text-black">
                            {me.password}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-3 font-bold text-white">
                          <button
                            className="bg-yellow-500 px-5 py-1.5 rounded-lg
                                                shadow-lg active:scale-95 duration-200"
                            onClick={() => {
                              setMeId(me);
                              openModal();
                              openGetMe();
                            }}
                          >
                            {t("edit")}
                          </button>
                          <button
                            className="bg-red-600 px-5 py-1.5 rounded-lg
                                                shadow-lg active:scale-95 duration-200"
                            onClick={() => {
                              logout();
                              openGetMe();
                            }}
                          >
                            {t("logout")}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-center items-center mt-3 font-bold text-white">
                        <button
                          className="bg-red-600 px-5 py-1.5 rounded-lg
                                                shadow-lg active:scale-95 duration-200"
                          onClick={() => {
                            logout();
                            openGetMe();
                          }}
                        >
                          {t("logout")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center px-3 justify-center z-50">
              <div className="modal bg-white rounded-xl lg:w-1/3 sm:w-2/3  w-full overflow-hidden shadow-2xl">
                <div className="">
                  <div className="bg-slate-200 py-8  flex flex-col justify-center items-center relative">
                    <i
                      className="fa-solid fa-xmark absolute top-5 right-5 text-2xl"
                      onClick={() => {
                        openModal();
                      }}
                    ></i>
                    <img
                      className="rounded-full w-24 h-24"
                      src={admin}
                      alt="img"
                    />
                  </div>
                  <div className="bg-slate-200 w-full md:px-8 px-3 md:py-6 py-2">
                    <div className=" font-bold text-black text-[1.1rem]">
                      <p className="opacity-50 pb-0 mb-0 mt-2">
                        {t("addclient3")}
                      </p>
                      <input
                        type="text"
                        defaultValue={me.name}
                        id="name"
                        className="w-full border-2 text-gray-800 border-gray-200 p-2 rounded-xl outline-none focus:border-blue-400 duration-500"
                      />
                    </div>
                    <div className=" font-bold text-black text-[1.1rem]">
                      <p className="opacity-50 pb-0 mb-0 mt-2">
                        {t("addclient5")}
                      </p>
                      <input
                        type="text"
                        defaultValue={me.idNumber}
                        id="idNumber"
                        className="w-full border-2 text-gray-800 border-gray-200 p-2 rounded-xl outline-none focus:border-blue-400 duration-500"
                      />
                    </div>
                    <div className=" font-bold text-black text-[1.1rem]">
                      <p className="opacity-50 pb-0 mb-0 mt-2">
                        {t("addclient7")}
                      </p>
                      <input
                        type="text"
                        id="phoneNumber"
                        defaultValue={me.phoneNumber}
                        className="w-full border-2 text-gray-800 border-gray-200 p-2 rounded-xl outline-none focus:border-blue-400 duration-500"
                      />
                    </div>
                    <div className=" font-bold text-black text-[1.1rem]">
                      <p className="opacity-50 pb-0 mb-0 mt-2">
                        {t("addclient9")}
                      </p>
                      <div className="relative">
                        <input
                          // onKeyDown={checkKeyPress}
                          defaultValue={me.password}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="w-full border-2 text-gray-800 border-gray-200 p-2 rounded-xl outline-none focus:border-blue-400 duration-500"
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
                                ? "fa-solid fa-eye-slash"
                                : "fa-solid fa-eye"
                            }
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 font-bold text-white">
                      <button
                        className="bg-red-600 px-5 py-1.5 rounded-lg shadow-lg"
                        onClick={() => {
                          openModal();
                        }}
                      >
                        {t("close")}
                      </button>
                      <button
                        className="bg-yellow-500 px-5 py-1.5 rounded-lg shadow-lg"
                        onClick={() => {
                          editUser();
                        }}
                      >
                        {t("edit")}
                      </button>
                    </div>
                  </div>
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
