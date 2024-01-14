import Circle from "./statistics/cercle";
import LineChart from "./statistics/totop";

function Dashboard() {
    return (
        <div className="w-full flex flex-row md:px-10 px-5 md:py-10 py-5">
            <div className="w-8/12">
                <div className="h-[320px] w-6/12">
                    <Circle />
                </div>
                <div className="h-[500px] rounded all-shadow">
                    <LineChart />
                </div>
            </div>
            <div className="w-4/12 lg:ml-5">
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
                    <i class="fa-solid fa-bars text-2xl"></i>
                </div>
                <div className="w-full h-screen all-shadow p-5">
                </div>
            </div>
        </div>
    );
}

export default Dashboard;