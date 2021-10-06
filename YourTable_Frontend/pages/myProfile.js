import React from "react";
import { useState } from "react";
import Sidebar from "./components/Sidebars/Sidebar";
import Navbar from "./components/Sidebars/Navbar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import PersonIcon from "@mui/icons-material/Person";
import SideBarCard from "./components/Sidebars/SideBarCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EditIcon from "@mui/icons-material/Edit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AppsIcon from "@mui/icons-material/Apps";
import SecurityIcon from "@mui/icons-material/Security";
import Image from "../public/orange_logo.png";

function myProfile() {
  const [NavColor, setNavColor] = useState("bg-blue-500");

  function sidebarOpenMobile(e) {
    e.preventDefault();
    containerProfileSidebar.classList.toggle("w-16");
    editProfile.classList.toggle("hidden");
    plan.classList.toggle("hidden");
    editPlan.classList.toggle("hidden");
    passwordAndSecurity.classList.toggle("hidden");
    profileArrow.classList.toggle("rotate-180");
  }

  function editProfileBtnHandle(e) {
    e.preventDefault();
    console.log("k");
    editProfile.classList.toggle("hidden");
    seeProfile.classList.toggle("hidden");
  }

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100 h-full">
        <Sidebar NavColorField={NavColor} />
        <div className="w-full flex flex-col h-screen ">
          <MobileSideBar />
          <div className="flex h-full">
            <div id="containerProfileSidebar" className="bg-white w-16 md:w-72">
              <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
                <div className=" hidden md:flex">Mein Profil</div>
                <div className=" show md:hidden">
                  <ArrowForwardIosIcon
                    id="profileArrow"
                    className=""
                    onClick={sidebarOpenMobile}
                  />
                </div>
              </div>
              <div className="">
                <a
                  href="#"
                  onClick={editProfileBtnHandle}
                  className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <EditIcon className="mr-3" />{" "}
                  <p id="editProfileBtn" className=" hidden md:flex">
                    Profil bearbeiten
                  </p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <AppsIcon className="mr-3" />{" "}
                  <p id="plan" className=" hidden md:flex">
                    Restrauntplan
                  </p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link h-18 text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <AppRegistrationIcon className="mr-3" />{" "}
                  <p id="editPlan" className=" hidden md:flex">
                    Restrauntplan bearbeiten
                  </p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link text-gray-400 py-4 h-18  px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <SecurityIcon className="mr-3" />{" "}
                  <p id="passwordAndSecurity" className=" hidden md:flex">
                    {"Passwort & Sicherheit"}
                  </p>
                </a>
              </div>
            </div>
            <div id="editProfile" className=" flex-1 hidden h-full">
              <div>
                <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
                  Meine Profildaten
                </div>
                <div className=" rounded-full">
                  <img
                    src="/sample-profile.png"
                    className="rounded-full h-20 ml-6 mb-3"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      First Name
                    </p>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="fname"
                      placeholder="Max"
                    />
                  </div>
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Last Name
                    </p>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="lname"
                      placeholder="Mustermann"
                    />
                  </div>
                  <div className="flex flex-col mx-6 my-3 lg:col-span-2">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Email Adresse
                    </p>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="email"
                      placeholder="max.mustermann@example.com"
                    />
                  </div>
                  <div className="flex flex-col mx-6 my-3 lg:col-span-2">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Restaurant Adresse
                    </p>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="email"
                      placeholder="Mustergasse 10/9"
                    />
                  </div>
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Postleitzahl
                    </p>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="fname"
                      placeholder="0000"
                    />
                  </div>
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Stadt
                    </p>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="lname"
                      placeholder="Musterort"
                    />
                  </div>
                  {/*<div className="flex flex-col mx-6 my-3">
                    <button className="bg-blue-400 text-white text-bold w-28 h-10 m-6 rounded">
                      SPEICHERN
                    </button>
                  
                  </div>
                  <div className="flex flex-col mx-6 my-3">
                   
                    <button className="bg-red-400 text-white text-bold w-28 h-10 m-6 rounded">
                      ABRECHEN
                    </button>
  </div>*/}
                </div>
              </div>
            </div>
            <div id="seeProfile" className=" flex-1">
              <div>
                <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
                  Meine Profildaten
                </div>
                <div className="rounded-full">
                  <img
                    src="/sample-profile.png"
                    className="rounded-full h-20 ml-6 mb-3"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      First Name
                    </p>
                    <p
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="fname"
                    >
                      {"Max"}
                    </p>
                  </div>
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Last Name
                    </p>
                    <p
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="lname"
                    >
                      {"Mustermann"}
                    </p>
                  </div>
                  <div className="flex flex-col mx-6 my-3 lg:col-span-2">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Email Adresse
                    </p>
                    <p
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="email"
                    >
                      {"max.mustermann@example.com"}
                    </p>
                  </div>
                  <div className="flex flex-col mx-6 my-3 lg:col-span-2">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Restaurant Adresse
                    </p>
                    <p
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="email"
                    >
                      {"Mustergasse 10/9"}
                    </p>
                  </div>
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Postleitzahl
                    </p>
                    <p
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="fname"
                    >
                      {"0000"}
                    </p>
                  </div>
                  <div className="flex flex-col mx-6 my-3">
                    <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                      Stadt
                    </p>
                    <p
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="lname"
                    >
                      {"Musterort"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default myProfile;
