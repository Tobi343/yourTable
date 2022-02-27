import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Stepper } from "@progress/kendo-react-layout";
import { Calendar, DateInput } from "@progress/kendo-react-dateinputs";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import GridLines from "react-gridlines";
import { Rnd } from "react-rnd";
import NavBar from "../components/navBar";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { Interval, DateTime, Duration } from "luxon";
import Router from "next/router";

import { useSession, signIn, signOut, getSession } from "next-auth/react";

const handleLogin = (email, password) => {
  console.log(email + " " + password);
  const register = "false";
  signIn("credentials", {
    email,
    password,
    register,
    // The page where you want to redirect to after a
    // successful login
  });
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("Session: " + session);
  var successful = false;
  if (!session) {
    successful = true;
  }
  const res = await fetch(`http://34.139.40.48/restaurant`);
  const restaurants = await res.json();

  return {
    props: {
      restaurants,
      successful,
      session,
    },
  };
}

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return width;
};

async function getComments(id) {
  const res = await fetch(`http://34.139.40.48/comments/${id}`);
  const comments = await res.json();
  console.log("Finished!");
  return comments;
}

async function postComments(id, comment, session, stars, title) {
  const res = await fetch(`http://34.139.40.48/comments/${id}`, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      _restaurant_id: id,
      customer_id: session.ID,
      _comment: comment,
      _date: DateTime.now().toLocaleString(DateTime.DATE_FULL),
      stars: stars,
      title: title,
    }),
  });
  console.log("Finished!");
}

async function editProfile(profile) {
  console.log(profile);

  const res = await fetch(`http://34.139.40.48/reservation`, {
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
      reservation_room: profile.room,
    }),
  });
  console.log("Finished!");
}

