import React from "react";
import "./history.css";
import HistoryInfo from "./HistoryInfo";
import NavBar from "../navbar/NavBar";

const History = () => {
  return (
    <>
      <NavBar />
      <div className="history-bg">
        <div className="history-container flex justify-center items-center flex-wrap mt-5">
          <div className="flex flex-col">
            <label
              htmlFor="startDate"
              className="mx-5 text-slate-800 font-semibold tracking-wider"
            >
              Start date
            </label>
            <input
              id="startDate"
              type="date"
              className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
              placeholder="Start date"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="endDate"
              className="mx-5 text-slate-800 font-semibold tracking-wider"
            >
              End date
            </label>
            <input
              id="endDate"
              type="date"
              className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
              placeholder="End date"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="searchUser"
              className="mx-5 text-slate-800 font-semibold tracking-wider"
            >
              Search User id
            </label>
            <input
              id="searchUser"
              className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
              placeholder="🔍  Search User id..."
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="searchId"
              className="mx-5 text-slate-800 font-semibold tracking-wider"
            >
              Search Id Number
            </label>
            <input
              id="searchId"
              className="py-2 px-4 mx-4 bg-white rounded-md border border-slate-300
                        focus:outline-0 focus:border-slate-500 duration-300 focus:bg-slate-100 shadow-md
                        focus:placeholder:text-slate-800 placeholder:duration-300 placeholder:font-medium"
              placeholder="🔍  Search Id Number..."
            />
          </div>
        </div>

        {/* history table */}
        <div className="history-container mb-5">
          <HistoryInfo className="mt-6" />
        </div>
      </div>
            </>
  );
};

export default History;
