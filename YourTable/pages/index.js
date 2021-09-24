import Head from "next/head";
import Sidebar from "./components/Sidebar";
import MobileSideBar from "./components/MobileSideBar";
import CardContainer from "./components/CardContainer";
import Chart from "./components/Chart";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>YourTableAdminPanel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="relative min-h-screen md:flex w-full">
        <MobileSideBar />
        <Sidebar />
        <div className="flex-1 p-10 text-2xl font-bold">
          <CardContainer />
          <Chart />
        </div>
      </div>
    </div>
  );
}