async function getReservationTimes(date, id, session) {
  const res1 = await fetch(`http://34.139.40.48/users/data/` + session.email, {
    method: "GET",
    headers: new Headers({
      Authorization: "Token " + session.accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });
  const user1 = await res1.json();
  const res = await fetch(`http://34.139.40.48/reservations/${id}`, {
    method: "GET",
    headers: new Headers({
      reservationdate: date,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });
  const reser = await res.json();

  console.log("Finished!");

  return { reser, user1 };
}

const items = [
  {
    label: "Personen",
    icon: "k-i-user",
  },
  {
    label: "Datum & Uhrzeit",
    icon: "k-i-calendar",
  },
  {
    label: "Tisch auwählen",
    icon: "k-i-layout",
  },
  {
    label: "Extras",
    icon: "k-i-plus",
    optional: true,
  },
  {
    label: "Abschließen",
    icon: "k-i-check",
  },
];

function restaurant({ restaurants, successful, session }) {
  const router = useRouter();
  const id = router.query.restaurant;
  const date = new Date();
  const minTime = DateTime.local(2020, 10, 12, 12, 0, 0);
  const maxTime = DateTime.local(2020, 10, 12, 23, 0, 0);
  const steps = 30;

  const [people, setPeople] = useState(0);
  let [isOpen, setIsOpen] = useState(false);
  const [reservedTables, setReservedTables] = useState();
  const [extraText, setExtraText] = useState("");
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(0);
  const [selectedTable, setSelectedTable] = useState(0);
  const [extraHighChairs, setExtraHighChairs] = useState(0);
  const [extraDogs, setExtraDogs] = useState(0);
  const [comments, setComments] = useState([]);
  const [extraTime, setExtraTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState(date.toDateString());
  const [pickerVisible, setpickerVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);
  const [makeReservation, setMakeReservation] = useState(false);
  const [roomNumber, setRoomNumber] = useState(0);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(-1);
  const [width, setWidth] = useState(0);
  const [personsShown, setPersonsShown] = useState(0);
  const [user, setUser] = useState(0);
  const [table, setTable] = useState(
    JSON.parse(restaurants[id].restaurant_layout)
  );

  function callReservations(date) {
    getReservationTimes(date, restaurants[id].id, session).then((res) => {
      setReservedTables(res.reser);
      setUser(res.user1);
      setName(
        res.user1.customer_firstname + " " + res.user1.customer_secondname
      );
      console.log(res.user1);
    });
    console.log(date);
    console.log(restaurants[id].id);
    console.log(
      getReservationTimes(date, restaurants[id].id, session).then((res) =>
        console.log(res)
      )
    );
  }

  const windowWidth = useWidth();

  useEffect(() => {
    // console.log(window.innerHeight, window.innerWidth);
    setWidth(window.innerWidth);
    getComments(id).then((res) => setComments(res));
    window.addEventListener("resize", () => {
      //console.log(window.innerHeight, window.innerWidth);
      setWidth(window.innerWidth);
    });

    getComments(id);

    console.log(
      Interval.after(
        DateTime.fromFormat("14:30:00", "hh:mm:ss"),
        Duration.fromObject({ hours: 2 })
      ).contains(DateTime.fromFormat("15:30:00", "hh:mm:ss"))
    );
  }, []);

  const handleChange = (e) => {
    setValue(e.value);
  };

  return (
    <div className="flex-col h-full bg-gray-200">
      <NavBar
        className=""
        active={2}
        setIsOpen={setIsOpen}
        successful={successful}
      ></NavBar>{" "}
      <div className="flex-1 h-full">
        <>
          {isOpen ? (
            <>
              <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto max-w-6xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    {/*body*/}
                    <div class=" flex flex-col items-center justify-center bg-gray-300">
                      <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                        <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
                          Login To Your Account
                        </div>
                        <button class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                          <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
                            <i class="fab fa-facebook-f"></i>
                          </span>
                          <span>Login with Facebook</span>
                        </button>
                        <div class="relative mt-10 h-px bg-gray-300">
                          <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                            <span class="bg-white px-4 text-xs text-gray-500 uppercase">
                              Or Login With Email
                            </span>
                          </div>
                        </div>
                        <div class="mt-10">
                          <form
                            action="#"
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleLogin(emailField.value, password.value);
                            }}
                          >
                            <div class="flex flex-col mb-6">
                              <label
                                for="email"
                                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                              >
                                E-Mail Address:
                              </label>
                              <div class="relative">
                                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                  <svg
                                    class="h-6 w-6 m-0"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                  </svg>
                                </div>

                                <input
                                  id="emailField"
                                  type="email"
                                  name="emailField"
                                  class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                  placeholder="E-Mail Address"
                                />
                              </div>
                            </div>
                            <div class="flex flex-col mb-6">
                              <label
                                for="password"
                                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                              >
                                Password:
                              </label>
                              <div class="relative">
                                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                  <span>
                                    <svg
                                      class="h-6 w-6 m-0"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                  </span>
                                </div>

                                <input
                                  id="password"
                                  type="password"
                                  name="password"
                                  class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                  placeholder="Password"
                                />
                              </div>
                            </div>

                            <div class="flex items-center mb-6 -mt-4">
                              <div class="flex ml-auto">
                                <a
                                  href="#"
                                  class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                                >
                                  Forgot Your Password?
                                </a>
                              </div>
                            </div>

                            <div class="flex w-full">
                              <button
                                type="submit"
                                class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                              >
                                <span class="mr-2 uppercase">Login</span>
                                <span>
                                  <svg
                                    class="h-6 w-6 m-0"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </span>
                              </button>
                            </div>
                          </form>
                        </div>
                        <div class="flex justify-center items-center mt-6">
                          <a
                            href="#"
                            target="_blank"
                            class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
                          >
                            <span class="ml-2">You don't have an account?</span>
                          </a>
                        </div>
                      </div>
                    </div>{" "}
                    {/*footer*/}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
        <div className="bg-white block h-full mx-2 xl:mx-28 lg:mx-20 md:mx-14">
          <div className="">
            <div className="w-full bg-blue-500  h-56 rounded-t-lg">
              <img
                src={restaurants[id].restaurant_image}
                className="object-cover w-full h-56"
              />
            </div>
            <div className="absolute -mt-20 ml-5">
              <div className="bg-gray-200 border border-gray-300 h-36 w-36 rounded-lg shadow-md border-b border-primary">
                <label htmlFor="upload-button">
                  <img
                    src={restaurants[id].restaurant_logo}
                    className="object-cover h-36 w-36  rounded-lg"
                  />
                </label>
              </div>
            </div>
          </div>
          <input type="file" id="upload-button" style={{ display: "none" }} />

          <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col mx-6 my-3 lg:col-span-2">
                <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Beschreibung
                </p>
                <p className=" py-2 px-3 text-gray-700 ">
                  {restaurants[id].details}
                </p>
              </div>
            </div>

            <div
              className="m-8 rounded-xl bg-gray-100 p-8"
              onClick={(e) => {
                setIsOpen(successful);
              }}
            >
              <Stepper
                value={value}
                onChange={handleChange}
                items={items}
                disabled={checkVisible}
              />
              <div>
                {value == 0 ? (
                  <div className="w-full h-full flex p-8 justify-center">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 h-full ">
                      {Array(10)
                        .fill()
                        .map((v, i) => (
                          <div
                            className={`border-2  ${
                              people == i + 1 ? "border-orange-400" : ""
                            } flex justify-evenly items-center bg-white rounded-lg hover:bg-gray-200 text-center shadow-xs  dark:bg-gray-800 w-36 h-12`}
                            onClick={(e) => {
                              if (i + 1 == 10) {
                                if (peopleInput.value != "") {
                                  setPeople(peopleInput.value);
                                  setValue(1);
                                }
                              } else {
                                setPeople(i + 1);
                                setValue(1);
                              }
                            }}
                          >
                            <div className="flex ">
                              {i + 1 == 10 ? (
                                <form
                                  onSubmit={(e) => {
                                    if (peopleInput.value != "") {
                                      setPeople(peopleInput.value);
                                      setValue(1);
                                    }
                                  }}
                                >
                                  <input
                                    onEnter
                                    id="peopleInput"
                                    name="peopleInput"
                                    className="text-lg w-32 font-semibold text-gray-700 dark:text-gray-200 text-center"
                                    placeholder={"10 +"}
                                  ></input>
                                </form>
                              ) : (
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                  {i + 1}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : value == 1 ? (
                  <div>
                    <div
                      className={`bg-blue-300 w-full h-80 ${
                        pickerVisible ? "hidden" : ""
                      }`}
                    >
                      <Calendar
                        min={date}
                        onChange={(e) => {
                          setSelectedDate(e.value.toDateString());
                          setpickerVisible(true);
                          console.log(
                            DateTime.fromJSDate(e.value).toFormat("yyyy-MM-dd")
                          );
                          callReservations(
                            DateTime.fromJSDate(e.value).toFormat("yyyy-MM-dd")
                          );
                        }}
                        value={new Date(selectedDate)}
                        className="w-full h-80 "
                      />
                    </div>
                    <div
                      className={`w-full ${
                        pickerVisible ? "flex" : "hidden"
                      } p-8 justify-center h-80 overflow-scroll`}
                    >
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 h-full ">
                        <div
                          className={`border-2 flex justify-evenly items-center bg-white rounded-lg hover:bg-gray-200 text-center shadow-xs  dark:bg-gray-800 w-36 h-12`}
                          onClick={(e) => {
                            setpickerVisible(false);
                          }}
                        >
                          <div className="flex ">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                              {"Back"}
                            </p>
                          </div>
                        </div>

                        {Array(
                          Math.abs(minTime.diff(maxTime).as("minutes")) /
                            steps +
                            1
                        )
                          .fill()
                          .map((v, i) => (
                            <div
                              className={` ${
                                minTime
                                  .plus({ minutes: steps * i })
                                  .toLocaleString(DateTime.TIME_24_SIMPLE) ==
                                time
                                  ? "border-orange-400"
                                  : ""
                              } border-2 flex justify-evenly items-center bg-white rounded-lg hover:bg-gray-200 text-center shadow-xs  dark:bg-gray-800 w-36 h-12`}
                              onClick={(e) => {
                                setTime(
                                  minTime
                                    .plus({ minutes: steps * i })
                                    .toLocaleString(DateTime.TIME_24_SIMPLE)
                                );

                                setValue(2);
                                setpickerVisible(false);
                              }}
                            >
                              <div className="flex ">
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                  {minTime
                                    .plus({ minutes: steps * i })
                                    .toLocaleString(DateTime.TIME_24_SIMPLE)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : value == 2 ? (
                  <div className="w-full h-96 overflow-scroll bg-white">
                    <div className="w-full flex flex-row h-16 bg-gray-200">
                      {table.map((el, i) => (
                        <div
                          className={`border-2  ${
                            roomNumber == i ? "bg-gray-200" : "bg-white"
                          }  ${
                            selectedRoomNumber == i ? "border-orange-400" : ""
                          } flex justify-evenly items-center  rounded-lg hover:bg-gray-200 mx-3 text-center shadow-xs  dark:bg-gray-800 w-36 h-12`}
                          onClick={(e) => {
                            setRoomNumber(i);
                          }}
                        >
                          <div className="flex ">
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                              {el.Name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="   relative h-full ">
                      {table[roomNumber].Arr.map((e, i) => (
                        <div
                          className={`${
                            selectedTable == e.key &&
                            selectedRoomNumber == roomNumber
                              ? "border-gray-700"
                              : ""
                          }  ${
                            reservedTables != undefined &&
                            reservedTables[roomNumber] != undefined &&
                            reservedTables[roomNumber][e.key] != undefined &&
                            reservedTables[roomNumber][e.key].filter((el) => {
                              console.log(
                                Interval.after(
                                  DateTime.fromFormat(
                                    el.reservation_time,
                                    "hh:mm:ss"
                                  ).plus({ hours: -2 }),
                                  Duration.fromObject({ hours: 4 })
                                ).contains(DateTime.fromFormat(time, "hh:mm"))
                              );

                              return Interval.after(
                                DateTime.fromFormat(
                                  el.reservation_time,
                                  "hh:mm:ss"
                                ).plus({ hours: -1, minutes: -59 }),
                                Duration.fromObject({ hours: 3, minutes: 59 })
                              ).contains(DateTime.fromFormat(time, "hh:mm"));
                            }).length != 0
                              ? "bg-red-500"
                              : "bg-blue-500 hover:bg-blue-300"
                          } z-2 absolute top-0 left-0 rounded-xl flex flex-col border-2 `}
                          style={{
                            width: e.width,
                            height: e.height,
                            marginLeft: e.x,
                            marginTop: e.y,
                          }}
                          onClick={(ex) => {
                            console.log(reservedTables);
                            setSelectedTable(e.key);
                            setSelectedRoomNumber(roomNumber);
                            setValue(3);
                          }}
                        >
                          {parseInt(e.width) > parseInt(e.height) ? (
                            <div>
                              <div className="flex flex-row absolute">
                                {Array(parseInt(e.width) / 50)
                                  .fill()
                                  .map((v, i) => (
                                    <div
                                      className="bg-blue-400 z-10 h-6 w-6 rounded-xl"
                                      style={{
                                        marginLeft: 13,
                                        marginRight: 13,
                                        marginTop: -10,
                                      }}
                                    ></div>
                                  ))}
                              </div>
                              <div className="flex flex-row absolute">
                                {Array(parseInt(e.width) / 50)
                                  .fill()
                                  .map((v, i) => (
                                    <div
                                      className="bg-blue-400 z-10 h-6 w-6 rounded-xl"
                                      style={{
                                        marginTop:
                                          parseInt(e.height) - 16 + "px",
                                        marginLeft: 13,
                                        marginRight: 13,
                                      }}
                                    ></div>
                                  ))}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex flex-col absolute">
                                {Array(parseInt(e.height) / 50)
                                  .fill()
                                  .map((v, i) => (
                                    <div
                                      className="bg-blue-400 z-10 h-6 w-6 rounded-xl"
                                      style={{
                                        marginTop: 13,
                                        marginLeft: -10,
                                        marginBottom: 13,
                                      }}
                                    ></div>
                                  ))}
                              </div>
                              <div className="flex flex-col absolute">
                                {Array(parseInt(e.height) / 50)
                                  .fill()
                                  .map((v, i) => (
                                    <div
                                      className="bg-blue-400 z-10 h-6 w-6 rounded-xl"
                                      style={{
                                        marginTop: 13,
                                        marginLeft:
                                          parseInt(e.width) - 16 + "px",
                                        marginBottom: 13,
                                      }}
                                    ></div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : value == 3 ? (
                  <div className="bg-red-300 w-full ">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600">
                          <p className="font-medium text-lg">Extra Angaben</p>
                          <p>
                            Bitte kontrolieren sie nocheinmal die Angaben und
                            hinterlassen sie ihre perönlichen Details.
                          </p>
                        </div>

                        <div className="lg:col-span-2">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            <div className="md:col-span-5">
                              <label for="email">
                                Zusatz für die Reservierung
                              </label>
                              <textarea
                                rows="5"
                                name="nachricht"
                                id="nachricht"
                                className="w-full px-3 py-2 mt-1 placeholder-gray-300 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 "
                                onChange={(e) => setExtraText(e.target.value)}
                                value={extraText}
                                placeholder="Eine spezielle Nachricht"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label for="email">Anzahl an Hunden</label>
                              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  onClick={(e) => {
                                    setExtraDogs(
                                      extraDogs - 1 < 0
                                        ? extraDogs
                                        : extraDogs - 1
                                    );
                                  }}
                                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                >
                                  <span className="m-auto text-2xl font-thin">
                                    −
                                  </span>
                                </button>
                                <input
                                  type="number"
                                  className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                  name="custom-input-number"
                                  value={extraDogs}
                                ></input>
                                <button
                                  data-action="increment"
                                  onClick={(e) => {
                                    setExtraDogs(extraDogs + 1);
                                  }}
                                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                >
                                  <span className="m-auto text-2xl font-thin">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <label for="email">Anzahl an Hochstühlen</label>
                              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  onClick={(e) => {
                                    setExtraHighChairs(
                                      extraHighChairs - 1 < 0
                                        ? extraHighChairs
                                        : extraHighChairs - 1
                                    );
                                  }}
                                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                >
                                  <span className="m-auto text-2xl font-thin">
                                    −
                                  </span>
                                </button>
                                <input
                                  type="number"
                                  className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                  name="custom-input-number"
                                  value={extraHighChairs}
                                ></input>
                                <button
                                  data-action="increment"
                                  onClick={(e) => {
                                    setExtraHighChairs(extraHighChairs + 1);
                                  }}
                                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                >
                                  <span className="m-auto text-2xl font-thin">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <label for="email">Geschätzter Aufenthalt</label>
                              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  className=" bg-gray-50 text-gray-300 hover:text-gray-700 hover:bg-gray-50 h-full w-20 rounded-l cursor-pointer outline-none"
                                >
                                  <span className="m-auto text-2xl font-thin">
                                    −
                                  </span>
                                </button>
                                <input
                                  type="number"
                                  className=" focus:outline-none text-center w-full bg-gray-50 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                  name="custom-input-number"
                                  value="0"
                                ></input>
                                <button
                                  data-action="increment"
                                  className="bg-gray-50 text-gray-600 hover:text-gray-700 hover:bg-gray-50 h-full w-20 rounded-r cursor-pointer"
                                >
                                  <span className="m-auto text-2xl font-thin ">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-3 text-right">
                          <div className="inline-flex items-end">
                            <button
                              onClick={(e) => setValue(4)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Weiter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {checkVisible ? (
                      <div className="">
                        <svg
                          className="h-96"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 130.2 130.2"
                        >
                          <circle
                            className="path circle"
                            fill="none"
                            stroke="#73AF55"
                            stroke-width="6"
                            stroke-miterlimit="10"
                            cx="65.1"
                            cy="65.1"
                            r="62.1"
                          />
                          <polyline
                            className="path check"
                            fill="none"
                            stroke="#73AF55"
                            stroke-width="6"
                            stroke-linecap="round"
                            stroke-miterlimit="10"
                            points="100.2,40.2 51.5,88.8 29.8,67.5 "
                          />
                        </svg>
                        <p>
                          Sieh dir deine Reservation unter den Tab
                          "Reservierungen" an. <br /> Möchtest du noch eine
                          Reservierung machen, dann klick{" "}
                          <span
                            onClick={(e) => Router.reload()}
                            className=" text-blue-500 hover:underline"
                          >
                            hier
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="bg-red-300 w-full ">
                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                              <p className="font-medium text-lg">Abschluss</p>
                              <p>
                                Bitte kontrolieren sie nocheinmal die Angaben
                                und hinterlassen sie ihre perönlichen Details.
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>

                                <div className="md:col-span-5">
                                  <label for="email">Email Adress</label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={user.customer_email}
                                    onChange={(e) => {
                                      setUser({
                                        ...user,
                                        ["customer_email"]: e.target.value,
                                      });
                                    }}
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
                                    {people}
                                  </p>
                                </div>

                                <div className="md:col-span-3">
                                  <label for="city">Datum</label>
                                  <p
                                    name="city"
                                    id="city"
                                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                                  >
                                    {selectedDate}
                                  </p>
                                </div>

                                <div className="md:col-span-1">
                                  <label for="zipcode">Tischnummer</label>
                                  <p
                                    name="zipcode"
                                    id="zipcode"
                                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                                  >
                                    {selectedTable}
                                  </p>
                                </div>

                                <div className="md:col-span-5 w-full">
                                  <div className="inline-flex items-center w-full">
                                    <p
                                      name="billing_same"
                                      id="billing_same"
                                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                                    >
                                      {extraText}
                                    </p>
                                  </div>
                                </div>

                                <div className="md:col-span-5 text-right">
                                  <div className="inline-flex items-end">
                                    <button
                                      onClick={(e) => {
                                        setCheckVisible(true);
                                        editProfile({
                                          restaurant: restaurants[id].id,
                                          customer: session.ID,
                                          time: time,
                                          date: selectedDate,
                                          table: selectedTable,
                                          extra: extraText,
                                          count: people,
                                          room: selectedRoomNumber,
                                        });
                                      }}
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                      Reservieren
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <section className="text-gray-700">
                <div className="container px-5 py-24 mx-auto">
                  <div className="text-center mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                      Häufig gestellte Fragen
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                      Fragen die von Kunden an das Restaurant gestellt wurden
                    </p>
                  </div>
                  <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                    <div className="w-full lg:w-1/2 px-4 py-2">
                      {Array(3)
                        .fill()
                        .map((v, i) => (
                          <details className="mb-4">
                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                              {"Frage " + i}
                            </summary>

                            <span>Antwort</span>
                          </details>
                        ))}
                    </div>
                    <div className="w-full lg:w-1/2 px-4 py-2">
                      {Array(3)
                        .fill()
                        .map((v, i) => (
                          <details className="mb-4">
                            <summary className="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                              {"Frage " + i}
                            </summary>

                            <span className="px-4 py-2">Antwort</span>
                          </details>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 py-24 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                  {comments.slice(0, 3).map((v, i) => (
                    <div className="py-8 flex flex-wrap lg:flex-nowrap">
                      <div className="lg:w-64 lg:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span className="font-semibold title-font text-gray-700">
                          {v.customer_username}
                        </span>
                        <span className="mt-1 text-gray-500 text-sm">
                          {v._date}
                        </span>

                        <div class="flex h-6 mt-2">
                          {Array(v.stars)
                            .fill()
                            .map((e, i) => (
                              <svg
                                class="ml-0 mr-1 w-4 h-4 mt-0 fill-current text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          {Array(5 - v.stars)
                            .fill()
                            .map((e, i) => (
                              <svg
                                class="ml-0 mr-1 w-4 h-4 mt-0 fill-current text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                        </div>
                      </div>
                      <div className="lg:flex-grow">
                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                          {v.title}
                        </h2>
                        <p className="leading-relaxed">{v._comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div class="flex items-center justify-center mx-8 mb-4 w-full">
                <form
                  class="w-full bg-white rounded-lg px-4 pt-2"
                  onSubmit={(e) => {
                    setIsOpen(successful);
                    if (!successful) {
                      postComments(
                        id,
                        comment.value,
                        session,
                        stars,
                        title.value
                      );
                    }
                  }}
                >
                  <div class="flex flex-col -mx-3 mb-6 w-full">
                    <h2 class=" pt-3 pb-2 text-gray-800 text-lg">
                      Add a new comment
                    </h2>
                    <div class=" mb-2 mt-2 mr-4">
                      <textarea
                        class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full  py-2 px-3  font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="title"
                        id="title"
                        rows={1}
                        maxLength={100}
                        placeholder="Überschrift"
                        required
                      ></textarea>

                      <textarea
                        class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="comment"
                        id="comment"
                        placeholder="Schreib deine Bewertung"
                        required
                      ></textarea>
                    </div>
                    <div class="w-full my-4 flex">
                      {[...Array(stars)].map((e, i) => (
                        <svg
                          class="ml-0 mr-1 w-4 h-4 mt-0 fill-current text-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={(e) => {
                            setStars(i + 1);
                            console.log(i + 1);
                          }}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      {[...Array(5 - stars)].map((e, i) => (
                        <svg
                          class="ml-0 mr-1 w-4 h-4 mt-0 fill-current text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={(e) => {
                            setStars(stars + i + 1);
                            console.log(stars + i + 1);
                          }}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div class="w-full flex items-end">
                      <div class="-mr-1">
                        <input
                          type="submit"
                          class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                          value="Bewertung veröffentlichen"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default restaurant;
