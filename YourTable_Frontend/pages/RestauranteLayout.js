import React from "react";
import Element from "./components/DragAndDrop/Element";
import _ from "lodash";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import Navbar from "./components/Sidebars/Navbar";
import Sidebar from "./components/Sidebars/Sidebar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";

import EditIcon from "@mui/icons-material/Edit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AppsIcon from "@mui/icons-material/Apps";

import SecurityIcon from "@mui/icons-material/Security";
import GridLines from 'react-gridlines';




function RestauranteLayout() {
  function handleMouseDown({ clientX, clientY }) {
    console.log(clientX + ": " + clientY);
  }

  const [count, setCount] = useState(1);
  const [tabCount, setTabCount] = useState(10);
  const [NavColor, setNavColor] = useState("bg-blue-500");

  const size = 50;

  function addCount() {
    setCount(count + 1);
    console.log(arr.length);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const arr = [];

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex h-full">
        <Sidebar NavColorField={NavColor} />
        <div className="w-full flex flex-col h-screen ">
          <MobileSideBar />
          <div className="flex h-full flex-1">
            <div
              onMouseDown={handleMouseDown}
              className="h-full flex flex-1"
            >
               <div className="mt-24" >
                <a
                  href="#"
                  onClick={addCount}
                  className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <EditIcon className="mr-3" />
                  <p id="editProfileBtn" className=" hidden md:flex">
                    Profil bearbeiten
                  </p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <AppsIcon className="mr-3" />
                  <p id="plan" className=" hidden md:flex">
                    Restrauntplan
                  </p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link h-18 text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <AppRegistrationIcon className="mr-3" />
                  <p id="editPlan" className=" hidden md:flex">
                    Restrauntplan bearbeiten
                  </p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link text-gray-400 py-4 h-18  px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <SecurityIcon className="mr-3" />
                  <p id="passwordAndSecurity" className=" hidden md:flex">
                    {"Passwort & Sicherheit"}
                  </p>
                </a>
              </div>
              

              <div className="flex-1">
                <div className="w-full bg-gray-100 h-full flex-col flex">
                  <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-500 m-5 rounded-xl">
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
                          {el+1}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="flex flex-1">
                      {_.times(tabCount, (el) => (
                        <Tab.Panel className="flex-1 p-10">
                          <GridLines cellWidth={size} strokeWidth={2} className="  flex-1 h-full">
                            {_.times(count, (el) => (
                              <Element key={el} size={size}></Element>
                            ))}
                          </GridLines >
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RestauranteLayout;
