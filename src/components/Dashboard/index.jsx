import Circle from "./statistics/cercle";
import LineChart from "./statistics/totop";

function Dashboard() {
    return (
        <div className="w-full flex lg:flex-row flex-col md:px-10 sd:px-5 px-2 md:py-10 py-5">
            <div className="lg:w-8/12 w-full">
                <div className="h-[320px] md:w-6/12 ">
                    <Circle />
                </div>
                <div className="h-[500px] rounded all-shadow">
                    <LineChart />
                </div>
            </div>
            <div className="lg:w-4/12 w-full lg:ml-5 lg:mt-0 mt-7">
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