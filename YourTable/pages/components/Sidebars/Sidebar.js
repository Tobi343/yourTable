import React from "react";
import SideBarCard from "./SideBarCard";

function Sidebar(NavColorField) {
  return (
    <aside
      id="v_SideBar"
      className={`${NavColorField} relative h-screen w-72 hidden sm:block shadow-xl`}
    >
      <p>{NavColorField}</p>
      <div className="p-6">
        <a
          href="#"
          className="text-white text-3xl font-semibold hover:text-gray-100"
        >
          YourTable
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <SideBarCard />
        <SideBarCard />
        <SideBarCard />
        <SideBarCard />
        <SideBarCard />
      </nav>
    </aside>
  );
}

export default Sidebar;
