import React from "react";
import SidebarContainer from "./components/SidebarContainer";
import Table from "./components/table";
function Reservations() {
  return (
    <div class="relative min-h-screen md:flex w-full">
      <SidebarContainer />
      <div className="w-full">
          <Table/>

      </div>
    </div>
  );
}

export default Reservations;
