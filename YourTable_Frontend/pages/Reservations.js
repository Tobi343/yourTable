import React from "react";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Sidebar from "./components/Sidebars/Sidebar";
import CardContainer from "./components/Cards/CardContainer";
import Navbar from "./components/Sidebars/Navbar";
import { useState } from "react";

import Table from "./components/table";

export async function getStaticProps() {
  
  const res = await fetch('http://34.139.54.192/reservations')
  const reser = await res.json()

  return {
    props: {
      reser,
    },
  }
}

function Reservations({ reser }) {
  const [NavColor, setNavColor] = useState("bg-blue-500");

  const arr = [
    {
      Name: "Meris Bihorac",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3454",
    },
    {
      Name: "Meris Bihorac",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3454",
    },
    {
      Name: "Meris Bihorac",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3454",
    },
    {
      Name: "Meris Bihorac",
      Anzahl: "3",
      Uhrzeit: "22:10",
      Tischnummer: "A3454",
    },
  ];

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={NavColor} />

        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <MobileSideBar />
          <Table Reservations={reser} />
        </div>
      </main>
    </div>
  );
}

export default Reservations;
