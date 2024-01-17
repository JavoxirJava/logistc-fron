import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { byId, byIdObj, url } from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="w-full h-screen relative flex justify-center items-center header-div text-white">
      <div className="w-[450px] h-[470px] rounded-2xl box md:py-10 md:px-12 px-5 py-10 flex flex-col">
        <p className="text-2xl mb-10">Login</p>
        <p>Phone Number</p>
        <input
          id="username"
          disabled={isLoading ? true : false}
          className={`w-full ${
            isLoading ? "cursor-not-allowed" : ""
          } border-2 mb-5 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 duration-500`}
          placeholder="Number"
        />
        <p>Password</p>
        <div className="relative">
          <input
            // onKeyDown={checkKeyPress}
            id="password"
            disabled={isLoading ? true : false}
            type={showPassword ? "text" : "password"}
            className={`w-full ${
              isLoading ? "cursor-not-allowed" : ""
            } border-2 text-black border-gray-200 p-3 rounded-xl outline-none focus:border-blue-400 duration-500`}
            placeholder="Enter password"
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
          {isLoading ? <span class="loader"></span> : "Log In"}
        </button>
      </div>

      <Link to="/dashboard" id="dashboard"></Link>
    </div>
  );
}

export default Login;
