import React from "react";
import SideBarCard from "./SideBarCard";

function MobileSideBar() {
  return (
    <header className="w-full py-5 px-6 sm:hidden bg-gray-500">
      <SideBarCard />
      <SideBarCard />
      <SideBarCard />
      <SideBarCard />
      <SideBarCard />
    </header>
  );
}

export default MobileSideBar;
