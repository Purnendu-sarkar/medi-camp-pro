import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Page/Shared/NavBar";
import Footer from "../Page/Shared/Footer";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="mt-16 lg:mt-[68px]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
