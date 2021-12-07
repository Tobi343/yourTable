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
  function handleMouseDown({ clientX, clientY }) {
    console.log(clientX + ": " + clientY);
  }

  const [count, setCount] = useState(1);
  const [xValue, setXValue] = useState(20);
  const [yValue, setYValue] = useState(20);
  const [tabCount, setTabCount] = useState(10);
  const [NavColor, setNavColor] = useState("bg-blue-500");
  const [table, setTable] = useState([]);

  const size = 50;

  const [tables, setTables] = useState([
    [
      { key: 1, x: 1 * size, y: 1 * size, width: 2 * size, height: 1 * size },
      { key: 2, x: 1 * size, y: 3 * size, width: 2 * size, height: 1 * size },
      { key: 3, x: 4 * size, y: 5 * size, width: 2 * size, height: 1 * size },
      { key: 4, x: 4 * size, y: 2 * size, width: 2 * size, height: 1 * size },
    ],
    [
      { key: 1, x: 1 * size, y: 1 * size, width: 2 * size, height: 1 * size },
      { key: 2, x: 2 * size, y: 3 * size, width: 2 * size, height: 1 * size },
      { key: 3, x: 4 * size, y: 5 * size, width: 2 * size, height: 1 * size },
      { key: 4, x: 4 * size, y: 2 * size, width: 2 * size, height: 1 * size },
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const ref = useRef();

  useEffect(() => {
    console.log("width", ref.current);
    console.log(tables);
    // setTables((tables) => [...tables, <Element x={4*size} y={2*size} width={2*size} height={1*size}/>]);
  }, []);

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
    <div className="flex-1">
      <div className="w-full bg-gray-100 h-full flex-col flex">
        <Tab.Group>
          <Tab.List className="flex p-1  bg-blue-500 m-5 rounded-xl">
            {_.times(tabCount, (el) => (
              <Tab
                key={el}
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
                {el + 1}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="flex flex-1">
            {_.times(tabCount, (el) => (
              <Tab.Panel className="flex-1 flex-col pxs-10">
                <div className=" bg-gray-200 rounded-lg w-full h-16 my-3 flex">
                  <div class="mb-4 flex">
                    <input
                      class="shadow appearance-none border h-9 rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="width"
                      type="number"
                      placeholder="Width"
                    />
                  </div>
                  <div class="mb-4 flex">
                    <input
                      class="shadow appearance-none border h-9 rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="height"
                      type="number"
                      placeholder="Height"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      props.restaurant.layout = props.tables;
                      props.edit(false)}}
                    className=" bg-green-500 text-md h-10 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
                  >
                    Save
                  </button>
                  <button
                    onClick={(e) => setTabCount(tabCount - 1)}
                    className=" bg-red-500 text-md h-10 text-center inline-block w-40 rounded-xl text-white font-bold ml-6 "
                  >
                    Delete Room
                  </button>
                </div>
                <GridLines
                  cellWidth={size}
                  strokeWidth={2}
                  className="  flex-1 h-full"
                >
                  {props.tables[el].map((e, i) => (
                    <Element
                      roomNumber={el}
                      keyProp={e.key}
                      setTables={props.setTables}
                      tables={props.tables}
                      x={e.x}
                      y={e.y}
                      width={e.width}
                      height={e.height}
                      size={size}
                    ></Element>
                  ))}
                  {console.log(el)}
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
