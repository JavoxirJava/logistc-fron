import React from "react";
import { banner, enter, kamaz, kontener } from "../../assets";
import "./home.css";
import HomeFooter from "./HomeFooter";
function Home() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 ps-20 pt-10">
        {/* <div> */}
        <div className="col-span-3 зе-10">
          <h1 className="text-6xl font-semibold font-mono">
            We Will Deliver Your <br /> Packages Anywhere!
          </h1>
        </div>

        <div className="mt-10 ">
          <h2 className="text-2xl">
            <span className="text-4xl font-light">
              FIND IT | BUY IT | SHIP IT
            </span>{" "}
            <br /> We let you shop around the world and ship
            <br /> to logisippo straight to your doorstep!
          </h2>
        </div>
        <img
          className="col-span-2"
          style={{
            objectFit: "cover",
            right: "1rem",
            width: "800px",
            position: "absolute",
            top: "0rem",
          }}
          src={kamaz}
          alt="."
        />
      </div>
      <div className="mt-20 pt-5">
        <img style={{ zIndex: "20" }} src={banner} alt="" />
        <div className="grid grid-cols-2 ps-20 pt-20">
          <div>
            <h1 className="text-5xl font-semibold font-sans tracking-wider leading-normal">
              Deliver Your <span style={{ color: "#1A648C" }}>Logistic</span>{" "}
              <br /> Safely & Quickly
            </h1>
            <h4 className="text-lg">
              From start to finish, our seamless logistics service <br />{" "}
              ensures a successful delivery experience every time. <br /> Get
              started now and see the difference for yourself.
            </h4>
          </div>
          <img
            style={{
              position: "absolute",
              width: "900px",
              top: " 38rem",
              right: "5rem",
              zIndex: "-10",
            }}
            src={kontener}
            alt=""
          />
        </div>
        <div
          className="text-5xl font-semibold tracking-wider"
          style={{ marginTop: "18rem", textAlign: "center" }}
        >
          <h4>
            {" "}
            <span style={{ color: "#1A648C" }}>Shipping</span> & Logistic <br />{" "}
            Services
          </h4>
        </div>
        <div className="flex gap-5 justify-center mt-10">
          <div className="shipping back1">
            <div
              className="w-full h-full flex justify-around "
              style={{
                backgroundColor: "#00000089",
                borderRadius: "2rem",
                color: "#fff",
              }}
            >
              <p className="text-lg pt-40">Road transportion </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                className="mt-40"
                fill="white"
                viewBox="0 0 512 512"
              >
                <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
              </svg>
            </div>
          </div>
          <div className="">
            <button className="shipping2 text-3xl text-white mb-3">
              SHARAIT ↗️
            </button>
            <div className="shipping back2 ">
              <div
                className="w-full h-full flex justify-around "
                style={{
                  backgroundColor: "#00000089",
                  borderRadius: "2rem",
                  color: "#fff",
                }}
              >
                <p className="text-lg pt-40">Ship transportion</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  fill="white"
                  width="30"
                  className="mt-40"
                  viewBox="0 0 512 512"
                >
                  <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="shipping back3">
            <div
              className="w-full h-full flex justify-around "
              style={{
                backgroundColor: "#00000089",
                borderRadius: "2rem",
                color: "#fff",
              }}
            >
              <p className="text-lg pt-40">Air transportion</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                className="mt-40"
                fill="white"
                width="30"
                viewBox="0 0 512 512"
              >
                <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="back-img ps-32 pt-10 mt-20">
        <div className="flex">
          <img
            className="mt-10 me-10"
            style={{ width: "100px", height: "100px", borderRadius: "1rem" }}
            src="https://www.rubaltic.ru/upload/iblock/1c7/1c77c148461d88a38c4fe32223695b12.jpg"
            alt=""
          />
          <h1 className="text-5xl block font-semibold font-sans tracking-wider text-white">
            Effortless Delivery <br /> With Our Logistic <br /> Solutions
          </h1>
        </div>
        <img
          className="mt-10 ms-32 block"
          style={{ width: "100px", height: "100px", borderRadius: "1rem" }}
          src="https://img.freepik.com/fotos-premium/grande-caminhao-entrega-mercadorias-em-caixas-para-abrir-porao-de-aviao-de-carga_124507-44692.jpg"
          alt=""
        />
        <div className="mt-10">
          <h4
            className="text-lg font-semibold font-sans tracking-wider text-white"
            style={{ width: "30%" }}
          >
            Our Support Team is Always Available And Ready To Help With Any
            Delivery Issue You Have. Ensuring A Smooth Experience
          </h4>
          <button
            className="mt-7 mb-10"
            style={{
              backgroundColor: "#fff",
              padding: "0.5rem, 1.5rem",
              borderRadius: "1rem",
              color: "#3f3bf4",
            }}
          >
            Quick response
          </button>
        </div>
      </div>
      <HomeFooter/>
    </div>
  );
}

export default Home;
