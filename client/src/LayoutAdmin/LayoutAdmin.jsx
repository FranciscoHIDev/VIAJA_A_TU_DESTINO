import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function LayoutAdmin() {
  return (
    <>
      <Header />
      <div className=" flex mt-[48px] bg-[#1e1f25]">
        <div className=" flex fixed h-screen w-60">
          <SideBar />
        </div>
        <div className="flex-1">
          <div className="h-[92.4vh] overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutAdmin;
