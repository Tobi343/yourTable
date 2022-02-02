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

  const [tables, setTables] = useState(props.tables);

  const ref = useRef();

  useEffect(() => {
    console.log("width", ref.current);
    console.log(props.tables);
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
                  <button
                    onClick={(e) => {
                      let copy = [...props.tables];
                      copy[el].push({
                        key: copy[el][copy[el].length-1].key+1,
                        x: 0,
                        y: 0,
                        width: 50,
                        height: 50,
                      });
                      setTables(copy);
                      console.log(copy);
                    }}
                    className=" bg-blue-500 text-md h-10 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
                  >
                    Add Table
                  </button>
                  <button
                    onClick={(e) => {
                      props.restaurant.restaurant_layout = tables;
                      console.log(JSON.stringify(props.tables));
                      props.edit(false);
                    }}
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
                  {tables[el].map((e, i) => (
                    <Element
                     
                      roomNumber={el}
                      keyProp={e.key}
                      key={i}
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
