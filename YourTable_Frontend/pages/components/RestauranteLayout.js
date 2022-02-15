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

function RestauranteLayout(props) {


  const [count, setCount] = useState(1);
  const [xValue, setXValue] = useState(20);
  const [yValue, setYValue] = useState(20);
  const [tabCount, setTabCount] = useState(props.tables.length);
  const [NavColor, setNavColor] = useState("bg-blue-500");
  const [table, setTable] = useState([]);
  const [roomName, setRoomName] = useState(props.tables[0].Name);
  const [tables, setTables] = useState(props.tables);


  const [dimensions, setDimensions] = useState({
    height: props.window.innerHeight,
    width: props.window.innerWidth
  })
 

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

  return (
    <div className="flex-1 ">
      <div className="w-full bg-gray-100 h-full flex-col flex">
        <Tab.Group
          onChange={(index) => {
            setRoomName(tables[index].Name);
          }}
        >
          <Tab.List className="flex p-1  bg-blue-500 m-5 rounded-xl">
            {tables.map((el, i) => (
              <Tab
                key={i}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
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
                        key: copy[i].Arr[copy[i].Arr.length - 1].key + 1,
                        x: 0,
                        y: 0,
                        width: 50,
                        height: 50,
                      });
                      setTables(copy);
                    }}
                    className=" bg-blue-500 text-md  p-2 m-2 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
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
                        console.log(index)
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
                <GridLines
                  cellWidth={size}
                  strokeWidth={2}
                  className="  flex-1 h-full"
                >
                  {tables[i].Arr.map((e, index) => (
                    <Element
                      roomNumber={i}
                      keyProp={e.key}
                      key={index}
                      setTables={setTables}
                      tables={tables}
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
