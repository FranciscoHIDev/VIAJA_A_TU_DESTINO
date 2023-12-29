import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "../components/NavBar/NavBar";

function LayoutProfile() {
  return (
    <React.Fragment>
      <>
        <NavBar />
        <div className="  min-h-[90vh] grid  grid-cols-1 md:grid-cols-6 bg-[#f0f0f1] ">
          <SideBar />
          <div className="md:col-span-5">
            <div className="h-[100vh] p-8 overflow-y-scroll">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    </React.Fragment>
  );
}

export default LayoutProfile;
