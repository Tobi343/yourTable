import React from "react";
import { useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ColorContext from "../../contexts/ColorContext";
import Link from "next/link";

function Navbar(props) {
  //localStorage.setItem('color', "bg-orange-500");

  const { color, setColor } = useContext(ColorContext);

  function showColors(e) {
    e.preventDefault();

    colorsDiv.classList.remove("invisible");
  }

  function hideColors(e) {
    e.preventDefault();
    colorsDiv.classList.add("invisible");
  }

  function triggerNavBar(e) {
    e.preventDefault();
    MobileBar.classList.toggle("hidden");
    v_SideBar.classList.toggle("md:block");
    v_SideBar.classList.toggle("-translate-x-full");
  }

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <button
              id="sidebarBtn"
              onClick={triggerNavBar}
              className="px-4 text-gray-700 text-2xl rounded-lg hover:bg-gray-200"
            >
              <MenuIcon />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  className="text-xl text-gray-800 px-4 py-2 focus:outline-none"
                  id="notificationsBtn"
                >
                  <NotificationsIcon />
                </button>
              </div>

              <div
                id="notificationsDiv"
                className="hidden origin-top-right absolute right-0 mt-2 w-64
              rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5
              focus:outline-none"
              >
                <p className="p-2 text-sm text-gray-700">Not results...</p>
              </div>
            </div>

            <div className="ml-3 relative">
              <div>
                <button
                  className="text-xl text-gray-800 pr-4 py-2 focus:outline-none"
                  onClick={showColors}
                  onMouseLeave={hideColors}
                >
                  <ColorLensIcon />
                </button>
              </div>

              <div
                id="colorsDiv"
                className="invisible  hover:visible origin-top-right absolute right-0 w-28
              rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5
              focus:outline-none z-10"
              >
                <p className="p-2 text-sm text-gray-700">Colors:</p>
                <div className="py-2">
                  <button
                    className="bg-orange-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-orange-600"
                    onClick={() => setColor("bg-orange-500")}
                  ></button>
                  <button
                    className="bg-indigo-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-indigo-600"
                    onClick={() => setColor("bg-indigo-500")}
                  ></button>
                  <button
                    className="bg-green-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-green-600"
                    onClick={() => setColor("bg-green-500")}
                  ></button>
                  <button
                    className="bg-red-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-red-600"
                    onClick={() => setColor("bg-red-500")}
                  ></button>
                  <button
                    className="bg-gray-800 w-24 h-8 rounded block mx-auto my-1 hover:bg-gray-900"
                    onClick={() => setColor("bg-gray-800")}
                  ></button>
                </div>
              </div>
            </div>

            <div className="ml-3 relative">
              <div>
                <Link href={"/myProfile"}>
                  <div
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="profileBtn"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        props.session === undefined ||
                        props.session == "undefined"
                          ? "/sample-profile.png"
                          : props.session.picture
                      }
                      alt=""
                    />
                  </div>
                </Link>
              </div>

              <div
                id="profileDiv"
                className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                  <i className="fas fa-user mr-2"></i>Meine Restaurants
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                  <i className="fas fa-cog mr-2"></i>Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                  <i className="fas fa-sign-out-alt mr-2"></i>Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
