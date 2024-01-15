import React from "react";

const HistoryInfo = ({history}) => {

    return (
        <>
            {history.length && history.map((item, i) => (
                <div
                    key={i}
                    className={`w-full ${item.className} history-info-bg border rounded-md border-slate-400 px-6 mt-2
            py-4 text-center flex justify-center items-center`}
                >
                    <div className="w-[185px]">
                        <p className="opacity-70">Number</p>
                        <p className="font-bold text-[.9rem]">
                            {item.idNumber ? item.idNumber : 0}
                        </p>
                    </div>
                    <div className="w-[185px]">
                        <p className="opacity-70">Current Location</p>
                        <p className="font-bold text-[.9rem]">
                            {item.address ? item.address : "No location"}
                        </p>
                    </div>
                    <div className="w-[185px]">
                        <p className="opacity-70">Status</p>
                        <p className="font-bold text-[.9rem] text-green-500">
                            {item.status ? item.status : "Completed"}
                        </p>
                    </div>
                    <div className="w-[185px]">
                        <p className="opacity-70">ETD</p>
                        <p className="font-bold text-[.9rem]">
                            {item.etd ? item.etd : "April 23, 2022"}
                        </p>
                    </div>
                    <div className="w-[185px]">
                        <p className="opacity-70">Owner</p>
                        <p className="font-bold text-[.9rem]">
                            {item.owner ? item.owner : "No Owner"}
                        </p>
                    </div>
                    <div className="w-[185px]">
                        <p className="opacity-70">Product</p>
                        <p className="font-bold text-[.9rem]">
                            {item.product ? item.product : "No Product"}
                        </p>
                    </div>
                    <div className="w-[190px]">
                        <button
                            className="py-2 px-6 bg-blue-800 border border-red-500 rounded-md
                text-white font-bold active:scale-95 duration-300 tracking-wide"
                        >
                            view details
                        </button>
                    </div>
                </div>
            ))}

        </>
    );
};

export default HistoryInfo;
