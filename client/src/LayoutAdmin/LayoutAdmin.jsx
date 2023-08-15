import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function LayoutAdmin() {
  return (
    <>
      <Header />
      <div className="  min-h-[90vh] grid  grid-cols-1 md:grid-cols-6 bg-[#1e1f25] ">
        <SideBar />
        <div className="md:col-span-5">
          <div className="h-[92.4vh] p-4 overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutAdmin;
