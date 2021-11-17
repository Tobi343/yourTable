import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import SideBarCard from "./SideBarCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EditIcon from "@mui/icons-material/Edit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AppsIcon from "@mui/icons-material/Apps";
import SecurityIcon from "@mui/icons-material/Security";
import MyProfile from "../MyProfile";

function InnerSidebar(props) {
  const arr = ["Burgerrista", "ABC", "LeBruger"];
  function sidebarOpenMobile(e) {
    e.preventDefault();
    containerProfileSidebar.classList.toggle("w-16");
    editProfile.classList.toggle("hidden");
    plan.classList.toggle("hidden");
    editPlan.classList.toggle("hidden");
    passwordAndSecurity.classList.toggle("hidden");
    profileArrow.classList.toggle("rotate-180");
  }

  

  return (
    <div id="containerProfileSidebar" className="bg-white w-16 md:w-72">
      <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
        <div className=" hidden md:flex">Meine Restaurants</div>
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
          onClick={()=>props.method(0,"Mein Profildaten")}
          className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
        >
          <EditIcon className="mr-3" />{" "}
          <p id="editProfileBtn" className=" hidden md:flex">
            Mein Profil
          </p>
        </a>
        {arr.map((reservation) => (
          <a
            onClick={()=>props.method(1,reservation)}
            className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
          >
            <EditIcon className="mr-3" />{" "}
            <p id="editProfileBtn" className=" hidden md:flex">
              {reservation}
            </p>
          </a>
        ))}

        <a
          onClick={()=>props.method(1,"Restaurant hinzufügen")}
          className=" flex items-center active-nav-link text-gray-400 py-4  h-18 px-6 transition duration-200 nav-item hover:bg-gray-300 hover:text-blue-500"
        >
          <EditIcon className="mr-3" />{" "}
          <p id="editProfileBtn" className=" hidden md:flex">
            Add Restaurant
          </p>
        </a>
      </div>
    </div>
  );
}

export default InnerSidebar;
