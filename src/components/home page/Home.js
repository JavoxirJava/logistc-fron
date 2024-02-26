import React from "react";
import {banner, kamaz, kontener} from "../../assets";
import "./home.css";
import HomeFooter from "./HomeFooter";
import HomeNav from "../navbar/HomeNav";
import { useTranslation } from "react-i18next";
function Home({changeLang}) {
  const { t } = useTranslation()
  return (
    <>
      <HomeNav hom={`#home`} abou={`#about`} services={`#services`} gallery={`#gallery`} changeLang={changeLang}/>
      <div className="w-full pt-20 overflow-x-hidden">
        {/* first section */}
        <div id="home" className="w-full flex lg:flex-row flex-col h-max lg:px-20 px-5">
          <div className="pt-10 flex">
            <div>
              <div className="w-full">
                <h1
                  className="md:text-6xl text-4xl font-semibold font-mono md:mt-20"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration="700"
                >
                  {t("homeText1")} <br/> {t("homeText01")}
                </h1>
              </div>

              <div className="mt-10 ">
                <h2
                  className="text-2xl"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="700"
                >
                  <span className="md:text-4xl text-3xl font-light">
                    {t("homeText2")}
                  </span>{" "}
                  <br data-aos="fade-top" data-aos-duration="700" /> {t("homeText3")}
                  <br /> {t("homeText03")}
                </h2>
              </div>
            </div>
          </div>
          <div
            className="lg:absolute relative lg:w-6/12 md:w-7/12 w-full right-0 overflow-hidden"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <img
              className="w-full top-0 important5"
              style={{
                objectFit: "cover",
              }}
              src={kamaz}
              alt="."
            />
          </div>
        </div>
        {/* end section */}

        {/* start second section */}
        <div id="about" className="lg:mt-5 pt-5  w-full overflow-hidden">
          <img className="w-full importand3" src={banner} alt="" />
          <div className="important lg:px-20 px-5 lg:pt-20 w-full flex lg:flex-row flex-wrap-reverse">
            <div className="lg:w-6/12">
              <h1
                className="md:text-5xl text-3xl font-semibold font-sans tracking-wider leading-normal"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="700"
              >
                {t("homeText4")} <span style={{ color: "#1A648C" }}>{t("homeText5")}</span>{" "}
                <br /> {t("homeText6")}
              </h1>
              <h4
                className="text-lg mt-5"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="700"
              >
                {t("homeText7")} <br />{" "}
                {/* {t("homeText07")}<br /> */}
                {/* {t("homeText007")} */}
              </h4> 
            </div>
            <div
              className="lg:w-6/12 important2"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="700"
            >
              <img className="w-full important2" src={kontener} alt="" />
            </div>
          </div>
          {/* end second section */}

          {/* end third section */}
          <div id="services" className="flex flex-col">
            <div className="md:text-5xl text-3xl font-semibold tracking-wider mt-10 text-center">
              <h4
                data-aos="zoom-out"
                data-aos-easing="linear"
                data-aos-duration="700"
              >
                {" "}
                <span style={{ color: "#1A648C" }}>{t("homeText8")}</span> {t("homeText9")}{" "}
                <br /> {t("homeText09")}
              </h4>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-around flex-wrap mt-10 lg:w-9/12 md:w-10/12 w-full">
                <div
                  className="shipping back1 mb-3 lg:mb-0"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration="700"
                >
                  <div
                    className="w-full h-full flex justify-around back-h"
                    style={{
                      backgroundColor: "#00000089",
                      borderRadius: "2rem",
                      color: "#fff",
                    }}
                  >
                    <p className="text-lg pt-40 ">{t("homeText11")}</p>
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
                <div
                  className="lg:mb-0 mb-10"
                  data-aos="zoom-out"
                  data-aos-easing="linear"
                  data-aos-duration="700"
                >
                  <button className="shipping2 text-3xl text-white mb-3">
                    {t("homeText10")}
                  </button>
                  <div
                    className="shipping back2 lg:mb-5"
                    data-aos="fade-up"
                    data-aos-easing="linear"
                    data-aos-duration="700"
                  >
                    <div
                      className="w-full h-full flex justify-around back-h"
                      style={{
                        backgroundColor: "#00000089",
                        borderRadius: "2rem",
                        color: "#fff",
                      }}
                    >
                      <p className="text-lg pt-40">{t("homeText12")}</p>
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
                <div
                  className="shipping back3"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="700"
                >
                  <div
                    className="w-full h-full flex justify-around back-h"
                    style={{
                      backgroundColor: "#00000089",
                      borderRadius: "2rem",
                      color: "#fff",
                    }}
                  >
                    <p className="text-lg pt-40">{t("homeText13")}</p>
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
          </div>
        </div>
        {/* end third section */}

        {/* start forth section */}
        <div id="gallery" className="back-img md:px-20 px-5 pt-10 mt-20 overflow-hidden">
          <div
            className="flex"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <img
              className="mt-10 me-10"
              style={{ width: "100px", height: "100px", borderRadius: "1rem" }}
              src="https://www.rubaltic.ru/upload/iblock/1c7/1c77c148461d88a38c4fe32223695b12.jpg"
              alt=""
            />
            <h1
              className="md:text-5xl text-2xl block font-semibold font-sans tracking-wider text-white"
              data-aos="fade-top"
            >  
            {t("homeText14")} <br /> {t("homeText014")} <br /> {t("homeText0014")}
            </h1>
          </div>
          <img
            data-aos="zoom-out"
            data-aos-easing="linear"
            data-aos-duration="700"
            className="mt-10 ms-32 block"
            style={{ width: "100px", height: "100px", borderRadius: "1rem" }}
            src="https://img.freepik.com/fotos-premium/grande-caminhao-entrega-mercadorias-em-caixas-para-abrir-porao-de-aviao-de-carga_124507-44692.jpg"
            alt=""
          />
          <div
            className="mt-10"
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <h4 className="lg:text-lg mb-20 font-semibold font-sans tracking-wider text-white md:w-5/12">
              {t("homeText15")}
            </h4>
            
          </div>
        </div>
        {/* end fourth section */}
      </div>
      <HomeFooter />
    </>
  );
}

export default Home;
