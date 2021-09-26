import React from "react";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Sidebar from "./components/Sidebars/Sidebar";
import CardContainer from "./components/Cards/CardContainer";
import Navbar from "./components/Sidebars/Navbar";
import { useState } from "react";

import Table from "./components/table";
function Reservations() {
  const [NavColor, setNavColor] = useState("bg-blue-500");
   
  const arr = [
    {Name:"Meris Bihorac",
  Anzahl:"3",
Uhrzeit:"22:10",
Tischnummer:"A3454"}
  ]

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={NavColor} />

        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <MobileSideBar />
          <Table Reservations={arr}/>
        </div>
      </main>
    </div>
  );
}

export default Reservations;
