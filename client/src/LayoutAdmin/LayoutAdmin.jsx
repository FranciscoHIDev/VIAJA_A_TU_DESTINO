import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import Header from "./Header";

function LayoutAdmin() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* =====================================================
          HEADER
          Se mantiene visible al hacer scroll
      ===================================================== */}
      <div className="sticky top-0 z-[60]">
        <Header />
      </div>

      {/* =====================================================
          ESTRUCTURA ADMIN
      ===================================================== */}
      <div className="flex min-h-[calc(100dvh-64px)] flex-col lg:flex-row">
        {/* ===================================================
            SIDEBAR
            Sticky solamente en escritorio
        =================================================== */}
        <div
          className="
            shrink-0
            lg:sticky
            lg:top-[64px]
            lg:h-[calc(100dvh-64px)]
            lg:overflow-y-auto
          "
        >
          <SideBar />
        </div>

        {/* ===================================================
            CONTENIDO
        =================================================== */}
        <main
          className="
            min-w-0
            flex-1
            bg-[#f5f7fb]
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              px-4
              py-5
              sm:px-6
              sm:py-6
              lg:px-7
              lg:py-7
              2xl:px-8
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LayoutAdmin;
