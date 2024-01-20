import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { byId, byIdObj, url } from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();


  function login() {
    setIsLoading(true);

    axios
      .post(
        `${url}user/login?phoneNumber=${byId("username")}&password=${byId(
          "password"
        )}`
      )
      .then((res) => {
        sessionStorage.setItem("jwtKey", `Bearer ${res.data.body}`);
        setIsLoading(false);

        byIdObj("dashboard").click();
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("User not found");
      });
  }
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="w-full h-screen flex justify-center items-center px-2 header-div text-white" style={{position: "fixed", overflow: "hidden"}}>
      <div className="w-[450px] md:h-[470px] h-[400px] rounded-2xl box md:py-10 md:px-12 sm:px-5 px-3 py-7 flex flex-col">
        <p className="text-2xl mb-10">{t("login1")}</p>
        <p>{t("login2")}</p>
        <input
          id="username"
          disabled={isLoading ? true : false}
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
            disabled={isLoading ? true : false}
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
          {isLoading ? <span class="loader"></span> : t("login1")}
        </button>
      </div>

      <Link to="/dashboard" id="dashboard"></Link>
    </div>
  );
}

export default Login;
