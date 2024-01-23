import React, {useEffect, useState} from "react";
import "./login.css";
import axios from "axios";
import {byId, byIdObj, url} from "../api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        byIdObj('username').addEventListener("keydown", e => e.key === 'Enter' && login());
        byIdObj('password').addEventListener("keydown", e => e.key === 'Enter' && login());
    }, []);

    function login() {
        setIsLoading(true);
        axios.post(`${url}user/login?phoneNumber=${byId("username")}&password=${byId("password")}`)
            .then((res) => {
                if (res.data) {
                    sessionStorage.setItem("jwtKey", `Bearer ${res.data.body}`);
                    if (res.data.message === "ROLE_USER") byIdObj("user-dashboard").click();
                    else byIdObj("dashboard").click();
                } else toast.error("User not found");
                setIsLoading(false);
            }).catch(err => {
            setIsLoading(false);
            toast.error("User not found");
        });
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    sessionStorage.setItem('language', 'en');

    return (
        <div className="w-full h-screen flex justify-center items-center header-div text-white"
             style={{position: "fixed", overflow: "hidden"}}>
            <div className="w-[450px] h-[470px] rounded-2xl box md:py-10 md:px-12 px-5 py-10 flex flex-col">
                <p className="text-2xl mb-10">{t("login1")}</p>
                <p>{t("login2")}</p>
                <input
                    id="username"
                    disabled={isLoading}
                    className={`w-full ${
                        isLoading ? "cursor-not-allowed" : ""
                    } border-2 mb-5 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 duration-500`}
                    placeholder={t("login3")}
                />
                <p>{t("login4")}</p>
                <div className="relative">
                    <input
                        // onKeyDown={checkKeyPress}
                        id="password"
                        disabled={isLoading}
                        type={showPassword ? "text" : "password"}
                        className={`w-full ${
                            isLoading ? "cursor-not-allowed" : ""
                        } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 duration-500`}
                        placeholder={t("login5")}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black"
                        onClick={togglePasswordVisibility}
                    >
                        <i
                            className={
                                showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                            }
                        />
                    </button>
                </div>
                <button
                    className={`button ${
                        isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    } text-white p-3 text-lg font-semibold w-full rounded-md  mt-10`}
                    onClick={login}
                >
                    {isLoading ? <span className="loader"></span> : t("login1")}
                </button>
            </div>

            <Link to="/dashboard" id="dashboard"></Link>
            <Link to="/user-dashboard" id="user-dashboard"></Link>
        </div>
    );
}

export default Login;
