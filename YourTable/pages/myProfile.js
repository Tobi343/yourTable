import React from "react";
import { useState } from "react";
import Sidebar from "./components/Sidebars/Sidebar";
import Navbar from "./components/Sidebars/Navbar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import PersonIcon from "@mui/icons-material/Person";
import SideBarCard from "./components/Sidebars/SideBarCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EditIcon from '@mui/icons-material/Edit';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AppsIcon from '@mui/icons-material/Apps';
import SecurityIcon from '@mui/icons-material/Security';

function myProfile() {
  const [NavColor, setNavColor] = useState("bg-blue-500");

    function sidebarOpenMobile(e){
        e.preventDefault();
        containerProfileSidebar.classList.toggle("w-16")
        editProfile.classList.toggle("hidden")
        plan.classList.toggle("hidden")
        editPlan.classList.toggle("hidden")
        passwordAndSecurity.classList.toggle("hidden")
        profileArrow.classList.toggle("rotate-180")
    }

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100">
        <Sidebar NavColorField={NavColor} />
        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <MobileSideBar />
          <div className="flex h-screen">
            <div  id="containerProfileSidebar" className="bg-white w-16 md:w-72">
              <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
                <div className=" hidden md:flex">
                Mein Profil 
                </div>
                <div className=" show md:hidden">
                    <ArrowForwardIosIcon id="profileArrow" className="" onClick={sidebarOpenMobile}/>
                </div>
              </div>
              <div className="">
                <a
                  href="#"
                  className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <EditIcon className="mr-3" /> <p id="editProfile" className=" hidden md:flex">Profil bearbeiten</p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <AppsIcon className="mr-3" /> <p id="plan" className=" hidden md:flex">Restrauntplan</p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link h-18 text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <AppRegistrationIcon className="mr-3" /> <p id="editPlan" className=" hidden md:flex">Restrauntplan bearbeiten</p>
                </a>
                <a
                  href="#"
                  className="text-base flex items-center active-nav-link text-gray-400 py-4 h-18  px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
                >
                  <SecurityIcon className="mr-3" /> <p id="passwordAndSecurity" className=" hidden md:flex">{"Passwort & Sicherheit"}</p>
                </a>
              </div>
              <div className="bg-blue-400 w-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default myProfile;
