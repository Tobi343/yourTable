import React from "react";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Sidebar from "./components/Sidebars/Sidebar";
import CardContainer from "./components/Cards/CardContainer";
import Navbar from "./components/Sidebars/Navbar";
import { useState, useContext } from "react";
import ColorContext from "./contexts/ColorContext";
import Table from "./components/table";
import _, { drop } from "lodash";
import { getSession } from "next-auth/react";
import { DateTime } from "luxon";
import { Tab } from "@headlessui/react";
import { Popover } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const res = await fetch("http://34.139.40.48/reservations", {
    method: "GET",
    headers: new Headers({
      Authorization: "Token " + session.token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });

  const res1 = await fetch("http://34.139.40.48/restaurant/2", {
    method: "GET",
    headers: new Headers({
      Authorization: "Token " + session.token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });

  const res2 = await fetch("http://34.139.40.48/reservations", {
    method: "GET",
    headers: new Headers({
      Authorization: "Token " + session.token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });

  const reser = await res.json();
  const resta = await res1.json();

  return {
    props: {
      reser,
      resta,
    },
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Reservations({ reser, resta }) {
  const [NavColor, setNavColor] = useState("bg-main");
  const [tischplan, setTischplan] = useState(false);
  const { color, setColor } = useContext(ColorContext);
  const [roomNumber, setRoomNumber] = useState(0);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(-1);
  const [selectedTable, setSelectedTable] = useState(0);
  const [table, setTable] = useState(JSON.parse(resta[0].restaurant_layout));
  const [value, setValue] = useState([null, null]);

  return (
    <div>
      <Navbar setNavColorField={setColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={color} />
        <div className="w-full flex flex-col h-screen ">
          <MobileSideBar />
          <div className="flex-1 h-screen">
            <Tab.Group
              onChange={(e) => {
                setTable(JSON.parse(resta[e].restaurant_layout));
              }}
            >
              <Tab.List className="flex p-1 space-x-1 bg-orange-900/20 rounded-xl">
                {resta.map((resta) => (
                  <Tab
                    key={resta}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium text-orange-700 rounded-lg",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60",
                        selected
                          ? "bg-white shadow"
                          : "text-orange-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {resta.restaurant_name}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {resta.map((restaEl, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      "bg-white h-screen overflow-y-auto p-3 ",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-orange-400 ring-white ring-opacity-60"
                    )}
                  >
                    {tischplan ? (
                      <section class="py-1 bg-orangeGray-50">
                        <div class="w-full  mb-12 px-4 mx-auto mt-2">
                          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-full">
                            <div class="rounded-t mb-0 px-4 py-3 border-0">
                              <div class="flex flex-wrap items-center">
                                <div class="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                  <h3 class="font-semibold text-base text-orangeGray-700">
                                    Reservierungen
                                  </h3>
                                </div>
                                <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                  <button
                                    class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={(e) => setTischplan(false)}
                                  >
                                    Liste
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div class="flex">
                              {table.map((el, i) => (
                                <div
                                  className={`border-2  ${
                                    roomNumber == i ? "bg-gray-200" : "bg-white"
                                  }  ${
                                    selectedRoomNumber == i
                                      ? "border-orange-400"
                                      : ""
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

                            <div className="relative h-full ">
                              {table[roomNumber].Arr.map((e, i) => (
                                <Popover className="absolut">
                                  <Popover.Button>
                                    <div
                                      className={`${
                                        selectedTable == e.key &&
                                        selectedRoomNumber == roomNumber
                                          ? "border-gray-700"
                                          : ""
                                      }  ${"bg-orange-500 hover:bg-orange-300"} z-2 absolute top-0 left-0 rounded-xl flex flex-col border-2 `}
                                      style={{
                                        width: e.width,
                                        height: e.height,
                                        marginLeft: e.x,
                                        marginTop: e.y,
                                      }}
                                      onClick={(ex) => {}}
                                    >
                                      {parseInt(e.width) >
                                      parseInt(e.height) ? (
                                        <div>
                                          <div className="flex flex-row absolute">
                                            {Array(parseInt(e.width) / 50)
                                              .fill()
                                              .map((v, i) => (
                                                <div
                                                  className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
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
                                                  className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
                                                  style={{
                                                    marginTop:
                                                      parseInt(e.height) -
                                                      16 +
                                                      "px",
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
                                                  className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
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
                                                  className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
                                                  style={{
                                                    marginTop: 13,
                                                    marginLeft:
                                                      parseInt(e.width) -
                                                      16 +
                                                      "px",
                                                    marginBottom: 13,
                                                  }}
                                                ></div>
                                              ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </Popover.Button>
                                  <Popover.Panel className="relative z-10 w-64 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                      <div className="relative  bg-white p-7 ">
                                        <div className="ml-4">
                                          <p className="text-sm font-medium text-gray-900">
                                            Tischnummer: 3A
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Popover>
                              ))}
                            </div>
                          </div>
                        </div>
                      </section>
                    ) : (
                      <div className="flex flex-col items-center">
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                          <MobileDateRangePicker
                            startText="Mobile start"
                            value={value}
                            onChange={(newValue) => {
                              setValue(newValue);
                              console.log(newValue)
                            }}
                            renderInput={(startProps, endProps) => (
                              <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                              </React.Fragment>
                            )}
                          />
                        </LocalizationProvider>
                        <Disclosure as="div" className="mt-2 w-full">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm text-gray-700 font-medium text-left border rounded-lg  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Liste</span>
                                <ArrowBackIosIcon
                                  className={`${
                                    open
                                      ? "transform rotate-90"
                                      : "transform -rotate-90"
                                  } w-5 h-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <section class="py-1 bg-orangeGray-50">
                                  <div class="w-full  mb-12 px-4 mx-auto mt-2">
                                    <div class=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                      <div class="rounded-t mb-0 px-4 py-3 border-0 h-12 sticky">
                                        <div class="flex flex-wrap items-center">
                                          <div class=" w-full px-4 max-w-full flex-grow flex-1">
                                            <h3 class="font-semibold text-base text-orangeGray-700">
                                              Reservierungen
                                            </h3>
                                          </div>
                                          <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                            <button
                                              class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                              type="button"
                                              onClick={(e) =>
                                                setTischplan(true)
                                              }
                                            >
                                              tischplan
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="block w-full overflow-x-auto">
                                        <table class="items-center bg-transparent w-full border-collapse ">
                                          <thead>
                                            <tr>
                                              <th class="px-6 bg-orangeGray-50 text-orangeGray-500 align-middle border border-solid border-orangeGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Name
                                              </th>
                                              <th class="px-6 bg-orangeGray-50 text-orangeGray-500 align-middle border border-solid border-orangeGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Datum
                                              </th>
                                              <th class="px-6 bg-orangeGray-50 text-orangeGray-500 align-middle border border-solid border-orangeGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Zeit
                                              </th>
                                              <th class="px-6 bg-orangeGray-50 text-orangeGray-500 align-middle border border-solid border-orangeGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Personen
                                              </th>
                                              <th class="px-6 bg-orangeGray-50 text-orangeGray-500 align-middle border border-solid border-orangeGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Raum / Tisch
                                              </th>
                                            </tr>
                                          </thead>

                                          <tbody className="overflow-y-scroll max-h-fit">
                                            {reser
                                              .filter(
                                                (el) =>
                                                  el.restaurant_id == restaEl.id
                                              )
                                              .sort(
                                                (a, b) =>
                                                  a.reservation_date.split(
                                                    "T"
                                                  )[0] -
                                                  b.reservation_date.split(
                                                    "T"
                                                  )[0]
                                              )
                                              .map((res) => (
                                                <tr>
                                                  <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-orangeGray-700 ">
                                                    {res.customer_firstname}{" "}
                                                    {res.customer_secondname}{" "}
                                                  </th>
                                                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {
                                                      res.reservation_date.split(
                                                        "T"
                                                      )[0]
                                                    }{" "}
                                                  </td>
                                                  <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {res.reservation_time}
                                                  </td>
                                                  <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {
                                                      res.reservation_personcount
                                                    }
                                                  </td>
                                                  <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {res.reservation_room}
                                                    {res.reservation_table}
                                                  </td>
                                                </tr>
                                              ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2 w-full">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm text-gray-700 font-medium text-left border rounded-lg  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Tisch Ansicht</span>
                                <ArrowBackIosIcon
                                  className={`${
                                    open
                                      ? "transform rotate-90"
                                      : "transform -rotate-90"
                                  } w-5 h-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <section class="py-1 bg-orangeGray-50">
                                  <div class="w-full h-full py-9 bg-gray-200 flex justify-center items-center flex-col">
                                    {[...Array(10)].map((e, i) => (
                                      <div class="w-[800px] my-9 bg-white rounded-xl p-1 flex h-[80px] divide-x divide-dashed divide-gray-300 shadow-lg">
                                        <div class="px-2 flex flex-col justify-center items-center">
                                          Tisch {i}
                                          <div class="text-sm text-gray-400">
                                            Garten
                                          </div>
                                        </div>

                                        <div class="w-[30px] relative bg-orange-100/50">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            12:00
                                          </div>
                                          <div class="absolute -bottom-8 w-max text-sm text-gray-500">
                                            public 10:00 ~ 11:00
                                          </div>
                                        </div>
                                        <div class="w-[30px] relative bg-orange-100/50"></div>
                                        <div class="w-[30px] relative bg-orange-100/50"></div>
                                        <div class="w-[30px] relative bg-orange-100/50">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            12:30
                                          </div>
                                        </div>
                                        <div class="w-[30px] relative bg-orange-100/50"></div>
                                        <div class="w-[30px] relative bg-orange-100/50"></div>
                                        <div class="w-[30px] relative">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            13:00
                                          </div>
                                        </div>
                                        <div class="w-[30px] relative"></div>
                                        <div class="w-[30px] relative">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            13:30
                                          </div>
                                        </div>
                                        <div class="w-[30px] relative"></div>
                                        <div class="w-[30px] relative">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            14:00
                                          </div>
                                        </div>
                                        <div class="w-[30px] relative"></div>
                                        <div class="w-[30px] relative bg-orange-100/50">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            14:30
                                          </div>
                                          <div class="absolute -bottom-8 w-max text-sm text-gray-500">
                                            private 10:00 ~ 11:00
                                          </div>
                                        </div>
                                        <div class="w-[30px] relative bg-red-100/50"></div>
                                        <div class="w-[30px] relative bg-red-100/50">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            15:00
                                          </div>
                                        </div>
                                        <div class="w-[30px] relative bg-orange-100/50"></div>
                                        <div class="w-[30px] relative"></div>
                                        <div class="w-[30px] relative">
                                          <div class="absolute -top-6 -left-4 text-xs">
                                            15:30
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </section>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2 w-full">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm text-gray-700 font-medium text-left border rounded-lg  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Layout Ansicht</span>
                                <ArrowBackIosIcon
                                  className={`${
                                    open
                                      ? "transform rotate-90"
                                      : "transform -rotate-90"
                                  } w-5 h-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <section class="py-1 bg-orangeGray-50 overflow-x-auto">
                                  <div class="w-full h-full  mb-12 px-4 mx-auto mt-2">
                                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded h-full">
                                      <div class="rounded-t mb-0 px-4 py-3 border-0">
                                        <div class="flex flex-wrap items-center">
                                          <div class="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                            <h3 class="font-semibold text-base text-orangeGray-700">
                                              Reservierungen
                                            </h3>
                                          </div>
                                          
                                        </div>
                                      </div>
                                      <div>
                                        <div class="flex h-full">
                                          {table.map((el, i) => (
                                            <div
                                              className={`border-2  ${
                                                roomNumber == i
                                                  ? "bg-gray-200"
                                                  : "bg-white"
                                              }  ${
                                                selectedRoomNumber == i
                                                  ? "border-orange-400"
                                                  : ""
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

                                        <div className="relative h-full ">
                                          {table[roomNumber].Arr.map((e, i) => (
                                            <div
                                              className={`${
                                                selectedTable == e.key &&
                                                selectedRoomNumber == roomNumber
                                                  ? "border-gray-700"
                                                  : ""
                                              }  ${"bg-orange-500 hover:bg-orange-300"} z-2 absolute top-0 left-0 rounded-xl flex flex-col border-2 `}
                                              style={{
                                                width: e.width,
                                                height: e.height,
                                                marginLeft: e.x,
                                                marginTop: e.y,
                                              }}
                                              onClick={(ex) => {}}
                                            >
                                              {/*parseInt(e.width) >
                                            parseInt(e.height) ? (
                                              <div>
                                                <div className="flex flex-row absolute">
                                                  {Array(parseInt(e.width) / 50)
                                                    .fill()
                                                    .map((v, i) => (
                                                      <div
                                                        className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
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
                                                        className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
                                                        style={{
                                                          marginTop:
                                                            parseInt(e.height) -
                                                            16 +
                                                            "px",
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
                                                  {Array(
                                                    parseInt(e.height) / 50
                                                  )
                                                    .fill()
                                                    .map((v, i) => (
                                                      <div
                                                        className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
                                                        style={{
                                                          marginTop: 13,
                                                          marginLeft: -10,
                                                          marginBottom: 13,
                                                        }}
                                                      ></div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col absolute">
                                                  {Array(
                                                    parseInt(e.height) / 50
                                                  )
                                                    .fill()
                                                    .map((v, i) => (
                                                      <div
                                                        className="bg-orange-400 z-10 h-6 w-6 rounded-xl"
                                                        style={{
                                                          marginTop: 13,
                                                          marginLeft:
                                                            parseInt(e.width) -
                                                            16 +
                                                            "px",
                                                          marginBottom: 13,
                                                        }}
                                                      ></div>
                                                    ))}
                                                </div>
                                              </div>
                                                      )*/}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </div>
                    )}

                    {/* <ul className="">
                      {reser
                        .filter((el) => el.restaurant_id == restaEl.id)
                        .map((res) => (
                          <li
                            key={res.id}
                            className="relative p-3 rounded-md hover:bg-coolGray-100"
                          >
                            <h3 className="text-sm font-medium leading-5">
                              {res.customer_firstname} {res.customer_secondname}
                            </h3>

                            <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                              <li>{res.reservation_date.split("T")[0]}</li>
                              <li>&middot;</li>
                              <li>{res.reservation_time}</li>
                              <li>&middot;</li>
                              <li>{res.reservation_personcount} Personen</li>
                              <li>&middot;</li>
                              <li>Tisch: {res.reservation_table}</li>
                              <li>&middot;</li>
                              <li>Raum: {res.reservation_room} </li>
                            </ul>

                            <a
                              href="#"
                              className={classNames(
                                "absolute inset-0 rounded-md",
                                "focus:z-10 focus:outline-none focus:ring-2 ring-orange-400"
                              )}
                            />
                          </li>
                        ))}
                              </ul>*/}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* <ul className="">
                      {reser
                        .filter((el) => el.restaurant_id == restaEl.id)
                        .map((res) => (
                          <li
                            key={res.id}
                            className="relative p-3 rounded-md hover:bg-coolGray-100"
                          >
                            <h3 className="text-sm font-medium leading-5">
                              {res.customer_firstname} {res.customer_secondname}
                            </h3>

                            <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                              <li>{res.reservation_date.split("T")[0]}</li>
                              <li>&middot;</li>
                              <li>{res.reservation_time}</li>
                              <li>&middot;</li>
                              <li>{res.reservation_personcount} Personen</li>
                              <li>&middot;</li>
                              <li>Tisch: {res.reservation_table}</li>
                              <li>&middot;</li>
                              <li>Raum: {res.reservation_room} </li>
                            </ul>

                            <a
                              href="#"
                              className={classNames(
                                "absolute inset-0 rounded-md",
                                "focus:z-10 focus:outline-none focus:ring-2 ring-orange-400"
                              )}
                            />
                          </li>
                        ))}
                              </ul>*/}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reservations;
