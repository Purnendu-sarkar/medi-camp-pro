import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Page/Shared/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
