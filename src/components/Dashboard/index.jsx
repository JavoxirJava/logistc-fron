import DashboardProductCard from "./card";
import Circle from "./statistics/cerclestatistic";
import LineChart from "./statistics/linestatistic";
import { useEffect, useState } from "react";
import { config, getMe, setConfig, url } from "../api";
import axios from "axios";
import "./index.css";
import NavBar from "../navbar/NavBar";

function Dashboard({ changeLanguage, lang }) {
  const [me, setMe] = useState(null);
  const [productStatistics, setProductStatistics] = useState(null);
  const [productStatistics2, setProductStatistics2] = useState(null);
  // document.title = "GSR Logistics | Dashboard"

  useEffect(() => {
    setConfig();
    getMe(setMe);
    axios
      .get(`${url}product/diagramForAdmin?lang=${lang}`, config)
      .then((res) => setProductStatistics(res.data.body))
      .catch((err) => console.log(err));
    axios
      .get(`${url}product/admin/statistics?lang=${lang}`, config)
      .then((res) => setProductStatistics2(res.data.body))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setConfig();
    getMe(setMe);
    axios
      .get(`${url}product/diagramForAdmin?lang=${lang}`, config)
      .then((res) => setProductStatistics(res.data.body))
      .catch((err) => console.log(err));
    axios
      .get(`${url}product/admin/statistics?lang=${lang}`, config)
      .then((res) => setProductStatistics2(res.data.body))
      .catch((err) => console.log(err));
  }, [lang]);

  useEffect(() => {
    sessionStorage.setItem("userId", me ? me.id : 0);
  }, [me]);

  setConfig();

  return (
    <>
      <NavBar
        dashboard={"border-b-red-600 border-b text-slate-900"}
        lang={lang}
      />
      <div className="background">
        <div className="w-full flex md:px-10 sd:px-5 px-2 md:py-10 py-5 ">
          <div className=" w-full flex-col lg:flex-row flex gap-5 mt-10">
            <div className="h-[400px] md:w-6/12">
              {productStatistics && <Circle s={productStatistics} />}
            </div>
            <div className="h-[400px] rounded all-shadow w-full">
              {productStatistics2 && (
                <LineChart productStatistics2={productStatistics2} />

)}
            </div>
          </div>
        </div>
        <div className="lg:px-10 px-2 pb-20">
          <div className="w-full all-s
          hadow p-5 rounded-lg backCircle mt-10">
            <DashboardProductCard lang={lang} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
