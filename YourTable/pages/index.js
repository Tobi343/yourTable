import Head from "next/head";
import React from "react";
import { useState } from "react";
import CardContainer from "./components/Cards/CardContainer";
import Sidebar from "./components/Sidebars/Sidebar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Navbar from "./components/Sidebars/Navbar";


export default function Home() {

  const [NavColor,setNavColor] = useState("bg-blue-500");


  return (
    <div>
      <Head>
        <title>YourTableAdminPanel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar setNavColorField={setNavColor}/>
        <main className="flex bg-gray-100">
          <Sidebar NavColorField={NavColor}/>
          <div className="w-full flex flex-col h-screen overflow-y-hidden">
            <MobileSideBar />
            <CardContainer />
          </div>
        </main>
      </div>
    </div>
  );
}
