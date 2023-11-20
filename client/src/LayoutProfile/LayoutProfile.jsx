import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
function LayoutProfile() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="  min-h-[90vh] grid  grid-cols-1 md:grid-cols-6 bg-[#f5f5f9] ">
        <SideBar />
        <div className="md:col-span-5">
          <div className="h-[90vh] p-4 ">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default LayoutProfile;
