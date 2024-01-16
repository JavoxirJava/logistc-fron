import DashboardProductCard from "./card";
import Circle from "./statistics/cerclestatistic";
import LineChart from "./statistics/linestatistic";
import {useEffect, useState} from "react";
import {config, getMe, setConfig, url} from "../api";
import axios from "axios";
import NavBar from "../navbar/NavBar";

function Dashboard() {
    const [me, setMe] = useState(null);
    const [productStatistics, setProductStatistics] = useState(null);

    useEffect(() => {
        setConfig();
        getMe(setMe);
        axios.get(`${url}product/diagramForAdmin`, config)
            .then((res) => setProductStatistics(res.data.body))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        sessionStorage.setItem("userId", me ? me.id : 0);
    }, [me]);

    return (
        <>
            <NavBar/>
            <div className="w-full flex lg:flex-row flex-col md:px-10 sd:px-5 px-2 md:py-10 py-5">
                <div className="lg:w-7/12 w-full ">
                    <div className="h-[320px] md:w-6/12">
                        {productStatistics && <Circle s={productStatistics}/>}
                    </div>
                    <div className="h-[400px] mt-10 rounded all-shadow">
                        <LineChart/>
                    </div>
                </div>
                <div className="lg:w-5/12 w-full lg:ml-5 lg:mt-0 mt-7">
                    <div className="w-full all-shadow p-5 bg-gray-200">
                        <DashboardProductCard />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
