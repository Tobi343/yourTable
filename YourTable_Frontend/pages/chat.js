import React, { useState } from "react";
import Navbar from "./components/Sidebars/Navbar";
import Sidebar from "./components/Sidebars/Sidebar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import ChatIcon from "@mui/icons-material/Chat";
import _ from "lodash";

function chat() {
  const [NavColor, setNavColor] = useState("bg-blue-500");

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={NavColor} />

        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <MobileSideBar />

          <div className="flex-1 bg-red-400">
            <div className="bg-white w-16 md:w-72 h-full pt-24">
              <div className="">
                {_.times(5, (el) => (
                  <a className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500">
                    <ChatIcon className="mr-3" />
                    <p id="editProfileBtn" className=" hidden md:flex">
                      {"Meris Bihorac"}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex-1">

                

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default chat;
