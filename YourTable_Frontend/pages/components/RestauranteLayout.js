import React, { useEffect } from "react";
import Element from "./DragAndDrop/Element";
import _ from "lodash";
import { useState, useRef } from "react";
import { Tab } from "@headlessui/react";
import Navbar from "./Sidebars/Navbar";
import Sidebar from "./Sidebars/Sidebar";
import MobileSideBar from "./Sidebars/MobileSideBar";
import InnerSidebar from "./Sidebars/innerSidebar";
import EditIcon from "@mui/icons-material/Edit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AppsIcon from "@mui/icons-material/Apps";
import SecurityIcon from "@mui/icons-material/Security";
import GridLines from "react-gridlines";
import { Modal } from "@mui/material";

function RestauranteLayout(props) {
  const [count, setCount] = useState(1);
  const [xValue, setXValue] = useState(20);
  const [yValue, setYValue] = useState(20);
  const [tabCount, setTabCount] = useState(props.tables.length);
  const [NavColor, setNavColor] = useState("bg-orange-500");
  const [table, setTable] = useState([]);
  const [roomName, setRoomName] = useState(props.tables[0].Name);
  const [tables, setTables] = useState(props.tables);
  const [modalSelectedTable, setModalSelectedTable] = useState(-1);
  const [tableName, setTableName] = useState("");
  const [tableSeats, setTableSeats] = useState([]);

  const [dimensions, setDimensions] = useState({
    height: props.window.innerHeight,
    width: props.window.innerWidth,
  });

  const size = 50;

  const ref = useRef();

  function addCount() {
    setCount(count + 1);
  }

  function addRoom(n, text) {
    setTabCount(tabCount + 1);
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      //setTables(tables);
      // console.log("resize");
    });
  }, []);

  return (
    <div className="flex-1 ">
      <div className="w-full bg-gray-100 h-full flex-col flex">
        <Tab.Group
          onChange={(index) => {
            setRoomName(tables[index].Name);
          }}
        >
          <Tab.List className="flex p-1  bg-orange-500 m-5 rounded-xl">
            {tables.map((el, i) => (
              <Tab
                key={i}
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
                {tables[i].Name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="flex flex-1">
            {tables.map((el, i) => (
              <Tab.Panel className="flex-1 flex-col pxs-10">
                <div className=" bg-gray-200 rounded-lg w-full h-16 my-3 flex">
                  <button
                    onClick={(e) => {
                      let copy = [...props.tables];
                      copy[i].Arr.push({
                        key: copy[i].Arr[copy[i].Arr.length-1].key + 1,
                        x: 0,
                        y: 0,
                        width: 50,
                        height: 50,
                        name: copy[i].Arr[copy[i].Arr.length-1].key + 1,
                        seats: [],
                      });
                      setTables(copy);
                    }}
                    className=" bg-orange-500 text-md  p-2 m-2 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
                  >
                    Add Table
                  </button>
                  <button
                    onClick={(e) => {
                      props.restaurant.restaurant_layout = tables;
                      props.edit(false);
                    }}
                    className=" bg-green-500 text-md  p-2 m-2 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => {
                      let copy = [...props.tables];
                      var index = copy.indexOf(i);
                      if (index !== -1) {
                        console.log(index);
                        copy.splice(index, 1);
                      }
                      setTables(copy);
                      console.log(copy);
                    }}
                    className=" bg-red-500 text-md text-center inline-block w-40 rounded-xl p-2 m-2 text-white font-bold ml-6 "
                  >
                    Delete Room
                  </button>

                  <form className="m-2 flex">
                    <input
                      className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                      placeholder="Roomname"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        let copy = [...tables];
                        copy[i].Name = roomName;
                        setTables(copy);
                      }}
                      className="px-8 rounded-r-lg bg-yellow-400  text-white font-bold uppercase border-yellow-500 border-t border-b border-r"
                    >
                      Change
                    </button>
                  </form>
                </div>

                <>
                  {modalSelectedTable >= 0 ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                              <h3 className="text-3xl font-semibold">
                                Tisch bearbeiten
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setModalSelectedTable(-1)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <form class="bg-white  px-8 pt-6 pb-8">
                                <div class="mb-4">
                                  <label
                                    class="block text-gray-700 text-sm font-bold mb-2"
                                    for="username"
                                  >
                                    Tischname
                                  </label>
                                  <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tableName"
                                    type="text"
                                    placeholder="Tischname"
                                    value={tableName}
                                    onChange={(e) =>
                                      setTableName(e.target.value)
                                    }
                                  />
                                  {console.log(
                                    tables[i].Arr[parseInt(modalSelectedTable)]
                                  )}
                                  {console.log(tables[i].Arr)}
                                  {console.log(modalSelectedTable)}
                                </div>
                                <div class="my-6">
                                  <div class="flex h-full ">
                                    <div className="relative h-full ">
                                      <div
                                        className={`${"bg-orange-500"} z-2 absolute top-0 left-0 rounded-xl flex flex-col border-2 `}
                                        style={{
                                          width:
                                            tables[i].Arr[
                                              parseInt(modalSelectedTable)
                                            ] == undefined
                                              ? 0
                                              : tables[i].Arr[
                                                  parseInt(modalSelectedTable)
                                                ].width,
                                          height:
                                            tables[i].Arr[
                                              parseInt(modalSelectedTable)
                                            ] == undefined
                                              ? 0
                                              : tables[i].Arr[
                                                  parseInt(modalSelectedTable)
                                                ].height,
                                        }}
                                        onClick={(ex) => {}}
                                      >
                                        <div>
                                          <div className="flex flex-row absolute">
                                            {Array(
                                              parseInt(
                                                tables[i].Arr[
                                                  parseInt(modalSelectedTable)
                                                ] == undefined
                                                  ? 0
                                                  : tables[i].Arr[
                                                      parseInt(
                                                        modalSelectedTable
                                                      )
                                                    ].width
                                              ) / 50
                                            )
                                              .fill()
                                              .map((v, i) => (
                                                <div
                                                  className={`border-gray-300 hover:bg-gray-200 border-2 z-10 h-6 w-6 rounded-xl ${
                                                    tableSeats.includes(i + 1)
                                                      ? "bg-gray-200"
                                                      : ""
                                                  }`}
                                                  style={{
                                                    marginLeft: 13,
                                                    marginRight: 13,
                                                    marginTop: -10,
                                                  }}
                                                  onClick={({ target }) =>
                                                    target.classList.toggle(
                                                      "bg-gray-200"
                                                    )
                                                  }
                                                ></div>
                                              ))}
                                          </div>
                                          {console.log(tableSeats)}
                                          <div className="flex flex-row absolute">
                                            {Array(
                                              parseInt(
                                                tables[i].Arr[
                                                  parseInt(modalSelectedTable)
                                                ] == undefined
                                                  ? 0
                                                  : tables[i].Arr[
                                                      parseInt(
                                                        modalSelectedTable
                                                      )
                                                    ].width
                                              ) / 50
                                            )
                                              .fill()
                                              .map((v, i) => (
                                                <div
                                                  className={`border-gray-300 hover:bg-gray-200 border-2 z-10 h-6 w-6 rounded-xl ${
                                                    tableSeats.includes(
                                                      i +
                                                        parseInt(
                                                          tables[i].Arr[
                                                            parseInt(
                                                              modalSelectedTable
                                                            )
                                                          ] == undefined
                                                            ? 0
                                                            : tables[i].Arr[
                                                                parseInt(
                                                                  modalSelectedTable
                                                                )
                                                              ].width
                                                        ) /
                                                          50 +
                                                        parseInt(
                                                          tables[i].Arr[
                                                            parseInt(
                                                              modalSelectedTable
                                                            )
                                                          ] == undefined
                                                            ? 0
                                                            : tables[i].Arr[
                                                                parseInt(
                                                                  modalSelectedTable
                                                                )
                                                              ].height
                                                        ) /
                                                          50
                                                    )
                                                      ? "bg-gray-200"
                                                      : ""
                                                  }`}
                                                  style={{
                                                    marginTop:
                                                      parseInt(50) - 16 + "px",
                                                    marginLeft: 13,
                                                    marginRight: 13,
                                                  }}
                                                  onClick={({ target }) =>
                                                    target.classList.toggle(
                                                      "bg-gray-200"
                                                    )
                                                  }
                                                ></div>
                                              ))}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="flex flex-col absolute">
                                            {Array(
                                              parseInt(
                                                tables[i].Arr[
                                                  parseInt(modalSelectedTable)
                                                ] == undefined
                                                  ? 0
                                                  : tables[i].Arr[
                                                      parseInt(
                                                        modalSelectedTable
                                                      )
                                                    ].height
                                              ) / 50
                                            )
                                              .fill()
                                              .map((v, i) => (
                                                <div
                                                  className={`border-gray-300 hover:bg-gray-200 border-2 z-10 h-6 w-6 rounded-xl ${
                                                    tableSeats.includes(
                                                      i +
                                                        1 +
                                                        parseInt(
                                                          tables[i].Arr[
                                                            parseInt(
                                                              modalSelectedTable
                                                            )
                                                          ] == undefined
                                                            ? 0
                                                            : tables[i].Arr[
                                                                parseInt(
                                                                  modalSelectedTable
                                                                )
                                                              ].width
                                                        ) /
                                                          50
                                                    )
                                                      ? "bg-gray-200"
                                                      : ""
                                                  }`}
                                                  style={{
                                                    marginTop: 13,
                                                    marginLeft: -10,
                                                    marginBottom: 13,
                                                  }}
                                                  onClick={({ target }) =>
                                                    target.classList.toggle(
                                                      "bg-gray-200"
                                                    )
                                                  }
                                                ></div>
                                              ))}
                                          </div>
                                          <div className="flex flex-col absolute">
                                            {Array(
                                              parseInt(
                                                tables[i].Arr[
                                                  parseInt(modalSelectedTable)
                                                ] == undefined
                                                  ? 0
                                                  : tables[i].Arr[
                                                      parseInt(
                                                        modalSelectedTable
                                                      )
                                                    ].height
                                              ) / 50
                                            )
                                              .fill()
                                              .map((v, i) => (
                                                <div
                                                  id={i}
                                                  className={`border-gray-300 hover:bg-gray-200 border-2 z-10 h-6 w-6 rounded-xl ${
                                                    tableSeats.includes(
                                                      i +
                                                        (parseInt(
                                                          tables[i].Arr[
                                                            parseInt(
                                                              modalSelectedTable
                                                            )
                                                          ] == undefined
                                                            ? 0
                                                            : tables[i].Arr[
                                                                parseInt(
                                                                  modalSelectedTable
                                                                )
                                                              ].width
                                                        ) /
                                                          50) * 2 +
                                                        parseInt(
                                                          tables[i].Arr[
                                                            parseInt(
                                                              modalSelectedTable
                                                            )
                                                          ] == undefined
                                                            ? 0
                                                            : tables[i].Arr[
                                                                parseInt(
                                                                  modalSelectedTable
                                                                )
                                                              ].height
                                                        ) /
                                                          50
                                                    )
                                                      ? "bg-gray-200"
                                                      : ""
                                                  }`}
                                                  style={{
                                                    marginTop: 13,
                                                    marginLeft:
                                                      parseInt(
                                                        tables[i].Arr[
                                                          parseInt(
                                                            modalSelectedTable
                                                          )
                                                        ] == undefined
                                                          ? 0
                                                          : tables[i].Arr[
                                                              parseInt(
                                                                modalSelectedTable
                                                              )
                                                            ].width
                                                      ) -
                                                      16 +
                                                      "px",
                                                    marginBottom: 13,
                                                  }}
                                                  onClick={({ target }) =>
                                                    target.classList.toggle(
                                                      "bg-gray-200"
                                                    )
                                                  }
                                                ></div>
                                              ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setModalSelectedTable(-1)}
                              >
                                Schließen
                              </button>
                              <button
                                className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  let copy = [...tables];
                                  copy[i].Arr = [
                                    ...copy[i].Arr.slice(0, modalSelectedTable),
                                    ...copy[i].Arr.slice(
                                      modalSelectedTable + 1
                                    ),
                                  ];
                                  setTables(copy);

                                  console.log(tables[i].Arr);
                                  setModalSelectedTable(-1);
                                }}
                              >
                                Tisch löschen
                              </button>
                              <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  let g =
                                    tables[i].Arr[parseInt(modalSelectedTable)];

                                  g = {
                                    key: g.key,
                                    x: g.x,
                                    y: g.y,
                                    width: g.width,
                                    height: g.height,
                                    name: tableName,
                                    seats: g.seats,
                                  };

                                  let copy = [...tables];
                                  copy[i].Arr[parseInt(modalSelectedTable)] = g;
                                  setTables(copy);
                                  setModalSelectedTable(-1);
                                }}
                              >
                                Änderungen speichern
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                </>

                <GridLines
                  cellWidth={size}
                  strokeWidth={2}
                  className="  flex-1 h-full"
                >
                  {tables[i].Arr.map((e, index) => (
                    <Element
                      roomNumber={i}
                      setTableName={setTableName}
                      setTableSeats={setTableSeats}
                      setModalSelectedTable={setModalSelectedTable}
                      keyProp={e.key}
                      key={e.key}
                      index={index}
                      setTables={setTables}
                      tables={tables}
                      name={e.name}
                      seats={e.seats}
                      x={e.x}
                      y={e.y}
                      width={e.width}
                      height={e.height}
                      size={size}
                    ></Element>
                  ))}
                </GridLines>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default RestauranteLayout;
