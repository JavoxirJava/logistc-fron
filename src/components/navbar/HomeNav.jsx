
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../home page/home.css";

import {logo} from "../../assets";
import {useTranslation} from "react-i18next";

function HomeNav({hom,abou,services,gallery, changeLang}) {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const {t} = useTranslation();
    const [home, setHome] = useState(false)
    const [about, setAbout] = useState(false)
    const [servise, setServise] = useState(false)
    const [gallary, setGallary] = useState(false)


    const openMenu = () => setIsOpenMenu(!isOpenMenu);

    const login = () => document.getElementById("login").click();
    return (
        <div>
            <nav className="bg-white z-10 fixed w-full">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
                                className={`${
                                    isOpenMenu ? "inline" : "hidden  "
                                } absolute lg:w-80 w-52 bg-slate-400 top-12 
                                    rounded-3xl shadow-lg overflow-hidden z-20`}
                            >
                                <div className="bg-slate-200 p-5 flex justify-center items-center relative">
                                    <i
                                        className="fa-solid fa-xmark absolute top-5 right-5 text-2xl cursor-pointer"
                                        onClick={openMenu}
                                    ></i>
                                    <ul className="list-none">
                                        <li className="my-2" onClick={openMenu}>
                                            <a
                                                href={hom}
                                                className="text-gray-600 hover:text-black hover:underline hover:underline-offset-4 rounded-md px-3 py-2 text-md font-medium"
                                                aria-current="page"
                                            >
                                                {t("home")}
                                            </a>
                                        </li>
                                        <li onClick={openMenu}>
                                            <a
                                                href={abou}
                                                className="text-gray-600 hover:text-black hover:underline hover:underline-offset-4 rounded-md px-3 py-2 text-md font-medium"
                                            >
                                                {t("about")}
                                            </a>
                                        </li>
                                        <li className="my-2" onClick={openMenu}>
                                            {" "}
                                            <a
                                                href={services}
                                                className="text-gray-600 hover:text-black hover:underline hover:underline-offset-4 rounded-md px-3 py-2 text-md font-medium"
                                            >
                                                {t("service")}
                                            </a>
                                        </li>
                                        <li onClick={openMenu}>
                                            {" "}
                                            <a
                                                href={gallery}
                                                className="text-gray-600 hover:text-black hover:underline hover:underline-offset-4 rounded-md px-3 py-2 text-md font-medium"
                                            >
                                                {t("gallary")}
                                            </a>
                                        </li>
                                        <li className="mt-3">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="h-10 w-auto hidden sm:inline" src={logo} alt="Your Company"/>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a
                                        href={hom}
                                        onClick={() => {
                                            setHome(true)
                                            setGallary(false)
                                            setServise(false)
                                            setAbout(false);
                                        }}
                                        className={`${home ? "border-b border-b-red-600 text-red-600" : "text-gray-600"} hover:border-b hover:border-b-red-600 hover:text-red-600 duration-200 rounded-md px-3 py-2 text-sm font-medium`}
                                        aria-current="page"
                                    >
                                        {t("home")}
                                    </a>
                                    <a
                                        href={abou}
                                        onClick={() => {
                                            setHome(false)
                                            setGallary(false)
                                            setServise(false)
                                            setAbout(true);
                                        }}
                                        className={`${about ? "border-b border-b-red-600 text-red-600" : "text-gray-600"} hover:border-b hover:border-b-red-600 hover:text-red-600 duration-200 rounded-md px-3 py-2 text-sm font-medium`}
                                    >
                                        {t("about")}
                                    </a>
                                    <a
                                        href={services}
                                        onClick={() => {
                                            setHome(false)
                                            setGallary(false)
                                            setServise(true)
                                            setAbout(false);
                                        }}
                                        className={`${servise ? "border-b border-b-red-600 text-red-600" : "text-gray-600"} hover:border-b hover:border-b-red-600 hover:text-red-600 duration-200 rounded-md px-3 py-2 text-sm font-medium`}
                                    >
                                        {t("service")}
                                    </a>
                                    <a
                                        href={gallery}
                                        onClick={() => {
                                            setHome(false)
                                            setGallary(true)
                                            setServise(false)
                                            setAbout(false);
                                        }}
                                        className={`${gallary ? "border-b border-b-red-600 text-red-600" : "text-gray-600"} hover:border-b hover:border-b-red-600 hover:text-red-600 duration-200 rounded-md px-3 py-2 text-sm font-medium`}
                                    >
                                        {t("gallary")}
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div
                            className=" md:inline inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ms-20 sm:pr-0"></div>
                        <div
                            className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ms-20 sm:pr-0">
                            <Link id="login" to="/login">
                                <button
                                    className=" flex text-lg gap-3 rounded-full bg-gray-800 p-1 text-gray-400 px-4 py-2 btm"
                                    onClick={login}
                                >
                                    <p className="hidden md:block">{t("login1")}</p>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="26"
                                        width="26"
                                        fill="white"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HomeNav;
