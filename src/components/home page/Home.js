import React from "react";
import { banner, kamaz, kontener } from "../../assets";
import "./home.css"
function Home() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 ps-20 pt-10">
        {/* <div> */}
        <div className="col-span-3 зе-10">
          <h1 className="text-6xl font-semibold font-mono">
            We Will Deliver Your <br /> Packages Anywhere!
          </h1>
        </div>

        <div className="mt-10 ">
          <h2 className="text-2xl">
            <span className="text-4xl font-light">
              FIND IT | BUY IT | SHIP IT
            </span>{" "}
            <br /> We let you shop around the world and ship
            <br /> to logisippo straight to your doorstep!
          </h2>
        </div>
        <img
          className="col-span-2"
          style={{
            objectFit: "cover",
            right: "1rem",
            width: "800px",
            position: "absolute",
            top: "0rem",
          }}
          src={kamaz}
          alt="."
        />
      </div>
      <div className="mt-20 pt-5">
        <img style={{zIndex: "20"}} src={banner} alt="" />
        <div className="grid grid-cols-2 ps-20 pt-20">
          <div>
            <h1 className="text-5xl font-semibold font-sans tracking-wider leading-normal">
              Deliver Your <span style={{color: "#1A648C"}}>Logistic</span>  <br /> Safely & Quickly
            </h1>
            <h4 className="text-lg">
              From start to finish, our seamless logistics service <br/> ensures a
              successful delivery experience every time. <br/> Get started now and see
              the difference for yourself.
            </h4>
          </div>
          <img style={{position: "absolute", width: "900px", top: " 38rem", right: "5rem", zIndex: "-10"}} src={kontener} alt="" />
        </div>
          <div className="text-5xl font-semibold tracking-wider" style={{marginTop: "18rem", textAlign: "center"}}>
            <h4> <span style={{color: "#1A648C"}}>Shipping</span> & Logistic <br /> Services</h4>
          </div>
          <div className="flex gap-5 justify-center mt-10">
            <div className="shipping flex">
              <p>Road transportion </p><i class="fa-solid fa-right-to-bracket"></i>

            </div>
            <div className="">
              <button className="shipping2"></button>
              <div className="shipping">

            <p>Ship transportion <i class="fa-solid fa-right-to-bracket"></i></p>
              </div>

            </div>
            <div className="shipping">
            <p>Air transportion</p>

            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
