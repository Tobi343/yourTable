import React from "react";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import ColorLensIcon from "@mui/icons-material/ColorLens";

function Navbar(props) {
  //localStorage.setItem('color', "bg-blue-500");

  const setColor = (parameter) => (e) => {
    e.preventDefault();
    v_SideBar.classList.remove(localStorage.getItem("color"));
    v_SideBar.classList.add(parameter);
    //setNavColor(parameter);
  };

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
          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <button
              id="sidebarBtn"
              onClick={triggerNavBar}
              className="px-4 text-gray-700 text-2xl rounded-lg hover:bg-gray-200"
            >
              <MenuIcon />
            </button>
            <form method="GET" className="w-full invisible sm:visible">
              <div className="relative text-gray-500 ml-6 px-3 pt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-1">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <SearchIcon />
                  </button>
                </span>
                <input
                  type="search"
                  className="py-2 text-md text-gray-900 w-full
                rounded-md pl-10 bg-transparent placeholder-gray-800 focus:outline-none
                focus:bg-white focus:text-gray-800"
                  placeholder="Search..."
                />
              </div>
            </form>
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
                    className="bg-blue-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-blue-600"
                    onClick={() => props.setNavColorField("bg-blue-500")}
                  ></button>
                  <button
                    className="bg-indigo-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-indigo-600"
                    onClick={() => props.setNavColorField("bg-indigo-500")}
                  ></button>
                  <button
                    className="bg-green-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-green-600"
                    onClick={() => props.setNavColorField("bg-green-500")}
                  ></button>
                  <button
                    className="bg-red-500 w-24 h-8 rounded block mx-auto my-1 hover:bg-red-600"
                    onClick={() => props.setNavColorField("bg-red-500")}
                  ></button>
                  <button
                    className="bg-gray-800 w-24 h-8 rounded block mx-auto my-1 hover:bg-gray-900"
                    onClick={() => props.setNavColorField("bg-gray-800")}
                  ></button>
                </div>
              </div>
            </div>

            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="profileBtn"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <div
                id="profileDiv"
                className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                  <i className="fas fa-user mr-2"></i>Your Profile
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
