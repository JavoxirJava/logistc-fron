import Circle from "./statistics/cercle";
import LineChart from "./statistics/totop";

function Dashboard() {
    return (
        <div className="w-full flex flex-row md:px-10 px-5 md:py-10 py-5">
            <div className="w-8/12">
                <div className="h-[300px]">
                    <Circle />
                </div>
                <div className="h-[500px] rounded all-shadow">
                    <LineChart />
                </div>
            </div>
            <div className="w-3/12">
                salom
            </div>
        </div>
    );
}

export default Dashboard;