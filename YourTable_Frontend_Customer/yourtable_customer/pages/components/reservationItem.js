import React from "react";
import { useState } from "react";
import Modal from "./Modal";

async function deleteReservation(reservation) {
  const res = await fetch(`http://34.139.40.48/reservation/delete`, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      restaurant_id: reservation.restaurant,
      customer_id: reservation.customer,
      reservation_time: reservation.time,
      reservation_date: reservation.date,
    }),
  });
  console.log("");
}

async function editProfile(profile) {
  console.log(profile);
  const res = await fetch(`http://34.139.40.48/reservation2`, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      restaurant_id: profile.restaurant,
      customer_id: profile.customer,
      reservation_time: profile.time,
      reservation_date: profile.date,
      reservation_table: profile.table,
      reservation_extra: profile.extra,
      reservation_personCount: profile.count,
    }),
  });
  console.log("Finished!");
}

function reservationItem(props) {
  const [edit, setEdit] = useState(false);
  const [extraText, setExtraText] = useState("");

  return !edit ? (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="rounded-full w-6 h-6"
              src={props.reser.restaurant_logo}
            />
          </div>
          <span className="font-medium">{props.reser.restaurant_name}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{props.reser.reservation_personcount}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{props.reser.reservation_date.split("T")[0]}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{props.reser.reservation_time}</span>
      </td>
      <td className="py-3 px-6 text-center">
        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
          Active
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <Modal color={"bg-blue-500"} reser={props.reser} />

          <div
            onClick={(e) => setEdit(true)}
            className="w-4 mr-2 transform hover:fill-purple-500 hover:scale-110"
          >
            <img src={"/edit.png"} />
          </div>
          <div
            className="w-4 mr-2 transform hover:fill-red-500 hover:scale-110"
            onClick={(e) => {
              props.deleteReservation(props.reser);
            }}
          >
            <img src={"/delete.png"} />
          </div>
        </div>
      </td>
    </tr>
  ) : (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left h-52">
        <div className="bg-red-300 w-full ">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Abschluss</p>
                <p>
                  Bitte kontrolieren sie nocheinmal die Angaben und hinterlassen
                  sie ihre perönlichen Details.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label for="full_name">Voller Name</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label for="email">Email Adress</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label for="address">Personen</label>
                    <p
                      name="address"
                      id="address"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                    >
                      {props.reser.reservation_personcount}
                    </p>
                  </div>

                  <div className="md:col-span-3">
                    <label for="city">Datum</label>
                    <p
                      name="city"
                      id="city"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                    >
                      {props.reser.reservation_date.split("T")[0]}
                    </p>
                  </div>

                  <div className="md:col-span-1">
                    <label for="zipcode">Tischnummer</label>
                    <p
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                    >
                      A11
                    </p>
                  </div>

                  <div className="md:col-span-5 w-full">
                    <div className="inline-flex items-center w-full">
                      <p
                        name="billing_same"
                        id="billing_same"
                        onChange={(e) => setExtraText(e.target.value)}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                      >
                        {extraText}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        onClick={(e) => {}}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Ändern
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default reservationItem;
