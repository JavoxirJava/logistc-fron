import DashboardProductCard from "./card";
import Circle from "./statistics/cerclestatistic";
import LineChart from "./statistics/linestatistic";
import {useEffect, useState} from "react";
import {config, getMe, setConfig, url} from "../api";
import axios from "axios";

function Dashboard() {
    const [me, setMe] = useState(null);
    const [productStatistics, setProductStatistics] = useState(null);

    useEffect(() => {
        setConfig();
        getMe(setMe);
        axios.get(`${url}product/diagramForAdmin`, config).then(res => setProductStatistics(res.data.body))
    }, []);

    useEffect(() => {
        sessionStorage.setItem('userId', me ? me.id : 0);
    }, [me]);

    return (
        <div className="w-full flex lg:flex-row flex-col md:px-10 sd:px-5 px-2 md:py-10 py-5">
            <div className="lg:w-7/12 w-full ">
                <div className="h-[320px] md:w-6/12 ">
                    {productStatistics && <Circle s={productStatistics}/>}
                </div>
                <div className="h-[500px] rounded all-shadow">
                    <LineChart />
                </div>
            </div>
            <div className="lg:w-5/12 w-full lg:ml-5 lg:mt-0 mt-7">
                <div className="mb-10 flex items-center">
                    <div className="flex justify-between w-full px-3">
                        <input
                            type="text"
                            id="myInput"
                            value=""
                            onChange=""
                            placeholder="Search Id Number..."
                            className="px-3 py-2 border-gray-600 border-2 rounded-xl"
                        />
                    </div>
                    <i className="fa-solid fa-bars text-2xl"></i>
                </div>
                <div className="w-full h-screen all-shadow p-5">
                    <DashboardProductCard />
                    <DashboardProductCard />
                    <DashboardProductCard />
                    <DashboardProductCard />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;