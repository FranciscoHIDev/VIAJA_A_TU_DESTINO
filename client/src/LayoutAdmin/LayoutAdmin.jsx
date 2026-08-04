import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function LayoutAdmin() {
  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      <Header />

      <div className="flex min-h-[calc(100dvh-68px)] flex-col lg:flex-row">
        <SideBar />

        <main className="min-w-0 flex-1 bg-[#f5f7ff] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LayoutAdmin;
