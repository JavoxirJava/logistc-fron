import React, { useEffect, useState } from "react";

import { ThreeCircles } from "react-loader-spinner";
import Home from "./Home";

function Loader({changeLang}) {
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className=" loading w-full h-screen flex justify-center z-500 items-center">
          <ThreeCircles
            visible={true}
            height="200"
            width="200"
            color="#B91E23"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <Home changeLang={changeLang}/>
      )}
    </>
  );
}

export default Loader;
