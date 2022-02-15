import React from "react";
import NavBar from "./components/navBar";
import { useState } from "react";
import ReservationItem from "./components/reservationItem";

export async function getServerSideProps(context) {
  const res = await fetch(`http://34.139.40.48/reservations`);
  const reservations = await res.json();

  return {
    props: {
      reservations,
    },
  };
}

async function deleteReservation(reservation) {
  const res = await fetch(`http://34.139.40.48/reservation/delete`, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Accept": "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      restaurant_id: reservation.restaurant,
      customer_id: reservation.customer,
      reservation_time: reservation.time,
      reservation_date: reservation.date,
    }),
  });
  console.log("DELETE");
}

function reservations({ reservations }) {
  
  return (
    <div className="flex-col h-full bg-gray-600">
      <NavBar className="" active={3}></NavBar>
      <div className="overflow-x-scroll">
        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Restaurant</th>
                    <th className="py-3 px-6 text-left">Personen</th>
                    <th className="py-3 px-6 text-center">Datum</th>
                    <th className="py-3 px-6 text-center">Uhrzeit</th>
                    <th className="py-3 px-6 text-center">Raum/Tisch</th>
                    <th className="py-3 px-6 text-center">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {reservations.map((el, i) => (
                    <ReservationItem
                      reser={el}
                      onClick={(e)=>console.log("sd")}
                      deleteReservation={deleteReservation}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default reservations;
