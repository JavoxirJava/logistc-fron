import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { byId, byIdObj, url } from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { bir, ikki, logo } from "../../assets";


function Login({setCashierUrl}) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        byIdObj('username').addEventListener("keydown", e => e.key === 'Enter' && login());
        byIdObj('password').addEventListener("keydown", e => e.key === 'Enter' && login());
    }, []);

    function login() {
        setIsLoading(true);
        let data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        
        axios.post(`${url}user/login?idNumber=${data.username}&password=${data.password}`, '')
            .then((res) => {
                if (res.data) {
                    setCashierUrl(res.data.message)
                    sessionStorage.setItem("jwtKey", `Bearer ${res.data.body}`);
                    sessionStorage.setItem("role", res.data.message)
                    if (res.data.message === "ROLE_USER") byIdObj("user-dashboard").click();
                    else if (res.data.message === "ROLE_ADMIN") byIdObj("dashboard").click();
                    else if (res.data.message === "ROLE_MANAGER") byIdObj("dashboard").click();
                    else if (res.data.message === "ROLE_CASHIER") byIdObj("cashier-dashboard").click();
                    else toast.error(t("usernotfound"));
                } else toast.error(t("usernotfound"));
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                toast.error(t("usernotfound"));
            });
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    sessionStorage.setItem('language', 'en');

    return (
        <div className="w-full h-screen flex flex-col gap-10 justify-center items-center header-div text-white relative"
            style={{ position: "fixed", overflow: "hidden" }}>
            <img className="w-[350px] px-10" src={logo} alt="" />
            <div className="relative w-[750px] flex gap-20 flex-row justify-center">
                <img className="absolute left-32 md:left-0 w-[13rem] " src={bir} alt="dj" />
                <img className="absolute top-20 right-10 md:right-0 w-[24rem] " src={ikki} alt="jfj" />
            </div>
            <div className="md:w-[400px] h-[360px] rounded-2xl box z-10 md:py-10 md:px-12 px-5 py-10 flex flex-col">
                <p>{t("idNumber")}</p>
                <input
                    id="username"
                    disabled={isLoading}
                    className={`w-full ${isLoading ? "cursor-not-allowed" : ""
                        } border-2 mb-5 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-[#F4541F] duration-500`}
                    placeholder={t("login3")}
                />
                <p>{t("login4")}</p>
                <div className="relative">
                    <input
                        id="password"
                        disabled={isLoading}
                        type={showPassword ? "text" : "password"}
                        className={`w-full ${isLoading ? "cursor-not-allowed" : ""
                            } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-[#F4541F] duration-500`}
                        placeholder={t("login5")}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-black "
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
                    className={`button ${isLoading ? "cursor-not-allowed" : "cursor-pointer"
                        } text-white p-3 text-lg font-semibold w-full rounded-md  mt-10`}
                    onClick={login}
                >
                    {isLoading ? <span className="loader"></span> : t("login1")}
                </button>
            </div>

            <Link to="/dashboard" id="dashboard"></Link>
            <Link to="/user-dashboard" id="user-dashboard"></Link>
            <Link to="/cashier-dashboard" id="cashier-dashboard"></Link>
        </div>
    );
}

export default Login;
