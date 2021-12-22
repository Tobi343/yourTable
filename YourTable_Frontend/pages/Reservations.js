import React from "react";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Sidebar from "./components/Sidebars/Sidebar";
import CardContainer from "./components/Cards/CardContainer";
import Navbar from "./components/Sidebars/Navbar";
import { useState,useContext } from "react";
import ColorContext from "./contexts/ColorContext";
import Table from "./components/table";
import _ from "lodash";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {

  const session =  await getSession(context)
  console.log("Session: "+session.accessToken)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const res = await fetch("http://34.139.54.192/reservations", {
    method: "GET",
    headers: new Headers({
      Authorization:
        "Token "+session.accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });
  const reser = await res.json();

  return {
    props: {
      reser,
    },
  };
}

function Reservations({ reser }) {
  const [NavColor, setNavColor] = useState("bg-blue-500");
  const {color, setColor} = useContext(ColorContext);

  const days = [
    { day: "Mon", date: "5.12" },
    { day: "Tue", date: "6.12" },
    { day: "Wed", date: "7.12" },
    { day: "Thu", date: "8.12" },
    { day: "Fri", date: "10.12" },
    { day: "Sat", date: "11.12" },
    { day: "Sun", date: "12.12" },
  ];

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
      <Navbar setNavColorField={setColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={color} />

        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <MobileSideBar />

          <div className="flex-1">
            <div class="flex justify-center py-4">
              {days.map((el) => (
                <div class="flex group hover:bg-blue-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-16">
                  <div class="flex items-center px-4 py-4">
                    <div class="text-center">
                      <p class="text-gray-900 group-hover:text-gray-100 text-sm transition-all	duration-300">
                        {el.day}
                      </p>
                      <p class="text-gray-900 group-hover:text-gray-100 mt-3 group-hover:font-bold transition-all	duration-300">
                        {el.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Table Reservations={reser} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reservations;
