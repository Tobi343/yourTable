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
import InnerSidebar from "./components/Sidebars/innerSidebar";
import MyProfile from "./components/MyProfile";
import EditRestaurant from "./components/EditRestaurant";

export async function getStaticProps() {
  
  const res = await fetch('http://34.139.54.192/restaurant/2')
  const restaurant = await res.json()
  return {
    props: {
      restaurant,
    },
  }
}

function myProfile({restaurant}) {
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

  function setState(n,text){
    setModuleNumber(n);
    setTitle(text);


    console.log(n)
  }

  const [moduleNumber, setModuleNumber] = useState(0);
  const [title, setTitle] = useState('Meine Profildaten');

  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100 h-full">
        <Sidebar NavColorField={NavColor} />
        <div className="w-full flex flex-col h-screen ">
          <MobileSideBar />
          <div className="flex h-full">
            
            <InnerSidebar method={setState} arr={restaurant}/>


            {(moduleNumber == 0 ? 
            <MyProfile title={title} className=" flex-1 h-full" id="editProfile"></MyProfile>
             : 
             <EditRestaurant restaurant={restaurant[moduleNumber-1]} className=" flex-1 h-full" id="editRestaurant"></EditRestaurant>)

            }

            
            
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default myProfile;
