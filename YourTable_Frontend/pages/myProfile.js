import React from "react";
import { useState,useContext } from "react";
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
import Router from "next/router";
import CreateRestaurant from "./components/CreateRestaurant";
import RestauranteLayout from "./components/RestauranteLayout";
import { getSession } from "next-auth/react";
import ColorContext from "./contexts/ColorContext";
export async function getServerSideProps(context) {

  const session =  await getSession(context)
  console.log("Session: "+session.accessToken)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  const res = await fetch(`http://34.139.40.48/restaurant/2`);
  const res1 = await fetch(`http://34.139.40.48/users/data/`+session.email, {
    method: "GET",
    headers: new Headers({
      Authorization:
      "Token "+session.accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });

  const restaurant = await res.json();
  const user = await res1.json();
  return {
    props: {
      restaurant,
      user,
    },
  };
}

async function editRestaurant(restaurant) {
  console.log(JSON.stringify({
    name: restaurant.restaurant_name,
    address: restaurant.restaurant_address,
    mainImage: restaurant.restaurant_image,
    logoImage: restaurant.restaurant_logo,
    details: restaurant.details,
    id: restaurant.id,
    layout: restaurant.restaurant_layout,
  }));
  const res = await fetch(
    "http://34.139.40.48/restaurants/data/updateRestaurantData",
    {
      method: "POST",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        name: restaurant.restaurant_name,
        address: restaurant.restaurant_address,
        mainImage: restaurant.restaurant_image,
        logoImage: restaurant.restaurant_logo,
        details: restaurant.details,
        id: restaurant.id,
        layout: restaurant.restaurant_layout,
      }),
    }
  );
  console.log("Finished!");
  Router.reload();
}

async function editProfile(profile) {
  console.log(profile);
  const res = await fetch("http://34.139.40.48/users/data/updateUserData", {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      lastName: profile.customer_secondname,
      firstName: profile.customer_firstname,
      userName: profile.customer_username,
      phone: profile.customer_phone,
      email: profile.customer_email,
    }),
  });
  console.log("Finished!");
  Router.reload();
}

function myProfile({ restaurant, user }) {
  const [NavColor, setNavColor] = useState("bg-blue-500");
  const {color, setColor} = useContext(ColorContext);


  function sidebarOpenMobile(e) {
    e.preventDefault();
    containerProfileSidebar.classList.toggle("w-16");
    editProfile.classList.toggle("hidden");
    plan.classList.toggle("hidden");
    editPlan.classList.toggle("hidden");
    passwordAndSecurity.classList.toggle("hidden");
    profileArrow.classList.toggle("rotate-180");
  }

  function setState(n, text) {
    setModuleNumber(n);
    setTitle(text);
    setEditLayout(false);

    //restaurant[moduleNumber - 1].layout = tables;

    console.log(moduleNumber);
    console.log(restaurant.length);
   // console.log(restaurant[moduleNumber - 1].layout);
  }

  const [moduleNumber, setModuleNumber] = useState(0);
  const [title, setTitle] = useState("Meine Profildaten");
  const [editLayout, setEditLayout] = useState(false);

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


  return (
    <div>
      <Navbar setNavColorField={setColor} />
      <main className="flex bg-gray-100 h-full">
        <Sidebar NavColorField={color} />
        <div className="w-full flex flex-col h-screen ">
          <MobileSideBar />
          <div className="flex h-full">
            <InnerSidebar method={setState} arr={restaurant} />

            {moduleNumber == 0 ? (
              <MyProfile
                title={title}
                user={user}
                click={editProfile}
                className=" flex-1 h-full"
                id="editProfile"
              ></MyProfile>
            ) : moduleNumber > restaurant.length ? (
              <CreateRestaurant
                className=" flex-1 h-full"
                id="createRestaurant"
              ></CreateRestaurant>
            ) : (editLayout ? (
              <RestauranteLayout
                restaurant={restaurant[moduleNumber - 1]}
                edit={setEditLayout}
                tables={tables}
                setTables={setTables}
              ></RestauranteLayout>
            ) : (
              <EditRestaurant
                tables={tables}
                restaurant={restaurant[moduleNumber - 1]}
                className=" flex-1 h-full"
                edit={setEditLayout}
                id="editRestaurant"
                click={editRestaurant}
              ></EditRestaurant>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default myProfile;
