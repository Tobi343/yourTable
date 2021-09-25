import React from "react";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Sidebar from "./components/Sidebars/Sidebar";
import CardContainer from "./components/Cards/CardContainer";
import Navbar from "./components/Sidebars/Navbar";

import Table from "./components/table";
function Reservations() {
  return (
    <div>
    <Navbar />
    <main className="flex bg-gray-100">
      <Sidebar />

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <MobileSideBar />
        <Table />
      </div>
    </main>
  </div>
  );
}

export default Reservations;
