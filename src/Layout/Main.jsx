import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Page/Shared/NavBar";
import Footer from "../Page/Shared/Footer";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
