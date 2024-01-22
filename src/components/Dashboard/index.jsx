import DashboardProductCard from "./card";
import Circle from "./statistics/cerclestatistic";
import LineChart from "./statistics/linestatistic";
import {useEffect, useState} from "react";
import {config, getMe, setConfig, url} from "../api";
import axios from "axios";
import NavBar from "../navbar/NavBar";

function Dashboard({changeLanguage, lang}) {
    const [me, setMe] = useState(null);
    const [productStatistics, setProductStatistics] = useState(null);
    const [productStatistics2, setProductStatistics2] = useState(null);

    useEffect( () => {
        setConfig();
        getMe(setMe);
        axios.get(`${url}product/diagramForAdmin`, config)
            .then((res) => setProductStatistics(res.data.body))
            .catch(err => console.log(err));
        axios.get(`${url}product/admin/statistics`, config)
            .then((res) => setProductStatistics2(res.data.body))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        sessionStorage.setItem("userId", me ? me.id : 0);
    }, [me]);

    setConfig();

    return (
        <>
            <NavBar dashboard={'border-b-red-600 border-b text-slate-900'} lang={lang} />
            <div className="w-full flex lg:flex-row flex-col md:px-10 sd:px-5 px-2 md:py-10 py-5">
                <div className="lg:w-7/12 w-full ">
                    <div className="h-[320px] md:w-6/12">
                        {productStatistics && <Circle s={productStatistics}/>}
                    </div>
                    <div className="h-[400px] mt-10 rounded all-shadow">
                        {productStatistics2 && <LineChart productStatistics2={productStatistics2}/>}
                    </div>
                </div>
                <div className="lg:w-5/12 w-full lg:ml-5 lg:mt-0 mt-7">
                    <div className="w-full all-shadow p-5 bg-gray-200">
                        <DashboardProductCard lang={lang}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
