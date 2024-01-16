import React, { useEffect, useState } from "react";

import { ThreeCircles } from "react-loader-spinner";
import Home from "./Home";

function Loader() {
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
        <div className=" loading flex h-screen justify-center items-center">
          <ThreeCircles
            visible={true}
            height="200"
            width="200"
            color="#fff"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <Home />
      )}
    </>
  );
}

export default Loader;
